import { create } from 'zustand'
import { en } from '../locales/en'
import { id } from '../locales/id'

const locales = { en, id }

const INITIAL_STATE = {
  player: {
    money: 500,
    energy: 100,
    mood: 100,
    focus: 100,
    reputation: 10,
    specialization: 'Generalist'
  },
  techStack: {
    frontend: 0,
    backend: 0,
    ai: 0,
    devops: 0,
    mobile: 0,
  },
  gameTime: { day: 1, hour: 8, isPaused: false, speed: 1 },
  language: 'en',
  
  availableContracts: [],
  activeContract: null, 
  pendingApplication: null, 
  portfolio: [], 
  
  logs: ['System Boot: Freelancer Survival Mode Active.'],
  isGameOver: false,
  gameOverReason: '',
}

export const useGameStore = create((set, get) => ({
  ...INITIAL_STATE,

  setLanguage: (lang) => set({ language: lang }),
  t: (path) => {
    const keys = path.split('.')
    let result = locales[get().language]
    for (const key of keys) {
      if (!result || result[key] === undefined) return path
      result = result[key]
    }
    return result
  },

  addLog: (message) => set((state) => ({
    logs: [message, ...state.logs].slice(0, 50)
  })),

  setSpeed: (speed) => set((state) => ({
    gameTime: { ...state.gameTime, speed }
  })),

  togglePause: () => set((state) => ({
    gameTime: { ...state.gameTime, isPaused: !state.gameTime.isPaused }
  })),

  restartGame: () => set(INITIAL_STATE),

  // --- CORE TICK ---
  tickTime: () => {
    const state = get()
    if (state.isGameOver) return

    let { hour, day } = state.gameTime
    hour += 1
    
    if (hour >= 24) {
      hour = 0
      day += 1
      state.handleNewDay()
    }

    if (state.activeContract && state.activeContract.status === 'active') {
      const remaining = state.activeContract.remaining - 1
      if (remaining <= 0 && state.activeContract.progress < 100) {
        state.handleContractFailure('Deadline missed.')
      } else {
        set((s) => ({ activeContract: { ...s.activeContract, remaining } }))
      }
    }

    if (state.pendingApplication && state.pendingApplication.status === 'waiting') {
      const delay = state.pendingApplication.delay - 1
      if (delay <= 0) {
        state.resolveContractApplication()
      } else {
        set((s) => ({ pendingApplication: { ...s.pendingApplication, delay } }))
      }
    }

    set((state) => ({
      gameTime: { ...state.gameTime, hour, day }
    }))

    if (state.currentTask) state.tickTask()
    state.checkLosingConditions()
  },

  handleNewDay: () => {
    const state = get()
    const expenses = 40 
    
    set((state) => ({
      player: {
        ...state.player,
        money: state.player.money - expenses,
        energy: Math.min(100, state.player.energy + 25),
      }
    }))

    state.addLog('Daily Expenses: -$' + expenses + '. Survival cost applied.');
    state.refreshContractBoard()
  },

  refreshContractBoard: () => {
    // Only refresh if NO active contract and NO pending application
    // This prevents board spamming and ensures focus
    if (get().activeContract || get().pendingApplication) return;

    const archetypes = [
      { tier: 'Easy', clients: ['Indie Creator', 'Local Shop'], rewardRange: [100, 200], deadlineRange: [24, 48], tech: 'frontend' },
      { tier: 'Medium', clients: ['Startup Founder', 'Agency'], rewardRange: [300, 600], deadlineRange: [48, 96], tech: 'backend' },
      { tier: 'Hard', clients: ['Tech Startup', 'AI Startup'], rewardRange: [800, 1500], deadlineRange: [72, 144], tech: 'ai' }
    ];

    const generateContract = (archetype, index) => {
      const reward = Math.floor(Math.random() * (archetype.rewardRange[1] - archetype.rewardRange[0])) + archetype.rewardRange[0];
      const deadline = Math.floor(Math.random() * (archetype.deadlineRange[1] - archetype.deadlineRange[0])) + archetype.deadlineRange[0];
      const client = archetype.clients[Math.floor(Math.random() * archetype.clients.length)];
      return {
        id: 'c-' + Date.now() + '-' + index,
        title: archetype.tier + ' ' + (archetype.tech === 'ai' ? 'ML Model' : archetype.tech === 'backend' ? 'API' : 'UI'),
        difficulty: archetype.tier,
        reward,
        deadline,
        remaining: deadline,
        client,
        status: 'available',
        req: { [archetype.tech]: archetype.tier === 'Easy' ? 0 : archetype.tier === 'Medium' ? 10 : 25 }
      }
    }

    const newContracts = archetypes.map((a, i) => generateContract(a, i));
    set({ availableContracts: newContracts })
  },

  applyForContract: (contract) => {
    const state = get()
    if (state.activeContract || state.pendingApplication) return
    
    set({ 
      pendingApplication: { 
        contract: { ...contract, status: 'interview' }, 
        status: 'waiting', 
        delay: Math.floor(Math.random() * 3) + 2 
      } 
    })
    state.addLog('Application Sent: Waiting for ' + contract.client + ' to respond...');
  },

  resolveContractApplication: () => {
    const state = get()
    const { contract } = state.pendingApplication
    set({ pendingApplication: { ...state.pendingApplication, status: 'interview' } })
    state.addLog('Update: ' + contract.client + ' requested an interview.');
  },

  acceptContract: (contract) => {
    set((s) => ({ 
      activeContract: { ...contract, progress: 0, status: 'active' }, 
      availableContracts: s.availableContracts.filter(c => c.id !== contract.id),
      pendingApplication: null 
    }))
    get().addLog('Contract Approved: ' + contract.title + ' is now active.');
  },

  rejectPending: () => set({ pendingApplication: null }),

  handleContractFailure: (reason) => {
    const state = get()
    const contract = state.activeContract
    set((s) => ({
      player: { ...s.player, reputation: Math.max(0, s.player.reputation - 15), mood: Math.max(0, s.player.mood - 10) },
      portfolio: [...s.portfolio, { ...contract, status: 'failed', result: 'fail' }],
      activeContract: null,
      currentTask: null
    }))
    state.addLog('CRITICAL FAILURE: ' + contract.title + '. ' + reason + ' Reputation decreased.');
  },

  startTask: (task) => {
    const state = get()
    if (state.currentTask) return
    
    // Anti-exploit: Verify contract is still active if it is a freelance task
    if (task.type === 'freelance') {
        if (!state.activeContract || state.activeContract.status !== 'active') {
            state.addLog('Error: No active contract to work on.');
            return;
        }
    }

    if (state.player.energy < (task.energyCost || 0)) {
      state.addLog('Critical: Insufficient Energy.');
      return
    }
    set({ currentTask: { ...task, remaining: task.duration } })
    state.addLog('Started: ' + task.name)
  },

  tickTask: () => {
    set((state) => {
      const remaining = state.currentTask.remaining - 1
      if (remaining <= 0) return { nextTickComplete: true }
      return { currentTask: { ...state.currentTask, remaining } }
    })

    if (get().nextTickComplete) {
      const task = get().currentTask
      get().completeTask(task)
      set({ currentTask: null, nextTickComplete: false })
    }
  },

  completeTask: (task) => {
    const state = get()
    const efficiency = state.player.focus / 100
    
    set((state) => {
      const newPlayer = { 
        ...state.player, 
        energy: Math.max(0, state.player.energy - (task.energyCost || 0)),
        focus: Math.max(0, state.player.focus - 5)
      }
      
      let activeContract = state.activeContract
      if (task.type === 'freelance' && activeContract && activeContract.status === 'active') {
        activeContract = { 
          ...activeContract, 
          progress: Math.min(100, activeContract.progress + (20 * efficiency)) 
        }
        
        if (activeContract.progress >= 100) {
          newPlayer.money += activeContract.reward
          newPlayer.reputation += 10
          state.addLog('SUCCESS: Delivered ' + activeContract.title + '. Paid $' + activeContract.reward + '.');
          return { 
            player: newPlayer, 
            activeContract: null, 
            portfolio: [...state.portfolio, { ...activeContract, status: 'completed', result: 'success' }] 
          }
        }
      }

      if (task.type === 'rest') {
        newPlayer.energy = Math.min(100, newPlayer.energy + 40)
        newPlayer.focus = Math.min(100, newPlayer.focus + 25)
      }

      return { player: newPlayer, activeContract }
    })
    state.addLog('Finished: ' + task.name)
  },

  checkLosingConditions: () => {
    const state = get()
    if (state.player.money <= -500) set({ isGameOver: true, gameOverReason: 'Evicted.' })
    else if (state.player.energy <= 0) set({ isGameOver: true, gameOverReason: 'Collapsed.' })
  },
}))

import { create } from 'zustand'
import { en } from '../locales/en'
import { id } from '../locales/id'
import { CHAOS_EVENTS } from '../data/chaosEvents'
import { PROJECT_CONDITIONS } from '../data/projectConditions'

const locales = { en, id }

const INITIAL_STATE = {
  player: {
    money: 500,
    energy: 100,
    mood: 100,
    focus: 100,
    reputation: 10,
    specialization: 'Generalist',
    skills: { coding: 5, design: 5, marketing: 5 }
  },
  techStack: {
    frontend: 2,
    backend: 2,
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

  activeChaosEvent: null,
  selectedContract: null // For Detail Modal
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

  // --- MODAL ACTIONS ---
  selectContract: (contract) => set({ selectedContract: contract }),
  clearSelectedContract: () => set({ selectedContract: null }),

  // --- UTILS ---
  getMatchEfficiency: (contract) => {
    const state = get()
    if (!contract || !contract.req) return 1
    
    const capability = {
      ...state.player.skills,
      ...state.techStack
    }

    const requirements = Object.entries(contract.req)
    if (requirements.length === 0) return 1

    let totalRatio = 0
    requirements.forEach(([skill, reqValue]) => {
      const current = capability[skill] || 0
      totalRatio += Math.min(1.2, current / Math.max(1, reqValue))
    })

    let efficiency = totalRatio / requirements.length

    // Apply Technical Debt Penalty
    if (contract.conditions?.includes('tech_debt')) {
      efficiency -= PROJECT_CONDITIONS.tech_debt.effects.efficiencyPenalty
    }

    return Math.max(0.1, efficiency)
  },

  // --- CORE TICK ---
  tickTime: () => {
    const state = get()
    if (state.isGameOver || state.activeChaosEvent) return

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
        state.handleContractFailure();
      } else {
        set((s) => ({ activeContract: { ...s.activeContract, remaining } }))
      }

      state.tickAutoWork()

      // Chaos Event Trigger
      const baseChaosChance = 0.1
      let chaosMult = 1
      state.activeContract.conditions?.forEach(cId => {
        const cond = PROJECT_CONDITIONS[cId]
        if (cond?.effects?.chaosChanceMult) chaosMult *= cond.effects.chaosChanceMult
      })

      if (Math.random() < (baseChaosChance * chaosMult)) {
        state.triggerChaosEvent()
      }

      // Flow State Trigger (Passive)
      if (!state.activeContract.conditions?.includes('flow_state')) {
         if (state.player.focus > 80 && state.player.energy > 50 && Math.random() < 0.05) {
            state.addProjectCondition('flow_state')
            state.addLog('SYSTEM: Focus peak detected. Entering FLOW STATE.')
         }
      } else {
         if (state.player.focus < 60 || Math.random() < 0.1) {
            state.removeProjectCondition('flow_state')
            state.addLog('SYSTEM: Flow state interrupted.')
         }
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

  addProjectCondition: (conditionId) => {
    const state = get()
    if (!state.activeContract) return
    if (state.activeContract.conditions?.includes(conditionId)) return
    
    set((s) => ({
      activeContract: {
        ...s.activeContract,
        conditions: [...(s.activeContract.conditions || []), conditionId]
      }
    }))
  },

  removeProjectCondition: (conditionId) => {
    const state = get()
    if (!state.activeContract) return
    
    set((s) => ({
      activeContract: {
        ...s.activeContract,
        conditions: (s.activeContract.conditions || []).filter(id => id !== conditionId)
      }
    }))
  },

  triggerChaosEvent: () => {
    const state = get()
    const p = state.activeContract
    if (!p) return

    const possibleEvents = CHAOS_EVENTS.filter(e => !e.archetype || e.archetype === p.client);
    if (possibleEvents.length === 0) return

    const event = possibleEvents[Math.floor(Math.random() * possibleEvents.length)]
    set({ activeChaosEvent: event })
    get().togglePause() 
  },

  resolveChaosEvent: (optionId) => {
    const state = get()
    const event = state.activeChaosEvent
    if (!event) return

    const option = event.options.find(o => o.id === optionId)
    if (!option) return

    const effects = option.effect || {}
    
    set((s) => {
      const newPlayer = { ...s.player }
      const newActiveContract = { ...s.activeContract }
      const newTechStack = { ...s.techStack }

      if (effects.money) newPlayer.money += effects.money
      if (effects.energy) newPlayer.energy = Math.max(0, Math.min(100, newPlayer.energy + effects.energy))
      if (effects.focus) newPlayer.focus = Math.max(0, Math.min(100, newPlayer.focus + effects.focus))
      if (effects.mood) newPlayer.mood = Math.max(0, Math.min(100, newPlayer.mood + effects.mood))
      if (effects.reputation) newPlayer.reputation += effects.reputation
      
      if (effects.progress) newActiveContract.progress = Math.max(0, Math.min(100, newActiveContract.progress + effects.progress))
      if (effects.reward) newActiveContract.reward += effects.reward
      if (effects.quality) newActiveContract.quality += effects.quality
      if (effects.bugs) newActiveContract.bugs += effects.bugs

      if (effects.ai_familiarity) newTechStack.ai += effects.ai_familiarity

      if (effects.addCondition) {
        if (!newActiveContract.conditions) newActiveContract.conditions = []
        if (!newActiveContract.conditions.includes(effects.addCondition)) {
           newActiveContract.conditions.push(effects.addCondition)
        }
      }
      if (effects.removeCondition) {
        newActiveContract.conditions = (newActiveContract.conditions || []).filter(id => id !== effects.removeCondition)
      }

      return { 
        player: newPlayer, 
        activeContract: newActiveContract, 
        techStack: newTechStack,
        activeChaosEvent: null,
        gameTime: { ...s.gameTime, isPaused: false }
      }
    })

    state.addLog('CHAOS RESOLVED: ' + state.t('chaos.' + event.id + '.title'));
  },

  tickAutoWork: () => {
    const state = get()
    const { player, activeContract } = state
    
    if (player.energy <= 0) return

    const efficiency = state.getMatchEfficiency(activeContract)
    const energyMult = player.energy > 20 ? 1 : 0.3
    const focusMult = player.focus / 100
    
    let progressMult = 1
    let energyDrainMult = 1
    let focusDrainMult = 1

    activeContract.conditions?.forEach(cId => {
      const cond = PROJECT_CONDITIONS[cId]
      if (!cond) return
      if (cond.effects.progressMult) progressMult *= cond.effects.progressMult
      if (cond.effects.energyDrainMult) energyDrainMult *= cond.effects.energyDrainMult
      if (cond.effects.focusDrainMult) focusDrainMult *= cond.effects.focusDrainMult
    })

    const progressGain = 5 * efficiency * energyMult * focusMult * progressMult
    const energyCost = 2 * (1 / Math.max(0.5, energyMult)) * energyDrainMult
    const focusCost = 1.5 * (1 / Math.max(0.5, efficiency)) * focusDrainMult

    const newProgress = Math.min(100, activeContract.progress + progressGain)

    if (newProgress >= 100) {
      state.handleContractSuccess()
    } else {
      set((s) => ({
        player: {
          ...s.player,
          energy: Math.max(0, s.player.energy - energyCost),
          focus: Math.max(0, s.player.focus - focusCost)
        },
        activeContract: { ...s.activeContract, progress: newProgress }
      }))
    }
  },

  handleNewDay: () => {
    const state = get()
    const expenses = 40 
    
    set((s) => ({
      player: {
        ...s.player,
        money: s.player.money - expenses,
      }
    }))

    state.addLog('Daily Expenses: -$' + expenses + '. Survival cost applied.');
    state.refreshContractBoard()
  },

  refreshContractBoard: () => {
    if (get().activeContract || get().pendingApplication) return;

    const companies = ['NeonForge Studio', 'QuantumStack Labs', 'PixelCraft Agency', 'AIFlow Systems', 'NextByte Solutions', 'CloudSprint', 'HyperNest', 'MonoPixel'];
    const briefs = [
      'Need a modern SaaS dashboard for internal analytics.',
      'AI automation for customer support workflow needed.',
      'Landing page redesign needed before product launch.',
      'API server optimization for high-traffic mobile app.',
      'DevOps pipeline setup for a growing startup team.',
      'Internal tool to manage employee performance.'
    ];

    const archetypes = [
      { tier: 'Easy', clients: ['Indie Creator', 'Local Shop'], rewardRange: [300, 700], penaltyRange: [50, 150], repRange: [3, 6], deadlineRange: [24, 48], req: { frontend: 4, design: 4 }, risk: 'Low' },
      { tier: 'Medium', clients: ['Startup Founder', 'Agency'], rewardRange: [1000, 2500], penaltyRange: [200, 600], repRange: [8, 15], deadlineRange: [48, 96], req: { backend: 12, coding: 8 }, risk: 'Medium' },
      { tier: 'Hard', clients: ['Tech Startup', 'AI Startup'], rewardRange: [4000, 9000], penaltyRange: [1000, 3000], repRange: [20, 35], deadlineRange: [72, 144], req: { ai: 15, backend: 10, coding: 12 }, risk: 'High' }
    ];

    const generateContract = (archetype, index) => {
      const reward = Math.floor(Math.random() * (archetype.rewardRange[1] - archetype.rewardRange[0])) + archetype.rewardRange[0];
      const penalty = Math.floor(Math.random() * (archetype.penaltyRange[1] - archetype.archetype?.penaltyRange?.[0] || archetype.penaltyRange[0])) + archetype.penaltyRange[0];
      const repGain = Math.floor(Math.random() * (archetype.repRange[1] - archetype.repRange[0])) + archetype.repRange[0];
      const repLoss = Math.floor(repGain * 1.5);
      const deadline = Math.floor(Math.random() * (archetype.deadlineRange[1] - archetype.deadlineRange[0])) + archetype.deadlineRange[0];
      const client = archetype.clients[Math.floor(Math.random() * archetype.clients.length)];
      const company = companies[Math.floor(Math.random() * companies.length)];
      const description = briefs[Math.floor(Math.random() * briefs.length)];

      return {
        id: 'c-' + Date.now() + '-' + index,
        title: company + ': ' + (archetype.req.ai ? 'AI Project' : archetype.req.backend ? 'Backend Project' : 'UI Project'),
        company,
        description,
        difficulty: archetype.tier,
        reward,
        penalty,
        repGain,
        repLoss,
        deadline,
        remaining: deadline,
        client,
        status: 'available',
        risk: archetype.risk,
        progress: 0,
        req: archetype.req,
        quality: 0,
        bugs: 0,
        conditions: []
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
      },
      selectedContract: null // Close modal
    })
    state.addLog('SENDING CV: Reviewing previous history for ' + contract.company + '...');
  },

  resolveContractApplication: () => {
    const state = get()
    set({ pendingApplication: { ...state.pendingApplication, status: 'interview' } })
    state.addLog('Update: ' + state.pendingApplication.contract.company + ' requested an interview.');
  },

  acceptContract: (contract) => {
    set((s) => ({ 
      activeContract: { ...contract, progress: 0, status: 'active', conditions: [] }, 
      availableContracts: s.availableContracts.filter(c => c.id !== contract.id),
      pendingApplication: null 
    }))
    get().addLog('Contract Approved: Project for ' + contract.company + ' is now active.');
  },

  rejectPending: () => set({ pendingApplication: null }),

  handleContractSuccess: () => {
    const state = get()
    const contract = state.activeContract
    const completedContract = { ...contract, progress: 100, status: 'completed', result: 'success' };
    const successMsg = state.t('freelance.success').replace('{title}', contract.company).replace('${reward}', contract.reward);

    set((s) => ({
      player: { 
        ...s.player, 
        money: s.player.money + contract.reward,
        reputation: s.player.reputation + contract.repGain 
      },
      activeContract: null,
      portfolio: [...s.portfolio, completedContract],
      logs: [successMsg, ...s.logs].slice(0, 50)
    }))
  },

  handleContractFailure: () => {
    const state = get()
    const contract = state.activeContract
    const failMsg = state.t('freelance.projectFailed') + ': ' + contract.company + '. ' + state.t('freelance.delayFeedback');

    set((s) => ({
      player: { 
        ...s.player, 
        money: s.player.money - (contract.penalty || 100),
        reputation: Math.max(0, s.player.reputation - (contract.repLoss || 15)), 
        mood: Math.max(0, s.player.mood - 10) 
      },
      portfolio: [...s.portfolio, { ...contract, status: 'failed', result: 'fail' }],
      activeContract: null,
      currentTask: null,
      logs: [failMsg, ...s.logs].slice(0, 50)
    }))
  },

  startTask: (task) => {
    const state = get()
    if (state.currentTask) return
    
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
    
    set((s) => {
      const newPlayer = { 
        ...s.player, 
        energy: Math.max(0, s.player.energy - (task.energyCost || 0)),
      }
      
      if (task.type === 'rest') {
        newPlayer.energy = Math.min(100, newPlayer.energy + 40)
        newPlayer.focus = Math.min(100, newPlayer.focus + 30)
      }

      if (task.type === 'coffee') {
        newPlayer.energy = Math.min(100, newPlayer.energy + 25)
        newPlayer.focus = Math.max(0, newPlayer.focus - 10)
      }

      return { player: newPlayer }
    })

    state.addLog('Finished: ' + task.name)
  },

  checkLosingConditions: () => {
    const state = get()
    if (state.player.money <= -500) set({ isGameOver: true, gameOverReason: 'Evicted.' })
    else if (state.player.energy <= 0) set({ isGameOver: true, gameOverReason: 'Collapsed.' })
  },
}))

import { create } from 'zustand'
import { calculateSynergy, getReviewTemplate } from '../data/productData'

const INITIAL_STATE = {
  player: {
    money: 1000,
    energy: 100,
    mood: 100,
    focus: 100,
    reputation: 0,
    specialization: 'Generalist', // Default
    skills: { coding: 1, design: 1, marketing: 1 }
  },
  techStack: {
    frontend: 0,
    backend: 0,
    ai: 0,
    devops: 0,
    mobile: 0,
  },
  gameTime: { day: 1, hour: 8, isPaused: false, speed: 1 },
  activeProduct: null, 
  products: [], 
  currentTask: null, 
  logs: ['System Boot: Welcome to Burnout Inc.'],
  isGameOver: false,
  gameOverReason: '',
  isCreatingProduct: false
}

export const useGameStore = create((set, get) => ({
  ...INITIAL_STATE,

  addLog: (message) => set((state) => ({
    logs: [message, ...state.logs].slice(0, 50)
  })),

  setSpeed: (speed) => set((state) => ({
    gameTime: { ...state.gameTime, speed }
  })),

  togglePause: () => set((state) => ({
    gameTime: { ...state.gameTime, isPaused: !state.gameTime.isPaused }
  })),

  toggleCreateModal: (val) => set({ isCreatingProduct: val }),

  restartGame: () => set(INITIAL_STATE),

  // --- CORE LOOP TICK ---
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

    set((state) => ({
      gameTime: { ...state.gameTime, hour, day }
    }))

    if (state.currentTask) state.tickTask()
    state.checkLosingConditions()
  },

  handleNewDay: () => {
    const state = get()
    const baseExpenses = 50 
    
    // DevOps familiarity reduces expenses (up to 50% reduction)
    const expenseReduction = Math.min(25, state.techStack.devops / 4)
    const finalExpenses = baseExpenses - expenseReduction

    let dailyRevenue = 0
    state.products.forEach(p => {
      dailyRevenue += p.stats.revenue
    })

    set((state) => ({
      player: {
        ...state.player,
        money: state.player.money - finalExpenses + dailyRevenue,
        energy: Math.min(100, state.player.energy + 20),
        mood: Math.max(0, state.player.mood - 2)
      }
    }))

    state.addLog('Daily Report: Revenue +$' + Math.floor(dailyRevenue) + ' | Expenses -$' + Math.floor(finalExpenses));

    if (Math.random() < 0.1) state.triggerRandomEvent()
  },

  triggerRandomEvent: () => {
    const events = [
      { msg: 'Laptop overheating. Focus dropped.', effect: { focus: -15 } },
      { msg: 'Tech Twitter found your app! Users +50', effect: { users: 50 }, target: 'portfolio' },
      { msg: 'AWS outage. Quality dropped.', effect: { quality: -2 }, target: 'portfolio' }
    ]
    const event = events[Math.floor(Math.random() * events.length)]
    
    set((state) => {
      const newPlayer = { ...state.player }
      if (event.effect.focus) newPlayer.focus = Math.max(0, newPlayer.focus + event.effect.focus)
      if (event.effect.money) newPlayer.money += event.effect.money

      if (event.target === 'portfolio' && state.products.length > 0) {
        const index = Math.floor(Math.random() * state.products.length)
        const products = [...state.products]
        const p = { ...products[index], stats: { ...products[index].stats } }
        if (event.effect.users) p.stats.users += event.effect.users
        if (event.effect.quality) p.stats.quality += event.effect.quality
        products[index] = p
        return { player: newPlayer, products }
      }
      
      return { player: newPlayer }
    })
    get().addLog('EVENT: ' + event.msg)
  },

  // --- PRODUCT MANAGEMENT ---
  createProduct: (blueprint) => {
    const product = {
      ...blueprint,
      released: false,
      stats: { progress: 0, quality: 0, bugs: 0, hype: 0, users: 0, revenue: 0 }
    }
    set({ activeProduct: product, isCreatingProduct: false })
    get().addLog('Initialized Blueprint: ' + blueprint.name)
  },

  launchProduct: () => {
    const state = get()
    const p = state.activeProduct
    if (!p || p.stats.progress < 100) return

    const synergy = calculateSynergy(p.type, p.market, p.focus)
    
    // Tech familiarity bonuses
    let techBonus = 0
    if (p.type === 'AI Tool') techBonus += state.techStack.ai / 5
    if (p.type === 'Consumer App') techBonus += state.techStack.mobile / 5
    if (p.type === 'Developer Tool') techBonus += state.techStack.backend / 5

    const score = p.stats.quality + synergy + techBonus - (p.stats.bugs * 2)
    
    let result = 'Decent'
    let initialUsers = 10
    if (score >= 90) { result = 'Viral Hit'; initialUsers = 500; }
    else if (score >= 70) { result = 'Success'; initialUsers = 100; }
    else if (score < 40) { result = 'Disaster'; initialUsers = 5; }

    // Backend familiarity boosts revenue multiplier
    const revMultiplier = 0.5 + (state.techStack.backend / 200)
    const revenue = Math.floor(initialUsers * revMultiplier)
    const review = getReviewTemplate(score, p.stats.bugs)

    const launchedProduct = {
      ...p,
      released: true,
      launchResult: result,
      stats: { ...p.stats, users: initialUsers, revenue }
    }

    set((state) => ({
      products: [launchedProduct, ...state.products],
      activeProduct: null,
      // DevOps boost upon launch
      techStack: { ...state.techStack, devops: state.techStack.devops + 5 }
    }))

    state.addLog('LAUNCH: ' + p.name + ' was a ' + result + '! Users: ' + initialUsers);
    state.addLog('REVIEWS: ' + review);
  },

  // --- TASK LOGIC ---
  startTask: (task) => {
    const state = get()
    if (state.currentTask) return
    if (state.player.energy < task.energyCost) {
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
    
    // Tech familiarity growth and speed bonuses
    let speedBonus = 1
    const techGrowth = { ...state.techStack }

    if (task.type === 'build' && state.activeProduct) {
      const p = state.activeProduct
      if (p.type === 'AI Tool') {
        techGrowth.ai += 1
        speedBonus += state.techStack.ai / 100
      }
      if (p.type === 'Productivity App') techGrowth.frontend += 1
      if (p.type === 'Developer Tool') techGrowth.backend += 1
      if (p.type === 'Consumer App') techGrowth.mobile += 1
    }

    if (task.type === 'freelance') {
      if (task.name.includes('Frontend')) techGrowth.frontend += 2
      if (task.name.includes('API')) techGrowth.backend += 2
    }

    set((state) => {
      const newPlayer = { 
        ...state.player, 
        energy: Math.max(0, state.player.energy - task.energyCost),
        focus: Math.max(0, state.player.focus - 5)
      }
      let activeProduct = state.activeProduct

      if (task.type === 'freelance') {
        newPlayer.money += task.reward * efficiency
      }
      if (task.type === 'build' && activeProduct) {
        // Backend reduces bug chance
        const bugChance = Math.max(0, 40 - state.techStack.backend)
        activeProduct = {
          ...activeProduct,
          stats: {
            ...activeProduct.stats,
            progress: Math.min(100, activeProduct.stats.progress + (15 * efficiency * speedBonus)),
            // Frontend boosts quality
            quality: activeProduct.stats.quality + (8 * efficiency) + (state.techStack.frontend / 20),
            bugs: activeProduct.stats.bugs + (state.player.focus < bugChance ? 2 : 0)
          }
        }
      }
      if (task.type === 'marketing') {
        newPlayer.reputation += 5 * efficiency
      }
      if (task.type === 'rest') {
        newPlayer.energy = Math.min(100, newPlayer.energy + 40)
        newPlayer.focus = Math.min(100, newPlayer.focus + 25)
      }

      return { player: newPlayer, activeProduct, techStack: techGrowth }
    })
    state.addLog('Finished: ' + task.name)
  },

  checkLosingConditions: () => {
    const state = get()
    if (state.player.money <= -1000) set({ isGameOver: true, gameOverReason: 'Bankruptcy.' })
    else if (state.player.focus <= 0) set({ isGameOver: true, gameOverReason: 'Burnout.' })
  }
}))

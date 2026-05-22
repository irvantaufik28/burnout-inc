import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { en } from '../locales/en'
import { id } from '../locales/id'
import { CHAOS_EVENTS } from '../data/chaosEvents'
import { PROJECT_CONDITIONS } from '../data/projectConditions'
import { MENTAL_FEEDBACK_TRIGGERS } from '../data/mentalFeedback'
import { BEGINNER_PROJECTS } from '../data/contractPool'
import { REVIEW_TEMPLATES } from '../data/reviewData'
import { getScaledBills } from '../data/billData'
import { UNEXPECTED_EXPENSES } from '../data/unexpectedExpenses'
import { DEVICE_ISSUES } from '../data/deviceIssues'
import { formatCurrency } from '../utils/currencyFormatter'

const locales = { en, id }

const INITIAL_STATE = {
  player: {
    money: 500,
    energy: 100,
    mood: 100,
    focus: 100,
    reputation: 10,
    careerLevel: 1,
    careerExp: 0,
    specialization: 'Generalist',
    skills: { coding: { level: 5, exp: 0 }, design: { level: 5, exp: 0 }, marketing: { level: 5, exp: 0 } }
  },
  techStack: { frontend: { level: 2, exp: 0 }, backend: { level: 2, exp: 0 }, ai: { level: 2, exp: 0 }, devops: { level: 2, exp: 0 }, mobile: { level: 2, exp: 0 } },
  gameTime: { day: 1, hour: 8, isPaused: false, speed: 1 },
  humanTick: 0,
  language: 'en',
  availableContracts: [],
  activeContract: null, 
  pendingApplication: null, 
  portfolio: [], 
  logs: ['System Boot: Freelancer Survival Mode Active.'],
  isGameOver: false,
  gameOverReason: '',
  activeChaosEvent: null,
  selectedContract: null,
  conditionTimers: {},
  stimulantHistory: [],
  stimulantCooldowns: {},
  levelUpQueue: [],
  activeReview: null,
  
  // --- ECONOMY & DEVICE SYSTEMS ---
  nextBillDay: 8,
  pendingBills: {},
  overdueBills: null,
  activePaymentModal: false,
  lastUnexpectedExpenseDay: 0,
  lastDeviceIssueDay: 0,
  activeUnexpectedExpense: null,
  deviceIssues: [], // { id, startDay, penalty }
  
  // --- DEBT SYSTEM ---
  debtDays: 0,
  debtSeverity: 'none', // none, small, medium, critical
  
  saveVersion: 4, 
  lastSaved: null,
  hasStarted: false,
}

export const useGameStore = create(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setLanguage: (lang) => set({ language: lang }),
      t: (path) => {
        const keys = path.split('.')
        let result = locales[get().language]
        for (const key of keys) { if (!result || result[key] === undefined) return path; result = result[key] }
        return result
      },
      fCurrency: (amount) => formatCurrency(amount, get().language),
      addLog: (message) => set((state) => ({ logs: [message, ...state.logs].slice(0, 50) })),
      setSpeed: (speed) => set((state) => ({ gameTime: { ...state.gameTime, speed } })),
      togglePause: () => set((state) => ({ gameTime: { ...state.gameTime, isPaused: !state.gameTime.isPaused } })),
      
      startNewCareer: () => {
          const s = { ...INITIAL_STATE, hasStarted: true, lastSaved: Date.now() };
          s.pendingBills = getScaledBills(1);
          set(s);
      },
      continueCareer: () => set({ hasStarted: true, gameTime: { ...get().gameTime, isPaused: true } }),
      restartGame: () => set({ ...INITIAL_STATE, hasStarted: true, pendingBills: getScaledBills(1) }),

      selectContract: (contract) => set({ selectedContract: contract }),
      clearSelectedContract: () => set({ selectedContract: null }),

      dismissLevelUp: () => set((state) => ({
        levelUpQueue: state.levelUpQueue.slice(1),
        gameTime: { ...state.gameTime, isPaused: (state.levelUpQueue.length > 1 || state.activeReview !== null || state.activeUnexpectedExpense !== null || state.activePaymentModal) }
      })),

      dismissReview: () => set((state) => ({
        activeReview: null,
        gameTime: { ...state.gameTime, isPaused: (state.levelUpQueue.length > 0 || state.activeUnexpectedExpense !== null || state.activePaymentModal) }
      })),

      getMaxFocus: () => {
          const state = get();
          let penalty = 0;
          state.deviceIssues.forEach(issue => { penalty += issue.penalty });
          if (state.debtSeverity === 'critical') penalty += 15;
          return Math.max(20, 100 - penalty);
      },

      getMatchEfficiency: (contract) => {
        const state = get()
        if (!contract || !contract.req) return 1
        const capability = { ...Object.fromEntries(Object.entries(state.player.skills).map(([k, v]) => [k, v.level])), ...Object.fromEntries(Object.entries(state.techStack).map(([k, v]) => [k, v.level])) }
        const requirements = Object.entries(contract.req)
        if (requirements.length === 0) return 1
        let totalRatio = 0
        requirements.forEach(([skill, reqValue]) => { const current = capability[skill] || 0; totalRatio += Math.min(1.2, current / Math.max(1, reqValue)) })
        let efficiency = totalRatio / requirements.length
        if (contract.conditions?.includes('tech_debt')) efficiency -= PROJECT_CONDITIONS.tech_debt.effects.efficiencyPenalty
        return Math.max(0.1, efficiency)
      },

      getStimulantStats: (type) => {
        const state = get(); const history = state.stimulantHistory.filter(h => h.type === type)
        const efficiencyMap = [1, 0.6, 0.3, 0.1]; const currentEfficiency = efficiencyMap[Math.min(history.length, efficiencyMap.length - 1)]
        return { count: history.length, efficiency: currentEfficiency, totalCount: state.stimulantHistory.length, isExhausted: history.length >= 3, fatigueRisk: state.stimulantHistory.length >= 4 ? 'HIGH' : state.stimulantHistory.length >= 2 ? 'MEDIUM' : 'LOW' }
      },

      getExpForLevel: (level) => Math.floor(100 * Math.pow(1.15, level - 1)),

      getCareerTitle: (level) => {
        const state = get()
        if (level >= 100) return state.t('career.titles.lv100'); if (level >= 90) return state.t('career.titles.lv90'); if (level >= 80) return state.t('career.titles.lv80'); if (level >= 70) return state.t('career.titles.lv70'); if (level >= 60) return state.t('career.titles.lv60'); if (level >= 50) return state.t('career.titles.lv50'); if (level >= 40) return state.t('career.titles.lv40'); if (level >= 30) return state.t('career.titles.lv30'); if (level >= 20) return state.t('career.titles.lv20'); if (level >= 10) return state.t('career.titles.lv10'); if (level >= 5) return state.t('career.titles.lv5')
        return state.t('career.titles.lv1')
      },

      addCareerExp: (amount) => {
        const state = get()
        set((s) => {
          let { careerLevel, careerExp } = s.player; careerExp += amount; let leveledUp = false; const notifications = []
          while (careerExp >= state.getExpForLevel(careerLevel)) { 
              careerExp -= state.getExpForLevel(careerLevel); 
              careerLevel++; 
              leveledUp = true; 
              notifications.push({ type: 'career', level: careerLevel, title: state.getCareerTitle(careerLevel) });
              s.pendingBills = getScaledBills(careerLevel);
          }
          if (leveledUp) { state.addLog('CAREER UP: Level ' + careerLevel); return { player: { ...s.player, careerLevel, careerExp }, levelUpQueue: [...s.levelUpQueue, ...notifications], gameTime: { ...s.gameTime, isPaused: true } } }
          return { player: { ...s.player, careerLevel, careerExp } }
        })
      },

      addSkillExp: (skillName, amount) => {
        const state = get()
        set((s) => {
          const isTech = s.techStack[skillName] !== undefined; const target = isTech ? s.techStack : s.player.skills; const current = target[skillName]
          let { level, exp } = current; exp += amount; let leveledUp = false; const notifications = []
          while (exp >= state.getExpForLevel(level)) { exp -= state.getExpForLevel(level); level++; leveledUp = true; notifications.push({ type: 'skill', name: skillName, level }) }
          const updated = { ...current, level, exp }; if (leveledUp) { state.addLog('SKILL UP: ' + skillName.toUpperCase()); const base = isTech ? { techStack: { ...s.techStack, [skillName]: updated } } : { player: { ...s.player, skills: { ...s.player.skills, [skillName]: updated } } }; return { ...base, levelUpQueue: [...s.levelUpQueue, ...notifications], gameTime: { ...s.gameTime, isPaused: true } } }
          return isTech ? { techStack: { ...s.techStack, [skillName]: updated } } : { player: { ...s.player, skills: { ...s.player.skills, [skillName]: updated } } }
        })
      },

      distributeProjectExp: (contract) => {
        const totalExp = 50 + (contract.reward / 20); const totalPoints = Object.entries(contract.req).reduce((acc, entry) => acc + entry[1], 0)
        Object.entries(contract.req).forEach(([skill, val]) => { const weight = val / totalPoints; const state = get(); const current = state.techStack[skill] || state.player.skills[skill]; get().addSkillExp(skill, Math.floor(Math.floor(totalExp * weight) * Math.max(1, (val / Math.max(1, current.level))))) })
        get().addCareerExp(Math.floor(totalExp / 2))
      },

      tickTime: () => {
        const state = get()
        if (state.isGameOver || state.activeChaosEvent || state.levelUpQueue.length > 0 || state.activeReview || state.activeUnexpectedExpense || state.activePaymentModal) return
        
        let { hour, day } = state.gameTime; hour += 1; if (hour >= 24) { hour = 0; day += 1; state.handleNewDay(); state.checkDeviceEscalation(); state.updateDebtState() }
        const humanTick = state.humanTick + 1
        
        if (day === state.nextBillDay && hour === 0) {
            set({ activePaymentModal: true, gameTime: { ...state.gameTime, isPaused: true, hour, day } });
            return;
        }

        if (state.activeContract && state.activeContract.status === 'active') {
          const remaining = state.activeContract.remaining - 1
          if (remaining <= 0 && state.activeContract.progress < 100) state.handleContractFailure()
          else { set((s) => ({ activeContract: { ...s.activeContract, remaining } })); state.tickConditionTimers(); state.tickAutoWork(); const baseChaos = 0.035; let chaosMult = 1; state.activeContract.conditions?.forEach(cId => { const cond = PROJECT_CONDITIONS[cId]; if (cond?.effects?.chaosChanceMult) chaosMult *= cond.effects.chaosChanceMult }); if (Math.random() < (baseChaos * chaosMult)) state.triggerChaosEvent(); if (!state.activeContract.conditions?.includes('flow_state')) { if (state.player.focus > 85 && state.player.energy > 60 && Math.random() < 0.04) { state.addProjectCondition('flow_state', 8); state.addLog('SYSTEM: FLOW STATE.') } } else { if (state.player.focus < 65 || Math.random() < 0.08) { state.removeProjectCondition('flow_state'); state.addLog('SYSTEM: Flow state interrupted.') } }; state.tickMentalFeedback() }
        }

        const daysSinceLast = day - state.lastUnexpectedExpenseDay;
        const daysSinceLastDevice = day - state.lastDeviceIssueDay;
        if (daysSinceLast >= 5 && Math.random() < 0.005) {
            const pool = UNEXPECTED_EXPENSES.filter(e => e.type !== 'device' || (daysSinceLastDevice >= 10 && !state.deviceIssues.find(i => i.id === e.id)));
            if (pool.length > 0) {
                const event = pool[Math.floor(Math.random() * pool.length)];
                set({ activeUnexpectedExpense: event, lastUnexpectedExpenseDay: day });
                if (event.type === 'device') set({ lastDeviceIssueDay: day });
                get().togglePause();
            }
        }

        if (humanTick % 4 === 0) state.tickHumanFatigue()
        const newCooldowns = { ...state.stimulantCooldowns }; let cdChanged = false; Object.entries(newCooldowns).forEach(([type, rem]) => { if (rem > 1) newCooldowns[type] = rem - 1; else delete newCooldowns[type]; cdChanged = true })
        const currentAbs = (state.gameTime.day * 24) + state.gameTime.hour; const newHistory = state.stimulantHistory.filter(h => (currentAbs - h.absTime) < 18)
        if (state.pendingApplication && state.pendingApplication.status === 'waiting') { const delay = state.pendingApplication.delay - 1; if (delay <= 0) state.resolveContractApplication(); else set((s) => ({ pendingApplication: { ...s.pendingApplication, delay } })) }
        
        if (hour % 12 === 0) set({ lastSaved: Date.now() })

        set((state) => ({ gameTime: { ...state.gameTime, hour, day }, humanTick, stimulantCooldowns: cdChanged ? newCooldowns : state.stimulantCooldowns, stimulantHistory: newHistory.length !== state.stimulantHistory.length ? newHistory : state.stimulantHistory }))
        if (state.currentTask) state.tickTask()
        state.checkLosingConditions()
      },

      updateDebtState: () => {
          set((s) => {
              const money = s.player.money;
              let severity = 'none';
              let debtDays = s.debtDays;
              const newPlayer = { ...s.player };

              if (money < -5000) {
                  severity = 'critical';
                  debtDays += 1;
                  newPlayer.reputation = Math.max(0, newPlayer.reputation - 2);
                  newPlayer.mood = Math.max(0, newPlayer.mood - 5);
              } else if (money < -1000) {
                  severity = 'medium';
                  debtDays = 0;
                  newPlayer.mood = Math.max(0, newPlayer.mood - 2);
              } else if (money < 0) {
                  severity = 'small';
                  debtDays = 0;
                  newPlayer.mood = Math.max(0, newPlayer.mood - 1);
              } else {
                  severity = 'none';
                  debtDays = 0;
              }

              return { debtSeverity: severity, debtDays, player: newPlayer };
          });
      },

      checkDeviceEscalation: () => {
          const state = get();
          const { day } = state.gameTime;
          const updated = state.deviceIssues.map(issue => {
              const meta = DEVICE_ISSUES[issue.id];
              if (!meta || !meta.escalation) return issue;
              const daysBroken = day - issue.startDay;
              let currentPenalty = meta.baseFocusPenalty;
              meta.escalation.forEach(esc => {
                  if (daysBroken >= esc.day) { currentPenalty = esc.penalty }
              });
              if (currentPenalty !== issue.penalty) { get().addLog('MAINTENANCE: ' + meta.name[state.language] + ' is getting worse.') }
              return { ...issue, penalty: currentPenalty };
          });
          set({ deviceIssues: updated });
      },

      payBills: () => {
        const state = get();
        const total = Object.values(state.pendingBills).reduce((a, b) => a + b, 0);
        const canPayFull = state.player.money >= total;
        
        set((s) => {
            const newMoney = s.player.money - total;
            const updates = {
                player: { ...s.player, money: newMoney },
                nextBillDay: s.gameTime.day + 7,
                pendingBills: getScaledBills(s.player.careerLevel),
                activePaymentModal: false,
                gameTime: { ...s.gameTime, isPaused: false },
                lastSaved: Date.now()
            };

            if (!canPayFull) {
                updates.player.reputation = Math.max(0, s.player.reputation - 15);
                updates.player.mood = Math.max(0, s.player.mood - 10);
                get().addLog('CRITICAL: Missed bill payments. Debt increased.');
                get().addProjectCondition('burnout_risk', 48);
            } else {
                get().addLog('ECONOMY: Weekly bills paid: -' + state.fCurrency(total));
            }
            return updates;
        });
        get().updateDebtState();
      },

      triggerUnexpectedExpense: () => {},

      resolveUnexpectedExpense: (optionId) => {
        const state = get();
        const event = state.activeUnexpectedExpense;
        const option = event.options.find(o => o.id === optionId);
        
        if (option.cost > state.player.money && option.id !== 'ignore') {
            state.addLog('Critical: Insufficient Capital.');
            return;
        }

        if (option.isPending) {
            const meta = DEVICE_ISSUES[event.id];
            set((s) => ({
                deviceIssues: [...s.deviceIssues, { id: event.id, startDay: s.gameTime.day, penalty: meta.baseFocusPenalty }],
                activeUnexpectedExpense: null,
                gameTime: { ...s.gameTime, isPaused: false },
                lastSaved: Date.now()
            }));
            state.addLog('MAINTENANCE: Issue ignored. Device added to pending repairs.');
            return;
        }

        set((s) => {
            const newPlayer = { ...s.player, money: s.player.money - option.cost };
            const effects = option.effect || {};
            if (effects.focus) newPlayer.focus = Math.max(0, Math.min(100, newPlayer.focus + effects.focus));
            if (effects.energy) newPlayer.energy = Math.max(0, Math.min(100, newPlayer.energy + effects.energy));
            return { player: newPlayer, activeUnexpectedExpense: null, gameTime: { ...s.gameTime, isPaused: false }, lastSaved: Date.now() };
        });
        state.addLog('RESOLVED: ' + event.title[state.language]);
        get().updateDebtState();
      },

      repairDevice: (issueId) => {
          const state = get();
          const meta = DEVICE_ISSUES[issueId];
          if (state.player.money < meta.repairCost) {
              state.addLog('Critical: Cannot afford repair.');
              return;
          }
          set((s) => ({
              player: { ...s.player, money: s.player.money - meta.repairCost },
              deviceIssues: s.deviceIssues.filter(i => i.id !== issueId),
              lastSaved: Date.now()
          }));
          state.addLog('SUCCESS: ' + meta.name[state.language] + ' repaired.');
          get().updateDebtState();
      },

      tickHumanFatigue: () => {
        const state = get(); const { player, activeContract } = state; let eD = 0.5, fD = 0.8; const isW = activeContract && activeContract.status === 'active'
        
        let recEff = 1;
        if (state.debtSeverity === 'medium') { recEff = 0.8; fD *= 1.2 }
        if (state.debtSeverity === 'critical') { recEff = 0.6; fD *= 1.5; eD *= 1.2 }

        if (isW) { eD += 1.0; fD += 1.2 }; if (activeContract?.conditions?.includes('crunch_mode')) { eD += 2.0; fD += 1.5 }; if (activeContract?.conditions?.includes('flow_state')) { fD *= 0.5; eD *= 0.8 }; if (activeContract?.conditions?.includes('overstimulated')) fD *= 1.8; if (state.gameTime.hour >= 0 && state.gameTime.hour < 5) { fD += 1.0; eD += 0.5 }
        if (!isW) { if (player.energy <= 45) eD = 0; if (player.focus <= 50) fD = 0 }
        
        const maxF = state.getMaxFocus();
        const newF = Math.max(0, Math.min(maxF, player.focus - fD));
        
        set((s) => ({ player: { ...s.player, energy: Math.max(0, s.player.energy - eD), focus: newF } }))
      },

      tickMentalFeedback: () => {
        const state = get(); 
        MENTAL_FEEDBACK_TRIGGERS.forEach(t => { if (t.condition(state) && Math.random() < t.chance) { const msgs = state.t('mental.' + t.id); if (Array.isArray(msgs)) state.addLog('[MIND] ' + msgs[Math.floor(Math.random() * msgs.length)]) } });
        
        if (state.debtSeverity !== 'none' && Math.random() < 0.05) {
            const msgs = state.t('mental.debt_' + state.debtSeverity);
            if (Array.isArray(msgs)) state.addLog('[MIND] ' + msgs[Math.floor(Math.random() * msgs.length)]);
        }
      },

      tickConditionTimers: () => {
        const state = get(); const newTimers = { ...state.conditionTimers }; let changed = false; Object.entries(newTimers).forEach(([cId, rem]) => { const next = rem - 1; if (next <= 0) { delete newTimers[cId]; state.removeProjectCondition(cId); const m = PROJECT_CONDITIONS[cId]; if (m?.aftermath) { state.addProjectCondition(m.aftermath, PROJECT_CONDITIONS[m.aftermath].duration); state.addLog('AFTERMATH: ' + state.t('condition.' + m.aftermath)) } } else { newTimers[cId] = next }; changed = true })
        if (changed) set({ conditionTimers: newTimers })
      },

      addProjectCondition: (cId, dur = null) => set((s) => { if (!s.activeContract) return {}; const conds = [...(s.activeContract.conditions || [])]; if (!conds.includes(cId)) conds.push(cId); const timers = { ...s.conditionTimers }; if (dur) timers[cId] = dur; return { activeContract: { ...s.activeContract, conditions: conds }, conditionTimers: timers } }),
      removeProjectCondition: (cId) => set((s) => { if (!s.activeContract) return {}; const timers = { ...s.conditionTimers }; delete timers[cId]; return { activeContract: { ...s.activeContract, conditions: (s.activeContract.conditions || []).filter(id => id !== cId) }, conditionTimers: timers } }),

      triggerChaosEvent: () => { const state = get(); const p = state.activeContract; if (!p) return; const evs = CHAOS_EVENTS.filter(e => (!e.archetype || e.archetype === p.client) && (!e.requirement || e.requirement.type === p.type)); if (evs.length === 0) return; set({ activeChaosEvent: evs[Math.floor(Math.random() * evs.length)] }); get().togglePause() },

      resolveChaosEvent: (optId) => {
        const state = get(); const ev = state.activeChaosEvent; if (!ev) return; const opt = ev.options.find(o => o.id === optId); if (!opt) return; const eff = opt.effect || {}
        set((s) => {
          const nP = { ...s.player }, nC = { ...s.activeContract }, nT = { ...s.techStack }; if (eff.activeContract === null) return { player: { ...nP, money: nP.money + (eff.money || 0), reputation: Math.max(0, nP.reputation + (eff.reputation || 0)) }, activeContract: null, portfolio: [...s.portfolio, { ...nC, status: 'failed', result: 'fail' }], activeChaosEvent: null, conditionTimers: {}, gameTime: { ...s.gameTime, isPaused: false }, lastSaved: Date.now() }
          if (eff.money) nP.money += eff.money; if (eff.energy) nP.energy = Math.max(0, Math.min(100, nP.energy + eff.energy)); if (eff.focus) nP.focus = Math.max(0, Math.min(100, nP.focus + eff.focus)); if (eff.reputation) nP.reputation += eff.reputation; if (eff.progress) nC.progress = Math.max(0, Math.min(100, nC.progress + eff.progress)); if (eff.reward) nC.reward += eff.reward; if (eff.ai_familiarity) nT.ai.level += eff.ai_familiarity; if (eff.addCondition) { if (!nC.conditions) nC.conditions = []; if (!nC.conditions.includes(eff.addCondition)) { nC.conditions.push(eff.addCondition); const m = PROJECT_CONDITIONS[eff.addCondition]; if (m?.duration) s.conditionTimers[eff.addCondition] = m.duration } }; if (eff.removeCondition) { nC.conditions = (nC.conditions || []).filter(id => id !== eff.removeCondition); delete s.conditionTimers[eff.removeCondition] }
          return { player: nP, activeContract: nC, techStack: nT, activeChaosEvent: null, gameTime: { ...s.gameTime, isPaused: false }, lastSaved: Date.now() }
        })
        state.addLog('CHAOS RESOLVED: ' + state.t('chaos.' + ev.id + '.title'));
        get().updateDebtState();
      },

      tickAutoWork: () => { const state = get(); const { activeContract } = state; if (state.player.energy <= 0) return; const eff = state.getMatchEfficiency(activeContract); const eMult = state.player.energy > 20 ? 1 : 0.3; const fMult = (state.player.focus / 100); let pMult = 1, randomness = 1; activeContract.conditions?.forEach(cId => { const c = PROJECT_CONDITIONS[cId]; if (!c) return; if (c.effects.progressMult) pMult *= c.effects.progressMult; if (c.effects.randomSpeedFluctuation) randomness = 0.5 + Math.random() }); const gain = 5 * eff * eMult * fMult * pMult * randomness; const nextP = Math.min(100, activeContract.progress + gain); if (nextP >= 100) state.handleContractSuccess(); else set((s) => ({ activeContract: { ...s.activeContract, progress: nextP } })) },

      handleNewDay: () => { set((s) => ({ player: { ...s.player, money: s.player.money - 40 }, lastSaved: Date.now() })); const state = get(); get().addLog('Daily Expenses: -' + state.fCurrency(40)); get().refreshContractBoard() },

      refreshContractBoard: () => {
        if (get().activeContract || get().pendingApplication) return
        const cos = ['NeonForge Studio', 'QuantumStack Labs', 'PixelCraft Agency', 'AIFlow Systems', 'NextByte Solutions', 'CloudSprint', 'HyperNest', 'MonoPixel'];
        const careerLevel = get().player.careerLevel; const isB = careerLevel <= 10;
        const archs = isB ? [{ tier: 'Beginner', type: 'frontend', weight: 0.30, reward: [300, 500] }, { tier: 'Beginner', type: 'backend', weight: 0.25, reward: [300, 500] }, { tier: 'Beginner', type: 'ai', weight: 0.15, reward: [400, 600] }, { tier: 'Beginner', type: 'devops', weight: 0.15, reward: [400, 600] }, { tier: 'Beginner', type: 'mobile', weight: 0.15, reward: [400, 600] }] : [{ tier: 'Easy', type: 'frontend', weight: 0.4, req: { frontend: 4, design: 4 }, reward: [300, 700] }, { tier: 'Medium', type: 'backend', weight: 0.4, req: { backend: 12, coding: 8 }, reward: [1000, 2500] }, { tier: 'Hard', type: 'ai', weight: 0.2, req: { ai: 15, backend: 10, coding: 12 }, reward: [4000, 9000] }]
        const gen = (a, i) => { const type = a.type || 'frontend'; const pool = BEGINNER_PROJECTS[type]; const projectMeta = isB ? pool[Math.floor(Math.random() * pool.length)] : { id: 'generic_' + type, req: a.req }; const r = Math.floor(Math.random() * (a.reward[1] - a.reward[0])) + a.reward[0]; const p = Math.floor(r * 0.3); const rg = isB ? 5 : 10; const d = isB ? 48 : 72; const c = cos[Math.floor(Math.random() * cos.length)]; const title = c + ': ' + get().t('contracts.' + projectMeta.id + '.title'); return { id: 'c-' + Date.now() + '-' + i, type, title, company: c, description: get().t('contracts.' + projectMeta.id + '.desc'), difficulty: a.tier, reward: r, penalty: p, repGain: rg, repLoss: Math.floor(rg * 1.5), deadline: d, remaining: d, client: 'Startup Founder', status: 'available', risk: isB ? 'Low' : 'Medium', progress: 0, req: projectMeta.req, quality: 100, bugs: 0, conditions: [] } }
        const nC = []; for (let j = 0; j < 3; j++) { const roll = Math.random(); let cumulativeWeight = 0; let sel = archs[0]; for (const a of archs) { cumulativeWeight += a.weight; if (roll < cumulativeWeight) { sel = a; break } }; nC.push(gen(sel, j)) }
        set({ availableContracts: nC })
      },

      applyForContract: (c) => { set({ pendingApplication: { contract: { ...c, status: 'interview' }, status: 'waiting', delay: Math.floor(Math.random() * 3) + 2 }, selectedContract: null, lastSaved: Date.now() }); get().addLog('SENDING CV...') },
      resolveContractApplication: () => { set({ pendingApplication: { ...get().pendingApplication, status: 'interview' } }); get().addLog('Interview requested.') },
      acceptContract: (c) => { set((s) => ({ activeContract: { ...c, progress: 0, status: 'active', conditions: [] }, availableContracts: s.availableContracts.filter(x => x.id !== c.id), pendingApplication: null, conditionTimers: {}, lastSaved: Date.now() })); get().addLog('Project active.') },
      rejectPending: () => set({ pendingApplication: null, lastSaved: Date.now() }),

      handleContractSuccess: () => {
        const state = get(); const contract = state.activeContract; get().distributeProjectExp(contract)
        const templates = REVIEW_TEMPLATES.success; let tier = 'perfect'
        if (contract.conditions?.includes('tech_debt') || contract.conditions?.includes('scope_creep')) tier = 'good'
        if ((contract.conditions?.length || 0) >= 2 || contract.remaining < 5) tier = 'crunchy'
        const template = templates[tier]; const message = template.messages[state.language][Math.floor(Math.random() * template.messages[state.language].length)]
        set((s) => ({ player: { ...s.player, money: s.player.money + contract.reward, reputation: s.player.reputation + contract.repGain }, activeContract: null, portfolio: [...s.portfolio, { ...contract, status: 'completed', result: 'success' }], activeReview: { company: contract.company, stars: template.stars, message, reward: contract.reward, reputation: contract.repGain }, conditionTimers: {}, gameTime: { ...s.gameTime, isPaused: true }, lastSaved: Date.now() }))
        get().addLog('SUCCESS: Project delivered.')
        get().updateDebtState();
      },

      handleContractFailure: () => {
        const state = get(); const contract = state.activeContract; const template = REVIEW_TEMPLATES.failure.standard
        const message = template.messages[state.language][Math.floor(Math.random() * template.messages[state.language].length)]
        set((s) => ({ player: { ...s.player, money: s.player.money - contract.penalty, reputation: Math.max(0, s.player.reputation - contract.repLoss), mood: Math.max(0, s.player.mood - 10) }, portfolio: [...s.portfolio, { ...contract, status: 'failed', result: 'fail' }], activeContract: null, activeReview: { company: contract.company, stars: 1, message, penalty: contract.penalty, repLoss: contract.repLoss, isFailure: true }, currentTask: null, conditionTimers: {}, gameTime: { ...s.gameTime, isPaused: true }, lastSaved: Date.now() }))
        get().addLog('FAILURE: Project failed.')
        get().updateDebtState();
      },

      startTask: (t) => { if (get().currentTask) return; if (get().player.energy < (t.energyCost || 0)) return; if (t.cost && get().player.money < t.cost && t.type !== 'rest') return; set((s) => ({ player: { ...s.player, money: s.player.money - (t.cost || 0) }, currentTask: { ...t, remaining: t.duration }, lastSaved: Date.now() })); get().addLog('Started: ' + t.name); get().updateDebtState() },
      tickTask: () => { set((s) => { const r = s.currentTask.remaining - 1; if (r <= 0) return { nextTickComplete: true }; return { currentTask: { ...s.currentTask, remaining: r } } }); if (get().nextTickComplete) { const t = get().currentTask; get().completeTask(t); set({ currentTask: null, nextTickComplete: false }) } },
      completeTask: (t) => {
        set((s) => {
          let rM = 1; s.activeContract?.conditions?.forEach(cId => { const c = PROJECT_CONDITIONS[cId]; if (c?.effects?.recoveryEfficiency) rM *= c.effects.recoveryEfficiency })
          const nP = { ...s.player, energy: Math.max(0, s.player.energy - (t.energyCost || 0)) }
          if (t.type === 'rest') { nP.energy = Math.min(100, nP.energy + (40 * rM)); nP.focus = Math.min(100, nP.focus + (30 * rM)) }
          if (['coffee', 'smoke', 'energyDrink'].includes(t.type)) {
            const stats = get().getStimulantStats(t.type); const abs = (s.gameTime.day * 24) + s.gameTime.hour
            if (t.type === 'coffee') { nP.energy = Math.min(100, nP.energy + (20 * stats.efficiency)); get().addProjectCondition('caffeine_rush', 4) }
            if (t.type === 'smoke') { nP.focus = Math.min(100, nP.focus + (15 * stats.efficiency)); get().addProjectCondition('nicotine_focus', 6) }
            if (t.type === 'energyDrink') { nP.energy = Math.min(100, nP.energy + (40 * stats.efficiency)); get().addProjectCondition('overclocked', 5) }
            const nH = [...s.stimulantHistory, { type: t.type, absTime: abs }]; const nC = { ...s.stimulantCooldowns, [t.type]: t.cooldown || 2 }
            if (nH.length >= 5) get().addProjectCondition('anxiety', 16); else if (nH.length >= 3) get().addProjectCondition('overstimulated', 12)
            return { player: nP, stimulantHistory: nH, stimulantCooldowns: nC }
          }
          return { player: nP, lastSaved: Date.now() }
        }); get().addLog('Finished: ' + t.name)
      },
      checkLosingConditions: () => { const p = get().player; const s = get(); if (s.debtDays >= 14) set({ isGameOver: true, gameOverReason: 'Bankruptcy' }); else if (p.energy <= 0) set({ isGameOver: true, gameOverReason: 'Collapse' }) }
    }),
    {
      name: 'burnout-inc-career',
      version: 4,
      partialize: (state) => ({
        player: state.player,
        techStack: state.techStack,
        gameTime: state.gameTime,
        humanTick: state.humanTick,
        language: state.language,
        availableContracts: state.availableContracts,
        activeContract: state.activeContract,
        pendingApplication: state.pendingApplication,
        portfolio: state.portfolio,
        logs: state.logs,
        conditionTimers: state.conditionTimers,
        stimulantHistory: state.stimulantHistory,
        stimulantCooldowns: state.stimulantCooldowns,
        nextBillDay: state.nextBillDay,
        pendingBills: state.pendingBills,
        overdueBills: state.overdueBills,
        lastUnexpectedExpenseDay: state.lastUnexpectedExpenseDay,
        lastDeviceIssueDay: state.lastDeviceIssueDay,
        deviceIssues: state.deviceIssues,
        debtDays: state.debtDays,
        debtSeverity: state.debtSeverity,
        saveVersion: state.saveVersion,
        lastSaved: state.lastSaved
      })
    }
  )
)

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
  nextBillDay: 8,
  pendingBills: {},
  overdueBills: null,
  activePaymentModal: false,
  lastUnexpectedExpenseDay: 0,
  lastDeviceIssueDay: 0,
  activeUnexpectedExpense: null,
  deviceIssues: [], 
  debtDays: 0,
  debtSeverity: 'none', 
  eventQueue: [], 
  lastMajorIncidentDay: 0,
  saveVersion: 5, 
  lastSaved: null,
  hasStarted: false,
  currentTask: null,
  activeEffects: [],
}

export const useGameStore = create(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      // --- HELPERS ---
      t: (path) => {
        const keys = path.split('.')
        let result = locales[get().language]
        for (const key of keys) { if (!result || result[key] === undefined) return path; result = result[key] }
        return result
      },
      fCurrency: (amount) => formatCurrency(amount, get().language),
      addLog: (message) => set((state) => ({ logs: [message, ...state.logs].slice(0, 50) })),

      // --- CALCULATORS & STATUS ---
      getExpForLevel: (level) => Math.floor(100 * Math.pow(1.15, level - 1)),
      getCareerTitle: (level) => {
        if (level >= 100) return get().t('career.titles.lv100');
        if (level >= 90) return get().t('career.titles.lv90');
        if (level >= 80) return get().t('career.titles.lv80');
        if (level >= 70) return get().t('career.titles.lv70');
        if (level >= 60) return get().t('career.titles.lv60');
        if (level >= 50) return get().t('career.titles.lv50');
        if (level >= 40) return get().t('career.titles.lv40');
        if (level >= 30) return get().t('career.titles.lv30');
        if (level >= 20) return get().t('career.titles.lv20');
        if (level >= 10) return get().t('career.titles.lv10');
        if (level >= 5) return get().t('career.titles.lv5');
        return get().t('career.titles.lv1');
      },
      getMaxFocus: () => {
        let p = 0;
        get().deviceIssues.forEach(i => { p += i.penalty });
        if (get().debtSeverity === 'critical') p += 15;
        return Math.max(20, 100 - p);
      },
      getSurvivalStatus: () => {
        const { energy, mood } = get().player;
        const { debtSeverity } = get();
        const hasCrit = get().deviceIssues.some(i => i.penalty >= 30);
        if (get().isGameOver) return 'DECEASED';
        if (energy < 20 || debtSeverity === 'critical' || hasCrit) return 'CRITICAL';
        if (energy < 40 || debtSeverity === 'medium' || mood < 40) return 'RISKY';
        if (energy < 60 || debtSeverity === 'small' || (get().activeContract && get().activeContract.remaining < 12)) return 'UNSTABLE';
        return 'STABLE';
      },
      getMatchEfficiency: (contract) => {
        if (!contract || !contract.req) return 1
        const cap = { ...Object.fromEntries(Object.entries(get().player.skills).map(([k, v]) => [k, v.level])), ...Object.fromEntries(Object.entries(get().techStack).map(([k, v]) => [k, v.level])) }
        const reqs = Object.entries(contract.req)
        if (reqs.length === 0) return 1
        let ratio = 0
        reqs.forEach(([s, v]) => { ratio += Math.min(1.2, (cap[s] || 0) / Math.max(1, v)) })
        let eff = ratio / reqs.length;
        get().activeEffects.forEach(e => {
          const meta = PROJECT_CONDITIONS[e.id];
          if (meta?.effects?.progressMult) eff *= meta.effects.progressMult;
          if (meta?.effects?.efficiencyPenalty) eff -= meta.effects.efficiencyPenalty;
        });
        if (contract.conditions?.includes('tech_debt')) eff -= PROJECT_CONDITIONS.tech_debt.effects.efficiencyPenalty
        return Math.max(0.1, eff)
      },
      getStimulantStats: (type) => {
        const hist = get().stimulantHistory.filter(h => h.type === type)
        const map = [1, 0.6, 0.3, 0.1];
        const eff = map[Math.min(hist.length, map.length - 1)]
        return { count: hist.length, efficiency: eff, totalCount: get().stimulantHistory.length }
      },

      // --- INTERNAL SYSTEM LOGIC ---
      updateDebtState: () => {
        set((s) => {
          const m = s.player.money; let sev = 'none'; let dD = s.debtDays; const nP = { ...s.player };
          if (m < -5000) { sev = 'critical'; dD += 1; nP.reputation = Math.max(0, nP.reputation - 2); nP.mood = Math.max(0, nP.mood - 5); } 
          else if (m < -1000) { sev = 'medium'; dD = 0; nP.mood = Math.max(0, nP.mood - 2); } 
          else if (m < 0) { sev = 'small'; dD = 0; nP.mood = Math.max(0, nP.mood - 1); } 
          else { dD = 0; }
          return { debtSeverity: sev, debtDays: dD, player: nP };
        });
      },
      checkDeviceEscalation: () => {
        const { day } = get().gameTime;
        const updated = get().deviceIssues.map(issue => {
          const m = DEVICE_ISSUES[issue.id];
          if (!m || !m.escalation) return issue;
          let curP = m.baseFocusPenalty;
          m.escalation.forEach(e => { if (day - issue.startDay >= e.day) curP = e.penalty });
          if (curP !== issue.penalty) get().addLog('MAINTENANCE: ' + m.name[get().language] + ' worsening.');
          return { ...issue, penalty: curP };
        });
        set({ deviceIssues: updated });
      },
      refreshContractBoard: () => {
        if (get().activeContract || get().pendingApplication) return
        const cos = ['NeonForge Studio', 'QuantumStack Labs', 'PixelCraft Agency', 'AIFlow Systems', 'NextByte Solutions', 'CloudSprint', 'HyperNest', 'MonoPixel'];
        const isB = get().player.careerLevel <= 10;
        const archs = isB ? [{ tier: 'Beginner', type: 'frontend', weight: 0.30, reward: [300, 500] }, { tier: 'Beginner', type: 'backend', weight: 0.25, reward: [300, 500] }, { tier: 'Beginner', type: 'ai', weight: 0.15, reward: [400, 600] }, { tier: 'Beginner', type: 'devops', weight: 0.15, reward: [400, 600] }, { tier: 'Beginner', type: 'mobile', weight: 0.15, reward: [400, 600] }] : [{ tier: 'Easy', type: 'frontend', weight: 0.4, req: { frontend: 4, design: 4 }, reward: [300, 700] }, { tier: 'Medium', type: 'backend', weight: 0.4, req: { backend: 12, coding: 8 }, reward: [1000, 2500] }, { tier: 'Hard', type: 'ai', weight: 0.2, req: { ai: 15, backend: 10, coding: 12 }, reward: [4000, 9000] }]
        const gen = (a, i) => {
          const type = a.type || 'frontend'; const pool = BEGINNER_PROJECTS[type]; const meta = isB ? pool[Math.floor(Math.random() * pool.length)] : { id: 'generic_' + type, req: a.req }; const r = Math.floor(Math.random() * (a.reward[1] - a.reward[0])) + a.reward[0]; const c = cos[Math.floor(Math.random() * cos.length)];
          return { id: 'c-' + Date.now() + '-' + i, type, title: c + ': ' + get().t('contracts.' + meta.id + '.title'), company: c, description: get().t('contracts.' + meta.id + '.desc'), difficulty: a.tier, reward: r, penalty: Math.floor(r * 0.3), repGain: isB ? 5 : 10, repLoss: isB ? 8 : 15, deadline: isB ? 48 : 72, remaining: isB ? 48 : 72, client: 'Startup Founder', status: 'available', risk: isB ? 'Low' : 'Medium', progress: 0, req: meta.req, quality: 100, bugs: 0, conditions: [] }
        }
        const nC = []; for (let j = 0; j < 3; j++) { const roll = Math.random(); let cw = 0; let sel = archs[0]; for (const a of archs) { cw += a.weight; if (roll < cw) { sel = a; break } }; nC.push(gen(sel, j)) }
        set({ availableContracts: nC })
      },
      handleNewDay: () => {
        set((s) => ({ player: { ...s.player, money: s.player.money - 40 }, lastSaved: Date.now() }));
        get().addLog('Daily Expenses: -' + get().fCurrency(40));
        get().refreshContractBoard();
      },

      // --- LIFE CYCLE ACTIONS ---
      startNewCareer: () => {
        const s = { ...INITIAL_STATE, hasStarted: true, lastSaved: Date.now() };
        s.pendingBills = getScaledBills(1);
        set(s);
      },
      continueCareer: () => {
        const shouldPause = get().eventQueue.length > 0 || get().isGameOver;
        set({ hasStarted: true, gameTime: { ...get().gameTime, isPaused: shouldPause } });
        get().addLog('Career Restored.');
      },
      restartGame: () => set({ ...INITIAL_STATE, hasStarted: true, pendingBills: getScaledBills(1) }),

      // --- EVENT ACTIONS ---
      pushEvent: (event) => set((s) => {
        const newQueue = [...s.eventQueue, event].sort((a, b) => b.priority - a.priority);
        return { eventQueue: newQueue, gameTime: { ...s.gameTime, isPaused: true } };
      }),
      popEvent: () => set((s) => {
        const newQueue = s.eventQueue.slice(1);
        const shouldBePaused = newQueue.length > 0 || get().isGameOver;
        return { eventQueue: newQueue, gameTime: { ...s.gameTime, isPaused: shouldBePaused } };
      }),
      dismissLevelUp: () => {
        set((s) => ({ levelUpQueue: s.levelUpQueue.slice(1) }));
        if (get().levelUpQueue.length === 0) get().popEvent();
      },
      dismissReview: () => { set({ activeReview: null }); get().popEvent(); },

      // --- GAMEPLAY ACTIONS ---
      selectContract: (contract) => set({ selectedContract: contract }),
      clearSelectedContract: () => set({ selectedContract: null }),
      applyForContract: (c) => {
        set({ pendingApplication: { contract: { ...c, status: 'interview' }, status: 'waiting', delay: Math.floor(Math.random() * 3) + 2 }, selectedContract: null, lastSaved: Date.now() });
        get().addLog('CV SENT.');
      },
      acceptContract: (c) => {
        set((s) => ({ activeContract: { ...c, progress: 0, status: 'active', conditions: [] }, availableContracts: s.availableContracts.filter(x => x.id !== c.id), pendingApplication: null, conditionTimers: {}, lastSaved: Date.now() }));
        if (get().eventQueue[0]?.type === 'interview') get().popEvent();
      },
      rejectPending: () => {
        set({ pendingApplication: null, lastSaved: Date.now() });
        if (get().eventQueue[0]?.type === 'interview') get().popEvent();
      },
      payBills: () => {
        const total = Object.values(get().pendingBills).reduce((a, b) => a + b, 0);
        const can = get().player.money >= total;
        set((s) => {
          const newMoney = s.player.money - total;
          const upd = { player: { ...s.player, money: newMoney }, nextBillDay: s.gameTime.day + 7, pendingBills: getScaledBills(s.player.careerLevel), activePaymentModal: false, gameTime: { ...s.gameTime, isPaused: false }, lastSaved: Date.now() };
          if (!can) { upd.player.reputation = Math.max(0, s.player.reputation - 15); upd.player.mood = Math.max(0, s.player.mood - 10); get().addLog('CRITICAL: Debt increased.'); get().addProjectCondition('burnout_risk', 48); } 
          else { get().addLog('ECONOMY: Bills paid.'); }
          return upd;
        });
        get().updateDebtState();
        get().popEvent();
      },
      repairDevice: (id) => {
        const m = DEVICE_ISSUES[id];
        if (get().player.money < m.repairCost) { get().addLog('Critical: No capital.'); return; }
        set((s) => ({ player: { ...s.player, money: s.player.money - m.repairCost }, deviceIssues: s.deviceIssues.filter(i => i.id !== id), lastSaved: Date.now() }));
        get().addLog('SUCCESS: Repaired.');
        get().updateDebtState();
      },
      startTask: (t) => {
        if (get().currentTask) {
          get().addLog('SYSTEM: Process already active.');
          return;
        }
        
                
        set((s) => {
          const nP = { ...s.player };
          const nG = { ...s.gameTime, isPaused: false };
          const nC = { ...s.stimulantCooldowns };
          
          // Immediate Costs
          nP.money -= (t.cost || 0);
          
          if (t.cooldown) nC[t.id] = t.cooldown;

          // Part 4, 5, 6: Immediate Stimulant Effects
          if (t.type === 'coffee') {
             nP.energy = Math.min(100, nP.energy + 10); // Partial immediate
             get().addLog('PROTOCOL: Coffee consumed. Pulse rising.');
          }
          if (t.type === 'smoke') {
             nP.focus = Math.min(100, nP.focus + 5); // Partial immediate
             get().addLog('PROTOCOL: Nicotine boost active.');
          }
          if (t.type === 'energyDrink') {
             nP.energy = Math.min(100, nP.energy + 20); // Partial immediate
             get().addLog('PROTOCOL: Adrenaline surge detected.');
          }

          return { 
            player: nP, 
            currentTask: { ...t, remaining: t.duration }, 
            gameTime: nG, 
            stimulantCooldowns: nC,
            lastSaved: Date.now() 
          };
        });
        
        get().updateDebtState();
      }, 
      // --- ENGINE TICK ---
      tickTime: () => {
                if (get().isGameOver || get().eventQueue.length > 0) return
        let { hour, day } = get().gameTime; hour += 1;
        const cds = { ...get().stimulantCooldowns };
        let hasCd = false;
        Object.keys(cds).forEach(k => { if (cds[k] > 0) { cds[k] -= 1; hasCd = true; } });
        if (hasCd) set({ stimulantCooldowns: cds });
        const effects = [...get().activeEffects];
        let effChanged = false;
        const nextEffects = [];
        effects.forEach(eff => {
          if (eff.remaining > 1) {
            nextEffects.push({ ...eff, remaining: eff.remaining - 1 });
          } else {
            effChanged = true;
            const meta = PROJECT_CONDITIONS[eff.id];
            get().addLog('EFFECT EXPIRED: ' + get().t('condition.' + eff.id));
            if (meta?.aftermath) {
              get().addEffect(meta.aftermath, 8); // Standard aftermath duration
            }
          }
        });
        if (effChanged || nextEffects.length !== effects.length) set({ activeEffects: nextEffects });

        if (hour >= 24) { hour = 0; day += 1; get().handleNewDay(); get().checkDeviceEscalation(); get().updateDebtState() }
        if (day === get().nextBillDay && hour === 0) {
          set({ activePaymentModal: true }); get().pushEvent({ type: 'payment', priority: 100 }); return;
        }
        const contract = get().activeContract;
        if (contract && contract.status === 'active') {
          const rem = Number(contract.remaining) - 1;
          if (rem <= 0 && contract.progress < 100) { get().handleContractFailure() } 
          else {
            set((s) => ({ activeContract: { ...s.activeContract, remaining: rem } }));
            get().tickConditionTimers(); get().tickAutoWork();
            const base = 0.035; let m = 1;
            contract.conditions?.forEach(c => { if (PROJECT_CONDITIONS[c]?.effects?.chaosChanceMult) m *= PROJECT_CONDITIONS[c].effects.chaosChanceMult });
            if (day - get().lastMajorIncidentDay < 2) m *= 0.3;
            if (Math.random() < (base * m)) get().triggerChaosEvent();
            get().tickMentalFeedback();
          }
        }
        const daysSinceLast = day - get().lastUnexpectedExpenseDay;
        const daysSinceLastDevice = day - get().lastDeviceIssueDay;
        let eC = 0.005; if (day - get().lastMajorIncidentDay < 3) eC *= 0.2;
        if (daysSinceLast >= 5 && Math.random() < eC) {
          const pool = UNEXPECTED_EXPENSES.filter(e => e.type !== 'device' || (daysSinceLastDevice >= 10 && !get().deviceIssues.find(i => i.id === e.id)));
          if (pool.length > 0) {
            const event = pool[Math.floor(Math.random() * pool.length)];
            set({ activeUnexpectedExpense: event, lastUnexpectedExpenseDay: day, lastMajorIncidentDay: day });
            if (event.type === 'device') set({ lastDeviceIssueDay: day });
            get().pushEvent({ type: 'unexpected_expense', priority: 80 });
          }
        }
        const hTick = get().humanTick + 1;
        if (hTick % 4 === 0) get().tickHumanFatigue();
        const currentAbs = (day * 24) + hour;
        const newHist = get().stimulantHistory.filter(h => (currentAbs - h.absTime) < 18);
        if (get().pendingApplication && get().pendingApplication.status === 'waiting') {
          const d = get().pendingApplication.delay - 1;
          if (d <= 0) get().resolveContractApplication(); else set((s) => ({ pendingApplication: { ...s.pendingApplication, delay: d } }));
        }
        if (hour % 12 === 0) set({ lastSaved: Date.now() });
        set({ gameTime: { ...get().gameTime, hour, day }, humanTick: hTick, stimulantHistory: newHist });
        if (get().currentTask) get().tickTask();
        get().checkLosingConditions();
      },

      // --- SUB-SYSTEMS ---
      addCareerExp: (amount) => {
        let { careerLevel, careerExp } = get().player; careerExp += amount; let up = false; const notify = [];
        while (careerExp >= get().getExpForLevel(careerLevel)) { careerExp -= get().getExpForLevel(careerLevel); careerLevel++; up = true; notify.push({ type: 'career', level: careerLevel, title: get().getCareerTitle(careerLevel) }); set({ pendingBills: getScaledBills(careerLevel) }); }
        if (up) { get().addLog('CAREER UP: ' + careerLevel); get().pushEvent({ type: 'level_up', priority: 60 }); set((s) => ({ player: { ...s.player, careerLevel, careerExp }, levelUpQueue: [...s.levelUpQueue, ...notify] })); } else { set((s) => ({ player: { ...s.player, careerLevel, careerExp } })); }
      },
      addSkillExp: (name, amount) => {
        const isT = get().techStack[name] !== undefined; const target = isT ? get().techStack : get().player.skills; const cur = target[name];
        let { level, exp } = cur; exp += amount; let up = false; const notify = [];
        while (exp >= get().getExpForLevel(level)) { exp -= get().getExpForLevel(level); level++; up = true; notify.push({ type: 'skill', name, level }); }
        const upd = { ...cur, level, exp };
        if (up) { get().addLog('SKILL UP: ' + name.toUpperCase()); get().pushEvent({ type: 'level_up', priority: 60 }); if (isT) set((s) => ({ techStack: { ...s.techStack, [name]: upd }, levelUpQueue: [...s.levelUpQueue, ...notify] })); else set((s) => ({ player: { ...s.player, skills: { ...s.player.skills, [name]: upd } }, levelUpQueue: [...s.levelUpQueue, ...notify] })); } 
        else { if (isT) set((s) => ({ techStack: { ...s.techStack, [name]: upd } })); else set((s) => ({ player: { ...s.player, skills: { ...s.player.skills, [name]: upd } } })); }
      },
      distributeProjectExp: (c) => {
        const tot = 50 + (c.reward / 20); const pts = Object.entries(c.req).reduce((acc, e) => acc + e[1], 0)
        Object.entries(c.req).forEach(([s, v]) => { const w = v / pts; const cur = get().techStack[s] || get().player.skills[s]; get().addSkillExp(s, Math.floor(Math.floor(tot * w) * Math.max(1, (v / Math.max(1, cur.level))))) })
        get().addCareerExp(Math.floor(tot / 2))
      },
      tickHumanFatigue: () => {
        const { player, activeContract, debtSeverity } = get(); let eD = 0.5, fD = 0.8;
        get().activeEffects.forEach(e => {
          const meta = PROJECT_CONDITIONS[e.id];
          if (meta?.effects?.energyDrainMult) eD *= meta.effects.energyDrainMult;
          if (meta?.effects?.focusDrainMult) fD *= meta.effects.focusDrainMult;
        }); if (debtSeverity === 'medium') fD *= 1.2; if (debtSeverity === 'critical') { fD *= 1.5; eD *= 1.2 }
        if (activeContract?.status === 'active') { eD += 1.0; fD += 1.2 }
        if (player.energy <= 45 && activeContract?.status !== 'active') eD = 0;
        const mF = get().getMaxFocus(); set((s) => ({ player: { ...s.player, energy: Math.max(0, s.player.energy - eD), focus: Math.max(0, Math.min(mF, s.player.focus - fD)) } }))
      },
      tickMentalFeedback: () => {
        let chance = 0.05; const status = get().getSurvivalStatus(); if (status === 'STABLE') chance = 0.02; if (status === 'CRITICAL') chance = 0.1;
        MENTAL_FEEDBACK_TRIGGERS.forEach(t => { if (t.condition(get()) && Math.random() < (t.chance * (chance / 0.05))) { const msgs = get().t('mental.' + t.id); if (Array.isArray(msgs)) get().addLog('[MIND] ' + msgs[0]) } });
      },

      
      addEffect: (id, duration) => {
        const cond = PROJECT_CONDITIONS[id];
        if (!cond) return;
        set((s) => ({
          activeEffects: [...s.activeEffects.filter(e => e.id !== id), { id, remaining: duration, total: duration }]
        }));
        get().addLog('EFFECT ACTIVE: ' + get().t('condition.' + id));
      },
      addProjectCondition: (id, duration) => {
        set((s) => {
          if (!s.activeContract) return s;
          const nC = { ...s.activeContract };
          if (!nC.conditions) nC.conditions = [];
          if (!nC.conditions.includes(id)) nC.conditions.push(id);
          
          const nT = { ...s.conditionTimers, [id]: duration };
          return { activeContract: nC, conditionTimers: nT };
        });
      },
      removeProjectCondition: (id) => {
        set((s) => {
          if (!s.activeContract) return s;
          const nC = { ...s.activeContract };
          nC.conditions = (nC.conditions || []).filter(c => c !== id);
          
          const nT = { ...s.conditionTimers };
          delete nT[id];
          return { activeContract: nC, conditionTimers: nT };
        });
      },
      tickConditionTimers: () => {
        const timers = { ...get().conditionTimers }; let ch = false;
        Object.entries(timers).forEach(([id, rem]) => { if (rem > 1) { timers[id] = rem - 1 } else { delete timers[id]; get().removeProjectCondition(id) }; ch = true });
        if (ch) set({ conditionTimers: timers });
      },
      tickAutoWork: () => {
        const { activeContract, player } = get(); if (player.energy <= 0) return; const eff = get().getMatchEfficiency(activeContract);
        let exhaustionPenalty = player.energy > 20 ? 1 : 0.3;
        get().activeEffects.forEach(e => {
            const meta = PROJECT_CONDITIONS[e.id];
            if (meta?.effects?.exhaustionSlowdownReduction) {
                exhaustionPenalty = Math.max(exhaustionPenalty, meta.effects.exhaustionSlowdownReduction);
            }
        });
        const gain = 5 * eff * exhaustionPenalty * (player.focus / 100);
        const next = Math.min(100, activeContract.progress + gain); if (next >= 100) get().handleContractSuccess(); else set((s) => ({ activeContract: { ...s.activeContract, progress: next } }))
      },
      tickTask: () => {
        const rem = get().currentTask.remaining - 1; if (rem <= 0) { const t = get().currentTask; get().completeTask(t); set({ currentTask: null }) }
        else set((s) => ({ currentTask: { ...s.currentTask, remaining: rem } }))
      },
      completeTask: (t) => {
        let rM = 1; 
        if (get().debtSeverity === 'medium') rM = 0.8; 
        if (get().debtSeverity === 'critical') rM = 0.6;
        
        const effects = get().activeEffects;
        effects.forEach(e => {
            const meta = PROJECT_CONDITIONS[e.id];
            if (meta?.effects?.recoveryEfficiency) rM *= meta.effects.recoveryEfficiency;
        });

        set((s) => {
          const nP = { ...s.player };
          
          if (t.id === 'rest') { 
            nP.energy = Math.min(100, nP.energy + (40 * rM)); 
            nP.mood = Math.min(100, nP.mood + (10 * rM));
            // Remove burnout_risk if energy is now high
            const nC = s.activeContract ? { ...s.activeContract } : null;
            if (nP.energy > 60 && nC?.conditions?.includes('burnout_risk')) {
                nC.conditions = nC.conditions.filter(c => c !== 'burnout_risk');
            }
            get().addLog('RECOVERY: Nap complete. Energy and Mood restored.');
            return { player: nP, activeContract: nC, lastSaved: Date.now() };
          }

          if (t.id === 'break') {
            nP.focus = Math.min(100, nP.focus + (30 * rM));
            nP.mood = Math.min(100, nP.mood + (5 * rM));
            get().addLog('RECOVERY: Quick break complete. Focus stabilized.');
            return { player: nP, lastSaved: Date.now() };
          }

          if (['coffee', 'smoke', 'energyDrink'].includes(t.type)) {
            const st = get().getStimulantStats(t.type); 
            if (t.type === 'coffee') { 
              nP.energy = Math.min(100, nP.energy + (20 * st.efficiency)); 
              get().addEffect('caffeine_rush', 4);
              get().addLog('STIMULANT: Coffee consumed. Energy up.');
            }
            if (t.type === 'smoke') {
              nP.focus = Math.min(100, nP.focus + (15 * st.efficiency));
              get().addEffect('nicotine_focus', 6);
              get().addLog('STIMULANT: Nicotine buzz. Focus improved.');
            }
            if (t.type === 'energyDrink') {
              nP.energy = Math.min(100, nP.energy + (40 * st.efficiency));
              get().addEffect('overclocked', 5);
              get().addLog('STIMULANT: Energy drink consumed. Adrenaline active.');
            }
            const nH = [...s.stimulantHistory, { type: t.type, absTime: (s.gameTime.day * 24) + s.gameTime.hour }]; 
            return { player: nP, stimulantHistory: nH };
          }
          return { player: nP, lastSaved: Date.now() };
        });
        get().updateDebtState();
      },
      triggerChaosEvent: () => {
        const p = get().activeContract; if (!p) return; const evs = CHAOS_EVENTS.filter(e => (!e.archetype || e.archetype === p.client) && (!e.requirement || e.requirement.type === p.type));
        if (evs.length === 0) return; set({ activeChaosEvent: evs[Math.floor(Math.random() * evs.length)], lastMajorIncidentDay: get().gameTime.day }); get().pushEvent({ type: 'chaos', priority: 80 });
      },
      resolveChaosEvent: (optId) => {
        const ev = get().activeChaosEvent; const opt = ev.options.find(o => o.id === optId); const eff = opt.effect || {}
        set((s) => {
          const nP = { ...s.player }, nC = { ...s.activeContract }, nT = { ...s.techStack };
          if (eff.activeContract === null) return { player: { ...nP, money: nP.money + (eff.money || 0), reputation: Math.max(0, nP.reputation + (eff.reputation || 0)) }, activeContract: null, portfolio: [...s.portfolio, { ...nC, status: 'failed', result: 'fail' }], activeChaosEvent: null, conditionTimers: {}, gameTime: { ...s.gameTime, isPaused: false }, lastSaved: Date.now() }
          if (eff.money) nP.money += eff.money; if (eff.energy) nP.energy = Math.max(0, Math.min(100, nP.energy + eff.energy)); if (eff.focus) nP.focus = Math.max(0, Math.min(100, nP.focus + eff.focus)); if (eff.reputation) nP.reputation += eff.reputation; if (eff.progress) nC.progress = Math.max(0, Math.min(100, nC.progress + eff.progress)); if (eff.reward) nC.reward += eff.reward; if (eff.ai_familiarity) nT.ai.level += eff.ai_familiarity;
          if (eff.addCondition) { if (!nC.conditions) nC.conditions = []; if (!nC.conditions.includes(eff.addCondition)) { nC.conditions.push(eff.addCondition); const m = PROJECT_CONDITIONS[eff.addCondition]; if (m?.duration) s.conditionTimers[eff.addCondition] = m.duration } };
          if (eff.removeCondition) { nC.conditions = (nC.conditions || []).filter(id => id !== eff.removeCondition); delete s.conditionTimers[eff.removeCondition] }
          return { player: nP, activeContract: nC, techStack: nT, activeChaosEvent: null, gameTime: { ...s.gameTime, isPaused: false }, lastSaved: Date.now() }
        }); get().updateDebtState(); get().popEvent();
      },
      resolveUnexpectedExpense: (optId) => {
        const ev = get().activeUnexpectedExpense;
        const opt = ev.options.find(o => o.id === optId);
        const eff = opt.effect || {};
        
        set((s) => {
          const nP = { ...s.player };
          const nD = [...s.deviceIssues];
          const nC = s.activeContract ? { ...s.activeContract } : null;

          nP.money -= (opt.cost || 0);
          if (eff.focus) nP.focus = Math.max(0, Math.min(100, nP.focus + eff.focus));
          if (eff.energy) nP.energy = Math.max(0, Math.min(100, nP.energy + eff.energy));
          if (eff.money) nP.money += eff.money;
          if (eff.progress && nC) nC.progress = Math.max(0, Math.min(100, nC.progress + eff.progress));

          if (opt.isPending && ev.type === 'device') {
            const meta = DEVICE_ISSUES[ev.id];
            if (meta && !nD.find(i => i.id === ev.id)) {
              nD.push({ id: ev.id, startDay: s.gameTime.day, penalty: meta.baseFocusPenalty });
              get().addLog('SYSTEM: ' + meta.name[get().language] + ' ignored. Focus cap reduced.');
            }
          }

          return { 
            player: nP, 
            deviceIssues: nD, 
            activeContract: nC,
            activeUnexpectedExpense: null, 
            gameTime: { ...s.gameTime, isPaused: false },
            lastSaved: Date.now()
          };
        });
        get().updateDebtState();
        get().popEvent();
      },

      resolveContractApplication: () => { set({ pendingApplication: { ...get().pendingApplication, status: 'interview' } }); get().pushEvent({ type: 'interview', priority: 50 }); },
      handleContractSuccess: () => {
        const c = get().activeContract; get().distributeProjectExp(c); const tmpl = REVIEW_TEMPLATES.success; let t = 'perfect'; if (c.conditions?.includes('tech_debt') || c.conditions?.includes('scope_creep')) t = 'good'; if ((c.conditions?.length || 0) >= 2 || c.remaining < 5) t = 'crunchy';
        const m = tmpl[t].messages[get().language][0]; set((s) => ({ player: { ...s.player, money: s.player.money + c.reward, reputation: s.player.reputation + c.repGain }, activeContract: null, portfolio: [...s.portfolio, { ...c, status: 'completed', result: 'success' }], activeReview: { company: c.company, stars: tmpl[t].stars, message: m, reward: c.reward, reputation: c.repGain }, lastSaved: Date.now() })); get().updateDebtState(); get().pushEvent({ type: 'review', priority: 50 });
      },
      handleContractFailure: () => {
        const c = get().activeContract; const m = REVIEW_TEMPLATES.failure.standard.messages[get().language][0]; set((s) => ({ player: { ...s.player, money: s.player.money - c.penalty, reputation: Math.max(0, s.player.reputation - c.repLoss), mood: Math.max(0, s.player.mood - 10) }, portfolio: [...s.portfolio, { ...c, status: 'failed', result: 'fail' }], activeContract: null, activeReview: { company: c.company, stars: 1, message: m, penalty: c.penalty, repLoss: c.repLoss, isFailure: true }, lastSaved: Date.now() })); get().updateDebtState(); get().pushEvent({ type: 'review', priority: 50 });
      },
      setLanguage: (lang) => set({ language: lang }),
      setSpeed: (speed) => set((state) => ({ gameTime: { ...state.gameTime, speed } })),
      togglePause: () => set((state) => ({ gameTime: { ...state.gameTime, isPaused: !state.gameTime.isPaused } })),
      checkLosingConditions: () => { if (get().debtDays >= 14 || get().player.money <= -625) set({ isGameOver: true, gameOverReason: 'Bankruptcy' }); else if (get().player.energy <= 0) set({ isGameOver: true, gameOverReason: 'Collapse' }) }
    }),
    {
      name: 'burnout-inc-career',
      version: 5,
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
        eventQueue: state.eventQueue,
        lastMajorIncidentDay: state.lastMajorIncidentDay,
        activeChaosEvent: state.activeChaosEvent,
        activeReview: state.activeReview,
        activeUnexpectedExpense: state.activeUnexpectedExpense,
        levelUpQueue: state.levelUpQueue,
        activePaymentModal: state.activePaymentModal,
        saveVersion: state.saveVersion,
        lastSaved: state.lastSaved,
        currentTask: state.currentTask,
        activeEffects: state.activeEffects
      })
    }
  )
)

export const en = {
  common: {
    day: "Day",
    hour: "Hour",
    capital: "Capital",
    reputation: "Reputation",
    energy: "Energy",
    focus: "Focus",
    resume: "Resume",
    pause: "Pause",
    save: "Save",
    cancel: "Cancel",
    dismiss: "Dismiss",
    select: "Select",
    risk: "Risk",
    deadline: "Deadline",
    status: "Status",
    progress: "Progress",
    total: "Total",
    confirm: "Confirm",
    pay: "Pay",
  },
  dashboard: {
    title: "BURNOUT INC.",
    subtitle: "System_Phase_02 // freelance_survival_simulation",
    status: "Founder Status",
    techStack: "Tech Familiarity",
    portfolio: "Portfolio",
    resumeEmpty: "Resume Empty",
    activeProcess: "Active Process",
    remaining: "Remaining",
    taskCompletion: "Task Completion",
    executionIdle: "Execution Idle",
    idleDesc: "Select a contract from the board to begin.",
    availableGigs: "Available Gigs",
    reqNotMet: "Requirements not met",
    systemRecovery: "System Recovery",
    restDesc: "6h rest cycle to restore vitals",
    match: "Match",
    requirements: "Requirements",
    operationalProtocol: "Operational Protocol",
    recovery: "Recovery",
    boosters: "Stimulants",
    skills: "Methodology",
    upcomingBills: "Upcoming Weekly Bills",
    dueIn: "Due in {days} Days",
    dueTonight: "Due Tonight",
    dueToday: "Due Today",
    overdue: "OVERDUE",
  },
  career: {
    promotion: "Career Promotion",
    promotionDesc: "Your professional status has grown. New high-tier opportunities await.",
    skillUp: "Technical Mastery",
    skillUpDesc: "Your efficiency in this domain has improved. Base speed increased.",
    titles: {
      lv1: "Fresh Graduate",
      lv5: "Freelance Beginner",
      lv10: "Junior Developer",
      lv20: "Reliable Freelancer",
      lv30: "Startup Contractor",
      lv40: "Senior Specialist",
      lv50: "Top Rated Expert",
      lv60: "Indie Hacker",
      lv70: "Tech Consultant",
      lv80: "Studio Founder",
      lv90: "Industry Veteran",
      lv100: "Legendary Indie Hacker",
    }
  },
  contracts: {
    portfolio_landing: { title: "Portfolio Landing Page", desc: "A simple, clean landing page for a creative professional." },
    ui_redesign: { title: "UI Redesign", desc: "Update the look and feel of an existing dashboard." },
    dashboard_styling: { title: "Dashboard Styling", desc: "Apply modern CSS to a data-heavy internal tool." },
    basic_rest_api: { title: "Basic REST API", desc: "Build a simple API with a few endpoints for a mobile app." },
    auth_setup: { title: "Authentication Setup", desc: "Implement login and registration logic for a small portal." },
    crud_system: { title: "CRUD System", desc: "Create a basic Create-Read-Update-Delete interface for data management." },
    prompt_template: { title: "Prompt Template Tool", desc: "A helper tool to manage and version LLM prompt templates." },
    chat_widget: { title: "AI Chat Widget", desc: "Integrate a simple AI chat interface into an existing site." },
    content_gen_mvp: { title: "Content Generator MVP", desc: "Build a minimum viable product for AI-driven blog drafting." },
    vps_deploy: { title: "VPS Deployment", desc: "Deploy a small application to a Linux server." },
    docker_setup: { title: "Docker Setup", desc: "Containerize a local development environment." },
    cicd_fix: { title: "CI/CD Fix", desc: "Repair a broken automated deployment pipeline." },
    expo_prototype: { title: "Expo App Prototype", desc: "Create a basic functional prototype using React Native Expo." },
    push_notif_setup: { title: "Push Notification Setup", desc: "Implement basic push notifications for a starter app." },
    mobile_ui_fix: { title: "Mobile UI Fix", desc: "Adjust layout issues on various mobile screen sizes." },
    generic_frontend: { title: "Frontend Project", desc: "Technical implementation of a web interface." },
    generic_backend: { title: "Backend Project", desc: "Server-side logic and database integration." },
    generic_ai: { title: "AI Project", desc: "Integration of artificial intelligence or machine learning." },
  },
  freelance: {
    board: "Freelance Board",
    refresh: "Refresh",
    activeContract: "Active Contract",
    executeWork: "Execute Work (4h)",
    waiting: "Waiting for response...",
    rejected: "Your application was rejected.",
    interviewing: "Interview in progress...",
    success: "SUCCESS: Delivered {title}. Paid {reward}.",
    failure: "CRITICAL FAILURE: {title}. {reason} Reputation decreased.",
    deadlineCritical: "DEADLINE CRITICAL",
    projectFailed: "PROJECT FAILED",
    delayFeedback: "Client disappointed with delivery delay.",
    working: "Working...",
    exhausted: "Exhausted",
    pacing: "Pacing...",
    efficiency: "Efficiency",
    conditions: "Project Conditions",
    sendCV: "Send CV",
    penalty: "Penalty",
    brief: "Project Brief",
    successReward: "Success Rewards",
    failureConsequence: "Failure Consequences",
    reviewing: "Reviewing history...",
  },
  eval: {
    perfect: "Excellent Fit",
    good: "Acceptable Match",
    risky: "Risky Contract",
    disaster: "Dangerous Match",
  },
  actions: {
    takeNap: "Take Nap",
    takeNapDesc: "4h light sleep to restore Energy",
    drinkCoffee: "Drink Coffee",
    drinkCoffeeDesc: "Instant Energy boost, Focus penalty later",
    takeBreak: "Take Quick Break",
    takeBreakDesc: "2h break to restore Focus",
    allNighter: "Pull All Nighter",
    allNighterDesc: "8h heavy grind, severe tomorrow penalty",
    smoke: "Smoke While Coding",
    smokeDesc: "Temporary speed & focus, Energy drain later",
    energyDrink: "Energy Drink",
    energyDrinkDesc: "Aggressive speed, Insomnia risk",
  },
  interview: {
    title: "Live Interview",
    connected: "Connected (VoIP)",
    evaluating: "Evaluating Fit...",
    scenario: "Scenario",
    failMsg: "Interview Failed: Client went with someone else.",
    successMsg: "Interview Success: You impressed the client.",
    culturalFitFail: "Client thought you werent a cultural fit.",
    questions: {
      startup_deadline: {
        question: "We need the MVP by tomorrow morning. Can you pull it off?",
        options: {
          a: "Grind never stops. I'm on it.",
          b: "I need to review the scope for risks.",
          c: "If we simplify features, maybe."
        }
      },
      ai_hype: {
        question: "How do you feel about adding 'AI-powered' to our marketing copy?",
        options: {
          a: "Disruptive. Let's automate everything.",
          b: "Is it actually using AI though?",
          c: "Sure, if it helps the brand."
        }
      },
      no_budget: {
        question: "We don't have a budget right now, but we have massive 'passion'.",
        options: {
          a: "Passion doesn't pay my coffee bills.",
          b: "I love the vision. I'm flexible.",
          c: "Let's build a viral demo and find VCs."
        }
      },
      server_crash: {
        question: "The server crashed. What is your first priority?",
        options: {
          a: "Post a cool 'we are scaling' tweet.",
          b: "Follow the emergency recovery protocol.",
          c: "Fix it fast, documentation later."
        }
      },
      scope_creep: {
        question: "Can we also add mobile support by Friday?",
        options: {
          a: "No problem, coffee solves everything.",
          b: "We need a formal change request.",
          c: "Let's see what we can fit in."
        }
      }
    },
    feedback: {
      aggressive: "Client loved your startup energy.",
      stable: "Client was impressed by your professionalism.",
      flexible: "Client appreciated your empathy.",
      hype: "Client is hyped for your automation vision.",
      neutral: "Client felt the vibe was slightly off."
    }
  },
  chaos: {
    title: "Project Incident",
    urgent: "URGENT",
    minor: "Minor Notice",
    moderate: "Warning",
    major: "Critical Crisis",
    progress_update: {
      title: "Status Update Requested",
      desc: "The client wants a quick update on current progress. It breaks your concentration.",
      options: {
        reply: "Send detailed reply",
        ignore: "Ignore for now"
      }
    },
    unclear_feedback: {
      title: "Vague Feedback",
      desc: "Client sent a message: 'Make it more professional'. You are not sure what that means.",
      options: {
        ask: "Ask for clarification",
        guess: "Guess and implement"
      }
    },
    scope_creep_ui: {
      title: "Sudden Scope Creep",
      desc: "The client wants dark mode support before the next milestone. It wasn't in the contract.",
      options: {
        accept: "Accept Immediately",
        negotiate: "Negotiate for Extra Pay",
        reject: "Politely Decline"
      }
    },
    architecture_review: {
      title: "Security Audit",
      desc: "The Enterprise security team wants a full architecture review and documentation update.",
      options: {
        do_it: "Do it manually",
        delegate: "Pay an expert to help"
      }
    },
    production_failure: {
      title: "Production Down",
      desc: "Critical system failure detected in production. Users are complaining on social media.",
      options: {
        fix_it: "Fix immediately (Emergency)",
        blame: "Blame third-party provider"
      }
    },
    angry_escalation: {
      title: "Angry Client DM",
      desc: "The client is furious about the latest delay and is threatening to cancel the contract.",
      options: {
        apologize: "Apologize and over-deliver",
        fire_client: "Fire the client (Severe Penalty)"
      }
    },
    frontend_revision: {
        title: "Client Revision",
        desc: "The client wants the button to be a slightly darker shade of blue.",
        options: { fix: "Change color", negotiate: "Explain brand guidelines" }
    },
    backend_auth_break: {
        title: "Auth Breakdown",
        desc: "Authentication system is rejecting valid tokens randomly.",
        options: { debug: "Debug logic", revert: "Revert to stable version" }
    },
    ai_hallucination: {
        title: "Model Hallucination",
        desc: "AI is starting to invent facts about the product.",
        options: { retrain: "Adjust prompts", ignore: "Ship it as features" }
    },
    devops_container_fail: {
        title: "Container Panic",
        desc: "Docker container is failing to restart after update.",
        options: { restart: "Kill and restart", rebuild: "Rebuild image" }
    }
  },
  condition: {
    scope_creep: "Scope Creep",
    tech_debt: "Technical Debt",
    client_distrust: "Client Distrust",
    crunch_mode: "Crunch Mode",
    flow_state: "Flow State",
    burnout_risk: "Burnout Risk",
    production_panic: "Production Panic",
    caffeine_rush: "Caffeine Rush",
    nicotine_focus: "Nicotine Focus",
    overclocked: "Overclocked",
    focus_crash: "Focus Crash",
    energy_drain: "Energy Drain",
    insomnia: "Insomnia",
    anxiety: "Anxiety",
    overstimulated: "Overstimulated",
    focus_instability: "Focus Instability",
  },
  mental: {
    fatigue_low: ["Need another coffee...", "Just one more feature.", "Still manageable."],
    fatigue_medium: ["You feel slightly restless.", "Your focus keeps drifting.", "You're starting to lose track of time."],
    fatigue_critical: ["You haven't slept properly in days.", "The monitor light feels painful.", "You keep hearing notification sounds."],
    stimulant_dependency: ["Coffee isn't helping much anymore.", "You light another cigarette without thinking.", "You don't remember when you last rested properly."],
    overstimulated: ["Your hands won't stop shaking.", "You reread the same code three times.", "Everything is too loud."],
    focus_low: ["The code looks like static.", "You keep forgetting what you were typing.", "Mental fog is setting in."],
    flow_state: ["Everything suddenly makes sense.", "You're locked in.", "The code is flowing naturally."],
    tech_debt: ["This project is becoming messy.", "You're cutting corners and you know it.", "The architecture is collapsing."],
    client_distrust: ["You feel nervous opening client messages.", "Every Slack notification is a jump scare.", "They probably know you're struggling."],
    financial_anxiety: ["You've started checking your balance too often.", "The upcoming bills are stressing you out.", "You keep calculating project payouts in your head."],
    debt_small: ["The negative balance is bothering you.", "You keep thinking about how to pay back the debt.", "Checking your bank app is a jump scare."],
    debt_medium: ["The debt is sitting in the back of your mind.", "You feel pressured to accept almost any contract.", "Financial safety feels like a distant memory."],
    debt_critical: ["You don't remember the last time you felt financially safe.", "You've started ignoring exhaustion just to survive.", "The walls are closing in financially."],
  },
  bills: {
    title: "Weekly Bills Due",
    internet: "Internet",
    electricity: "Electricity",
    software_subs: "Software Subscriptions",
    workspace_rent: "Workspace Rent",
    cloud_services: "Cloud Services",
    payConsequences: "Missed payments will damage your reputation and mental health.",
    insufficientFunds: "INSUFFICIENT CAPITAL",
    overdueWarning: "Your bills are overdue. Late fees and reputation damage applied.",
    balance: "Current Balance",
    debtWarning: "ENTERING DEBT",
    debtConsequences: "Entering debt will increase stress, reduce recovery efficiency, and heighten burnout risk.",
    acceptDebt: "Confirm Payment & Enter Debt",
  },
  unexpected: {
    title: "Life Event",
    urgent: "UNEXPECTED EXPENSE",
    broken_keyboard: {
        replace: "Replace Keyboard",
        ignore: "Ignore for now"
    },
    laptop_fan: {
        repair: "Repair Fan",
        ignore: "Keep working"
    },
    laptop_battery: {
        repair: "Repair Battery",
        ignore: "Keep working"
    },
    internet_outage: {
        tethering: "Use Mobile Data",
        cafe: "Work from Cafe"
    },
    mouse_sensor: {
        replace: "Replace Mouse",
        ignore: "Ignore for now"
    }
  },
  maintenance: {
    title: "Pending Maintenance",
    focusCap: "Focus Cap",
    repairNow: "Repair Now",
    insufficientFunds: "Insufficient Capital",
    restricted: "Focus Capacity Restricted",
    incidentLogged: "Life Incident Logged",
    economicDeduction: "Economic Deduction",
    pendingIssue: "Pending Issue",
  }
};

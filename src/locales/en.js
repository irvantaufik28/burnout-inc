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
  },
  freelance: {
    board: "Freelance Board",
    refresh: "Refresh",
    activeContract: "Active Contract",
    executeWork: "Execute Work (4h)",
    waiting: "Waiting for response...",
    rejected: "Your application was rejected.",
    interviewing: "Interview in progress...",
    success: "SUCCESS: Delivered {title}. Paid ${reward}.",
    failure: "CRITICAL FAILURE: {title}. {reason} Reputation decreased.",
    deadlineCritical: "DEADLINE CRITICAL",
    projectFailed: "PROJECT FAILED",
    delayFeedback: "Client disappointed with delivery delay.",
    working: "Working...",
    exhausted: "Exhausted",
    pacing: "Pacing...",
    efficiency: "Efficiency",
  },
  eval: {
    perfect: "Perfect Match",
    good: "Acceptable Match",
    risky: "Risky Contract",
    disaster: "Disaster Waiting To Happen",
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
    scope_creep_ui: {
      title: "Sudden Scope Creep",
      desc: "The client wants dark mode support before the next milestone. It wasn't in the contract.",
      options: {
        accept: "Accept Immediately (Energy Cost)",
        negotiate: "Negotiate for Extra Pay",
        reject: "Politely Decline"
      }
    },
    architecture_review: {
      title: "Security Audit",
      desc: "The Enterprise security team wants a full architecture review and documentation update.",
      options: {
        do_it: "Do it manually (Time Drain)",
        delegate: "Pay an expert to help"
      }
    },
    ai_pivot: {
      title: "The AI Pivot",
      desc: "The founder saw a viral tweet and wants to replace the landing page with an AI agent.",
      options: {
        pivot: "Initialize Pivot",
        stay_course: "Explain risks of hype"
      }
    },
    emotional_vibe_check: {
      title: "Late Night DM",
      desc: "The client is having an emotional breakdown about their startup vision at 2 AM.",
      options: {
        listen: "Listen and empathize",
        ghost: "Read-receipt and sleep"
      }
    }
  }
};

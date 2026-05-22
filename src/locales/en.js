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
  }
};

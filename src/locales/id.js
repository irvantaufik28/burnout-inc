export const id = {
  common: {
    day: "Hari",
    hour: "Jam",
    capital: "Modal",
    reputation: "Reputasi",
    energy: "Energi",
    focus: "Fokus",
    resume: "Lanjut",
    pause: "Jeda",
    save: "Simpan",
    cancel: "Batal",
    dismiss: "Tutup",
    select: "Pilih",
    risk: "Risiko",
    deadline: "Deadline",
    status: "Status",
    progress: "Progres",
  },
  dashboard: {
    title: "BURNOUT INC.",
    subtitle: "Sistem_Fase_02 // simulasi_survival_freelance",
    status: "Status Founder",
    techStack: "Tech Familiarity",
    portfolio: "Portofolio",
    resumeEmpty: "Resume Kosong",
    activeProcess: "Proses Aktif",
    remaining: "Sisa Waktu",
    taskCompletion: "Penyelesaian Tugas",
    executionIdle: "Eksekusi Idle",
    idleDesc: "Pilih kontrak dari papan untuk memulai.",
    availableGigs: "Gig Tersedia",
    reqNotMet: "Persyaratan belum terpenuhi",
    systemRecovery: "Pemulihan Sistem",
    restDesc: "6 jam istirahat untuk memulihkan vitalitas",
    match: "Match",
    requirements: "Kebutuhan",
  },
  freelance: {
    board: "Papan Freelance",
    refresh: "Segarkan",
    activeContract: "Kontrak Aktif",
    executeWork: "Kerjakan Proyek (4 jam)",
    waiting: "Menunggu respon...",
    rejected: "Lamaran Anda ditolak.",
    interviewing: "Wawancara sedang berlangsung...",
    success: "SUKSES: Mengirim {title}. Dibayar ${reward}.",
    failure: "GAGAL KRITIS: {title}. {reason} Reputasi menurun.",
    deadlineCritical: "DEADLINE KRITIS",
    projectFailed: "PROYEK GAGAL",
    delayFeedback: "Klien kecewa dengan keterlambatan pengiriman.",
    working: "Bekerja...",
    exhausted: "Kelelahan",
    pacing: "Menjaga ritme...",
    efficiency: "Efisiensi",
  },
  eval: {
    perfect: "Perfect Match",
    good: "Acceptable Match",
    risky: "Risky Contract",
    disaster: "Disaster Waiting To Happen",
  },
  actions: {
    takeNap: "Tidur Sejenak",
    takeNapDesc: "4 jam tidur ringan untuk memulihkan Energi",
    drinkCoffee: "Minum Kopi",
    drinkCoffeeDesc: "Tambah Energi instan, Fokus turun nanti",
    takeBreak: "Istirahat Sejenak",
    takeBreakDesc: "2 jam istirahat untuk memulihkan Fokus",
    allNighter: "Lembur Semalam",
    allNighterDesc: "8 jam kerja keras, penalti berat besok",
  },
  interview: {
    title: "Wawancara Langsung",
    connected: "Terhubung (VoIP)",
    evaluating: "Mengevaluasi Kecocokan...",
    scenario: "Skenario",
    failMsg: "Wawancara Gagal: Klien memilih orang lain.",
    successMsg: "Wawancara Berhasil: Klien terkesan denganmu.",
    culturalFitFail: "Klien merasa Anda tidak cocok secara budaya.",
    questions: {
      startup_deadline: {
        question: "Kami butuh MVP besok pagi. Sanggup?",
        options: {
          a: "Grind tiada henti. Saya kerjakan.",
          b: "Saya perlu meninjau risiko scope-nya.",
          c: "Jika kita sederhanakan fiturnya, mungkin saja."
        }
      },
      ai_hype: {
        question: "Bagaimana jika kita tambahkan label 'AI-powered' di copy marketing kita?",
        options: {
          a: "Disruptif. Ayo otomasi semuanya.",
          b: "Tapi apakah benar menggunakan AI?",
          c: "Boleh, jika itu membantu brand kita."
        }
      },
      no_budget: {
        question: "Kami belum punya budget sekarang, tapi kami punya 'passion' yang besar.",
        options: {
          a: "Passion tidak bisa membayar tagihan kopi saya.",
          b: "Saya suka visinya. Saya fleksibel.",
          c: "Ayo buat demo viral dan cari VC."
        }
      },
      server_crash: {
        question: "Server crash. Apa prioritas utama Anda?",
        options: {
          a: "Posting tweet keren bahwa kita sedang 'scaling'.",
          b: "Ikuti protokol pemulihan darurat.",
          c: "Perbaiki secepatnya, dokumentasi belakangan."
        }
      },
      scope_creep: {
        question: "Bisakah kita tambahkan dukungan mobile juga hari Jumat nanti?",
        options: {
          a: "Tidak masalah, kopi menyelesaikan segalanya.",
          b: "Kita butuh formulir permintaan perubahan resmi.",
          c: "Mari kita lihat apa yang bisa kita masukkan."
        }
      }
    },
    feedback: {
      aggressive: "Klien menyukai energi startup Anda.",
      stable: "Klien terkesan dengan profesionalisme Anda.",
      flexible: "Klien menghargai empati Anda.",
      hype: "Klien bersemangat dengan visi otomasi Anda.",
      neutral: "Klien merasa vibe Anda kurang cocok."
    }
  },
  chaos: {
    title: "Insiden Proyek",
    urgent: "URGENT",
    scope_creep_ui: {
      title: "Scope Creep Mendadak",
      desc: "Klien tiba-tiba meminta dukungan dark mode sebelum milestone berikutnya. Tidak ada dalam kontrak.",
      options: {
        accept: "Terima Langsung (Biaya Energi)",
        negotiate: "Nego Bayaran Tambahan",
        reject: "Tolak Secara Sopan"
      }
    },
    architecture_review: {
      title: "Audit Keamanan",
      desc: "Tim keamanan Enterprise meminta review arsitektur lengkap dan pembaruan dokumentasi.",
      options: {
        do_it: "Kerjakan manual (Kuras Waktu)",
        delegate: "Bayar pakar untuk bantu"
      }
    },
    ai_pivot: {
      title: "Pivot AI",
      desc: "Founder melihat tweet viral dan ingin mengganti landing page dengan AI agent.",
      options: {
        pivot: "Inisialisasi Pivot",
        stay_course: "Jelaskan risiko hype"
      }
    },
    emotional_vibe_check: {
      title: "DM Malam Hari",
      desc: "Klien sedang panik dan curhat soal visi startup mereka di jam 2 pagi.",
      options: {
        listen: "Dengarkan dan berempati",
        ghost: "Cuma baca dan tidur"
      }
    }
  }
};

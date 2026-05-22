/**
 * Unexpected Life Expenses (Metadata)
 */
export const UNEXPECTED_EXPENSES = [
  {
    id: 'broken_keyboard',
    type: 'device',
    title: { en: 'Sticky Keyboard', id: 'Keyboard Macet' },
    desc: { 
      en: 'Your mechanical keyboard is double-clicking. It is slowing you down.', 
      id: 'Keyboard mekanikmu mulai double-click. Menghambat pekerjaan.' 
    },
    options: [
      { id: 'replace', cost: 100, effect: { focus: 10 } },
      { id: 'ignore', cost: 0, isPending: true }
    ]
  },
  {
    id: 'laptop_fan',
    type: 'device',
    title: { en: 'Laptop Fan Noise', id: 'Kipas Laptop Berisik' },
    desc: { 
      en: 'The fan is making a grinding sound. It might be overheating.', 
      id: 'Kipas laptopmu berbunyi kasar. Sepertinya mulai panas.' 
    },
    options: [
      { id: 'repair', cost: 80, effect: { focus: 5 } },
      { id: 'ignore', cost: 0, isPending: true }
    ]
  },
  {
    id: 'internet_outage',
    type: 'event', // Not a persistent device issue
    title: { en: 'ISP Maintenance', id: 'Gangguan ISP' },
    desc: { 
      en: 'Stable connection required for urgent deployment.', 
      id: 'Butuh koneksi stabil untuk deployment mendadak.' 
    },
    options: [
      { id: 'tethering', cost: 30, effect: { focus: -5, progress: 10 } },
      { id: 'cafe', cost: 15, effect: { energy: -10, progress: 5 } }
    ]
  },
  {
    id: 'mouse_sensor',
    type: 'device',
    title: { en: 'Skipping Mouse', id: 'Sensor Mouse Eror' },
    desc: { 
      en: 'The cursor is skipping across the screen randomly.', 
      id: 'Kursor mouse mulai melompat-lompat tidak jelas.' 
    },
    options: [
      { id: 'replace', cost: 45, effect: { focus: 5 } },
      { id: 'ignore', cost: 0, isPending: true }
    ]
  }
];

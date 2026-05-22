/**
 * Device Issue Metadata
 * Defines penalties and escalation paths for ignored repairs.
 */
export const DEVICE_ISSUES = {
  broken_keyboard: {
    id: 'broken_keyboard',
    name: { en: 'Broken Keyboard', id: 'Keyboard Rusak' },
    baseFocusPenalty: 15,
    escalation: [
      { day: 7, penalty: 20, message: { en: 'Sticky keys are getting worse.', id: 'Tombol semakin macet.' } },
      { day: 14, penalty: 30, message: { en: 'Input lag is becoming unbearable.', id: 'Input lag mulai parah.' } }
    ],
    repairCost: 100
  },
  laptop_fan: {
    id: 'laptop_fan',
    name: { en: 'Noisy Laptop Fan', id: 'Kipas Laptop Berisik' },
    baseFocusPenalty: 10,
    escalation: [
      { day: 5, penalty: 20, message: { en: 'Laptop is starting to throttle.', id: 'Laptop mulai panas dan lemot.' } },
      { day: 10, penalty: 35, message: { en: 'Thermal shutdown risk detected.', id: 'Risiko mati mendadak karena panas.' } }
    ],
    repairCost: 80
  },
  mouse_sensor: {
    id: 'mouse_sensor',
    name: { en: 'Ghosting Mouse', id: 'Sensor Mouse Eror' },
    baseFocusPenalty: 8,
    escalation: [
      { day: 10, penalty: 15, message: { en: 'Cursor is skipping regularly.', id: 'Kursor mulai sering melompat.' } }
    ],
    repairCost: 45
  },
  router_instability: {
    id: 'router_instability',
    name: { en: 'Router Instability', id: 'Router Tidak Stabil' },
    baseFocusPenalty: 12,
    escalation: [
      { day: 7, penalty: 25, message: { en: 'Connection drops during work.', id: 'Koneksi sering putus saat kerja.' } }
    ],
    repairCost: 60
  }
};

/**
 * Client Review Templates
 * Metrics: Quality, Speed, Communication
 */

export const REVIEW_TEMPLATES = {
  success: {
    perfect: {
      stars: 5,
      messages: {
        en: ["Perfect execution. Exactly what I needed.", "Flawless delivery. Will hire again.", "Exceeded all expectations."],
        id: ["Eksekusi sempurna. Sesuai keinginan.", "Hasil luar biasa. Bakal rekrut lagi.", "Melebihi ekspektasi saya."]
      }
    },
    good: {
      stars: 4,
      messages: {
        en: ["Good work, though I expected more polish.", "Solid delivery on a tight schedule.", "Satisfied with the result."],
        id: ["Kerja bagus, meski kurang polesan sedikit.", "Hasil solid di jadwal yang ketat.", "Puas dengan hasilnya."]
      }
    },
    crunchy: {
      stars: 3,
      messages: {
        en: ["Product works but feels rushed.", "A bit messy, but it's done.", "Took a bit of back and forth, but we got there."],
        id: ["Produk jalan tapi terasa terburu-buru.", "Agak berantakan, tapi selesai.", "Banyak revisi tapi akhirnya jadi."]
      }
    }
  },
  failure: {
    standard: {
      stars: 1,
      messages: {
        en: ["Disastrous delay. Reputation ruined.", "Project abandoned. Very unprofessional.", "Total waste of time."],
        id: ["Keterlambatan yang parah. Reputasi hancur.", "Proyek ditinggalkan. Sangat tidak profesional.", "Buang-buang waktu saja."]
      }
    }
  }
};

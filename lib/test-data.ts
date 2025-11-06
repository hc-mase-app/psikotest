import type { TestQuestion, VisualIQQuestion } from "./types"

// Module A: Cognitive Ability Test (Tes Kemampuan Kognitif)
export const cognitiveQuestions: TestQuestion[] = [
  {
    id: "cog-1",
    question: "Seri angka berikutnya: 2, 4, 6, 8, ?",
    options: ["10", "12", "14", "16"],
    type: "cognitive",
    difficulty: "easy",
  },
  {
    id: "cog-2",
    question: 'Sinonim dari "Besar" adalah?',
    options: ["Kecil", "Luas", "Sempit", "Tipis"],
    type: "cognitive",
    difficulty: "easy",
  },
  {
    id: "cog-3",
    question: "Jika A = 1, B = 2, C = 3, maka D = ?",
    options: ["3", "4", "5", "6"],
    type: "cognitive",
    difficulty: "easy",
  },
  {
    id: "cog-4",
    question: 'Antonim dari "Gelap" adalah?',
    options: ["Terang", "Suram", "Kelam", "Hitam"],
    type: "cognitive",
    difficulty: "easy",
  },
  {
    id: "cog-5",
    question: "Logika: Semua manusia punya mata. Aku adalah manusia. Maka aku?",
    options: ["Punya telinga", "Punya mata", "Punya kaki", "Punya tangan"],
    type: "cognitive",
    difficulty: "medium",
  },
  {
    id: "cog-6",
    question: "Pola: ⬛ ⬜ ⬛ ⬜ ?",
    options: ["⬛", "⬜", "🔵", "🔴"],
    type: "cognitive",
    difficulty: "medium",
  },
  {
    id: "cog-7",
    question: "Jika 5 + 3 × 2 = ?, maka jawabannya adalah?",
    options: ["11", "16", "13", "10"],
    type: "cognitive",
    difficulty: "medium",
  },
  {
    id: "cog-8",
    question: 'Rotasi: Huruf "N" diputar 90 derajat menjadi?',
    options: ["Z", "M", "N", "W"],
    type: "cognitive",
    difficulty: "hard",
  },
  {
    id: "cog-9",
    question: "Perbandingan: Jika harga barang Rp 100.000 dan diskon 20%, harga akhir?",
    options: ["Rp 75.000", "Rp 80.000", "Rp 85.000", "Rp 90.000"],
    type: "cognitive",
    difficulty: "hard",
  },
  {
    id: "cog-10",
    question: "Puzzle logika: Mana yang tidak termasuk kelompok?",
    options: ["Apel", "Wortel", "Brokoli", "Pir"],
    type: "cognitive",
    difficulty: "hard",
  },
]

// ... existing code for Module B, C, D, E ...

export const personalityQuestions: TestQuestion[] = [
  {
    id: "pers-1",
    question: "Dalam situasi sosial, saya cenderung:",
    options: [
      "Lebih suka mendengarkan",
      "Sangat aktif berbicara",
      "Seimbang antara berbicara dan mendengarkan",
      "Berusaha menghindari situasi sosial",
    ],
    type: "personality",
    difficulty: "easy",
  },
  {
    id: "pers-2",
    question: "Ketika menghadapi tantangan, saya:",
    options: [
      "Langsung mencari solusi",
      "Membutuhkan waktu untuk berpikir",
      "Meminta bantuan orang lain",
      "Menghindari masalah",
    ],
    type: "personality",
    difficulty: "medium",
  },
  {
    id: "pers-3",
    question: "Saya lebih suka bekerja:",
    options: ["Dengan detail yang sangat rapi", "Dengan fleksibilitas tinggi", "Dalam tim", "Sendiri"],
    type: "personality",
    difficulty: "medium",
  },
  {
    id: "pers-4",
    question: "Gaya kepemimpinan saya adalah:",
    options: ["Direktif dan terstruktur", "Kolaboratif dan terbuka", "Visioner", "Delegatif"],
    type: "personality",
    difficulty: "hard",
  },
  {
    id: "pers-5",
    question: "Dalam pekerjaan, prioritas saya adalah:",
    options: [
      "Hasil akhir yang sempurna",
      "Kepuasan rekan kerja",
      "Inovasi dan kreativitas",
      "Kestabilan dan keamanan",
    ],
    type: "personality",
    difficulty: "medium",
  },
  {
    id: "pers-6",
    question: "Saya menangani stres dengan cara:",
    options: ["Fokus pada masalah", "Berbagi dengan orang lain", "Aktivitas fisik", "Introspeksi pribadi"],
    type: "personality",
    difficulty: "medium",
  },
  {
    id: "pers-7",
    question: "Ketika membuat keputusan, saya:",
    options: [
      "Menganalisis data secara mendalam",
      "Mengikuti intuisi",
      "Berkonsultasi dengan banyak orang",
      "Cepat mengambil keputusan",
    ],
    type: "personality",
    difficulty: "hard",
  },
  {
    id: "pers-8",
    question: "Rekan kerja saya akan mengatakan saya:",
    options: [
      "Dapat diandalkan dan konsisten",
      "Kreatif dan inovatif",
      "Empati dan suportif",
      "Independen dan mandiri",
    ],
    type: "personality",
    difficulty: "medium",
  },
  {
    id: "pers-9",
    question: "Saya tertarik dengan hal yang:",
    options: [
      "Terukur dan konkret",
      "Konseptual dan abstrak",
      "Bermanfaat untuk orang lain",
      "Menantang kemampuan saya",
    ],
    type: "personality",
    difficulty: "medium",
  },
  {
    id: "pers-10",
    question: "Dalam perubahan organisasi, saya:",
    options: [
      "Perlu waktu untuk beradaptasi",
      "Langsung beradaptasi",
      "Membutuhkan penjelasan jelas",
      "Menjadi pemimpin dalam perubahan",
    ],
    type: "personality",
    difficulty: "hard",
  },
]

export const skillsQuestions: TestQuestion[] = [
  {
    id: "skill-1",
    question: "Dalam manajemen proyek, prioritas utama adalah:",
    options: ["Memenuhi deadline", "Kualitas hasil", "Kepuasan klien", "Efisiensi biaya"],
    type: "skills",
    difficulty: "medium",
  },
  {
    id: "skill-2",
    question: "Keterampilan komunikasi terpenting dalam tim adalah:",
    options: ["Berbicara dengan jelas", "Mendengarkan aktif", "Menulis laporan ringkas", "Presentasi profesional"],
    type: "skills",
    difficulty: "easy",
  },
  {
    id: "skill-3",
    question: "Dalam menangani konflik, pendekatan terbaik adalah:",
    options: ["Win-win solution", "Kompromi", "Kolaborasi", "Menunda keputusan"],
    type: "skills",
    difficulty: "hard",
  },
  {
    id: "skill-4",
    question: "Keterampilan analitis yang penting untuk posisi Anda:",
    options: ["Interpretasi data", "Problem solving", "Analytical thinking", "Semua di atas"],
    type: "skills",
    difficulty: "medium",
  },
  {
    id: "skill-5",
    question: "Dalam pelatihan tim, metode terbaik adalah:",
    options: ["Pembelajaran formal", "On-the-job training", "Mentoring", "Self-learning"],
    type: "skills",
    difficulty: "medium",
  },
  {
    id: "skill-6",
    question: "Teknologi yang harus dikuasai untuk efisiensi kerja:",
    options: ["Microsoft Office", "Software spesifik industri", "Sistem manajemen data", "Semua di atas"],
    type: "skills",
    difficulty: "easy",
  },
  {
    id: "skill-7",
    question: "Dalam presentasi, elemen penting adalah:",
    options: ["Konten yang kaya", "Visual yang menarik", "Penyampaian yang jelas", "Interaksi dengan audiens"],
    type: "skills",
    difficulty: "medium",
  },
  {
    id: "skill-8",
    question: "Kemampuan negosiasi ditunjukkan dengan:",
    options: [
      "Mencapai kesepakatan terbaik",
      "Pemahaman posisi lawan",
      "Fleksibilitas dan kreatifitas",
      "Semua di atas",
    ],
    type: "skills",
    difficulty: "hard",
  },
  {
    id: "skill-9",
    question: "Dalam manajemen waktu, strategi efektif adalah:",
    options: ["Prioritas tugas penting", "Delegasi yang tepat", "Batasi distraksi", "Semua di atas"],
    type: "skills",
    difficulty: "easy",
  },
  {
    id: "skill-10",
    question: "Pengembangan diri yang berkelanjutan memerlukan:",
    options: ["Feedback dari atasan", "Self-reflection", "Pembelajaran berkelanjutan", "Semua di atas"],
    type: "skills",
    difficulty: "medium",
  },
]

export const roleFitQuestions: TestQuestion[] = [
  {
    id: "role-1",
    question: "Nilai yang paling penting dalam pekerjaan saya:",
    options: [
      "Integritas dan etika",
      "Pertumbuhan dan pembelajaran",
      "Kesuksesan dan prestasi",
      "Keseimbangan hidup kerja",
    ],
    type: "rolefit",
    difficulty: "easy",
  },
  {
    id: "role-2",
    question: "Budaya perusahaan yang saya butuhkan:",
    options: ["Inovatif dan dinamis", "Stabil dan terstruktur", "Kolaboratif dan inklusif", "Meritokrasi murni"],
    type: "rolefit",
    difficulty: "medium",
  },
  {
    id: "role-3",
    question: "Tujuan karir jangka panjang saya:",
    options: ["Ahli di bidang saya", "Pemimpin organisasi", "Entrepreneur", "Work-life balance"],
    type: "rolefit",
    difficulty: "hard",
  },
  {
    id: "role-4",
    question: "Saya ingin berkontribusi dengan cara:",
    options: ["Expertise teknis", "Kepemimpinan strategis", "Pemberdayaan tim", "Inovasi produk"],
    type: "rolefit",
    difficulty: "medium",
  },
  {
    id: "role-5",
    question: "Lingkungan kerja ideal saya adalah:",
    options: ["Kantor tradisional", "Fleksibel dan mobile", "Hybrid", "Remote sepenuhnya"],
    type: "rolefit",
    difficulty: "easy",
  },
  {
    id: "role-6",
    question: "Hubungan dengan manajemen yang saya harapkan:",
    options: ["Supportif dan mentor", "Independen dengan freedom", "Collaborative partnership", "Hands-off"],
    type: "rolefit",
    difficulty: "medium",
  },
  {
    id: "role-7",
    question: "Pengembangan karir yang saya inginkan:",
    options: ["Vertical promotion", "Lateral movement", "Specialization", "Generalist path"],
    type: "rolefit",
    difficulty: "hard",
  },
  {
    id: "role-8",
    question: "Dalam tim, peran saya adalah:",
    options: ["Problem solver", "Team motivator", "Process optimizer", "Visioner"],
    type: "rolefit",
    difficulty: "medium",
  },
  {
    id: "role-9",
    question: "Tantangan yang saya cari dalam pekerjaan:",
    options: ["Kompleksitas teknis", "Manajemen orang", "Transformasi bisnis", "Operasional excellence"],
    type: "rolefit",
    difficulty: "hard",
  },
  {
    id: "role-10",
    question: "Kesuksesan bagi saya berarti:",
    options: [
      "Hasil bisnis yang terukur",
      "Kepuasan pribadi",
      "Pengakuan dan penghargaan",
      "Dampak positif berkelanjutan",
    ],
    type: "rolefit",
    difficulty: "medium",
  },
]

export const mentalHealthQuestions: TestQuestion[] = [
  {
    id: "mh-1",
    question: "Dalam minggu terakhir, saya merasa sedih atau putus asa:",
    options: ["Tidak sama sekali", "Kadang-kadang", "Sering", "Sangat sering"],
    type: "mentalhealth",
    difficulty: "easy",
  },
  {
    id: "mh-2",
    question: "Saya kesulitan berkonsentrasi di pekerjaan:",
    options: ["Tidak sama sekali", "Kadang-kadang", "Sering", "Sangat sering"],
    type: "mentalhealth",
    difficulty: "easy",
  },
  {
    id: "mh-3",
    question: "Saya merasa cemas atau khawatir berlebihan:",
    options: ["Tidak sama sekali", "Kadang-kadang", "Sering", "Sangat sering"],
    type: "mentalhealth",
    difficulty: "medium",
  },
  {
    id: "mh-4",
    question: "Saya memiliki dukungan sosial yang cukup:",
    options: ["Sangat setuju", "Setuju", "Tidak setuju", "Sangat tidak setuju"],
    type: "mentalhealth",
    difficulty: "easy",
  },
  {
    id: "mh-5",
    question: "Saya merasa lelah atau kurang energi:",
    options: ["Tidak sama sekali", "Kadang-kadang", "Sering", "Sangat sering"],
    type: "mentalhealth",
    difficulty: "medium",
  },
  {
    id: "mh-6",
    question: "Saya dapat mengelola stres dengan baik:",
    options: ["Sangat setuju", "Setuju", "Tidak setuju", "Sangat tidak setuju"],
    type: "mentalhealth",
    difficulty: "medium",
  },
  {
    id: "mh-7",
    question: "Saya merasa percaya diri dalam kemampuan saya:",
    options: ["Sangat setuju", "Setuju", "Tidak setuju", "Sangat tidak setuju"],
    type: "mentalhealth",
    difficulty: "hard",
  },
  {
    id: "mh-8",
    question: "Saya memiliki gangguan tidur:",
    options: ["Tidak sama sekali", "Kadang-kadang", "Sering", "Sangat sering"],
    type: "mentalhealth",
    difficulty: "easy",
  },
  {
    id: "mh-9",
    question: "Saya merasa nyaman dengan diri sendiri:",
    options: ["Sangat setuju", "Setuju", "Tidak setuju", "Sangat tidak setuju"],
    type: "mentalhealth",
    difficulty: "hard",
  },
  {
    id: "mh-10",
    question: "Saya memiliki tujuan yang jelas dalam hidup:",
    options: ["Sangat setuju", "Setuju", "Tidak setuju", "Sangat tidak setuju"],
    type: "mentalhealth",
    difficulty: "hard",
  },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function getQuestionsByDifficulty(questions: TestQuestion[], position: string, count: number): TestQuestion[] {
  let targetDifficulty: ("easy" | "medium" | "hard")[]

  // Determine difficulty mix based on position
  if (position === "Operator") {
    targetDifficulty = ["easy", "easy", "easy", "medium"] // 75% easy, 25% medium
  } else if (position === "Administrasi") {
    targetDifficulty = ["easy", "medium", "medium", "hard"] // 25% easy, 50% medium, 25% hard
  } else {
    // Group Leader, Supervisor
    targetDifficulty = ["medium", "medium", "hard", "hard"] // 50% medium, 50% hard
  }

  const difficultyGroups: Record<string, TestQuestion[]> = {
    easy: questions.filter((q) => q.difficulty === "easy"),
    medium: questions.filter((q) => q.difficulty === "medium"),
    hard: questions.filter((q) => q.difficulty === "hard"),
  }

  const selected: TestQuestion[] = []
  const questionsPerDifficulty = Math.ceil(count / targetDifficulty.length)

  targetDifficulty.forEach((difficulty) => {
    const available = difficultyGroups[difficulty]
    const toTake = Math.min(questionsPerDifficulty, available.length)
    selected.push(...shuffleArray(available).slice(0, toTake))
  })

  return shuffleArray(selected).slice(0, count)
}

export function getAllTestQuestions(modules: string[], position?: string): Record<string, TestQuestion[]> {
  const result: Record<string, TestQuestion[]> = {}
  const questionCount = 10 // Adjust based on test plan if needed

  modules.forEach((module) => {
    let allQuestions: TestQuestion[] = []

    switch (module) {
      case "A":
        allQuestions = cognitiveQuestions
        break
      case "B":
        allQuestions = personalityQuestions
        break
      case "C":
        allQuestions = skillsQuestions
        break
      case "D":
        allQuestions = roleFitQuestions
        break
      case "E":
        allQuestions = mentalHealthQuestions
        break
    }

    if (position) {
      result[module] = getQuestionsByDifficulty(allQuestions, position, questionCount)
    } else {
      result[module] = shuffleArray(allQuestions).slice(0, questionCount)
    }
  })

  return result
}

export const visualIQQuestions: VisualIQQuestion[] = [
  // Pattern Recognition Tests
  {
    id: "pattern-1",
    imageUrl: "/black-and-white-geometric-pattern-sequence-with-mi.jpg",
    options: ["Segitiga", "Lingkaran", "Persegi", "Bintang"],
    correctAnswer: 2,
  },
  {
    id: "pattern-2",
    imageUrl: "/black-and-white-number-sequence-pattern-puzzle.jpg",
    options: ["12", "15", "18", "21"],
    correctAnswer: 1,
  },
  {
    id: "pattern-3",
    imageUrl: "/black-and-white-shape-rotation-pattern.jpg",
    options: ["Rotasi 90 derajat", "Rotasi 180 derajat", "Rotasi 270 derajat", "Tidak berubah"],
    correctAnswer: 0,
  },
  {
    id: "pattern-4",
    imageUrl: "/black-and-white-matrix-pattern-with-missing-elemen.jpg",
    options: ["A", "B", "C", "D"],
    correctAnswer: 2,
  },
  {
    id: "pattern-5",
    imageUrl: "/black-and-white-symmetry-pattern-test.jpg",
    options: ["Simetris horizontal", "Simetris vertikal", "Simetris diagonal", "Tidak simetris"],
    correctAnswer: 1,
  },

  // Inverted/Mirrored Image Tests
  {
    id: "mirror-1",
    imageUrl: "/black-and-white-letter-f-and-its-mirror-reflection.jpg",
    options: ["Gambar A", "Gambar B", "Gambar C", "Gambar D"],
    correctAnswer: 1,
  },
  {
    id: "mirror-2",
    imageUrl: "/black-and-white-arrow-pointing-right-with-rotation.jpg",
    options: ["Panah ke kiri", "Panah ke atas", "Panah ke bawah", "Panah diagonal"],
    correctAnswer: 0,
  },
  {
    id: "mirror-3",
    imageUrl: "/black-and-white-shape-with-vertical-flip.jpg",
    options: ["Terbalik vertikal", "Terbalik horizontal", "Rotasi 90 derajat", "Tidak berubah"],
    correctAnswer: 0,
  },
  {
    id: "mirror-4",
    imageUrl: "/black-and-white-clock-showing-3-o-clock-mirrored.jpg",
    options: ["9:00", "6:00", "12:00", "3:00"],
    correctAnswer: 0,
  },

  // Similarity/Matching Tests
  {
    id: "match-1",
    imageUrl: "/black-and-white-shapes-where-one-is-different-from.jpg",
    options: ["Gambar 1", "Gambar 2", "Gambar 3", "Gambar 4"],
    correctAnswer: 2,
  },
  {
    id: "match-2",
    imageUrl: "/black-and-white-identical-shapes-find-the-matching.jpg",
    options: ["A dan B", "B dan C", "C dan D", "A dan D"],
    correctAnswer: 3,
  },
  {
    id: "match-3",
    imageUrl: "/black-and-white-pattern-find-which-one-does-not-be.jpg",
    options: ["Pola 1", "Pola 2", "Pola 3", "Pola 4"],
    correctAnswer: 1,
  },
  {
    id: "match-4",
    imageUrl: "/black-and-white-geometric-shapes-grouping-by-simil.jpg",
    options: ["Berdasarkan ukuran", "Berdasarkan bentuk", "Berdasarkan orientasi", "Berdasarkan jumlah sisi"],
    correctAnswer: 1,
  },

  // Sequence/Series Tests
  {
    id: "sequence-1",
    imageUrl: "/black-and-white-shape-sequence-with-missing-next-i.jpg",
    options: ["Lingkaran besar", "Persegi kecil", "Segitiga sedang", "Bintang besar"],
    correctAnswer: 1,
  },
  {
    id: "sequence-2",
    imageUrl: "/black-and-white-progressive-pattern-sequence.jpg",
    options: ["Bertambah 1", "Bertambah 2", "Berkurang 1", "Tetap sama"],
    correctAnswer: 0,
  },
  {
    id: "sequence-3",
    imageUrl: "/placeholder.svg?height=300&width=400",
    options: ["Hitam", "Putih", "Abu-abu", "Bergaris"],
    correctAnswer: 0,
  },

  // Spatial Reasoning Tests
  {
    id: "spatial-1",
    imageUrl: "/placeholder.svg?height=300&width=400",
    options: ["Net A", "Net B", "Net C", "Net D"],
    correctAnswer: 2,
  },
  {
    id: "spatial-2",
    imageUrl: "/placeholder.svg?height=300&width=400",
    options: ["Bentuk 1", "Bentuk 2", "Bentuk 3", "Bentuk 4"],
    correctAnswer: 1,
  },
  {
    id: "spatial-3",
    imageUrl: "/placeholder.svg?height=300&width=400",
    options: ["Tampak depan", "Tampak samping", "Tampak atas", "Tampak bawah"],
    correctAnswer: 2,
  },

  // Abstract Reasoning Tests
  {
    id: "abstract-1",
    imageUrl: "/placeholder.svg?height=300&width=400",
    options: ["Simbol meningkat", "Simbol menurun", "Simbol berputar", "Simbol berganti"],
    correctAnswer: 0,
  },
  {
    id: "abstract-2",
    imageUrl: "/placeholder.svg?height=300&width=400",
    options: ["Sebanding", "Berlawanan", "Independen", "Berurutan"],
    correctAnswer: 1,
  },
]

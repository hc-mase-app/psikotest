export const discRanges = {
  veryLow: { min: 0, max: 12, label: "Sangat Rendah" },
  low: { min: 13, max: 25, label: "Rendah" },
  medium: { min: 26, max: 38, label: "Sedang" },
  high: { min: 39, max: 50, label: "Tinggi" },
  veryHigh: { min: 51, max: 100, label: "Sangat Tinggi" },
}

export function getDiscRange(score: number) {
  if (score <= 12) return discRanges.veryLow
  if (score <= 25) return discRanges.low
  if (score <= 38) return discRanges.medium
  if (score <= 50) return discRanges.high
  return discRanges.veryHigh
}

export const discDescriptions = {
  D: {
    "Sangat Rendah":
      "Sangat kooperatif, pasif, menghindari konflik, menerima otoritas, tidak suka mengambil risiko atau mengambil keputusan cepat. Lebih nyaman dengan arahan dari orang lain.",
    Rendah:
      "Kooperatif, lemah lembut, menerima keputusan orang lain, fokus pada harmoni. Jarang memimpin, lebih suka bekerja mendukung.",
    Sedang:
      "Seimbang antara dominan dan kooperatif, bisa memimpin saat diperlukan tetapi juga mendengarkan masukan. Fleksibel dan adaptif.",
    Tinggi:
      "Dominan, tegas, decisive, suka mengambil kontrol dan inisiatif, berorientasi pada hasil dan target. Pemimpin yang kuat.",
    "Sangat Tinggi":
      "Sangat dominan, agresif, commanding, kompetitif, tidak takut mengambil risiko. Terlalu kontrol bisa membuat tim kurang bebas.",
  },
  I: {
    "Sangat Rendah":
      "Sangat tertutup, sulit bersosialisasi, fokus pada tugas, kurang enthusias, jarang berbicara di depan umum. Lebih nyaman sendiri.",
    Rendah:
      "Pendiam, kurang komunikatif, sulit mengekspresikan emosi, lebih suka bekerja sendiri. Bisa bekerja sama tapi tidak aktif dalam networking.",
    Sedang: "Sosial seimbang, bisa berkomunikasi dengan baik, cukup enthusias, dapat membentuk hubungan profesional.",
    Tinggi:
      "Sangat sosial, komunikatif, persuasif, suka mendapat perhatian, energik, mudah bergaul. Ahli dalam public speaking dan networking.",
    "Sangat Tinggi":
      "Sangat ekspresif, charismatic, suka menjadi pusat perhatian, spontan, impulsif. Bisa terlalu banyak bicara dan kurang fokus pada detail.",
  },
  S: {
    "Sangat Rendah":
      "Tidak sabar, suka perubahan, sulit fokus pada detail, impulsif, sering berpindah-pindah. Tidak cocok untuk pekerjaan rutinitas.",
    Rendah:
      "Kurang stabil, suka variasi, mudah bosan, tidak konsisten. Lebih suka tantangan baru daripada pekerjaan berulang.",
    Sedang:
      "Stabil dan adaptif, bisa beradaptasi dengan baik sambil tetap konsisten. Seimbang dalam fleksibilitas dan rutinitas.",
    Tinggi:
      "Sangat stabil, konsisten, reliable, sabar, loyal, risk-averse. Dapat diandalkan untuk pekerjaan jangka panjang.",
    "Sangat Tinggi":
      "Sangat pasif terhadap perubahan, rigid, sulit beradaptasi, takut perubahan, sangat loyal dan predictable. Bisa resist terhadap inovasi.",
  },
  C: {
    "Sangat Rendah":
      "Tidak detail-oriented, tidak teliti, spontan, kurang sistematis, careless. Tidak cocok untuk pekerjaan yang butuh presisi tinggi.",
    Rendah:
      "Kurang akurat, tidak terlalu detail, pragmatis, kurang fokus pada kualitas. Cenderung quick and dirty solutions.",
    Sedang:
      "Cukup detail-oriented, sistematis seimbang, kualitas baik dengan efisiensi. Perhatian terhadap kualitas dan deadline.",
    Tinggi: "Sangat detail-oriented, akurat, teliti, sistematis, high standards. Perfeksionist dalam pekerjaan.",
    "Sangat Tinggi":
      "Sangat perfeksionist, over-analyzing, rigid, lambat dalam mengambil keputusan, terlalu fokus detail. Bisa bikin proyek stuck.",
  },
}

export function getDominantTraits(d: number, i: number, s: number, c: number) {
  const traits = [
    { trait: "D", score: d },
    { trait: "I", score: i },
    { trait: "S", score: s },
    { trait: "C", score: c },
  ]
  traits.sort((a, b) => b.score - a.score)
  return traits.slice(0, 2).map((t) => t.trait)
}

export function getDiscProfile(d: number, i: number, s: number, c: number) {
  const dominant = getDominantTraits(d, i, s, c)
  const profiles: { [key: string]: string } = {
    DI: "Executive / Entrepreneur - Dominan dan persuasif, suka memimpin dan mempengaruhi orang lain",
    DC: "Administrator / Manager - Dominan dan detail, fokus pada hasil dengan kontrol ketat dan presisi",
    DS: "Director / Leader - Dominan dan stabil, memimpin dengan konsistensi dan kepercayaan",
    ID: "Promoter / Sales - Persuasif dan dominan, persuasif dalam mempengaruhi dan menutup deal",
    IS: "Supporter / Team Player - Persuasif dan stabil, fokus pada hubungan dan harmoni tim",
    IC: "Analyzer / Consultant - Persuasif dan detail, komunikatif dalam penyampaian data dan insight",
    SD: "Coordinator / Facilitator - Stabil dan dominan, steady leader yang dapat diandalkan",
    SI: "Relator / Counselor - Stabil dan persuasif, supportif dan komunikatif dalam membantu orang",
    SC: "Specialist / Technician - Stabil dan detail, reliable dan accurate dalam tugas teknis",
    CD: "Controller / Compliance - Detail dan dominan, strict dan principled dalam enforcement",
    CI: "Analyzer / Specialist - Detail dan persuasif, systematic communicator dalam presentasi",
    CS: "Quality Assurance / Specialist - Detail dan stabil, thorough dan methodical dalam QA",
  }
  return profiles[dominant.join("")] || "Mixed Profile"
}

// Complete data pools for psychological test system

export interface AttitudeQuestion {
  text: string
  key: number // 1 for positive, -1 for negative
}

export interface IQQuestion {
  question: string
  options: string[]
  correct: string
}

export interface VisualQuestion {
  type: "bars" | "circles" | "triangles"
  question: string
  options: string[]
  correct: string
}

export interface PapikostickQuestion {
  statements: Array<{
    text: string
    trait: "D" | "I" | "S" | "C"
  }>
}

// 25 Attitude Questions - Behavioral Frequency
export const attitudePool: AttitudeQuestion[] = [
  { text: "Seberapa sering Anda menyelesaikan tugas sebelum tenggat waktu?", key: 1 },
  { text: "Seberapa sering Anda menyalahkan orang lain ketika terjadi kesalahan?", key: -1 },
  { text: "Seberapa sering Anda meminta umpan balik untuk meningkatkan kinerja?", key: 1 },
  { text: "Seberapa sering Anda menunda pekerjaan hingga menit terakhir?", key: -1 },
  { text: "Seberapa sering Anda tetap tenang dalam situasi yang menekan?", key: 1 },
  { text: "Seberapa sering Anda mengabaikan prosedur standar operasional?", key: -1 },
  { text: "Seberapa sering Anda membantu rekan kerja tanpa diminta?", key: 1 },
  { text: "Seberapa sering Anda bereaksi emosional terhadap kritik?", key: -1 },
  { text: "Seberapa sering Anda datang tepat waktu ke tempat kerja?", key: 1 },
  { text: "Seberapa sering Anda menolak tanggung jawab tambahan?", key: -1 },
  { text: "Seberapa sering Anda berpikir sebelum mengambil keputusan penting?", key: 1 },
  { text: "Seberapa sering Anda mengutamakan kepentingan pribadi di atas tim?", key: -1 },
  { text: "Seberapa sering Anda menyelesaikan pekerjaan sampai tuntas?", key: 1 },
  { text: "Seberapa sering Anda terlibat dalam konflik dengan rekan kerja?", key: -1 },
  { text: "Seberapa sering Anda mendokumentasikan pekerjaan penting?", key: 1 },
  { text: "Seberapa sering Anda melewatkan detail penting dalam instruksi?", key: -1 },
  { text: "Seberapa sering Anda bersikap hormat kepada semua orang?", key: 1 },
  { text: "Seberapa sering Anda mengabaikan aturan keselamatan kerja?", key: -1 },
  { text: "Seberapa sering Anda mencari cara untuk meningkatkan kualitas kerja?", key: 1 },
  { text: "Seberapa sering Anda mengeluh tentang pekerjaan kepada rekan?", key: -1 },
  { text: "Seberapa sering Anda bertindak jujur meskipun ada godaan?", key: 1 },
  { text: "Seberapa sering Anda tidak memikirkan dampak keputusan pada orang lain?", key: -1 },
  { text: "Seberapa sering Anda menyelesaikan tugas yang membosankan dengan disiplin?", key: 1 },
  { text: "Seberapa sering Anda bersikap defensif saat menerima kritik?", key: -1 },
  { text: "Seberapa sering Anda menyelaraskan pekerjaan dengan target perusahaan?", key: 1 },
]

// 20 IQ Questions
export const iqPool: IQQuestion[] = [
  { question: "Jika 2, 6, 12, 20, 30, ... maka angka berikutnya?", options: ["38", "40", "42", "44"], correct: "42" },
  { question: "RATA:RTAA :: KERJA:?", options: ["ERKJA", "KREJA", "KEJRA", "KERJA"], correct: "KREJA" },
  { question: "Jika X = 5, Y = 3, maka 2X + 3Y = ?", options: ["19", "21", "24", "16"], correct: "19" },
  { question: "Pola huruf: A, C, F, J, O, ... berikutnya?", options: ["U", "V", "W", "T"], correct: "U" },
  {
    question: "5 orang menyelesaikan tugas dalam 12 jam. 10 orang butuh ...?",
    options: ["6 jam", "8 jam", "10 jam", "12 jam"],
    correct: "6 jam",
  },
  { question: "Angka hilang: 3, 9, 27, ?, 243", options: ["54", "81", "72", "36"], correct: "81" },
  {
    question: "Jika semua B adalah C, dan semua C adalah D, maka semua B adalah ...?",
    options: ["D", "C", "B", "A"],
    correct: "D",
  },
  { question: "Rasio 4:5 setara dengan ?:?", options: ["8:10", "12:14", "16:18", "20:22"], correct: "8:10" },
  { question: "Jika 0.25 dari X adalah 20, maka X = ?", options: ["80", "60", "100", "120"], correct: "80" },
  { question: "Urutan logika: 2, 5, 11, 23, ...?", options: ["47", "46", "45", "44"], correct: "47" },
  { question: 'Sinonim paling dekat: "SIGAP"', options: ["LAMBAN", "CEPAT", "TANGKAS", "PASIF"], correct: "TANGKAS" },
  { question: "Jika P = 2Q, dan Q = 3R, maka P = ... R?", options: ["5R", "6R", "3R", "2R"], correct: "6R" },
  { question: "Rata-rata dari 6, 8, 14, 12 adalah?", options: ["10", "11", "12.5", "12"], correct: "10" },
  {
    question: 'Lengkapi analogi: "MATA" : "MELIHAT" = "TELINGA" : ...',
    options: ["BERBICARA", "MENDENGAR", "BERPIKIR", "BERJALAN"],
    correct: "MENDENGAR",
  },
  {
    question: "Jika angka genap dijumlahkan dari 2 sampai 10, hasilnya?",
    options: ["30", "32", "28", "40"],
    correct: "30",
  },
  { question: "Urutan: 1, 1, 2, 3, 5, 8, ...?", options: ["11", "12", "13", "14"], correct: "13" },
  { question: "Jika 7% dari N adalah 21, maka N = ?", options: ["300", "350", "250", "400"], correct: "300" },
  {
    question: 'Kebalikan paling tepat dari "KETAT"',
    options: ["LONGGAR", "KUAT", "RAPAT", "PADAT"],
    correct: "LONGGAR",
  },
  {
    question: "Jika jam menunjukkan 3:15, sudut antara jarum jam & menit?",
    options: ["7.5°", "15°", "22.5°", "30°"],
    correct: "7.5°",
  },
  { question: "Pola: 9, 7, 8, 6, 7, 5, ...?", options: ["6", "5", "4", "8"], correct: "6" },
]

// 15 Visual Questions
export const visualPool: VisualQuestion[] = [
  {
    type: "bars",
    question: "Perhatikan tinggi batang. Warna bergantian — warna berikutnya?",
    options: ["Biru Gelap", "Biru Muda", "Abu-abu", "Putih"],
    correct: "Biru Gelap",
  },
  {
    type: "circles",
    question: "Pola lingkaran: warna selang-seling. Warna berikutnya?",
    options: ["Biru Muda", "Biru Gelap", "Putih", "Abu-abu"],
    correct: "Biru Muda",
  },
  {
    type: "triangles",
    question: "Segitiga berwarna bergantian. Warna berikutnya?",
    options: ["Biru Gelap", "Biru Muda", "Putih", "Abu-abu"],
    correct: "Biru Gelap",
  },
  {
    type: "bars",
    question: "Urutan Y meningkat. Pilih jawaban yang sesuai.",
    options: ["Naik besar", "Naik kecil", "Tetap", "Turun kecil"],
    correct: "Naik kecil",
  },
  {
    type: "circles",
    question: "Jika pola menambah 1 lingkaran, jumlah setelah satu langkah?",
    options: ["6", "5", "4", "7"],
    correct: "6",
  },
  {
    type: "triangles",
    question: "Jumlah segitiga sekarang 3. Prediksi berikutnya.",
    options: ["3", "4", "2", "5"],
    correct: "3",
  },
  {
    type: "bars",
    question: "Warna selang-seling. Warna berikutnya?",
    options: ["Biru Gelap", "Biru Muda", "Putih", "Abu-abu"],
    correct: "Biru Muda",
  },
  {
    type: "circles",
    question: "Lingkaran bergantian radius. Radius berikutnya?",
    options: ["Lebih besar", "Lebih kecil", "Tetap", "Acak"],
    correct: "Lebih kecil",
  },
  {
    type: "triangles",
    question: "Orientasi segitiga tetap. Perubahan kemungkinan?",
    options: ["Posisi", "Ukuran", "Warna", "Jenis"],
    correct: "Posisi",
  },
  {
    type: "bars",
    question: "Lebar batang konstan. Variabel berubah?",
    options: ["Tinggi", "Lebar", "Warna", "Jumlah"],
    correct: "Tinggi",
  },
  {
    type: "circles",
    question: "Susunan bergerak ke kanan. Arah berikutnya?",
    options: ["Ke kanan", "Ke kiri", "Ke atas", "Tetap"],
    correct: "Ke kanan",
  },
  {
    type: "triangles",
    question: "Jika pola berulang, elemen awal akan kembali?",
    options: ["Ya", "Tidak", "Acak", "Tidak pasti"],
    correct: "Ya",
  },
  { type: "bars", question: "Prediksi penambahan batang?", options: ["5", "4", "3", "6"], correct: "5" },
  {
    type: "circles",
    question: "Warna bergantian — warna berikutnya?",
    options: ["Biru Muda", "Biru Gelap", "Putih", "Abu-abu"],
    correct: "Biru Muda",
  },
  {
    type: "triangles",
    question: "Segitiga dengan pola tertentu — bentuk berikutnya?",
    options: ["Segitiga", "Lingkaran", "Persegi", "Trapesium"],
    correct: "Segitiga",
  },
]

// 50 Papikostick Questions - Each with 4 statements representing D, I, S, C
export const papikQuestions: PapikostickQuestion[] = [
  {
    statements: [
      { text: "Saya mengambil keputusan dengan cepat dan tegas", trait: "D" },
      { text: "Saya senang berdiskusi dan bertukar ide dengan tim", trait: "I" },
      { text: "Saya bekerja dengan konsisten dan dapat diandalkan", trait: "S" },
      { text: "Saya memastikan semua detail sudah benar sebelum bertindak", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya fokus pada pencapaian target dan hasil", trait: "D" },
      { text: "Saya mudah membangun hubungan dengan orang baru", trait: "I" },
      { text: "Saya sabar dalam menghadapi situasi sulit", trait: "S" },
      { text: "Saya menganalisis data sebelum membuat kesimpulan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya berani mengambil risiko untuk mencapai tujuan", trait: "D" },
      { text: "Saya antusias dalam menyampaikan ide kepada orang lain", trait: "I" },
      { text: "Saya memberikan dukungan kepada rekan yang membutuhkan", trait: "S" },
      { text: "Saya teliti dalam memeriksa pekerjaan saya", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya suka tantangan dan kompetisi", trait: "D" },
      { text: "Saya optimis dan melihat sisi positif dari situasi", trait: "I" },
      { text: "Saya menjaga stabilitas dan keharmonisan tim", trait: "S" },
      { text: "Saya mengikuti prosedur dan standar yang ditetapkan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya langsung mengatasi masalah tanpa menunda", trait: "D" },
      { text: "Saya ekspresif dalam berkomunikasi dengan orang lain", trait: "I" },
      { text: "Saya tenang dan tidak mudah terpancing emosi", trait: "S" },
      { text: "Saya sistematis dalam mengorganisir pekerjaan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya memimpin dan mengarahkan tim dengan tegas", trait: "D" },
      { text: "Saya persuasif dalam meyakinkan orang lain", trait: "I" },
      { text: "Saya loyal dan berkomitmen pada tim", trait: "S" },
      { text: "Saya akurat dan presisi dalam bekerja", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya berorientasi pada hasil dan pencapaian", trait: "D" },
      { text: "Saya ramah dan mudah bergaul dengan siapa saja", trait: "I" },
      { text: "Saya dapat diandalkan untuk menyelesaikan tugas", trait: "S" },
      { text: "Saya perfeksionis dan mengutamakan kualitas", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya percaya diri dalam mengambil keputusan penting", trait: "D" },
      { text: "Saya komunikatif dan terbuka dengan orang lain", trait: "I" },
      { text: "Saya sabar menunggu hasil yang membutuhkan waktu", trait: "S" },
      { text: "Saya kritis dalam mengevaluasi informasi", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya kompetitif dan ingin menjadi yang terbaik", trait: "D" },
      { text: "Saya energik dan membawa semangat positif", trait: "I" },
      { text: "Saya stabil dan tidak mudah berubah pendirian", trait: "S" },
      { text: "Saya logis dan objektif dalam berpikir", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya tegas dalam menegakkan aturan", trait: "D" },
      { text: "Saya mudah beradaptasi dengan lingkungan sosial baru", trait: "I" },
      { text: "Saya supportif terhadap kebutuhan tim", trait: "S" },
      { text: "Saya metodis dalam pendekatan kerja saya", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya langsung to the point dalam berkomunikasi", trait: "D" },
      { text: "Saya senang berbagi cerita dan pengalaman", trait: "I" },
      { text: "Saya pendengar yang baik dan empati", trait: "S" },
      { text: "Saya detail-oriented dan tidak melewatkan hal kecil", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya mengambil inisiatif tanpa menunggu perintah", trait: "D" },
      { text: "Saya inspiratif dan memotivasi orang lain", trait: "I" },
      { text: "Saya kooperatif dan mudah bekerja sama", trait: "S" },
      { text: "Saya analitis dalam memecahkan masalah", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya menuntut standar tinggi dari diri dan orang lain", trait: "D" },
      { text: "Saya spontan dan fleksibel dalam bertindak", trait: "I" },
      { text: "Saya konsisten dalam kinerja sehari-hari", trait: "S" },
      { text: "Saya cermat dalam perencanaan dan eksekusi", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya assertif dalam menyampaikan pendapat", trait: "D" },
      { text: "Saya kreatif dalam mencari solusi baru", trait: "I" },
      { text: "Saya tenang dalam menghadapi tekanan", trait: "S" },
      { text: "Saya faktual dan berdasarkan data dalam berargumen", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya mengutamakan efisiensi dan produktivitas", trait: "D" },
      { text: "Saya ekspresif dalam menunjukkan perasaan", trait: "I" },
      { text: "Saya penyabar dan tidak terburu-buru", trait: "S" },
      { text: "Saya sistematis dalam dokumentasi pekerjaan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya berani menghadapi konflik secara langsung", trait: "D" },
      { text: "Saya diplomatis dalam menyelesaikan perbedaan", trait: "I" },
      { text: "Saya menghindari konflik dan menjaga kedamaian", trait: "S" },
      { text: "Saya objektif dalam menilai situasi konflik", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya mendorong tim untuk bekerja lebih cepat", trait: "D" },
      { text: "Saya membuat suasana kerja menjadi menyenangkan", trait: "I" },
      { text: "Saya menciptakan lingkungan kerja yang stabil", trait: "S" },
      { text: "Saya memastikan prosedur diikuti dengan benar", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya fokus pada bottom line dan hasil akhir", trait: "D" },
      { text: "Saya senang networking dan memperluas koneksi", trait: "I" },
      { text: "Saya membangun hubungan jangka panjang yang solid", trait: "S" },
      { text: "Saya mengutamakan akurasi dalam setiap laporan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya mengambil kendali situasi saat diperlukan", trait: "D" },
      { text: "Saya mudah mempengaruhi orang lain dengan ide saya", trait: "I" },
      { text: "Saya mengikuti arahan dengan baik", trait: "S" },
      { text: "Saya mengikuti standar kualitas yang ketat", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya cepat dalam mengeksekusi keputusan", trait: "D" },
      { text: "Saya verbal dan suka berbicara", trait: "I" },
      { text: "Saya reflektif dan berpikir sebelum bertindak", trait: "S" },
      { text: "Saya reserved dan lebih suka bekerja sendiri", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya menantang status quo dan mencari perubahan", trait: "D" },
      { text: "Saya inovatif dan suka bereksperimen", trait: "I" },
      { text: "Saya menjaga tradisi dan cara yang sudah terbukti", trait: "S" },
      { text: "Saya konservatif dan berhati-hati dalam perubahan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya independen dan mandiri dalam bekerja", trait: "D" },
      { text: "Saya kolaboratif dan suka bekerja dalam tim", trait: "I" },
      { text: "Saya dependable dan dapat dipercaya", trait: "S" },
      { text: "Saya self-sufficient dan tidak banyak meminta bantuan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya ambisius dan menargetkan posisi tinggi", trait: "D" },
      { text: "Saya populer dan dikenal banyak orang", trait: "I" },
      { text: "Saya humble dan tidak suka menonjolkan diri", trait: "S" },
      { text: "Saya profesional dan menjaga standar etika", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya blunt dan langsung dalam feedback", trait: "D" },
      { text: "Saya tactful dan mempertimbangkan perasaan orang", trait: "I" },
      { text: "Saya gentle dan lembut dalam berkomunikasi", trait: "S" },
      { text: "Saya formal dan mengikuti protokol komunikasi", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya proaktif dalam mencari peluang baru", trait: "D" },
      { text: "Saya enthusiastic tentang proyek baru", trait: "I" },
      { text: "Saya cautious dan mempertimbangkan risiko", trait: "S" },
      { text: "Saya skeptical dan membutuhkan bukti konkret", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya decisive dan tidak ragu dalam memilih", trait: "D" },
      { text: "Saya spontaneous dan mengikuti intuisi", trait: "I" },
      { text: "Saya deliberate dan mempertimbangkan matang", trait: "S" },
      { text: "Saya calculated dan menghitung semua kemungkinan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya demanding terhadap hasil kerja", trait: "D" },
      { text: "Saya encouraging dan memberikan semangat", trait: "I" },
      { text: "Saya accommodating terhadap kebutuhan orang lain", trait: "S" },
      { text: "Saya exacting dalam standar kualitas", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya forceful dalam memperjuangkan pendapat", trait: "D" },
      { text: "Saya persuasive dengan pendekatan personal", trait: "I" },
      { text: "Saya agreeable dan mudah menerima pendapat lain", trait: "S" },
      { text: "Saya logical dalam berargumentasi", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya risk-taker dan berani mencoba hal baru", trait: "D" },
      { text: "Saya adventurous dan suka petualangan", trait: "I" },
      { text: "Saya security-oriented dan mengutamakan keamanan", trait: "S" },
      { text: "Saya risk-averse dan menghindari ketidakpastian", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya impatient dengan proses yang lambat", trait: "D" },
      { text: "Saya restless dan butuh variasi", trait: "I" },
      { text: "Saya patient dan tidak mudah frustrasi", trait: "S" },
      { text: "Saya meticulous dan tidak terburu-buru", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya authoritative dalam memberikan instruksi", trait: "D" },
      { text: "Saya friendly dalam berinteraksi", trait: "I" },
      { text: "Saya supportive dalam membimbing", trait: "S" },
      { text: "Saya instructive dengan penjelasan detail", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya competitive dan ingin menang", trait: "D" },
      { text: "Saya playful dan suka bercanda", trait: "I" },
      { text: "Saya cooperative dan mengutamakan kerjasama", trait: "S" },
      { text: "Saya serious dan fokus pada tugas", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya bold dalam mengambil tindakan", trait: "D" },
      { text: "Saya outgoing dan ekstrovert", trait: "I" },
      { text: "Saya reserved dan introvert", trait: "S" },
      { text: "Saya private dan menjaga privasi", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya direct dalam menyampaikan kritik", trait: "D" },
      { text: "Saya positive dalam memberikan feedback", trait: "I" },
      { text: "Saya constructive dan membangun", trait: "S" },
      { text: "Saya specific dan detail dalam feedback", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya hasil-oriented dan fokus pada output", trait: "D" },
      { text: "Saya people-oriented dan fokus pada hubungan", trait: "I" },
      { text: "Saya process-oriented dan fokus pada cara", trait: "S" },
      { text: "Saya quality-oriented dan fokus pada standar", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya fast-paced dalam bekerja", trait: "D" },
      { text: "Saya energetic dan penuh semangat", trait: "I" },
      { text: "Saya steady dan konsisten dalam tempo", trait: "S" },
      { text: "Saya deliberate dan hati-hati dalam kecepatan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya challenging terhadap ide yang ada", trait: "D" },
      { text: "Saya accepting terhadap ide baru", trait: "I" },
      { text: "Saya receptive terhadap masukan", trait: "S" },
      { text: "Saya questioning dan mempertanyakan asumsi", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya pioneering dan membuka jalan baru", trait: "D" },
      { text: "Saya trendsetting dan mengikuti tren", trait: "I" },
      { text: "Saya traditional dan menjaga nilai lama", trait: "S" },
      { text: "Saya conventional dan mengikuti konvensi", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya dominant dalam diskusi kelompok", trait: "D" },
      { text: "Saya talkative dan banyak bicara", trait: "I" },
      { text: "Saya quiet dan lebih banyak mendengar", trait: "S" },
      { text: "Saya concise dan berbicara seperlunya", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya controlling terhadap situasi", trait: "D" },
      { text: "Saya influencing terhadap orang lain", trait: "I" },
      { text: "Saya following arahan yang ada", trait: "S" },
      { text: "Saya monitoring progress dengan teliti", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya aggressive dalam mengejar target", trait: "D" },
      { text: "Saya enthusiastic dalam promosi ide", trait: "I" },
      { text: "Saya passive dan tidak memaksakan", trait: "S" },
      { text: "Saya analytical dalam evaluasi", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya firm dalam pendirian", trait: "D" },
      { text: "Saya flexible dalam pendekatan", trait: "I" },
      { text: "Saya adaptable terhadap perubahan", trait: "S" },
      { text: "Saya rigid dalam mengikuti aturan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya task-focused dan berorientasi tugas", trait: "D" },
      { text: "Saya relationship-focused dan berorientasi hubungan", trait: "I" },
      { text: "Saya team-focused dan berorientasi tim", trait: "S" },
      { text: "Saya detail-focused dan berorientasi detail", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya quick dalam mengambil keputusan", trait: "D" },
      { text: "Saya impulsive dan mengikuti dorongan", trait: "I" },
      { text: "Saya thoughtful dan penuh pertimbangan", trait: "S" },
      { text: "Saya systematic dalam proses keputusan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya driving dan mendorong kemajuan", trait: "D" },
      { text: "Saya inspiring dan menginspirasi orang", trait: "I" },
      { text: "Saya calming dan menenangkan situasi", trait: "S" },
      { text: "Saya correcting dan memperbaiki kesalahan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya action-oriented dan langsung bertindak", trait: "D" },
      { text: "Saya idea-oriented dan fokus pada konsep", trait: "I" },
      { text: "Saya stability-oriented dan fokus pada kestabilan", trait: "S" },
      { text: "Saya accuracy-oriented dan fokus pada ketepatan", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya powerful dalam kepemimpinan", trait: "D" },
      { text: "Saya charismatic dan menarik perhatian", trait: "I" },
      { text: "Saya humble dan rendah hati", trait: "S" },
      { text: "Saya competent dan menguasai bidang", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya determined dan tidak mudah menyerah", trait: "D" },
      { text: "Saya optimistic dan selalu positif", trait: "I" },
      { text: "Saya reliable dan dapat diandalkan", trait: "S" },
      { text: "Saya precise dan tepat dalam eksekusi", trait: "C" },
    ],
  },
  {
    statements: [
      { text: "Saya straightforward dan tidak berbelit", trait: "D" },
      { text: "Saya expressive dan menunjukkan emosi", trait: "I" },
      { text: "Saya even-tempered dan stabil emosi", trait: "S" },
      { text: "Saya controlled dan mengontrol emosi", trait: "C" },
    ],
  },
]

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

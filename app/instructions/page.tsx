"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function InstructionsPage() {
  const router = useRouter()
  const [participant, setParticipant] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("psikotestParticipant")
    if (!data) {
      router.push("/")
    } else {
      setParticipant(JSON.parse(data))
    }
  }, [router])

  const handleStartTest = () => {
    router.push("/test")
  }

  if (!participant) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="space-y-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl">Tata Cara & Aturan Tes</CardTitle>
            <CardDescription className="text-blue-100">Bacalah dengan seksama sebelum memulai</CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* Participant Info */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Peserta:</span> {participant.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Jabatan:</span> {participant.position}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Departemen:</span> {participant.department}
              </p>
            </div>

            {/* Important Alert */}
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 ml-3">
                Pastikan Anda telah membaca semua instruksi sebelum memulai tes.
              </AlertDescription>
            </Alert>

            {/* Instructions */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">📋 Petunjuk Umum</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                    <span>Bacalah setiap instruksi dengan seksama sebelum menjawab.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                    <span>Jawab semua pertanyaan sesuai dengan pemahaman dan pengalaman Anda.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                    <span>Tidak ada jawaban yang benar atau salah dalam tes ini.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
                    <span>Anda dapat kembali ke pertanyaan sebelumnya jika diperlukan.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
                    <span>Progress Anda akan ditampilkan di bagian atas halaman.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">🔒 Kerahasiaan & Privasi</h3>
                <p className="text-sm text-gray-700">
                  Tes ini bersifat rahasia dan hanya digunakan untuk kebutuhan pengembangan Sumber Daya Manusia (SDM).
                  Hasil Anda akan diproses secara profesional oleh bagian HR dan dijaga kerahasiaannya sesuai dengan
                  kebijakan perusahaan.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">⏱️ Durasi Tes</h3>
                <p className="text-sm text-gray-700">
                  Tes ini dapat diselesaikan dalam waktu 30-60 menit tergantung pada jabatan Anda. Silakan mengambil
                  waktu yang Anda butuhkan untuk menjawab dengan serius.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">✅ Setelah Selesai</h3>
                <p className="text-sm text-gray-700">
                  Setelah menyelesaikan semua bagian tes, Anda akan melihat ringkasan hasil dan dapat mengirimkan
                  respons Anda kepada bagian HR. Hasil akan disimpan dan dikirimkan ke email terkait.
                </p>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <Alert className="border-green-200 bg-green-50">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 ml-3 text-sm">
                Dengan mengklik tombol "Mulai Tes", Anda telah memahami dan menyetujui semua aturan dan tata cara di
                atas.
              </AlertDescription>
            </Alert>

            {/* Start Button */}
            <Button
              onClick={handleStartTest}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-lg transition-colors text-base"
            >
              Mulai Tes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

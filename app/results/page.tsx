"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Loader2, Clock } from "lucide-react"
import type { ParticipantData } from "@/lib/types"

interface TestData {
  responses: Record<string, number>
  modules: string[]
  completedAt: string
  timingData?: Record<string, number>
  totalTimeSpent?: number
}

export default function ResultsPage() {
  const router = useRouter()
  const [participant, setParticipant] = useState<ParticipantData | null>(null)
  const [testData, setTestData] = useState<TestData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const participantData = localStorage.getItem("psikotestParticipant")
    const testResponses = localStorage.getItem("psikotestResponses")

    if (!participantData || !testResponses) {
      router.push("/")
      return
    }

    setParticipant(JSON.parse(participantData))
    setTestData(JSON.parse(testResponses))
  }, [router])

  const handleSubmit = async () => {
    if (!participant || !testData) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/submit-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participant,
          testData,
          totalQuestions: Object.keys(testData.responses).length,
          timingData: testData.timingData || {},
          totalTimeSpent: testData.totalTimeSpent || 0,
        }),
      })

      if (!response.ok) {
        throw new Error("Gagal mengirim hasil tes")
      }

      setSubmitted(true)
      // Clear localStorage after successful submission
      setTimeout(() => {
        localStorage.removeItem("psikotestParticipant")
        localStorage.removeItem("psikotestResponses")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
      setIsSubmitting(false)
    }
  }

  const moduleNames: Record<string, string> = {
    A: "Tes Kemampuan Kognitif",
    B: "Tes Kepribadian",
    C: "Tes Keterampilan Khusus",
    D: "Tes Kesesuaian Peran",
    E: "Tes Kesehatan Mental",
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!participant || !testData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Terima Kasih!</h2>
              <p className="text-gray-600">Hasil Psikotest Anda telah berhasil dikirimkan.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                Hasil akan diproses oleh bagian HR dan Anda akan mendapatkan umpan balik selanjutnya.
              </p>
            </div>
            <Button
              onClick={() => {
                router.push("/")
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6"
            >
              Kembali ke Beranda
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const completedAt = new Date(testData.completedAt)
  const formattedTime = completedAt.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="space-y-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl">Ringkasan Hasil Tes</CardTitle>
            <CardDescription className="text-blue-100">Periksa data Anda sebelum mengirim</CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            {/* Participant Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-800">Data Peserta</h3>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Nama</p>
                    <p className="text-sm font-semibold text-gray-800">{participant.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Email</p>
                    <p className="text-sm font-semibold text-gray-800">{participant.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Jabatan</p>
                    <p className="text-sm font-semibold text-gray-800">{participant.position}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Departemen</p>
                    <p className="text-sm font-semibold text-gray-800">{participant.department}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Nomor HP</p>
                    <p className="text-sm font-semibold text-gray-800">{participant.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-800">Informasi Tes</h3>
              <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 space-y-3">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">Jenis Tes</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {testData.modules.map((module) => (
                      <span
                        key={module}
                        className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {moduleNames[module]}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-3">
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Total Pertanyaan</p>
                    <p className="text-2xl font-bold text-indigo-600">{Object.keys(testData.responses).length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Total Waktu</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-4 w-4 text-indigo-600" />
                      <p className="text-lg font-bold text-indigo-600">{formatTime(testData.totalTimeSpent || 0)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Waktu Selesai</p>
                    <p className="text-sm font-semibold text-gray-800">{formattedTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <Alert className="border-amber-200 bg-amber-50">
              <AlertDescription className="text-amber-800 text-sm">
                Setelah Anda mengirim hasil ini, data akan dikunci dan tidak dapat diubah. Pastikan semua data sudah
                benar sebelum mengirim.
              </AlertDescription>
            </Alert>

            {/* Error Message */}
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800 text-sm">{error}</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6">
              <Button
                onClick={() => router.push("/test")}
                disabled={isSubmitting}
                variant="outline"
                className="flex-1 py-6"
              >
                Kembali ke Tes
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim Hasil"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

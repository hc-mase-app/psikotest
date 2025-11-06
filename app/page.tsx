"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const router = useRouter()

  const handleStartTest = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e1f2f] to-[#173b5b] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-3xl font-bold text-[#0e1f2f]">PSIKOTEST TERPADU</CardTitle>
          <CardDescription className="text-base">
            PT Sarana Sukses Sejahtera
            <br />
            PT Gunungmas Sukses Makmur
          </CardDescription>
          <p className="text-sm text-gray-600">Penilaian Attitude, IQ, Tebak Gambar, dan Papikostick</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-[#eef9ff] border border-[#cfe9f2] rounded-lg p-4 text-sm">
            <p className="font-semibold mb-2">Informasi Penting:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Total 6 halaman tes</li>
              <li>Attitude: 25 pertanyaan</li>
              <li>IQ: 20 pertanyaan</li>
              <li>Tebak Gambar: 15 pertanyaan</li>
              <li>Papikostick: 50 pertanyaan</li>
              <li>Estimasi waktu: 45-60 menit</li>
            </ul>
          </div>

          <Button
            onClick={handleStartTest}
            className="w-full bg-[#17a2b8] hover:bg-[#138496] text-white font-bold py-6 text-lg"
          >
            Mulai Psikotest
          </Button>

          <p className="text-xs text-center text-gray-500">Pastikan koneksi internet stabil selama mengerjakan tes</p>
        </CardContent>
      </Card>
    </div>
  )
}

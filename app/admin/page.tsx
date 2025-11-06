"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [filter, setFilter] = useState({
    position: "",
    department: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, implement proper authentication
    if (password === "admin123") {
      setIsAuthenticated(true)
      setPassword("")
    } else {
      alert("Password salah")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>Masukkan password untuk mengakses</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Masuk
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard - Psikotest Online</h1>
          <p className="text-gray-600">Kelola dan analisis hasil tes peserta</p>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Filter Hasil Tes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Jabatan</label>
                <Select value={filter.position} onValueChange={(value) => setFilter({ ...filter, position: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operator">Operator</SelectItem>
                    <SelectItem value="Administrasi">Administrasi</SelectItem>
                    <SelectItem value="Group Leader">Group Leader</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Departemen</label>
                <Select
                  value={filter.department}
                  onValueChange={(value) => setFilter({ ...filter, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Produksi">Produksi</SelectItem>
                    <SelectItem value="SCM">SCM</SelectItem>
                    <SelectItem value="Plant">Plant</SelectItem>
                    <SelectItem value="HCGA">HCGA</SelectItem>
                    <SelectItem value="HSE">HSE</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setShowResults(true)}>
                  Cari Hasil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Table - Placeholder */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Hasil Tes Peserta</CardTitle>
            <CardDescription>Tabel ini akan menampilkan hasil tes ketika database terhubung</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Nama</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Jabatan</th>
                    <th className="px-4 py-3 text-left font-semibold">Departemen</th>
                    <th className="px-4 py-3 text-left font-semibold">Total Pertanyaan</th>
                    <th className="px-4 py-3 text-left font-semibold">Tanggal Selesai</th>
                    <th className="px-4 py-3 text-left font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      Belum ada data. Hubungkan database untuk melihat hasil tes.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Langkah Berikutnya:</h3>
              <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                <li>Hubungkan database (Supabase, Neon, atau Firebase)</li>
                <li>Jalankan script init-database.sql untuk membuat tabel</li>
                <li>Update lib/database.ts dengan kredensial database</li>
                <li>Hasil tes akan muncul di dashboard ini</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

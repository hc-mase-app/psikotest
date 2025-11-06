"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [userId, setUserId] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login gagal")
        setLoading(false)
        return
      }

      // Store user data in localStorage
      localStorage.setItem("psikotestUser", JSON.stringify(data.user))

      // Redirect to psikotest
      router.push("/psikotest")
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
      setLoading(false)
    }
  }

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
    setUserId(value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0e1f2f] to-[#1a3a4a] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login Psikotest</CardTitle>
          <CardDescription className="text-center">Masukkan ID dan Nama Anda untuk memulai tes</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userId">ID (10 Digit)</Label>
              <Input
                id="userId"
                type="text"
                placeholder="1234567890"
                value={userId}
                onChange={handleUserIdChange}
                required
                maxLength={10}
                disabled={loading}
                pattern="\d{10}"
              />
              <p className="text-xs text-muted-foreground">ID harus terdiri dari 10 digit angka</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading || userId.length !== 10}>
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

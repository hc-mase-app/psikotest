import { type NextRequest, NextResponse } from "next/server"
import { validateUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, name } = body

    // Validate input
    if (!userId || !name) {
      return NextResponse.json({ error: "User ID dan Nama harus diisi" }, { status: 400 })
    }

    // Validate userId is 10 digits
    if (!/^\d{10}$/.test(userId)) {
      return NextResponse.json({ error: "User ID harus 10 digit angka" }, { status: 400 })
    }

    // Validate user against database
    const user = await validateUser(userId, name)

    if (!user) {
      return NextResponse.json({ error: "User ID atau Nama tidak valid" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: {
        userId: user.user_id,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}

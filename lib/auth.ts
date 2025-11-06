import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface AuthUser {
  user_id: string
  name: string
  is_active: boolean
  last_login: Date | null
}

export async function validateUser(userId: string, name: string): Promise<AuthUser | null> {
  try {
    // Query the database for the user
    const result = await sql`
      SELECT user_id, name, is_active, last_login
      FROM authorized_users
      WHERE user_id = ${userId}
      AND is_active = true
    `

    if (result.length === 0) {
      return null
    }

    const user = result[0] as AuthUser

    // Verify name matches (case-insensitive)
    if (user.name.toLowerCase() !== name.toLowerCase()) {
      return null
    }

    // Update last login
    await sql`
      UPDATE authorized_users
      SET last_login = CURRENT_TIMESTAMP
      WHERE user_id = ${userId}
    `

    return user
  } catch (error) {
    console.error("[v0] Auth error:", error)
    return null
  }
}

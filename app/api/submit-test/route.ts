import { type NextRequest, NextResponse } from "next/server"

// Database connection
async function saveTestResults(data: any) {
  // This will be populated when user connects a database (Supabase, Neon, etc)
  // For now, store locally
  console.log("Saving test results:", data)
  return { id: Math.random().toString(36).substr(2, 9) }
}

async function sendNotificationEmail(participant: any, testData: any) {
  // Send confirmation email
  // Can be integrated with SendGrid, Resend, or other email service
  console.log("Sending email to:", participant.email)
  return true
}

export async function POST(request: NextRequest) {
  try {
    const { participant, testData, totalQuestions, timingData, totalTimeSpent } = await request.json()

    // Save to database
    const result = await saveTestResults({
      participant,
      testData,
      totalQuestions,
      timingData,
      totalTimeSpent,
      submittedAt: new Date().toISOString(),
    })

    // Send email notification
    await sendNotificationEmail(participant, testData)

    return NextResponse.json(
      {
        success: true,
        message: "Hasil tes berhasil dikirim",
        data: {
          participantName: participant.name,
          email: participant.email,
          resultId: result.id,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error submitting test:", error)
    return NextResponse.json({ success: false, message: "Gagal mengirim hasil tes" }, { status: 500 })
  }
}

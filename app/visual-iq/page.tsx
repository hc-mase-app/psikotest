"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import ProgressBar from "@/components/progress-bar"
import Timer from "@/components/timer"
import { visualIQQuestions } from "@/lib/test-data"

export default function VisualIQPage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [timingData, setTimingData] = useState<Record<string, number>>({})
  const [totalTimeSpent, setTotalTimeSpent] = useState(0)
  const questionStartTime = useRef<number>(Date.now())
  const TIME_LIMIT_SECONDS = 60

  useEffect(() => {
    const data = localStorage.getItem("psikotestParticipant")
    if (!data) {
      router.push("/")
      return
    }
  }, [router])

  const moveToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < visualIQQuestions.length - 1) {
        return prevIndex + 1
      } else {
        // Complete visual IQ test, redirect to results
        const textResponses = JSON.parse(localStorage.getItem("psikotestResponses") || "{}")
        localStorage.setItem(
          "psikotestResponses",
          JSON.stringify({
            ...textResponses,
            visualIQResponses: responses,
            visualIQTimingData: timingData,
            visualIQTotalTime: totalTimeSpent,
            completedAt: new Date().toISOString(),
          }),
        )
        router.push("/results")
        return prevIndex
      }
    })
  }

  const handleAnswer = (optionIndex: number) => {
    const questionId = visualIQQuestions[currentQuestionIndex].id
    setResponses((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }))

    setTimeout(() => {
      moveToNextQuestion()
    }, 300)
  }

  const handleTimeUp = useCallback(() => {
    moveToNextQuestion()
  }, [currentQuestionIndex, responses, router])

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSkip = () => {
    moveToNextQuestion()
  }

  useEffect(() => {
    const currentQuestion = visualIQQuestions[currentQuestionIndex]
    if (!currentQuestion) return

    return () => {
      const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000)
      setTimingData((prev) => ({
        ...prev,
        [currentQuestion.id]: timeSpent,
      }))
      setTotalTimeSpent((prev) => prev + timeSpent)
      questionStartTime.current = Date.now()
    }
  }, [currentQuestionIndex])

  const currentQuestion = visualIQQuestions[currentQuestionIndex]
  const answeredQuestions = Object.keys(responses).length
  const progressPercent = Math.round((answeredQuestions / visualIQQuestions.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Tes Pola Visual</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600">
                  {answeredQuestions} / {visualIQQuestions.length}
                </span>
                {currentQuestion && (
                  <Timer
                    key={currentQuestion.id}
                    timeLimit={TIME_LIMIT_SECONDS}
                    onTimeUp={handleTimeUp}
                    isActive={true}
                  />
                )}
              </div>
            </div>
            <ProgressBar progress={progressPercent} />
          </div>

          {currentQuestion ? (
            <>
              <div className="space-y-6">
                <div className="flex justify-center bg-gray-100 rounded-lg p-6 min-h-80">
                  <img
                    src={currentQuestion.imageUrl || "/placeholder.svg"}
                    alt={`Tes Pola Visual ${currentQuestionIndex + 1}`}
                    className="max-w-full max-h-96 object-contain grayscale"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Pilih jawaban yang paling sesuai:</p>
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = responses[currentQuestion.id] === index

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(index)}
                          className={`p-4 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                              : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300"
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={handleSkip}
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-colors"
                >
                  Lewati
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Memuat pertanyaan...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

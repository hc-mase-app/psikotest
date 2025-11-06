"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { ParticipantData } from "@/lib/types"
import { getTestPlan, getTestModules, getQuestionCount } from "@/lib/test-config"
import { getAllTestQuestions } from "@/lib/test-data"
import TestQuestion from "@/components/test-question"
import ProgressBar from "@/components/progress-bar"
import Timer from "@/components/timer"

export default function TestPage() {
  const router = useRouter()
  const [participant, setParticipant] = useState<ParticipantData | null>(null)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [modules, setModules] = useState<string[]>([])
  const [questions, setQuestions] = useState<Record<string, any[]>>({})
  const [timingData, setTimingData] = useState<Record<string, number>>({})
  const [totalTimeSpent, setTotalTimeSpent] = useState(0)
  const questionStartTime = useRef<number>(Date.now())
  const TIME_LIMIT_SECONDS = 30

  const moveToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < (questions[modules[currentModuleIndex]]?.length || 0) - 1) {
        return prevIndex + 1
      } else if (currentModuleIndex < modules.length - 1) {
        setCurrentModuleIndex((prevModuleIndex) => prevModuleIndex + 1)
        return 0
      } else {
        localStorage.setItem(
          "psikotestResponses",
          JSON.stringify({
            responses,
            modules,
            completedAt: new Date().toISOString(),
            timingData,
            totalTimeSpent,
          }),
        )
        router.push("/visual-iq")
        return prevIndex
      }
    })
  }

  const handleAnswer = (optionIndex: number) => {
    const questionId = currentQuestion.id
    setResponses({
      ...responses,
      [questionId]: optionIndex,
    })

    moveToNextQuestion()
  }

  const handleTimeUp = useCallback(() => {
    moveToNextQuestion()
  }, [currentModuleIndex, currentQuestionIndex, modules, questions, responses, router])

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1)
      const prevModule = modules[currentModuleIndex - 1]
      setCurrentQuestionIndex((questions[prevModule]?.length || 1) - 1)
    }
  }

  const handleSkip = () => {
    moveToNextQuestion()
  }

  useEffect(() => {
    const data = localStorage.getItem("psikotestParticipant")
    if (!data) {
      router.push("/")
      return
    }

    const participantData = JSON.parse(data) as ParticipantData
    setParticipant(participantData)

    const testPlan = getTestPlan(participantData.position, participantData.department)
    const testModules = getTestModules(testPlan)
    setModules(testModules)

    const allQuestions = getAllTestQuestions(testModules, participantData.position)

    const limitedQuestions: Record<string, any[]> = {}
    const questionCount = getQuestionCount(testPlan)

    Object.entries(allQuestions).forEach(([module, qs]) => {
      limitedQuestions[module] = qs.slice(0, questionCount)
    })

    setQuestions(limitedQuestions)
    questionStartTime.current = Date.now()
  }, [router])

  useEffect(() => {
    const currentModule = modules[currentModuleIndex]
    const currentQuestions = questions[currentModule] || []
    const currentQuestion = currentQuestions[currentQuestionIndex]

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
  }, [currentModuleIndex, currentQuestionIndex, modules, questions])

  if (!participant || modules.length === 0) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const currentModule = modules[currentModuleIndex]
  const currentQuestions = questions[currentModule] || []
  const currentQuestion = currentQuestions[currentQuestionIndex]

  const totalQuestions = modules.reduce((sum, module) => {
    return sum + (questions[module]?.length || 0)
  }, 0)

  const answeredQuestions = Object.keys(responses).length
  const progressPercent = Math.round((answeredQuestions / totalQuestions) * 100)

  const moduleNames: Record<string, string> = {
    A: "Tes Kemampuan Kognitif",
    B: "Tes Kepribadian",
    C: "Tes Keterampilan Khusus",
    D: "Tes Kesesuaian Peran",
    E: "Tes Kesehatan Mental",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{moduleNames[currentModule]}</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600">
                  {answeredQuestions} / {totalQuestions}
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
              <TestQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
                selected={responses[currentQuestion.id]}
              />

              <div className="flex gap-3 pt-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentModuleIndex === 0 && currentQuestionIndex === 0}
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

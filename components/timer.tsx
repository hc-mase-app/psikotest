"use client"

import { useEffect, useState, useRef } from "react"

interface TimerProps {
  timeLimit: number // in seconds
  onTimeUp: () => void
  isActive: boolean
}

export default function Timer({ timeLimit, onTimeUp, isActive }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit)
  const [timedOut, setTimedOut] = useState(false)
  const onTimeUpRef = useRef(onTimeUp)

  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  useEffect(() => {
    if (!isActive || timedOut) {
      return
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTimedOut(true)
          return timeLimit
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, timedOut, timeLimit])

  useEffect(() => {
    if (timedOut) {
      onTimeUpRef.current()
      setTimedOut(false)
    }
  }, [timedOut])

  // Reset timer when isActive or timeLimit changes
  useEffect(() => {
    setTimeRemaining(timeLimit)
    setTimedOut(false)
  }, [isActive, timeLimit])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const isWarning = timeRemaining <= 10

  return (
    <div
      className={`flex items-center justify-center w-16 h-16 rounded-full text-center font-bold text-lg transition-colors ${
        isWarning ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
      }`}
    >
      <div>
        <div className="text-xs text-gray-600 mb-1">Sisa Waktu</div>
        <div>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  )
}

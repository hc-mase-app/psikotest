"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import emailjs from "@emailjs/browser"
import {
  attitudePool,
  iqPool,
  visualPool,
  papikQuestions,
  shuffleArray,
  type AttitudeQuestion,
  type IQQuestion,
  type VisualQuestion,
} from "@/lib/psikotest-data"
import { getDiscRange, discDescriptions, getDiscProfile } from "@/lib/disc-interpreter"

const TOTAL_PAGES = 7 // Changed from 6 to 7 to include instructions page

const TIMER_LIMITS = {
  attitude: 30, // 30 seconds per question
  iq: 60, // 60 seconds per question
  visual: 45, // 45 seconds per question
  papikostick: 30, // 30 seconds per question
}

export default function PsikotestPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authenticatedUser, setAuthenticatedUser] = useState<{ userId: string; name: string } | null>(null)

  useEffect(() => {
    const userStr = localStorage.getItem("psikotestUser")
    if (!userStr) {
      router.push("/login")
      return
    }

    try {
      const user = JSON.parse(userStr)
      setAuthenticatedUser(user)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("[v0] Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    site: "",
    nik: "",
    wa: "",
    tanggal: "",
  })

  useEffect(() => {
    if (authenticatedUser && !formData.nama) {
      setFormData((prev) => ({ ...prev, nama: authenticatedUser.name }))
    }
  }, [authenticatedUser, formData.nama])

  const [attitudeQuestions, setAttitudeQuestions] = useState<AttitudeQuestion[]>([])
  const [iqQuestions, setIQQuestions] = useState<IQQuestion[]>([])
  const [visualQuestions, setVisualQuestions] = useState<VisualQuestion[]>([])

  const [currentAttitudeIndex, setCurrentAttitudeIndex] = useState(0)
  const [currentIQIndex, setCurrentIQIndex] = useState(0)
  const [currentVisualIndex, setCurrentVisualIndex] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  const [attitudeAnswers, setAttitudeAnswers] = useState<Record<number, number>>({})
  const [iqAnswers, setIQAnswers] = useState<Record<number, string>>({})
  const [visualAnswers, setVisualAnswers] = useState<Record<number, string>>({})
  const [papikAnswers, setPapikAnswers] = useState<Array<{ most: number; least: number }>>([])
  const [papikIndex, setPapikIndex] = useState(0)

  const [mostSelected, setMostSelected] = useState<number | null>(null)
  const [leastSelected, setLeastSelected] = useState<number | null>(null)

  const [timeRemaining, setTimeRemaining] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [testStartTime, setTestStartTime] = useState<number>(0)
  const [sectionTimes, setSectionTimes] = useState({
    attitude: 0,
    iq: 0,
    visual: 0,
    papikostick: 0,
  })
  const [sectionStartTime, setSectionStartTime] = useState<number>(0)
  const [timeoutCount, setTimeoutCount] = useState(0)

  useEffect(() => {
    setAttitudeQuestions(shuffleArray(attitudePool))
    setIQQuestions(shuffleArray(iqPool))
    setVisualQuestions(shuffleArray(visualPool))
  }, [])

  useEffect(() => {
    if (!timerActive || timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - auto advance
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerActive, timeRemaining, currentPage, currentAttitudeIndex, currentIQIndex, currentVisualIndex, papikIndex])

  useEffect(() => {
    if (currentPage === 3 && attitudeQuestions.length > 0) {
      // Changed from 2 to 3 for attitude page
      setTimeRemaining(TIMER_LIMITS.attitude)
      setTimerActive(true)
    } else if (currentPage === 4 && iqQuestions.length > 0) {
      // Changed from 3 to 4 for IQ page
      setTimeRemaining(TIMER_LIMITS.iq)
      setTimerActive(true)
    } else if (currentPage === 5 && visualQuestions.length > 0) {
      // Changed from 4 to 5 for visual page
      setTimeRemaining(TIMER_LIMITS.visual)
      setTimerActive(true)
    } else if (currentPage === 6) {
      // Changed from 5 to 6 for Papikostick page
      setTimeRemaining(TIMER_LIMITS.papikostick)
      setTimerActive(true)
    } else {
      setTimerActive(false)
    }
  }, [
    currentPage,
    currentAttitudeIndex,
    currentIQIndex,
    currentVisualIndex,
    papikIndex,
    attitudeQuestions.length,
    iqQuestions.length,
    visualQuestions.length,
  ])

  useEffect(() => {
    if (currentPage === 3 && sectionStartTime === 0) {
      // Changed from 2 to 3
      setSectionStartTime(Date.now())
    } else if (currentPage === 4 && sectionTimes.attitude === 0) {
      // Changed from 3 to 4
      const elapsed = Math.floor((Date.now() - sectionStartTime) / 1000)
      setSectionTimes((prev) => ({ ...prev, attitude: elapsed }))
      setSectionStartTime(Date.now())
    } else if (currentPage === 5 && sectionTimes.iq === 0 && sectionTimes.attitude > 0) {
      // Changed from 4 to 5
      const elapsed = Math.floor((Date.now() - sectionStartTime) / 1000)
      setSectionTimes((prev) => ({ ...prev, iq: elapsed }))
      setSectionStartTime(Date.now())
    } else if (currentPage === 6 && sectionTimes.visual === 0 && sectionTimes.iq > 0) {
      // Changed from 5 to 6
      const elapsed = Math.floor((Date.now() - sectionStartTime) / 1000)
      setSectionTimes((prev) => ({ ...prev, visual: elapsed }))
      setSectionStartTime(Date.now())
    } else if (currentPage === 7 && sectionTimes.papikostick === 0 && sectionTimes.visual > 0) {
      // Changed from 6 to 7
      const elapsed = Math.floor((Date.now() - sectionStartTime) / 1000)
      setSectionTimes((prev) => ({ ...prev, papikostick: elapsed }))
    }
  }, [currentPage, sectionStartTime, sectionTimes])

  useEffect(() => {
    if (currentPage === 3 && testStartTime === 0) {
      // Changed from 2 to 3
      setTestStartTime(Date.now())
    }
  }, [currentPage, testStartTime])

  const handleTimeout = () => {
    setTimeoutCount((prev) => prev + 1)
    setTimerActive(false)

    if (currentPage === 3) {
      // Changed from 2 to 3
      // Attitude timeout - mark as unanswered (0) and advance
      if (currentAttitudeIndex < attitudeQuestions.length - 1) {
        setFadeOut(true)
        setTimeout(() => {
          setCurrentAttitudeIndex(currentAttitudeIndex + 1)
          setFadeOut(false)
        }, 300)
      } else {
        showPage(4) // Changed from 3 to 4
        setCurrentIQIndex(0)
      }
    } else if (currentPage === 4) {
      // Changed from 3 to 4
      // IQ timeout - mark as unanswered and advance
      if (currentIQIndex < iqQuestions.length - 1) {
        setFadeOut(true)
        setTimeout(() => {
          setCurrentIQIndex(currentIQIndex + 1)
          setFadeOut(false)
        }, 300)
      } else {
        showPage(5) // Changed from 4 to 5
        setCurrentVisualIndex(0)
      }
    } else if (currentPage === 5) {
      // Changed from 4 to 5
      // Visual timeout - mark as unanswered and advance
      if (currentVisualIndex < visualQuestions.length - 1) {
        setFadeOut(true)
        setTimeout(() => {
          setCurrentVisualIndex(currentVisualIndex + 1)
          setFadeOut(false)
        }, 300)
      } else {
        showPage(6) // Changed from 5 to 6
        setPapikIndex(0)
        setPapikAnswers([])
        setMostSelected(null)
        setLeastSelected(null)
      }
    } else if (currentPage === 6) {
      // Changed from 5 to 6
      // Papikostick timeout - skip this question
      if (papikIndex < papikQuestions.length - 1) {
        setPapikIndex(papikIndex + 1)
        setMostSelected(null)
        setLeastSelected(null)
      } else {
        showPage(7) // Changed from 6 to 7
      }
    }
  }

  const showPage = (n: number) => {
    setCurrentPage(n)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePage1Next = () => {
    const required = ["nama", "jabatan", "site", "nik", "wa", "tanggal"]
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        alert("Mohon lengkapi semua data terlebih dahulu.")
        return
      }
    }
    showPage(2)
  }

  const handleAttitudeAnswer = (value: number) => {
    const newAnswers = { ...attitudeAnswers, [currentAttitudeIndex]: value }
    setAttitudeAnswers(newAnswers)
    setTimerActive(false)

    setFadeOut(true)
    setTimeout(() => {
      if (currentAttitudeIndex < attitudeQuestions.length - 1) {
        setCurrentAttitudeIndex(currentAttitudeIndex + 1)
      } else {
        showPage(4) // Changed from 3 to 4
        setCurrentIQIndex(0)
      }
      setFadeOut(false)
    }, 300)
  }

  const handleIQAnswer = (value: string) => {
    const newAnswers = { ...iqAnswers, [currentIQIndex]: value }
    setIQAnswers(newAnswers)
    setTimerActive(false)

    setFadeOut(true)
    setTimeout(() => {
      if (currentIQIndex < iqQuestions.length - 1) {
        setCurrentIQIndex(currentIQIndex + 1)
      } else {
        showPage(5) // Changed from 4 to 5
        setCurrentVisualIndex(0)
      }
      setFadeOut(false)
    }, 300)
  }

  const handleVisualAnswer = (value: string) => {
    const newAnswers = { ...visualAnswers, [currentVisualIndex]: value }
    setVisualAnswers(newAnswers)
    setTimerActive(false)

    setFadeOut(true)
    setTimeout(() => {
      if (currentVisualIndex < visualQuestions.length - 1) {
        setCurrentVisualIndex(currentVisualIndex + 1)
      } else {
        showPage(6) // Changed from 5 to 6
        setPapikIndex(0)
        setPapikAnswers([])
        setMostSelected(null)
        setLeastSelected(null)
      }
      setFadeOut(false)
    }, 300)
  }

  const calculateScores = () => {
    let attitudeScore = 0
    attitudeQuestions.forEach((q, idx) => {
      const answer = attitudeAnswers[idx] || 0
      if (q.key > 0) {
        attitudeScore += answer
      } else {
        attitudeScore += 6 - answer
      }
    })
    const attitudePercent = (attitudeScore / (attitudeQuestions.length * 5)) * 100

    let iqCorrect = 0
    iqQuestions.forEach((q, idx) => {
      if (iqAnswers[idx] === q.correct) iqCorrect++
    })
    const iqPercent = (iqCorrect / iqQuestions.length) * 100

    let visualCorrect = 0
    visualQuestions.forEach((q, idx) => {
      if (visualAnswers[idx] === q.correct) visualCorrect++
    })
    const visualPercent = (visualCorrect / visualQuestions.length) * 100

    const faktorSkor: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 }
    const traitCount: Record<string, { most: number; least: number }> = {
      D: { most: 0, least: 0 },
      I: { most: 0, least: 0 },
      S: { most: 0, least: 0 },
      C: { most: 0, least: 0 },
    }

    console.log("[v0] Total Papik Answers:", papikAnswers.length)

    papikAnswers.forEach((item, idx) => {
      const question = papikQuestions[idx]
      console.log(`[v0] Q${idx + 1}: MOST=${item.most}, LEAST=${item.least}`)
      console.log(`[v0] Q${idx + 1} Statements:`, question.statements.map((s, i) => `${i}:${s.trait}`).join(", "))

      const mostTrait = question.statements[item.most].trait
      const leastTrait = question.statements[item.least].trait

      console.log(`[v0] Q${idx + 1}: MOST trait=${mostTrait}, LEAST trait=${leastTrait}`)

      faktorSkor[mostTrait] += 2
      faktorSkor[leastTrait] -= 1

      traitCount[mostTrait].most++
      traitCount[leastTrait].least++
    })

    console.log("[v0] Trait Selection Count:", traitCount)
    console.log("[v0] DISC Scores:", faktorSkor)

    const jabatanLower = formData.jabatan.toLowerCase()

    // Define ideal DISC profiles for different job categories
    const discProfiles: Record<string, { D: number; I: number; S: number; C: number; weight: number }> = {
      // Leadership & Management (High D, moderate I)
      manager: { D: 60, I: 40, S: 20, C: 30, weight: 0.25 },
      supervisor: { D: 55, I: 35, S: 25, C: 35, weight: 0.25 },
      leader: { D: 60, I: 40, S: 20, C: 30, weight: 0.25 },
      kepala: { D: 60, I: 40, S: 20, C: 30, weight: 0.25 },

      // Sales & Marketing (High I, moderate D)
      sales: { D: 35, I: 65, S: 20, C: 25, weight: 0.25 },
      marketing: { D: 30, I: 60, S: 25, C: 30, weight: 0.25 },

      // Technical & Analytical (High C, moderate D)
      engineer: { D: 35, I: 20, S: 30, C: 65, weight: 0.25 },
      teknisi: { D: 35, I: 20, S: 30, C: 65, weight: 0.25 },
      analyst: { D: 30, I: 25, S: 25, C: 70, weight: 0.25 },
      programmer: { D: 25, I: 20, S: 30, C: 70, weight: 0.25 },
      it: { D: 30, I: 25, S: 30, C: 65, weight: 0.25 },

      // Support & Administrative (High S, moderate C)
      admin: { D: 20, I: 30, S: 60, C: 45, weight: 0.25 },
      staff: { D: 25, I: 30, S: 55, C: 40, weight: 0.25 },
      operator: { D: 25, I: 25, S: 60, C: 40, weight: 0.25 },
      helper: { D: 20, I: 25, S: 65, C: 35, weight: 0.25 },

      // Customer Service (High I and S)
      cs: { D: 20, I: 55, S: 55, C: 30, weight: 0.25 },
      customer: { D: 20, I: 55, S: 55, C: 30, weight: 0.25 },

      // Default balanced profile
      default: { D: 40, I: 40, S: 40, C: 40, weight: 0.15 },
    }

    // Find matching profile
    let matchedProfile = discProfiles.default
    for (const [key, profile] of Object.entries(discProfiles)) {
      if (jabatanLower.includes(key)) {
        matchedProfile = profile
        break
      }
    }

    // Normalize DISC scores to 0-100 scale (typical range is -50 to +100)
    const normalizeDISC = (score: number) => {
      const normalized = ((score + 50) / 150) * 100
      return Math.max(0, Math.min(100, normalized))
    }

    const normalizedD = normalizeDISC(faktorSkor.D)
    const normalizedI = normalizeDISC(faktorSkor.I)
    const normalizedS = normalizeDISC(faktorSkor.S)
    const normalizedC = normalizeDISC(faktorSkor.C)

    // Calculate DISC fit score (0-100)
    const dDiff = Math.abs(normalizedD - matchedProfile.D)
    const iDiff = Math.abs(normalizedI - matchedProfile.I)
    const sDiff = Math.abs(normalizedS - matchedProfile.S)
    const cDiff = Math.abs(normalizedC - matchedProfile.C)

    const avgDiff = (dDiff + iDiff + sDiff + cDiff) / 4
    const discFitScore = Math.max(0, 100 - avgDiff)

    console.log("[v0] DISC Fit Calculation:", {
      jabatan: formData.jabatan,
      matchedProfile: matchedProfile,
      normalized: { D: normalizedD, I: normalizedI, S: normalizedS, C: normalizedC },
      differences: { D: dDiff, I: iDiff, S: sDiff, C: cDiff },
      avgDiff,
      discFitScore,
    })

    const discRangeD = getDiscRange(faktorSkor.D)
    const discRangeI = getDiscRange(faktorSkor.I)
    const discRangeS = getDiscRange(faktorSkor.S)
    const discRangeC = getDiscRange(faktorSkor.C)

    const discDescD = discDescriptions.D[discRangeD.label as keyof typeof discDescriptions.D]
    const discDescI = discDescriptions.I[discRangeI.label as keyof typeof discDescriptions.I]
    const discDescS = discDescriptions.S[discRangeS.label as keyof typeof discDescriptions.S]
    const discDescC = discDescriptions.C[discRangeC.label as keyof typeof discDescriptions.C]

    // Calculate total score with DISC included
    const totalScore = (
      attitudePercent * 0.3 +
      iqPercent * 0.3 +
      visualPercent * 0.15 +
      discFitScore * matchedProfile.weight
    ).toFixed(1)

    const total = Number.parseFloat(totalScore)
    let recommendation = "TIDAK DISARANKAN"
    let recommendationReason = ""
    if (total >= 80) {
      recommendation = "DIREKOMENDASIKAN"
      recommendationReason = `Kandidat menunjukkan performa sangat baik dengan total skor ${total}%. Semua aspek penilaian (Attitude: ${attitudePercent.toFixed(1)}%, IQ: ${iqPercent.toFixed(1)}%, Visual: ${visualPercent.toFixed(1)}%, DISC Fit: ${discFitScore.toFixed(1)}%) berada di atas standar yang diharapkan untuk posisi ${formData.jabatan}.`
    } else if (total >= 65) {
      recommendation = "DISARANKAN"
      recommendationReason = `Kandidat menunjukkan performa baik dengan total skor ${total}%. Mayoritas aspek penilaian memenuhi standar, namun ada beberapa area yang bisa ditingkatkan. Attitude: ${attitudePercent.toFixed(1)}%, IQ: ${iqPercent.toFixed(1)}%, Visual: ${visualPercent.toFixed(1)}%, DISC Fit: ${discFitScore.toFixed(1)}%.`
    } else if (total >= 50) {
      recommendation = "DIPERTIMBANGKAN"
      recommendationReason = `Kandidat menunjukkan performa cukup dengan total skor ${total}%. Beberapa aspek memerlukan perhatian khusus. Attitude: ${attitudePercent.toFixed(1)}%, IQ: ${iqPercent.toFixed(1)}%, Visual: ${visualPercent.toFixed(1)}%, DISC Fit: ${discFitScore.toFixed(1)}%. Disarankan untuk interview lebih lanjut.`
    } else {
      recommendation = "TIDAK DISARANKAN"
      recommendationReason = `Kandidat menunjukkan performa di bawah standar dengan total skor ${total}%. Beberapa aspek penilaian belum memenuhi kriteria minimum untuk posisi ${formData.jabatan}. Attitude: ${attitudePercent.toFixed(1)}%, IQ: ${iqPercent.toFixed(1)}%, Visual: ${visualPercent.toFixed(1)}%, DISC Fit: ${discFitScore.toFixed(1)}%.`
    }

    return {
      attitudeScore: attitudePercent.toFixed(1),
      iqScore: iqPercent.toFixed(1),
      visualScore: visualPercent.toFixed(1),
      discFitScore: discFitScore.toFixed(1),
      totalScore,
      recommendation,
      recommendationReason, // Added recommendation reason
      dominance: faktorSkor.D,
      dominance_range: discRangeD.label,
      dominance_desc: discDescD,
      influence: faktorSkor.I,
      influence_range: discRangeI.label,
      influence_desc: discDescI,
      steadiness: faktorSkor.S,
      steadiness_range: discRangeS.label,
      steadiness_desc: discDescS,
      conscientiousness: faktorSkor.C,
      conscientiousness_range: discRangeC.label,
      conscientiousness_desc: discDescC,
      disc_profile: getDiscProfile(faktorSkor.D, faktorSkor.I, faktorSkor.S, faktorSkor.C),
      discProfileMatch: matchedProfile,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (papikAnswers.length < papikQuestions.length) {
      alert("Anda belum menyelesaikan semua pertanyaan Papikostick.")
      return
    }

    const scores = calculateScores()

    const totalTestTime = Math.floor((Date.now() - testStartTime) / 1000)
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const attitudeDetails = attitudeQuestions
      .map((q, idx) => {
        const answer = attitudeAnswers[idx] || 0
        const labels = ["", "Tidak Pernah", "Jarang", "Kadang-kadang", "Sering", "Selalu"]
        return `${idx + 1}. ${q.text}\nJawaban: ${answer} - ${labels[answer]}`
      })
      .join("\n\n")

    const iqDetails = iqQuestions
      .map((q, idx) => {
        const answer = iqAnswers[idx] || "Tidak dijawab"
        const isCorrect = answer === q.correct ? "✓ BENAR" : "✗ SALAH"
        return `${idx + 1}. ${q.question}\nJawaban: ${answer} ${isCorrect}\nJawaban Benar: ${q.correct}`
      })
      .join("\n\n")

    const visualDetails = visualQuestions
      .map((q, idx) => {
        const answer = visualAnswers[idx] || "Tidak dijawab"
        const isCorrect = answer === q.correct ? "✓ BENAR" : "✗ SALAH"
        return `${idx + 1}. ${q.question}\nJawaban: ${answer} ${isCorrect}\nJawaban Benar: ${q.correct}`
      })
      .join("\n\n")

    const templateParams = {
      to_email: "form.3s.gsm@gmail.com",
      subject: `Hasil Psikotest - ${formData.nama} - ${formData.jabatan}`,
      user_id: authenticatedUser?.userId || "N/A",
      nama: formData.nama,
      jabatan: formData.jabatan,
      site: formData.site,
      nik: formData.nik,
      wa: formData.wa,
      tanggal: formData.tanggal,
      attitude_score: scores.attitudeScore,
      iq_score: scores.iqScore,
      visual_score: scores.visualScore,
      disc_fit_score: scores.discFitScore,
      total_score: scores.totalScore,
      recommendation: scores.recommendation,
      recommendation_reason: scores.recommendationReason, // Added recommendation reason
      dominance: scores.dominance,
      dominance_range: scores.dominance_range,
      dominance_desc: scores.dominance_desc,
      influence: scores.influence,
      influence_range: scores.influence_range,
      influence_desc: scores.influence_desc,
      steadiness: scores.steadiness,
      steadiness_range: scores.steadiness_range,
      steadiness_desc: scores.steadiness_desc,
      conscientiousness: scores.conscientiousness,
      conscientiousness_range: scores.conscientiousness_range,
      conscientiousness_desc: scores.conscientiousness_desc,
      disc_profile: scores.disc_profile,
      timeout_count: timeoutCount,
    }

    try {
      await emailjs.send("service_lkcr4at", "template_jfdz2ra", templateParams, "u2JiXLjv68Q7bwpLl")

      setCurrentPage(8) // Changed from 7 to 8 because we added instructions page
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.")
    }
  }

  const renderVisualSVG = (type: string, index: number) => {
    const colors = ["#0e1f2f", "#17a2b8"]

    if (type === "bars") {
      return (
        <svg width="140" height="100" viewBox="0 0 140 100" className="mx-auto">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={10 + i * 30} y={30 + i * 8} width="18" height={60 - i * 8} fill={colors[i % 2]} />
          ))}
        </svg>
      )
    } else if (type === "circles") {
      return (
        <svg width="140" height="100" viewBox="0 0 140 100" className="mx-auto">
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={20 + i * 24} cy={50} r={8 + (i % 2 ? 3 : 0)} fill={colors[i % 2]} />
          ))}
        </svg>
      )
    } else {
      return (
        <svg width="140" height="100" viewBox="0 0 140 100" className="mx-auto">
          {[0, 1, 2].map((i) => (
            <polygon key={i} points={`${10 + i * 40},80 ${30 + i * 40},20 ${50 + i * 40},80`} fill={colors[i % 2]} />
          ))}
        </svg>
      )
    }
  }

  const handleSelection = (type: "most" | "least", value: number) => {
    if (type === "most") {
      if (leastSelected === value) {
        alert("Tidak boleh memilih pernyataan yang sama untuk MOST dan LEAST.")
        return
      }
      setMostSelected(value)
      if (leastSelected !== null && leastSelected !== value) {
        setTimerActive(false)
        setTimeout(() => {
          const newAnswers = [...papikAnswers, { most: value, least: leastSelected }]
          setPapikAnswers(newAnswers)

          if (papikIndex < papikQuestions.length - 1) {
            setPapikIndex(papikIndex + 1)
            setMostSelected(null)
            setLeastSelected(null)
          } else {
            showPage(7) // Changed from 6 to 7
          }
        }, 250)
      }
    } else {
      if (mostSelected === value) {
        alert("Tidak boleh memilih pernyataan yang sama untuk MOST dan LEAST.")
        return
      }
      setLeastSelected(value)
      if (mostSelected !== null && mostSelected !== value) {
        setTimerActive(false)
        setTimeout(() => {
          const newAnswers = [...papikAnswers, { most: mostSelected, least: value }]
          setPapikAnswers(newAnswers)

          if (papikIndex < papikQuestions.length - 1) {
            setPapikIndex(papikIndex + 1)
            setMostSelected(null)
            setLeastSelected(null)
          } else {
            showPage(7) // Changed from 6 to 7
          }
        }, 250)
      }
    }
  }

  const renderPapikQuestion = () => {
    const question = papikQuestions[papikIndex]

    return (
      <Card className="max-w-3xl mx-auto p-6">
        <h3 className="text-xl font-bold mb-2 text-[#0e1f2f]">Pertanyaan {papikIndex + 1} dari 50</h3>
        <p className="text-sm text-gray-600 mb-4">
          Pilih 1 yang <strong>Paling Menggambarkan</strong> dan 1 yang <strong>Paling Tidak Menggambarkan</strong>
        </p>
        <div className="space-y-3">
          {question.statements.map((statement, idx) => (
            <Card key={idx} className="p-4 bg-[#fbfdff] border border-[#e8eef2]">
              <p className="mb-3 font-semibold text-sm">{statement.text}</p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={mostSelected === idx ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSelection("most", idx)}
                  className={
                    mostSelected === idx
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "border-green-600 text-green-600 hover:bg-green-50"
                  }
                >
                  Paling Menggambarkan
                </Button>
                <Button
                  type="button"
                  variant={leastSelected === idx ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSelection("least", idx)}
                  className={
                    leastSelected === idx
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "border-red-600 text-red-600 hover:bg-red-50"
                  }
                >
                  Paling Tidak Menggambarkan
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-4">
          Soal bersifat satu arah — tidak dapat kembali ke soal sebelumnya.
        </p>
      </Card>
    )
  }

  const TimerDisplay = () => {
    const isWarning = timeRemaining <= 10
    return (
      <div
        className={`text-center py-4 px-6 mb-4 rounded-lg font-bold text-2xl transition-colors ${
          isWarning ? "bg-red-100 text-red-700 animate-pulse" : "bg-blue-100 text-blue-700"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl">{isWarning ? "⚠️" : "⏱️"}</span>
          <div>
            <div className="text-sm font-normal">Waktu Tersisa</div>
            <div className="text-4xl font-bold">
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
            </div>
          </div>
        </div>
        {isWarning && <div className="text-sm mt-2">Segera jawab! Waktu hampir habis!</div>}
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0e1f2f] to-[#1a3a4a]">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Memuat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <header className="bg-gradient-to-br from-[#0e1f2f] to-[#173b5b] text-white p-6 border-b-4 border-[#17a2b8]">
        <div className="text-center space-y-2">
          <h1 className="text-lg font-bold">PSIKOTEST TERPADU</h1>
          <h2 className="text-2xl font-bold">PT Sarana Sukses Sejahtera - PT Gunungmas Sukses Makmur</h2>
          <h3 className="text-sm text-[#cfe9f2]">Penilaian Attitude, IQ, Tebak Gambar, EQ</h3>
        </div>
      </header>

      <div className="max-w-5xl mx-auto my-6 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b bg-white">
          <h3 className="font-bold text-[#0e1f2f]">
            Halaman {currentPage} dari {TOTAL_PAGES}
          </h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs bg-[#eef6fa] text-[#0e1f2f]">
              Halaman {currentPage} dari {TOTAL_PAGES}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-[#eef6fa] text-[#0e1f2f]">
              {currentPage === 1 && "Data peserta"}
              {currentPage === 2 && "Instruksi"} {/* Added instructions page */}
              {currentPage === 3 && `Attitude (${currentAttitudeIndex + 1}/${attitudeQuestions.length})`}
              {currentPage === 4 && `IQ (${currentIQIndex + 1}/${iqQuestions.length})`}
              {currentPage === 5 && `Tebak Gambar (${currentVisualIndex + 1}/${visualQuestions.length})`}
              {currentPage === 6 && "Papikostick"}
              {currentPage === 7 && "Kirim"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentPage === 1 && (
            <div className="p-6">
              <Alert className="mb-4 bg-[#eef9ff] border-[#cfe9f2]">
                <AlertDescription>
                  Harap isi data dengan benar. Data digunakan untuk verifikasi hasil psikotes.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nama">Nama</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="jabatan">Jabatan / Posisi yang dilamar</Label>
                  <Input
                    id="jabatan"
                    value={formData.jabatan}
                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="site">Site Tujuan yang dilamar</Label>
                  <Input
                    id="site"
                    value={formData.site}
                    onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nik">NIK KTP</Label>
                  <Input
                    id="nik"
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    pattern="\d{8,20}"
                    title="Masukkan angka 8-20 digit"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="wa">Nomor WhatsApp</Label>
                  <Input
                    id="wa"
                    type="tel"
                    value={formData.wa}
                    onChange={(e) => setFormData({ ...formData, wa: e.target.value })}
                    pattern="\d{10,16}"
                    title="Contoh: 081234567890"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tanggal">Tanggal Test</Label>
                  <Input
                    id="tanggal"
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button type="button" onClick={handlePage1Next} className="bg-[#17a2b8] hover:bg-[#138496]">
                  Berikutnya
                </Button>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="p-6">
              <Alert className="mb-6 bg-[#eef9ff] border-[#cfe9f2]">
                <AlertDescription>
                  <strong>Penting:</strong> Baca instruksi berikut dengan seksama sebelum memulai tes.
                </AlertDescription>
              </Alert>

              <Card className="p-6 mb-4">
                <h3 className="text-xl font-bold mb-4 text-[#0e1f2f]">📋 Tata Cara Pengisian Psikotest Online</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-[#17a2b8] mb-2">1. Struktur Tes</h4>
                    <p className="text-sm text-gray-700 mb-2">Tes terdiri dari 5 bagian:</p>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                      <li>
                        <strong>Attitude Test:</strong> 25 pertanyaan tentang frekuensi perilaku kerja
                      </li>
                      <li>
                        <strong>IQ Test:</strong> 20 pertanyaan penalaran logika dan analisis
                      </li>
                      <li>
                        <strong>Visual/Pola:</strong> 15 pertanyaan pengenalan pola visual
                      </li>
                      <li>
                        <strong>Papikostick (DISC):</strong> 50 pertanyaan kepribadian kerja
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#17a2b8] mb-2">2. Batas Waktu Per Pertanyaan</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                      <li>
                        <strong>Attitude:</strong> 30 detik per pertanyaan
                      </li>
                      <li>
                        <strong>IQ Test:</strong> 60 detik per pertanyaan
                      </li>
                      <li>
                        <strong>Visual/Pola:</strong> 45 detik per pertanyaan
                      </li>
                      <li>
                        <strong>Papikostick:</strong> 30 detik per pertanyaan
                      </li>
                    </ul>
                    <p className="text-sm text-red-600 mt-2">
                      ⚠️ <strong>Penting:</strong> Jika waktu habis, sistem akan otomatis melanjutkan ke pertanyaan
                      berikutnya.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#17a2b8] mb-2">3. Aturan Penting</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                      <li>
                        <strong>Tidak bisa kembali:</strong> Setelah menjawab, Anda tidak dapat kembali ke pertanyaan
                        sebelumnya
                      </li>
                      <li>
                        <strong>Auto-advance:</strong> Setelah memilih jawaban, sistem otomatis pindah ke pertanyaan
                        berikutnya
                      </li>
                      <li>
                        <strong>Satu pertanyaan per layar:</strong> Hanya 1 pertanyaan ditampilkan pada satu waktu
                      </li>
                      <li>
                        <strong>Timer countdown:</strong> Timer akan berubah merah dan berkedip saat 10 detik terakhir
                      </li>
                      <li>
                        <strong>Jawab dengan jujur:</strong> Tidak ada jawaban benar atau salah untuk Attitude dan
                        Papikostick
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#17a2b8] mb-2">4. Tips Mengerjakan</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                      <li>Pastikan koneksi internet stabil</li>
                      <li>Kerjakan di tempat yang tenang dan tidak terganggu</li>
                      <li>Baca pertanyaan dengan teliti sebelum menjawab</li>
                      <li>Jawab sesuai kondisi sebenarnya, bukan yang ideal</li>
                      <li>Jangan terlalu lama berpikir, ikuti insting pertama Anda</li>
                      <li>Perhatikan timer agar tidak kehabisan waktu</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#17a2b8] mb-2">5. Penilaian</h4>
                    <p className="text-sm text-gray-700">Hasil tes akan dikirim langsung ke Tim HR dan mencakup:</p>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4 mt-2">
                      <li>Skor Attitude (30% dari total)</li>
                      <li>Skor IQ (30% dari total)</li>
                      <li>Skor Visual (15% dari total)</li>
                      <li>Skor DISC Fit (15-25% dari total)</li>
                      <li>Profil kepribadian DISC (Dominance, Influence, Steadiness, Conscientiousness)</li>
                      <li>Rekomendasi final berdasarkan kesesuaian dengan jabatan</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <p className="text-sm font-bold text-yellow-800 mb-2">⚠️ Peringatan Anti-Kecurangan</p>
                    <p className="text-sm text-yellow-700">
                      Batas waktu dirancang untuk mencegah kecurangan (bertanya ke AI atau mencari jawaban online).
                      Sistem akan mencatat jumlah pertanyaan yang timeout sebagai indikator kecurangan. Jawablah dengan
                      jujur dan cepat sesuai kemampuan Anda.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="flex justify-end mt-6">
                <Button type="button" onClick={() => showPage(3)} className="bg-[#17a2b8] hover:bg-[#138496]">
                  Saya Mengerti, Mulai Tes
                </Button>
              </div>
            </div>
          )}

          {currentPage === 3 && attitudeQuestions.length > 0 && (
            <div className="p-6">
              <TimerDisplay />

              <Alert className="mb-4 bg-[#eef9ff] border-[#cfe9f2]">
                <AlertDescription>
                  Jawab jujur berdasarkan frekuensi perilaku Anda. Skala: 1 (Tidak Pernah) – 5 (Selalu). Waktu: 30 detik
                  per pertanyaan.
                </AlertDescription>
              </Alert>

              <div
                className={`transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}
                key={currentAttitudeIndex}
              >
                <Card className="p-6 border border-[#e8eef2] bg-[#fbfdff]">
                  <h4 className="font-semibold mb-4 text-lg">
                    {currentAttitudeIndex + 1}. {attitudeQuestions[currentAttitudeIndex].text}
                  </h4>
                  <RadioGroup onValueChange={(value) => handleAttitudeAnswer(Number.parseInt(value))}>
                    <div className="flex flex-col gap-3">
                      {[
                        { val: 1, label: "Tidak Pernah" },
                        { val: 2, label: "Jarang" },
                        { val: 3, label: "Kadang-kadang" },
                        { val: 4, label: "Sering" },
                        { val: 5, label: "Selalu" },
                      ].map(({ val, label }) => (
                        <label
                          key={val}
                          className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded"
                        >
                          <RadioGroupItem value={val.toString()} />
                          <span className="text-base">
                            {val} - {label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </Card>
              </div>
            </div>
          )}

          {currentPage === 4 && iqQuestions.length > 0 && (
            <div className="p-6">
              <TimerDisplay />

              <Alert className="mb-4 bg-[#eef9ff] border-[#cfe9f2]">
                <AlertDescription>Pilih jawaban terbaik. Waktu: 60 detik per pertanyaan.</AlertDescription>
              </Alert>

              <div
                className={`transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}
                key={currentIQIndex}
              >
                <Card className="p-6 border border-[#e8eef2] bg-[#fbfdff]">
                  <h4 className="font-semibold mb-4 text-lg">
                    {currentIQIndex + 1}. {iqQuestions[currentIQIndex].question}
                  </h4>
                  <RadioGroup onValueChange={(value) => handleIQAnswer(value)}>
                    <div className="flex flex-col gap-3">
                      {iqQuestions[currentIQIndex].options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded"
                        >
                          <RadioGroupItem value={opt} />
                          <span className="text-base">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </Card>
              </div>
            </div>
          )}

          {currentPage === 5 && visualQuestions.length > 0 && (
            <div className="p-6">
              <TimerDisplay />

              <Alert className="mb-4 bg-[#eef9ff] border-[#cfe9f2]">
                <AlertDescription>
                  Amati pola visual sederhana dan pilih jawaban yang tepat. Waktu: 45 detik per pertanyaan.
                </AlertDescription>
              </Alert>

              <div
                className={`transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}
                key={currentVisualIndex}
              >
                <Card className="p-6 border border-[#e8eef2] bg-[#fbfdff]">
                  <h4 className="font-semibold mb-4 text-lg">
                    {currentVisualIndex + 1}. {visualQuestions[currentVisualIndex].question}
                  </h4>
                  <div className="bg-white border border-[#e8eef2] rounded-lg p-4 mb-4 inline-block">
                    {renderVisualSVG(visualQuestions[currentVisualIndex].type, currentVisualIndex)}
                  </div>
                  <RadioGroup onValueChange={(value) => handleVisualAnswer(value)}>
                    <div className="flex flex-col gap-3">
                      {visualQuestions[currentVisualIndex].options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded"
                        >
                          <RadioGroupItem value={opt} />
                          <span className="text-base">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </Card>
              </div>
            </div>
          )}

          {currentPage === 6 && (
            <div className="p-6">
              <TimerDisplay />

              <Alert className="mb-4 bg-[#eef9ff] border-[#cfe9f2]">
                <AlertDescription>
                  Pilih satu yang <strong>Paling Menggambarkan</strong> (MOST) dan satu yang{" "}
                  <strong>Paling Tidak Menggambarkan</strong> (LEAST). Waktu: 30 detik per pertanyaan. Setelah memilih
                  keduanya, soal akan berganti otomatis. Anda <strong>tidak dapat kembali</strong> ke soal sebelumnya.
                </AlertDescription>
              </Alert>

              {renderPapikQuestion()}
            </div>
          )}

          {currentPage === 7 && (
            <div className="p-6">
              <Alert className="mb-4 bg-[#eef9ff] border-[#cfe9f2]">
                <AlertDescription>
                  Semua jawaban sudah lengkap. Tekan <strong>Kirim ke HR</strong> untuk mengirimkan hasil ke tim HR.
                  Setelah dikirim, hasil tidak akan ditampilkan di layar.
                </AlertDescription>
              </Alert>

              <div className="flex gap-4">
                <Button type="submit" className="bg-[#17a2b8] hover:bg-[#138496]">
                  Kirim ke HR
                </Button>
              </div>
            </div>
          )}

          {currentPage === 8 && (
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-4 text-[#0e1f2f]">Terima Kasih</h3>
              <p className="mb-2">
                Hasil jawaban Anda telah dikirim ke Tim HR. Anda akan dihubungi jika hasil dinyatakan lolos, paling
                lambat 7 hari kerja.
              </p>
              <p className="text-sm text-gray-600">Untuk konfirmasi, hubungi: Psikotest@hc.3s-gsm.com</p>
            </div>
          )}
        </form>

        <footer className="text-center text-xs text-gray-500 p-4 border-t">@ 2025 Yan Firdaus | HCD | HCGA</footer>
      </div>
    </div>
  )
}

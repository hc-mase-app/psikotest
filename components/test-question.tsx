"use client"

import type { TestQuestion as TestQuestionType } from "@/lib/types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface TestQuestionProps {
  question: TestQuestionType
  onAnswer: (optionIndex: number) => void
  selected?: number
}

export default function TestQuestion({ question, onAnswer, selected }: TestQuestionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{question.question}</h3>

        <RadioGroup
          value={selected !== undefined ? selected.toString() : undefined}
          onValueChange={(value) => onAnswer(Number.parseInt(value))}
        >
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer p-3 rounded-lg border-2 border-transparent hover:border-blue-200 transition-colors"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

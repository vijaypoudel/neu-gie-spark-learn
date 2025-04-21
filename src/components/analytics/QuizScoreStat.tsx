
import React from "react";
import QuizSubjectSelector from "./QuizSubjectSelector";

interface Props {
  averageScore: number;
  subject: string;
  onSubjectChange: (value: string) => void;
}

const QuizScoreStat = ({ averageScore, subject, onSubjectChange }: Props) => (
  <div className="grid grid-cols-3 gap-3">
    <div className="bg-orange-50/60 p-3 rounded-lg">
      <div className="text-xl font-bold text-orange-600">{averageScore}%</div>
      <div className="text-xs text-gray-500">Average</div>
    </div>
    <div className="flex-1 col-span-2">
      <QuizSubjectSelector value={subject} onChange={onSubjectChange} />
    </div>
  </div>
);

export default QuizScoreStat;

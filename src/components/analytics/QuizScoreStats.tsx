
import React from "react";
import QuizScoreStat from "./QuizScoreStat";

interface Props {
  averageScore: number;
  subject: string;
  onSubjectChange: (value: string) => void;
}

const QuizScoreStats: React.FC<Props> = ({ averageScore, subject, onSubjectChange }) => (
  <QuizScoreStat
    averageScore={averageScore}
    subject={subject}
    onSubjectChange={onSubjectChange}
  />
);

export default QuizScoreStats;

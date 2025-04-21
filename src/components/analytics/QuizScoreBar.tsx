
import React from "react";
import QuizScoreBarChart from "./QuizScoreBarChart";

interface Props {
  subject: string;
  weeksToShow: string[];
  averageScore: number;
}

const QuizScoreBar: React.FC<Props> = ({ subject, weeksToShow, averageScore }) => (
  <QuizScoreBarChart
    subject={subject}
    weeksToShow={weeksToShow}
    averageScore={averageScore}
  />
);

export default QuizScoreBar;

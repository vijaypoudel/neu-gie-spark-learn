
import React, { useMemo, useState } from "react";
import { Star } from "lucide-react";
import ChartCard from "./ChartCard";
import TimeRangeSelector from "./TimeRangeSelector";
import QuizScoreStat from "./QuizScoreStat";
import QuizScoreBarChart from "./QuizScoreBarChart";
import {
  weekData,
  subjectList,
  getWeeksForTimeline,
  averageScoreForTimeline,
} from "./quizScoreUtils";

const QuizScoreChart = () => {
  const [subject, setSubject] = useState(subjectList[0]);
  const [timeline, setTimeline] = useState("3");

  const timelineOptions = [
    { value: "1", label: "1M" },
    { value: "2", label: "2M" },
    { value: "3", label: "3M" },
  ];

  const handleTimelineChange = (value: string | number) => {
    setTimeline(String(value));
  };

  const weeksToShow = useMemo(() => getWeeksForTimeline(Number(timeline)), [timeline]);
  const averageScore = useMemo(() =>
    averageScoreForTimeline(weekData, subject, weeksToShow), [subject, weeksToShow]
  );

  return (
    <div className="flex flex-col space-y-2">
      <ChartCard
        title="Quiz Scores"
        icon={Star}
        timeControls={
          <TimeRangeSelector 
            options={timelineOptions} 
            currentValue={timeline}
            onChange={handleTimelineChange}
          />
        }
        legend="Weekly subject quiz performance"
      >
        <QuizScoreStat
          averageScore={averageScore}
          subject={subject}
          onSubjectChange={setSubject}
        />

        <QuizScoreBarChart
          subject={subject}
          weeksToShow={weeksToShow}
          averageScore={averageScore}
        />
      </ChartCard>
    </div>
  );
};

export default QuizScoreChart;

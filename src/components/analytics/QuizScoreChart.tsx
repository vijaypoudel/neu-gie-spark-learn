
import React, { useMemo, useState } from "react";
import { Star } from "lucide-react";
import ChartCard from "./ChartCard";
import TimeRangeSelector from "./TimeRangeSelector";
import QuizScoreStats from "./QuizScoreStats";
import QuizScoreBar from "./QuizScoreBar";
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
          <div className="flex flex-wrap gap-2 md:gap-2">
            <TimeRangeSelector 
              options={timelineOptions} 
              currentValue={timeline}
              onChange={handleTimelineChange}
              className="!gap-2"
            />
          </div>
        }
        legend="Weekly subject quiz performance"
      >
        <QuizScoreStats
          averageScore={averageScore}
          subject={subject}
          onSubjectChange={setSubject}
        />

        <QuizScoreBar
          subject={subject}
          weeksToShow={weeksToShow}
          averageScore={averageScore}
        />
      </ChartCard>
    </div>
  );
};

export default QuizScoreChart;

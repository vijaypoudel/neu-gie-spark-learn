
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { subjectList } from "./quizScoreUtils";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const QuizSubjectSelector = ({ value, onChange }: Props) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full border-orange-200 shadow bg-white h-10 rounded-xl font-medium text-base transition focus:ring-2 focus:ring-orange-200 px-3">
      <SelectValue placeholder="Subject" />
    </SelectTrigger>
    <SelectContent className="z-[1110] mt-2 rounded-xl">
      {subjectList.map(sub => (
        <SelectItem
          key={sub}
          value={sub}
          className="rounded-md font-semibold text-base px-3 py-2 transition-all hover:bg-orange-50 data-[state=checked]:bg-orange-50 data-[state=checked]:text-orange-900"
        >
          {sub}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default QuizSubjectSelector;


import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface GoalInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Custom Learning Goals</h3>
      <p className="text-sm text-gray-500">
        Add any specific learning goals or activities you'd like included in the weekly plan.
      </p>
      <Textarea 
        placeholder="e.g., Work on multiplication tables, read a chapter book, practice piano..."
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
};

export default GoalInput;


import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface GoalInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ value, onChange }) => {
  const characterCount = value.length;
  const maxCharacters = 500;
  
  return (
    <div className="space-y-3">
      <div>
        <h3 className="brand-card-title">Custom Learning Goals</h3>
        <p className="text-sm text-gray-600 mt-1">
          Add specific learning goals or activities for this week's plan.
        </p>
      </div>
      <div className="relative">
        <Textarea 
          placeholder="e.g., Focus on multiplication tables, read a chapter book, practice piano for 30 minutes daily..."
          value={value}
          onChange={onChange}
          rows={4}
          maxLength={maxCharacters}
          className="w-full rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 resize-none text-base leading-relaxed"
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
          {characterCount}/{maxCharacters}
        </div>
      </div>
    </div>
  );
};

export default GoalInput;

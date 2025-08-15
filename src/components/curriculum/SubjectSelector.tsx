
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Subject {
  id: string;
  name: string;
  icon: string;
}

interface SubjectSelectorProps {
  subjects: Subject[];
  onSelect: (subjectId: string) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ subjects, onSelect }) => {
  const [open, setOpen] = useState(false);

  if (subjects.length === 0) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="mr-1 h-4 w-4" />
          Add Subject
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid gap-1">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-accent/50 rounded-md transition-colors"
              onClick={() => {
                onSelect(subject.id);
                setOpen(false);
              }}
            >
              <span className="text-lg">{subject.icon}</span>
              <span>{subject.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SubjectSelector;

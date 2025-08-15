
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
        <Button 
          variant="outline" 
          className="h-12 px-6 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 rounded-xl"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Subject
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-72 p-0 bg-white border-2 border-gray-100 shadow-xl rounded-xl" 
        sideOffset={8}
      >
        <div className="p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Choose Subjects</h4>
          <div className="grid gap-2 max-h-64 overflow-y-auto">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                className="flex items-center gap-3 w-full text-left p-3 hover:bg-orange-50 rounded-lg transition-colors group"
                onClick={() => {
                  onSelect(subject.id);
                  setOpen(false);
                }}
              >
                <span className="text-xl">{subject.icon}</span>
                <span className="font-medium text-gray-700 group-hover:text-orange-600">
                  {subject.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SubjectSelector;

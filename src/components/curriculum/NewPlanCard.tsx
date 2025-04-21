
import React from 'react';
import { ChevronLeft, Plus, RotateCw, Save, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import SubjectSelector from './SubjectSelector';
import GoalInput from './GoalInput';

interface Subject {
  id: string;
  name: string;
  icon: string;
}

interface NewPlanCardProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  subjects: Subject[];
  selectedSubjects: string[];
  onAddSubject: (subjectId: string) => void;
  onRemoveSubject: (subjectId: string) => void;
  customGoals: string;
  onGoalsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  generatedPlan: string | null;
  isGenerating: boolean;
  onGeneratePlan: () => void;
  onSavePlan: () => void;
}

const NewPlanCard: React.FC<NewPlanCardProps> = ({
  isOpen,
  onOpenChange,
  subjects,
  selectedSubjects,
  onAddSubject,
  onRemoveSubject,
  customGoals,
  onGoalsChange,
  generatedPlan,
  isGenerating,
  onGeneratePlan,
  onSavePlan
}) => {
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={onOpenChange}
      className="mb-8"
    >
      <Card>
        <CollapsibleTrigger asChild>
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
            <h2 className="brand-card-title">Create New Weekly Plan</h2>
            <ChevronLeft className={`transform transition-transform ${isOpen ? 'rotate-90' : '-rotate-90'}`} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-6">
            <div>
              <h3 className="brand-card-title mb-2">Select Subjects</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedSubjects.map(subjectId => {
                  const subject = subjects.find(s => s.id === subjectId);
                  return (
                    <div key={subjectId} className="brand-chip flex items-center gap-1">
                      <span>{subject?.icon}</span>
                      <span>{subject?.name}</span>
                      <button 
                        onClick={() => onRemoveSubject(subjectId)}
                        className="ml-1 text-orange-600 hover:text-orange-800"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <SubjectSelector 
                subjects={subjects.filter(s => !selectedSubjects.includes(s.id))} 
                onSelect={onAddSubject} 
              />
            </div>

            <GoalInput 
              value={customGoals} 
              onChange={onGoalsChange} 
            />

            {!generatedPlan && (
              <Button 
                onClick={onGeneratePlan}
                disabled={selectedSubjects.length === 0 || isGenerating}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-400"
              >
                {isGenerating ? (
                  <>
                    <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Generate Weekly Plan
                  </>
                )}
              </Button>
            )}

            {generatedPlan && (
              <div className="space-y-4">
                <div className="border rounded-md bg-gray-50 p-4 whitespace-pre-line">
                  {generatedPlan}
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={onGeneratePlan} 
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                  <Button 
                    onClick={onSavePlan}
                    className="flex-1 bg-gradient-to-r from-green-500 to-teal-500"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save & Publish
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default NewPlanCard;

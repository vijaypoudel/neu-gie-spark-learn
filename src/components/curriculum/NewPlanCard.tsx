
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
import MultimodalGoalInput from './MultimodalGoalInput';
import CurriculumSkeleton from './CurriculumSkeleton';

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
      <div className="premium-card">
        <div 
          className="p-6 flex items-center justify-between cursor-pointer hover:bg-orange-50 transition-colors rounded-t-2xl"
          onClick={() => onOpenChange(!isOpen)}
        >
          <h2 className="brand-card-title">Create New Weekly Plan</h2>
          <ChevronLeft className={`h-6 w-6 text-orange-500 transform transition-transform ${isOpen ? 'rotate-90' : '-rotate-90'}`} />
        </div>
        
        {isOpen && (
          <div className="px-6 pb-6 space-y-6">
            <div>
              <h3 className="brand-card-title mb-4">Select Subjects</h3>
              <div className="flex flex-wrap gap-3 mb-4">
                {selectedSubjects.map(subjectId => {
                  const subject = subjects.find(s => s.id === subjectId);
                  return (
                    <div key={subjectId} className="brand-chip flex items-center gap-2 py-2 px-4">
                      <span className="text-lg">{subject?.icon}</span>
                      <span className="font-medium">{subject?.name}</span>
                      <button 
                        onClick={() => onRemoveSubject(subjectId)}
                        className="ml-2 p-1 text-orange-600 hover:text-orange-800 hover:bg-orange-100 rounded-full transition-colors"
                        aria-label={`Remove ${subject?.name}`}
                      >
                        <XCircle className="h-5 w-5" />
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

            <MultimodalGoalInput 
              value={customGoals} 
              onChange={onGoalsChange} 
            />

            {!generatedPlan && !isGenerating && (
              <Button 
                onClick={onGeneratePlan}
                disabled={selectedSubjects.length === 0}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold rounded-xl shadow-lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Generate Weekly Plan
              </Button>
            )}

            {isGenerating && (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-4">
                  <RotateCw className="h-6 w-6 animate-spin text-orange-500 mr-3" />
                  <span className="text-orange-600 font-medium">Generating your personalized plan...</span>
                </div>
                <CurriculumSkeleton />
              </div>
            )}

            {generatedPlan && (
              <div className="space-y-4">
                <div className="premium-card p-4">
                  <h4 className="brand-card-title mb-3">Your Generated Plan</h4>
                  <div className="text-sm whitespace-pre-line text-gray-700 leading-relaxed">
                    {generatedPlan}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={onGeneratePlan} 
                    variant="outline"
                    className="flex-1 h-12 border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl"
                  >
                    <RotateCw className="mr-2 h-5 w-5" />
                    Regenerate
                  </Button>
                  <Button 
                    onClick={onSavePlan}
                    className="flex-1 h-12 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg"
                  >
                    <Save className="mr-2 h-5 w-5" />
                    Save & Publish
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Collapsible>
  );
};

export default NewPlanCard;

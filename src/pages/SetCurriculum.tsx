
import React, { useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Plus, Save, RotateCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import WeeklySummary from '@/components/curriculum/WeeklySummary';
import SubjectSelector from '@/components/curriculum/SubjectSelector';
import GoalInput from '@/components/curriculum/GoalInput';

const subjects = [
  { id: 'math', name: 'Mathematics', icon: '🧮' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'language', name: 'Language Arts', icon: '📝' },
  { id: 'history', name: 'History', icon: '🏺' },
  { id: 'geography', name: 'Geography', icon: '🌎' },
  { id: 'art', name: 'Art', icon: '🎨' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'pe', name: 'Physical Education', icon: '🏀' }
];

const SetCurriculum = () => {
  const [isLastWeekOpen, setIsLastWeekOpen] = useState(true);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['math', 'science']);
  const [customGoals, setCustomGoals] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for last week's summary
  const lastWeekData = {
    subjects: ['Mathematics', 'Science', 'Language Arts'],
    goalsAchieved: 2,
    totalGoals: 10,
    summary: "Tommy showed great progress in mathematics, particularly with multiplication tables. Science experiments engaged him well. Reading comprehension needs more attention.",
    strengths: ["Problem solving", "Scientific curiosity"],
    weaknesses: ["Reading comprehension", "Sustained focus"]
  };

  const handleAddSubject = (subjectId: string) => {
    if (!selectedSubjects.includes(subjectId)) {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  const handleRemoveSubject = (subjectId: string) => {
    setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
  };

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const selectedSubjectNames = selectedSubjects
        .map(id => subjects.find(s => s.id === id)?.name)
        .filter(Boolean);

      const mockPlan = `
## Weekly Learning Plan for Tommy

### Subjects:
${selectedSubjectNames.map(name => `- ${name}`).join('\n')}

### Learning Goals:
1. Complete multiplication tables 1-12
2. Learn about the solar system
3. Practice reading comprehension with short stories
${customGoals ? `4. ${customGoals}` : ''}

### Daily Schedule:
- Monday: Mathematics (30 min), Science (30 min)
- Tuesday: Language Arts (30 min), Mathematics (30 min)
- Wednesday: Science (30 min), Reading (30 min)
- Thursday: Mathematics (30 min), Language Arts (30 min)
- Friday: Review and Quiz (45 min)

### Resources Needed:
- Multiplication flashcards
- Solar system model kit
- Grade-appropriate reading materials
      `;
      
      setGeneratedPlan(mockPlan);
      setIsGenerating(false);
      setIsNewPlanOpen(true);
      toast.success("Weekly curriculum plan generated!");
    }, 2000);
  };

  const handleSavePlan = () => {
    toast.success("Weekly curriculum plan saved and published for Tommy!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pb-20">
      <div className="bg-white/70 backdrop-blur-xl p-4 flex items-center shadow-sm sticky top-0 z-10 border-b border-blue-100/20">
        <Link to="/home" className="mr-4">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold font-playfair">
          <span>Set Weekly Curriculum</span>
        </h1>
      </div>
      
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        {/* Last Week's Summary Section */}
        <Collapsible 
          open={isLastWeekOpen} 
          onOpenChange={setIsLastWeekOpen}
          className="mb-8"
        >
          <Card>
            <CollapsibleTrigger asChild>
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                <h2 className="text-xl font-semibold font-playfair">Last Week's Summary</h2>
                <ChevronLeft className={`transform transition-transform ${isLastWeekOpen ? 'rotate-90' : '-rotate-90'}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <WeeklySummary data={lastWeekData} />
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* New Plan Section */}
        <Collapsible 
          open={isNewPlanOpen || !isLastWeekOpen} 
          onOpenChange={setIsNewPlanOpen}
          className="mb-8"
        >
          <Card>
            <CollapsibleTrigger asChild>
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                <h2 className="text-xl font-semibold font-playfair">Create New Weekly Plan</h2>
                <ChevronLeft className={`transform transition-transform ${isNewPlanOpen || !isLastWeekOpen ? 'rotate-90' : '-rotate-90'}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 space-y-6">
                {/* Subject Selection */}
                <div>
                  <h3 className="font-semibold mb-2">Select Subjects</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedSubjects.map(subjectId => {
                      const subject = subjects.find(s => s.id === subjectId);
                      return (
                        <div key={subjectId} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                          <span>{subject?.icon}</span>
                          <span>{subject?.name}</span>
                          <button 
                            onClick={() => handleRemoveSubject(subjectId)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <SubjectSelector 
                    subjects={subjects.filter(s => !selectedSubjects.includes(s.id))} 
                    onSelect={handleAddSubject} 
                  />
                </div>

                {/* Custom Goals Input */}
                <GoalInput 
                  value={customGoals} 
                  onChange={(e) => setCustomGoals(e.target.value)} 
                />

                {/* Generate Plan Button */}
                {!generatedPlan && (
                  <Button 
                    onClick={handleGeneratePlan}
                    disabled={selectedSubjects.length === 0 || isGenerating}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
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

                {/* Generated Plan */}
                {generatedPlan && (
                  <div className="space-y-4">
                    <div className="border rounded-md bg-gray-50 p-4 whitespace-pre-line">
                      {generatedPlan}
                    </div>
                    <div className="flex gap-4">
                      <Button 
                        onClick={handleGeneratePlan} 
                        variant="outline"
                        className="flex-1"
                      >
                        <RotateCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                      <Button 
                        onClick={handleSavePlan}
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
      </div>
    </div>
  );
};

export default SetCurriculum;

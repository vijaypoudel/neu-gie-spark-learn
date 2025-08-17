
import React, { useState } from 'react';
import { ChevronLeft, Brain, Calendar, Video, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import LastWeekSummaryCard from '@/components/curriculum/LastWeekSummaryCard';
import NewPlanCard from '@/components/curriculum/NewPlanCard';
import HabitCreation from '@/components/curriculum/HabitCreation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

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

// Mock data for last week's summary
const lastWeekData = {
  subjects: ['Mathematics', 'Science', 'Language Arts'],
  goalsAchieved: 2,
  totalGoals: 10,
  summary: "Tommy showed great progress in mathematics, particularly with multiplication tables. Science experiments engaged him well. Reading comprehension needs more attention.",
  strengths: ["Problem solving", "Scientific curiosity"],
  weaknesses: ["Reading comprehension", "Sustained focus"]
};

const SetCurriculum = () => {
  const [isLastWeekOpen, setIsLastWeekOpen] = useState(true);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['math', 'science']);
  const [customGoals, setCustomGoals] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);

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
      
      // Attachments are not processed in mock plan, but made available in UI
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
    <TooltipProvider>
      <div className="min-h-screen premium-gradient-bg">
        <header className="premium-card sticky top-0 z-50 mx-4 mt-4 mb-6">
          <div className="p-4 flex items-center">
            <Link to="/home" className="mr-5 -ml-2 flex items-center">
              <ChevronLeft className="h-6 w-6 text-orange-500" />
              <span className="text-orange-500 font-semibold ml-1 hidden sm:inline">Back</span>
            </Link>
            <h1 className="brand-heading flex-1">
              <span className="brand-accent">Weekly</span>{" "}
              <span>Curriculum</span>
            </h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/how-it-works" 
                  className="p-3 rounded-full hover:bg-orange-100 transition-colors"
                >
                  <HelpCircle className="h-6 w-6 text-orange-500" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Learn how curriculum setting works</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </header>
      
      <div className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Weekly Schedule Notice */}
          <div className="premium-card mb-6 border-l-4 border-orange-500">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <Calendar className="h-6 w-6 text-orange-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">📅 Weekly Schedule</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Your learning week runs from Saturday to Sunday.</strong> This gives you the weekend to plan ahead and start fresh every Saturday with new goals and activities.
                  </p>
                </div>
              </div>
            </div>
          </div>

        <LastWeekSummaryCard 
          isOpen={isLastWeekOpen}
          onOpenChange={setIsLastWeekOpen}
          data={lastWeekData}
        />

        <HabitCreation />

        <NewPlanCard 
          isOpen={isNewPlanOpen || !isLastWeekOpen}
          onOpenChange={setIsNewPlanOpen}
          subjects={subjects}
          selectedSubjects={selectedSubjects}
          onAddSubject={handleAddSubject}
          onRemoveSubject={handleRemoveSubject}
          customGoals={customGoals}
          onGoalsChange={(e) => setCustomGoals(e.target.value)}
          generatedPlan={generatedPlan}
          isGenerating={isGenerating}
          onGeneratePlan={handleGeneratePlan}
          onSavePlan={handleSavePlan}
        />

        </div>
      </div>
    </div>
    </TooltipProvider>
  );
};

export default SetCurriculum;

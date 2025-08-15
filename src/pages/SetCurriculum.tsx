
import React, { useState } from 'react';
import { ChevronLeft, Brain, Calendar, Video, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import LastWeekSummaryCard from '@/components/curriculum/LastWeekSummaryCard';
import NewPlanCard from '@/components/curriculum/NewPlanCard';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pb-20">
        <div className="bg-white/70 backdrop-blur-xl p-4 flex items-center shadow-sm sticky top-0 z-10 border-b border-blue-100/20">
          <Link to="/home" className="mr-4">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold font-playfair flex-1">
            <span>Set Weekly Curriculum</span>
          </h1>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to="/how-it-works" 
                className="p-2 rounded-full hover:bg-orange-100 transition-colors"
              >
                <HelpCircle className="h-5 w-5 text-orange-500" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn how curriculum setting works</p>
            </TooltipContent>
          </Tooltip>
        </div>
      
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        {/* How It Works Explanation */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Brain className="h-8 w-8 text-orange-500" />
              <h2 className="text-xl font-bold font-playfair text-gray-800">
                How Curriculum Setting Works
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">1. Your Input</h3>
                  <p>Select subjects, add custom goals, and upload images. Our AI also checks your calendar for educational events.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">2. AI Planning</h3>
                  <p>AI combines your inputs with last week's analysis to create a personalized learning plan.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Video className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">3. Video Curation</h3>
                  <p>AI selects 12-14 educational videos from trusted channels that match your weekly plan.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <LastWeekSummaryCard 
          isOpen={isLastWeekOpen}
          onOpenChange={setIsLastWeekOpen}
          data={lastWeekData}
        />

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
    </TooltipProvider>
  );
};

export default SetCurriculum;

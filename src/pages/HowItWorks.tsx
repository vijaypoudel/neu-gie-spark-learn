import React from 'react';
import Navigation from '@/components/Navigation';
import { ChevronLeft, Calendar, BookOpen, Video, Brain, BarChart3, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Set Weekly Curriculum",
      description: "Parents input curriculum via subjects, free text, and images",
      detail: "Choose from curriculum subjects, add custom learning goals through free text, and upload relevant images or materials. This gives our AI the foundation to understand your child's learning needs.",
      icon: BookOpen,
      color: "from-orange-400/20 to-orange-500/30"
    },
    {
      step: 2,
      title: "Calendar Integration",
      description: "AI checks upcoming events like storytelling sessions",
      detail: "Our system automatically reviews your calendar for upcoming educational events, storytelling sessions, or learning activities that parents might have scheduled, ensuring nothing is missed.",
      icon: Calendar,
      color: "from-blue-400/20 to-blue-500/30"
    },
    {
      step: 3,
      title: "AI Curation",
      description: "AI combines all inputs to create personalized weekly plan",
      detail: "Using parent inputs, calendar events, and child's learning history, our AI creates a comprehensive weekly learning plan tailored to your child's pace and interests.",
      icon: Brain,
      color: "from-purple-400/20 to-purple-500/30"
    },
    {
      step: 4,
      title: "Video Selection",
      description: "AI searches trusted YouTube channels for 12-14 educational videos",
      detail: "Our AI scours trusted educational YouTube channels and other quality sources to curate 12-14 engaging videos that align perfectly with the weekly curriculum plan.",
      icon: Video,
      color: "from-emerald-400/20 to-emerald-500/30"
    },
    {
      step: 5,
      title: "Interactive Learning",
      description: "Quizzes run during videos to gauge understanding",
      detail: "While videos play, interactive quizzes automatically appear to test comprehension and keep children engaged. Videos pause when quizzes appear to ensure focused learning.",
      icon: Lightbulb,
      color: "from-amber-400/20 to-amber-500/30"
    },
    {
      step: 6,
      title: "Analytics & Insights",
      description: "AI tracks progress, screen time, and builds learning insights",
      detail: "Comprehensive analytics track quiz responses, screen time, completion rates, and learning patterns. This data helps parents understand their child's progress and areas needing attention.",
      icon: BarChart3,
      color: "from-rose-400/20 to-rose-500/30"
    }
  ];

  return (
    <div className="min-h-screen premium-gradient-bg">
      <header className="premium-card sticky top-0 z-50 mx-4 mt-4 mb-6">
        <div className="p-4 flex items-center">
          <Link to="/home" className="mr-5 -ml-2 flex items-center">
            <ChevronLeft className="h-5 w-5 text-neugie-orange" />
            <span className="text-neugie-orange font-semibold ml-1 hidden sm:inline">Back</span>
          </Link>
          <h1 className="brand-heading">
            <span className="brand-accent">How It</span>{" "}
            <span>Works</span>
          </h1>
        </div>
      </header>

      <main className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="premium-card p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4 font-playfair text-gray-800">
              Smart Learning Made Simple
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Neugie transforms your parenting approach with AI-powered curriculum planning. 
              From your input to your child's learning outcomes, every step is designed to 
              create personalized, engaging educational experiences.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="premium-card p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="brand-card-title mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600">Smart algorithms personalize learning for your child</p>
            </div>
            <div className="premium-card p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="brand-card-title mb-2">Curriculum Focused</h3>
              <p className="text-sm text-gray-600">Aligned with educational standards and goals</p>
            </div>
            <div className="premium-card p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="brand-card-title mb-2">Data-Driven</h3>
              <p className="text-sm text-gray-600">Track progress with detailed analytics</p>
            </div>
          </div>

          {/* Step-by-Step Process */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center mb-8 font-playfair text-gray-800">
              The Complete Learning Journey
            </h2>
            
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="premium-card overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      {/* Step Number & Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                          <step.icon className="h-8 w-8 text-gray-700" />
                        </div>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 font-bold">
                          Step {step.step}
                        </Badge>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="brand-card-title text-xl mb-3">{step.title}</h3>
                        <p className="text-gray-700 font-medium mb-4">{step.description}</p>
                        <p className="text-gray-600 leading-relaxed">{step.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="h-6 w-6 text-orange-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="premium-card p-8 mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4 font-playfair text-gray-800">
              Ready to Transform Learning?
            </h3>
            <p className="text-gray-600 mb-6">
              Start creating personalized weekly curricula for your child today
            </p>
            <Link 
              to="/set-curriculum" 
              className="inline-flex items-center px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors shadow-lg"
            >
              Set Your First Curriculum
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Navigation activeTab="home" />
    </div>
  );
};

export default HowItWorks;
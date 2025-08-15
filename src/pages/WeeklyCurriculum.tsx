import React from 'react';
import { ChevronLeft, Calendar, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for curriculum
const lastWeekCurriculum = {
  title: "Last Week's Adventures",
  dates: "August 5-11, 2025",
  subjects: [
    {
      name: "Mathematics",
      icon: "🧮",
      activities: [
        { name: "Multiplication Tables (1-5)", completed: true },
        { name: "Word Problems with Addition", completed: true },
        { name: "Introduction to Fractions", completed: false }
      ]
    },
    {
      name: "Science",
      icon: "🔬",
      activities: [
        { name: "Learn about Plants", completed: true },
        { name: "Simple Experiments", completed: true }
      ]
    },
    {
      name: "Language Arts",
      icon: "📝",
      activities: [
        { name: "Reading Short Stories", completed: true },
        { name: "Writing About My Day", completed: false }
      ]
    }
  ]
};

const nextWeekCurriculum = {
  title: "This Week's Fun Learning",
  dates: "August 12-18, 2025",
  subjects: [
    {
      name: "Mathematics",
      icon: "🧮",
      activities: [
        { name: "Multiplication Tables (6-10)", upcoming: true },
        { name: "Subtraction with Borrowing", upcoming: true },
        { name: "Shape Recognition Game", upcoming: true }
      ]
    },
    {
      name: "Science",
      icon: "🔬",
      activities: [
        { name: "Animal Habitats", upcoming: true },
        { name: "Water Cycle Story", upcoming: true }
      ]
    },
    {
      name: "Language Arts",
      icon: "📝",
      activities: [
        { name: "Poetry Writing", upcoming: true },
        { name: "Book Club Discussion", upcoming: true }
      ]
    },
    {
      name: "Art",
      icon: "🎨",
      activities: [
        { name: "Draw Your Favorite Animal", upcoming: true },
        { name: "Color Mixing Fun", upcoming: true }
      ]
    }
  ]
};

const WeeklyCurriculum = () => {
  const renderSubjectCard = (subject: any, isNextWeek = false) => (
    <Card key={subject.name} className="backdrop-blur-xl bg-white/90 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg font-playfair">
          <span className="text-2xl">{subject.icon}</span>
          <span className="text-orange-600">{subject.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {subject.activities.map((activity: any, idx: number) => (
            <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${
              isNextWeek ? 'bg-orange-50' : activity.completed ? 'bg-green-50' : 'bg-gray-50'
            }`}>
              {isNextWeek ? (
                <Clock className="h-5 w-5 text-orange-500 flex-shrink-0" />
              ) : (
                <CheckCircle className={`h-5 w-5 flex-shrink-0 ${
                  activity.completed ? 'text-green-500' : 'text-gray-300'
                }`} />
              )}
              <span className={`font-medium ${
                isNextWeek ? 'text-orange-700' : activity.completed ? 'text-green-700' : 'text-gray-600'
              }`}>
                {activity.name}
              </span>
              {isNextWeek && (
                <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-700">
                  Coming Up!
                </Badge>
              )}
              {!isNextWeek && activity.completed && (
                <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700">
                  Done! ✨
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-gray-50">
      <div className="bg-white/90 backdrop-blur-xl p-4 flex items-center shadow-sm sticky top-0 z-10 border-b border-orange-200/30">
        <Link to="/kids-home" className="mr-4">
          <ChevronLeft className="h-5 w-5 text-orange-500" />
        </Link>
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-orange-500" />
          <h1 className="text-2xl font-bold font-playfair text-gray-800">
            My Learning Plan
          </h1>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto space-y-8">
        {/* Last Week Section */}
        <div>
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold font-playfair text-gray-800 mb-2">
              {lastWeekCurriculum.title}
            </h2>
            <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              {lastWeekCurriculum.dates}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lastWeekCurriculum.subjects.map(subject => renderSubjectCard(subject, false))}
          </div>
          
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
              <CheckCircle className="h-5 w-5" />
              Great job! You completed most of your activities! 🌟
            </div>
          </div>
        </div>

        {/* Next Week Section */}
        <div>
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold font-playfair text-gray-800 mb-2">
              {nextWeekCurriculum.title}
            </h2>
            <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              {nextWeekCurriculum.dates}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nextWeekCurriculum.subjects.map(subject => renderSubjectCard(subject, true))}
          </div>
          
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">
              <Clock className="h-5 w-5" />
              Exciting new adventures await you this week! 🚀
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCurriculum;
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Play, Pause, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock curriculum topics with videos
const curriculumTopics = [
  {
    id: 1,
    subject: "Mathematics",
    topic: "Multiplication Tables",
    icon: "🧮",
    videos: [
      {
        id: "1",
        title: "Fun with Times Tables",
        thumbnail: "/api/placeholder/320/180",
        duration: "5:30",
        videoUrl: "https://www.youtube.com/embed/D0Ajq682yrA", // Sample educational video
        quizPoints: [90, 180] // Quiz at 1.5min and 3min
      },
      {
        id: "2", 
        title: "Multiplication Tricks",
        thumbnail: "/api/placeholder/320/180",
        duration: "4:20",
        videoUrl: "https://www.youtube.com/embed/sample2",
        quizPoints: [120, 200]
      }
    ]
  },
  {
    id: 2,
    subject: "Science",
    topic: "Plant Life Cycle",
    icon: "🔬",
    videos: [
      {
        id: "3",
        title: "How Plants Grow",
        thumbnail: "/api/placeholder/320/180", 
        duration: "6:15",
        videoUrl: "https://www.youtube.com/embed/sample3",
        quizPoints: [120, 240]
      },
      {
        id: "4",
        title: "Parts of a Plant",
        thumbnail: "/api/placeholder/320/180",
        duration: "4:45", 
        videoUrl: "https://www.youtube.com/embed/sample4",
        quizPoints: [90, 180]
      }
    ]
  },
  {
    id: 3,
    subject: "Language Arts",
    topic: "Story Elements",
    icon: "📝",
    videos: [
      {
        id: "5",
        title: "Characters and Setting",
        thumbnail: "/api/placeholder/320/180",
        duration: "5:00",
        videoUrl: "https://www.youtube.com/embed/sample5", 
        quizPoints: [100, 200]
      },
      {
        id: "6",
        title: "Plot and Theme",
        thumbnail: "/api/placeholder/320/180",
        duration: "5:30",
        videoUrl: "https://www.youtube.com/embed/sample6",
        quizPoints: [110, 220]
      }
    ]
  }
];

// Mock AI-generated quiz questions
const sampleQuizzes = {
  "multiplication": [
    {
      question: "What is 4 × 3?",
      options: ["10", "12", "14", "16"],
      correct: 1
    },
    {
      question: "Which multiplication fact equals 15?",
      options: ["3 × 4", "3 × 5", "4 × 4", "2 × 7"],
      correct: 1
    }
  ],
  "plants": [
    {
      question: "What do plants need to grow?",
      options: ["Water and sunlight", "Only water", "Only soil", "Nothing"],
      correct: 0
    },
    {
      question: "Which part of the plant absorbs water?",
      options: ["Leaves", "Flowers", "Roots", "Stem"],
      correct: 2
    }
  ],
  "stories": [
    {
      question: "Who are the people in a story called?",
      options: ["Settings", "Characters", "Plots", "Themes"],
      correct: 1
    },
    {
      question: "Where a story takes place is called the:",
      options: ["Character", "Plot", "Setting", "Beginning"],
      correct: 2
    }
  ]
};

interface QuizModalProps {
  question: any;
  onAnswer: (correct: boolean) => void;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ question, onAnswer, onClose }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === question.correct;
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(isCorrect);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border-2 border-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b">
          <CardTitle className="brand-card-title text-center flex items-center justify-center gap-2">
            Quiz Time! 🎯
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6 bg-white">
          <p className="brand-card-text text-center text-lg">{question.question}</p>
          
          <div className="space-y-3">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all font-medium ${
                  selectedAnswer === index 
                    ? showResult 
                      ? index === question.correct 
                        ? 'bg-green-50 border-green-500 text-green-700 shadow-md'
                        : 'bg-red-50 border-red-500 text-red-700 shadow-md'
                      : 'bg-orange-50 border-orange-500 text-orange-700 shadow-md'
                    : showResult && index === question.correct
                      ? 'bg-green-50 border-green-500 text-green-700 shadow-md'
                      : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700'
                }`}
                disabled={showResult}
              >
                {option}
              </button>
            ))}
          </div>

          {showResult ? (
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              {selectedAnswer === question.correct ? (
                <p className="text-green-600 font-bold text-lg">🎉 Correct! Great job!</p>
              ) : (
                <p className="text-orange-600 font-bold text-lg">Good try! The correct answer is highlighted.</p>
              )}
            </div>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
            >
              Submit Answer
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface VideoPlayerProps {
  video: any;
  onVideoComplete: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onVideoComplete }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<number[]>([]);
  const [wasPlayingBeforeQuiz, setWasPlayingBeforeQuiz] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock video duration in seconds
  const videoDuration = 330; // 5:30

  // Pause video when quiz appears
  useEffect(() => {
    if (showQuiz && isPlaying) {
      setWasPlayingBeforeQuiz(true);
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [showQuiz, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (videoRef.current) {
        const realCurrentTime = Math.floor(videoRef.current.currentTime);
        setCurrentTime(realCurrentTime);
        
        // Check if we hit a quiz point
        const quizPoint = video.quizPoints.find((point: number, index: number) => 
          Math.abs(realCurrentTime - point) < 2 && !completedQuizzes.includes(index)
        );
        
        if (quizPoint) {
          const quizPointIndex = video.quizPoints.indexOf(quizPoint);
          setQuizIndex(quizPointIndex);
          setShowQuiz(true);
          // Video will be paused by the useEffect above
        }
        
        // Video completed
        if (realCurrentTime >= videoDuration) {
          setIsPlaying(false);
          onVideoComplete();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, video.quizPoints, completedQuizzes, videoDuration, onVideoComplete]);

  const handleQuizAnswer = (correct: boolean) => {
    setCompletedQuizzes(prev => [...prev, quizIndex]);
    setShowQuiz(false);
    // Resume video if it was playing before quiz
    if (wasPlayingBeforeQuiz) {
      if (videoRef.current) {
        videoRef.current.play();
      }
      setIsPlaying(true);
      setWasPlayingBeforeQuiz(false);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuizForVideo = () => {
    if (video.title?.includes('Multiplication') || video.title?.includes('Times')) return sampleQuizzes.multiplication[quizIndex % 2];
    if (video.title?.includes('Plant') || video.title?.includes('Grow')) return sampleQuizzes.plants[quizIndex % 2];
    return sampleQuizzes.stories[quizIndex % 2];
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden">
        {/* Using a placeholder video since we can't control YouTube embeds easily */}
        <video
          ref={videoRef}
          className="w-full aspect-video"
          poster="/api/placeholder/800/450"
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(Math.floor(videoRef.current.currentTime));
            }
          }}
          onEnded={onVideoComplete}
        >
          <source src="/api/placeholder/video.mp4" type="video/mp4" />
          {/* Fallback content */}
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="brand-card-title mb-2">{video.title}</h3>
              <p className="brand-card-text">Educational Video Content</p>
              <p className="text-sm text-gray-600 mt-2">Duration: {video.duration}</p>
            </div>
          </div>
        </video>
        
        {/* Custom Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-4 text-white">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <div className="flex-1">
              <Progress value={(currentTime / videoDuration) * 100} className="h-2" />
            </div>
            
            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(videoDuration)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="brand-card-title">{video.title}</h3>
          <p className="text-sm text-gray-600">Duration: {video.duration}</p>
        </div>
        <div className="text-right">
          <p className="brand-card-text">Quiz Progress</p>
          <p className="brand-num">{completedQuizzes.length}/{video.quizPoints.length}</p>
        </div>
      </div>

      {showQuiz && (
        <QuizModal
          question={getQuizForVideo()}
          onAnswer={handleQuizAnswer}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
};

const Funtube: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);

  const handleVideoComplete = () => {
    const currentVideo = selectedTopic.videos[currentVideoIndex];
    setCompletedVideos(prev => [...prev, currentVideo.id]);
    
    if (currentVideoIndex < selectedTopic.videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      // Topic completed
      setSelectedTopic(null);
      setCurrentVideoIndex(0);
    }
  };

  const handleTopicSelect = (topic: any) => {
    setSelectedTopic(topic);
    setCurrentVideoIndex(0);
  };

  if (selectedTopic) {
    const currentVideo = selectedTopic.videos[currentVideoIndex];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSelectedTopic(null)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="brand-heading">
                {selectedTopic.icon} <span className="brand-accent">{selectedTopic.subject}</span>
              </h1>
              <p className="brand-card-text">{selectedTopic.topic}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <VideoPlayer 
                    video={currentVideo}
                    onVideoComplete={handleVideoComplete}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="brand-card-title">Video Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedTopic.videos.map((video: any, index: number) => (
                    <div key={video.id} className="flex items-center gap-3 p-2">
                      <div className={`w-3 h-3 rounded-full ${
                        completedVideos.includes(video.id) 
                          ? 'bg-green-500' 
                          : index === currentVideoIndex 
                            ? 'bg-orange-500' 
                            : 'bg-gray-300'
                      }`} />
                      <span className={`text-sm ${
                        index === currentVideoIndex ? 'brand-card-text font-semibold' : 'text-gray-600'
                      }`}>
                        {video.title}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="brand-card-title">Learning Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Watch carefully and listen</li>
                    <li>• Answer quiz questions honestly</li>
                    <li>• Ask questions if confused</li>
                    <li>• Have fun learning!</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/kids-home">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="brand-heading">
              Fun<span className="brand-accent">Tube</span> 📺
            </h1>
            <p className="brand-card-text">Learn with fun videos and quizzes!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculumTopics.map((topic) => (
            <Card 
              key={topic.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleTopicSelect(topic)}
            >
              <CardHeader>
                <CardTitle className="brand-card-title flex items-center gap-2">
                  <span className="text-2xl">{topic.icon}</span>
                  {topic.subject}
                </CardTitle>
                <p className="brand-card-text">{topic.topic}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topic.videos.map((video, index) => (
                    <div key={video.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-16 h-9 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{video.title}</p>
                        <p className="text-xs text-gray-500">{video.duration}</p>
                      </div>
                      {completedVideos.includes(video.id) && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          ✓
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    {topic.videos.filter(v => completedVideos.includes(v.id)).length} / {topic.videos.length} videos completed
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Funtube;
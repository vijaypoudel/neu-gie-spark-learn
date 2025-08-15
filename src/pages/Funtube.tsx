import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Play, Pause, Volume2, VolumeX, SkipForward, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import YouTube from 'react-youtube';

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
        videoUrl: "D0Ajq682yrA", // YouTube video ID for multiplication tables
        quizPoints: [90, 180] // Quiz at 1.5min and 3min
      },
      {
        id: "2", 
        title: "Multiplication Tricks",
        thumbnail: "/api/placeholder/320/180",
        duration: "4:20",
        videoUrl: "3_baCGGYJfo", // Another educational math video ID
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
        videoUrl: "tkFpylkzJRY", // Plant life cycle video ID
        quizPoints: [120, 240]
      },
      {
        id: "4",
        title: "Parts of a Plant",
        thumbnail: "/api/placeholder/320/180",
        duration: "4:45", 
        videoUrl: "wKaltBeitFk", // Parts of plant video ID
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
        videoUrl: "HjQrJAUpvBk", // Story elements video ID 
        quizPoints: [100, 200]
      },
      {
        id: "6",
        title: "Plot and Theme",
        thumbnail: "/api/placeholder/320/180",
        duration: "5:30",
        videoUrl: "8_X7g2Y9e5c", // Plot and theme video ID
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-600/20" />
      <Card className="relative w-full max-w-lg bg-white/95 backdrop-blur-sm shadow-2xl border-0 ring-1 ring-orange-200/50">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 rounded-t-lg">
          <CardTitle className="text-center flex items-center justify-center gap-3 text-xl font-bold">
            <Award className="h-6 w-6" />
            Quiz Challenge!
            <Award className="h-6 w-6" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8 bg-white rounded-b-lg">
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <p className="brand-card-text text-lg font-semibold">{question.question}</p>
          </div>
          
          <div className="space-y-3">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium transform hover:scale-[1.02] ${
                  selectedAnswer === index 
                    ? showResult 
                      ? index === question.correct 
                        ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-500 text-green-700 shadow-lg ring-2 ring-green-200'
                        : 'bg-gradient-to-r from-red-50 to-red-100 border-red-500 text-red-700 shadow-lg ring-2 ring-red-200'
                      : 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-500 text-orange-700 shadow-lg ring-2 ring-orange-200'
                    : showResult && index === question.correct
                      ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-500 text-green-700 shadow-lg ring-2 ring-green-200'
                      : 'bg-white border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-orange-300 text-gray-700 hover:shadow-md'
                }`}
                disabled={showResult}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    selectedAnswer === index 
                      ? showResult 
                        ? index === question.correct 
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'bg-red-500 border-red-500 text-white'
                        : 'bg-orange-500 border-orange-500 text-white'
                      : showResult && index === question.correct
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-400 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>

          {showResult ? (
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl border border-blue-200">
              {selectedAnswer === question.correct ? (
                <div className="space-y-2">
                  <div className="text-4xl">🎉</div>
                  <p className="text-green-600 font-bold text-xl">Excellent work!</p>
                  <p className="text-sm text-gray-600">You're getting smarter every day!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-4xl">💡</div>
                  <p className="text-orange-600 font-bold text-xl">Good effort!</p>
                  <p className="text-sm text-gray-600">Learning happens with every try!</p>
                </div>
              )}
            </div>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              Submit Answer 🚀
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
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);

  // Convert duration string to seconds
  const parseVideoDuration = (duration: string) => {
    const [mins, secs] = duration.split(':').map(Number);
    return mins * 60 + secs;
  };

  const videoDuration = parseVideoDuration(video.duration);

  // Pause video when quiz appears
  useEffect(() => {
    if (showQuiz && isPlaying && playerRef.current && playerReady) {
      setWasPlayingBeforeQuiz(true);
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  }, [showQuiz, isPlaying, playerReady]);

  useEffect(() => {
    if (!isPlaying || !playerReady) return;

    const interval = setInterval(() => {
      if (playerRef.current) {
        const realCurrentTime = Math.floor(playerRef.current.getCurrentTime());
        setCurrentTime(realCurrentTime);
        
        // Check if we hit a quiz point
        const quizPoint = video.quizPoints.find((point: number, index: number) => 
          Math.abs(realCurrentTime - point) < 2 && !completedQuizzes.includes(index)
        );
        
        if (quizPoint) {
          const quizPointIndex = video.quizPoints.indexOf(quizPoint);
          setQuizIndex(quizPointIndex);
          setShowQuiz(true);
        }
        
        // Check if video completed
        const duration = playerRef.current.getDuration();
        if (realCurrentTime >= duration - 1) {
          setIsPlaying(false);
          onVideoComplete();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, video.quizPoints, completedQuizzes, videoDuration, onVideoComplete, playerReady]);

  const handleQuizAnswer = (correct: boolean) => {
    setCompletedQuizzes(prev => [...prev, quizIndex]);
    setShowQuiz(false);
    // Resume video if it was playing before quiz
    if (wasPlayingBeforeQuiz && playerRef.current && playerReady) {
      playerRef.current.playVideo();
      setIsPlaying(true);
      setWasPlayingBeforeQuiz(false);
    }
  };

  const handlePlayPause = () => {
    if (playerRef.current && playerReady) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
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

  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
    setPlayerReady(true);
  };

  const onPlayerStateChange = (event: any) => {
    // YouTube Player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
    if (event.data === 1) { // playing
      setIsPlaying(true);
    } else if (event.data === 2) { // paused
      setIsPlaying(false);
    } else if (event.data === 0) { // ended
      setIsPlaying(false);
      onVideoComplete();
    }
  };

  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0, // Hide default controls so we can use custom ones
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
    },
  };

  return (
    <div className="space-y-6">
      <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-orange-200/50">
        {/* YouTube Player */}
        <div className="w-full aspect-video">
          <YouTube
            videoId={video.videoUrl}
            opts={youtubeOpts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
            className="w-full h-full"
          />
        </div>
        
        {/* Premium Custom Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
          <div className="flex items-center gap-4 text-white">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 bg-white/10 backdrop-blur-sm rounded-full"
              disabled={!playerReady}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            
            <div className="flex-1 space-y-2">
              <Progress 
                value={playerReady && playerRef.current ? (currentTime / (playerRef.current.getDuration() || videoDuration)) * 100 : 0} 
                className="h-3 bg-white/20 border border-white/30 rounded-full overflow-hidden"
              />
              <div className="flex justify-between text-sm text-white/80">
                <span>{formatTime(currentTime)}</span>
                <span>{video.duration}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{video.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
        <div className="space-y-1">
          <h3 className="brand-card-title text-xl">{video.title}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Duration: {video.duration}
          </p>
        </div>
        <div className="text-right space-y-1">
          <p className="brand-card-text">Quiz Progress</p>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-500" />
            <p className="brand-num text-2xl">{completedQuizzes.length}/{video.quizPoints.length}</p>
          </div>
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
      <div className="min-h-screen premium-gradient-bg">
        <header className="premium-card sticky top-0 z-50 mx-4 mt-4 mb-6">
          <div className="p-4 flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSelectedTopic(null)}
              className="mr-3 -ml-2"
            >
              <ChevronLeft className="h-5 w-5 text-orange-500" />
            </Button>
            <div>
              <h1 className="brand-heading">
                {selectedTopic.icon} <span className="brand-accent">{selectedTopic.subject}</span>
              </h1>
              <p className="text-gray-600 text-sm">{selectedTopic.topic}</p>
            </div>
          </div>
        </header>

        <div className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="premium-card p-6">
                <VideoPlayer 
                  video={currentVideo}
                  onVideoComplete={handleVideoComplete}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="premium-card p-5">
                <h3 className="brand-card-title mb-4">Video Progress</h3>
                <div className="space-y-3">
                  <p className="brand-card-text">{currentVideo.title}</p>
                  <Progress 
                    value={(currentVideoIndex / selectedTopic.videos.length) * 100} 
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600">
                    Video {currentVideoIndex + 1} of {selectedTopic.videos.length}
                  </p>
                </div>
              </div>

              <div className="premium-card p-5">
                <h3 className="brand-card-title mb-4">Topic Videos</h3>
                <div className="space-y-2">
                  {selectedTopic.videos.map((video, index) => (
                    <div 
                      key={video.id} 
                      className={`p-3 rounded-lg border ${
                        index === currentVideoIndex 
                          ? 'bg-orange-100 border-orange-300' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <p className="text-sm font-medium">{video.title}</p>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen premium-gradient-bg">
      <header className="premium-card sticky top-0 z-50 mx-4 mt-4 mb-6">
        <div className="p-4 flex items-center">
          <Link to="/kids-home" className="mr-5 -ml-2 flex items-center">
            <ChevronLeft className="h-5 w-5 text-orange-500" />
            <span className="text-orange-500 font-semibold ml-1 hidden sm:inline">Back</span>
          </Link>
          <div>
            <h1 className="brand-heading">
              Fun<span className="brand-accent">Tube</span> 📺
            </h1>
            <p className="text-gray-600 text-sm">Learn with fun videos and quizzes!</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {curriculumTopics.map((topic) => (
            <div key={topic.id} className="premium-card">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{topic.icon}</span>
                  <div>
                    <h3 className="brand-card-title">{topic.subject}</h3>
                    <p className="text-gray-600 text-sm">{topic.topic}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {topic.videos.map((video, index) => (
                    <div key={video.id} className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                      <div className="w-16 h-10 bg-gradient-to-br from-orange-200 to-orange-400 rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-lg">🎬</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{video.title}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {video.duration}
                        </p>
                      </div>
                      {completedVideos.includes(video.id) && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                          ✓
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 border-t border-orange-100">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {topic.videos.filter(v => completedVideos.includes(v.id)).length} / {topic.videos.length} completed
                    </p>
                    <Button 
                      onClick={() => handleTopicSelect(topic)}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-xl shadow-md"
                    >
                      Start Learning
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Funtube;
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Play, Pause, Clock, Award, Heart, Music, Palette, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import YouTube from 'react-youtube';

// Mock passion topics with videos based on child's interests
const passionTopics = [
  {
    id: 1,
    subject: "Singing",
    topic: "Voice Training & Songs",
    icon: "🎤",
    videos: [
      {
        id: "1",
        title: "Breathing Techniques for Kids",
        thumbnail: "/api/placeholder/320/180",
        duration: "6:45",
        videoUrl: "yBm0VhpP2mo", // Singing breathing exercise video
        quizPoints: [120, 280] // Quiz at 2min and 4:40min
      },
      {
        id: "2", 
        title: "Fun Kids Songs to Practice",
        thumbnail: "/api/placeholder/320/180",
        duration: "8:30",
        videoUrl: "LC-sRbdPg0k", // Kids singing practice video
        quizPoints: [180, 360]
      }
    ]
  },
  {
    id: 2,
    subject: "Dancing",
    topic: "Movement & Choreography",
    icon: "💃",
    videos: [
      {
        id: "3",
        title: "Basic Dance Steps for Beginners",
        thumbnail: "/api/placeholder/320/180", 
        duration: "7:20",
        videoUrl: "VF_DLa9XuL8", // Kids dance tutorial
        quizPoints: [150, 300]
      },
      {
        id: "4",
        title: "Creative Movement Games",
        thumbnail: "/api/placeholder/320/180",
        duration: "5:45", 
        videoUrl: "8mEuT_TxbNk", // Dance movement for kids
        quizPoints: [120, 240]
      }
    ]
  },
  {
    id: 3,
    subject: "Art & Painting",
    topic: "Creative Expression",
    icon: "🎨",
    videos: [
      {
        id: "5",
        title: "Color Mixing Basics",
        thumbnail: "/api/placeholder/320/180",
        duration: "6:30",
        videoUrl: "eqq0Kp2lKqw", // Art color mixing for kids
        quizPoints: [140, 280]
      },
      {
        id: "6",
        title: "Easy Watercolor Techniques",
        thumbnail: "/api/placeholder/320/180",
        duration: "9:15",
        videoUrl: "3pLz-ENjy5g", // Watercolor painting for kids
        quizPoints: [200, 400]
      }
    ]
  },
  {
    id: 4,
    subject: "Storytelling",
    topic: "Creative Writing & Drama",
    icon: "📖",
    videos: [
      {
        id: "7",
        title: "How to Tell Amazing Stories",
        thumbnail: "/api/placeholder/320/180",
        duration: "8:00",
        videoUrl: "UGLhNhWKwmE", // Storytelling for kids
        quizPoints: [160, 320]
      },
      {
        id: "8",
        title: "Character Voices & Expression",
        thumbnail: "/api/placeholder/320/180",
        duration: "6:15",
        videoUrl: "feDpEV87-RA", // Voice acting for kids
        quizPoints: [130, 260]
      }
    ]
  }
];

// Mock passion-related quiz questions
const passionQuizzes = {
  "singing": [
    {
      question: "What's the most important thing for good singing?",
      options: ["Loud voice", "Good breathing", "Fast singing", "High notes"],
      correct: 1
    },
    {
      question: "When singing, where should you breathe from?",
      options: ["Your throat", "Your chest", "Your diaphragm", "Your nose"],
      correct: 2
    }
  ],
  "dancing": [
    {
      question: "What should you do before dancing?",
      options: ["Jump immediately", "Warm up your body", "Eat a lot", "Sit down"],
      correct: 1
    },
    {
      question: "Good dancing comes from:",
      options: ["Feeling the music", "Being the fastest", "Jumping high", "Standing still"],
      correct: 0
    }
  ],
  "art": [
    {
      question: "What happens when you mix red and blue?",
      options: ["Green", "Purple", "Orange", "Yellow"],
      correct: 1
    },
    {
      question: "What's the best way to start a painting?",
      options: ["Use lots of paint", "Start with light colors", "Paint very fast", "Use only dark colors"],
      correct: 1
    }
  ],
  "storytelling": [
    {
      question: "A good story needs:",
      options: ["Only pictures", "Characters and a problem", "Lots of words", "Nothing special"],
      correct: 1
    },
    {
      question: "What makes stories interesting?",
      options: ["Using different voices", "Reading very fast", "Whispering only", "Not moving"],
      correct: 0
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
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20" />
      <Card className="relative w-full max-w-lg bg-white/95 backdrop-blur-sm shadow-2xl border-0 ring-1 ring-pink-200/50">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 rounded-t-lg">
          <CardTitle className="text-center flex items-center justify-center gap-3 text-xl font-bold">
            <Heart className="h-6 w-6" />
            Passion Quiz!
            <Heart className="h-6 w-6" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8 bg-white rounded-b-lg">
          <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-purple-100 rounded-lg border border-pink-200">
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
                      : 'bg-gradient-to-r from-pink-50 to-purple-100 border-pink-500 text-pink-700 shadow-lg ring-2 ring-pink-200'
                    : showResult && index === question.correct
                      ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-500 text-green-700 shadow-lg ring-2 ring-green-200'
                      : 'bg-white border-gray-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:border-pink-300 text-gray-700 hover:shadow-md'
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
                        : 'bg-pink-500 border-pink-500 text-white'
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
            <div className="text-center p-6 bg-gradient-to-r from-pink-50 via-purple-50 to-orange-50 rounded-xl border border-pink-200">
              {selectedAnswer === question.correct ? (
                <div className="space-y-2">
                  <div className="text-4xl">🌟</div>
                  <p className="text-green-600 font-bold text-xl">Amazing creativity!</p>
                  <p className="text-sm text-gray-600">Your passion is growing stronger!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-4xl">💫</div>
                  <p className="text-purple-600 font-bold text-xl">Keep exploring!</p>
                  <p className="text-sm text-gray-600">Every try makes you more creative!</p>
                </div>
              )}
            </div>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              Share Your Answer ✨
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
    if (video.title?.includes('Breathing') || video.title?.includes('Songs') || video.title?.includes('Singing')) return passionQuizzes.singing[quizIndex % 2];
    if (video.title?.includes('Dance') || video.title?.includes('Movement')) return passionQuizzes.dancing[quizIndex % 2];
    if (video.title?.includes('Color') || video.title?.includes('Paint') || video.title?.includes('Art')) return passionQuizzes.art[quizIndex % 2];
    return passionQuizzes.storytelling[quizIndex % 2];
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
      <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-pink-200/50">
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

      <div className="flex items-center justify-between bg-gradient-to-r from-pink-50 to-purple-100 p-6 rounded-xl border border-pink-200">
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
            <Heart className="h-5 w-5 text-pink-500" />
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

const MyPassion: React.FC = () => {
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 p-4">
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
                            ? 'bg-pink-500' 
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
                  <CardTitle className="brand-card-title">Creative Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Express yourself freely</li>
                    <li>• Practice makes perfect</li>
                    <li>• Have fun and be creative</li>
                    <li>• Share your passion with others</li>
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/kids-home">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="brand-heading">
              My <span className="brand-accent">Passion</span> 💖
            </h1>
            <p className="brand-card-text">Explore and grow your creative talents!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {passionTopics.map((topic) => (
            <Card 
              key={topic.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-pink-200"
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
                      <div className="w-16 h-9 bg-gradient-to-br from-pink-200 to-purple-300 rounded flex items-center justify-center">
                        <span className="text-lg">🎬</span>
                      </div>
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

export default MyPassion;
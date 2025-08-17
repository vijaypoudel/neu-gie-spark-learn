import React, { useState, useRef } from 'react';
import { Camera, Mic, FileText, Upload, X, Play, Pause } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MediaFile {
  id: string;
  type: 'image' | 'audio' | 'text';
  content: string;
  name: string;
  timestamp: Date;
}

interface MultimodalGoalInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  mediaFiles?: MediaFile[];
  onMediaAdd?: (file: MediaFile) => void;
  onMediaRemove?: (id: string) => void;
}

const MultimodalGoalInput: React.FC<MultimodalGoalInputProps> = ({ 
  value, 
  onChange, 
  mediaFiles = [], 
  onMediaAdd, 
  onMediaRemove 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const characterCount = value.length;
  const maxCharacters = 500;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const audioFile: MediaFile = {
          id: Date.now().toString(),
          type: 'audio',
          content: audioUrl,
          name: `Recording ${new Date().toLocaleTimeString()}`,
          timestamp: new Date()
        };
        
        onMediaAdd?.(audioFile);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageFile: MediaFile = {
              id: Date.now().toString() + Math.random(),
              type: 'image',
              content: e.target?.result as string,
              name: file.name,
              timestamp: new Date()
            };
            onMediaAdd?.(imageFile);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const playAudio = (audioUrl: string, id: string) => {
    if (playingAudio === id) {
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setPlayingAudio(id);
      
      audioRef.current.onended = () => {
        setPlayingAudio(null);
      };
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="brand-card-title">Custom Learning Goals</h3>
        <p className="text-sm text-gray-600 mt-1">
          Add specific learning goals using text, images, or voice recordings.
        </p>
      </div>

      {/* Text Input */}
      <div className="relative">
        <Textarea 
          placeholder="e.g., Focus on multiplication tables, read a chapter book, practice piano for 30 minutes daily..."
          value={value}
          onChange={onChange}
          rows={4}
          maxLength={maxCharacters}
          className="w-full rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 resize-none text-base leading-relaxed"
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
          {characterCount}/{maxCharacters}
        </div>
      </div>

      {/* Media Input Options */}
      <div className="flex flex-wrap gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          multiple
          className="hidden"
        />
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-xl border-dashed border-orange-300 hover:border-orange-500 hover:bg-orange-50"
        >
          <Camera className="mr-2 h-4 w-4" />
          Add Images
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={isRecording ? stopRecording : startRecording}
          className={`rounded-xl border-dashed ${
            isRecording 
              ? 'border-red-300 hover:border-red-500 hover:bg-red-50 text-red-600' 
              : 'border-purple-300 hover:border-purple-500 hover:bg-purple-50'
          }`}
        >
          <Mic className="mr-2 h-4 w-4" />
          {isRecording ? `Stop (${formatTime(recordingTime)})` : 'Voice Note'}
        </Button>
      </div>

      {/* Media Files Display */}
      {mediaFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Attached Media</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mediaFiles.map((file) => (
              <Card key={file.id} className="relative">
                <CardContent className="p-3">
                  {file.type === 'image' && (
                    <div className="space-y-2">
                      <img 
                        src={file.content} 
                        alt={file.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                          <Camera className="mr-1 h-3 w-3" />
                          Image
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMediaRemove?.(file.id)}
                          className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {file.type === 'audio' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => playAudio(file.content, file.id)}
                            className="h-8 w-8 p-0 rounded-full bg-purple-100 hover:bg-purple-200"
                          >
                            {playingAudio === file.id ? (
                              <Pause className="h-3 w-3 text-purple-600" />
                            ) : (
                              <Play className="h-3 w-3 text-purple-600" />
                            )}
                          </Button>
                          <span className="text-xs text-gray-600">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMediaRemove?.(file.id)}
                          className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                        <Mic className="mr-1 h-3 w-3" />
                        Audio
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultimodalGoalInput;
import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveEmotionWidget = ({ currentEmotion, onEmotionChange, biometricData }) => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [emotionConfidence, setEmotionConfidence] = useState(0.85);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const analysisIntervalRef = useRef(null);

  const emotions = [
    { name: 'calm', color: 'var(--color-biometric-calm)', icon: 'Waves' },
    { name: 'focus', color: 'var(--color-biometric-focus)', icon: 'Target' },
    { name: 'energy', color: 'var(--color-biometric-energy)', icon: 'Zap' },
    { name: 'stress', color: 'var(--color-biometric-stress)', icon: 'AlertTriangle' }
  ];

  const getCurrentEmotionData = () => {
    return emotions?.find(e => e?.name === currentEmotion) || emotions?.[0];
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
      if (videoRef?.current && videoRef?.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startWebcam = async () => {
    try {
      setError(null);
      setVideoLoading(true);
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported in this browser. Please use a modern browser with HTTPS.');
      }

      // Check if we're on HTTPS or localhost
      if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        throw new Error('Camera access requires HTTPS. Please access this app via HTTPS or localhost.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640, min: 320 },
          height: { ideal: 480, min: 240 },
          facingMode: 'user',
          frameRate: { ideal: 30, min: 15 }
        },
        audio: false 
      });
      
      console.log('Camera stream obtained:', stream);
      console.log('Video tracks:', stream.getVideoTracks());
      
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
        setIsWebcamActive(true);
        setIsAnalyzing(true);
        
        // Wait for the video to be ready
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded');
          setVideoLoading(false);
          videoRef.current.play().catch(console.error);
        };
        
        // Clear any existing interval
        if (analysisIntervalRef.current) {
          clearInterval(analysisIntervalRef.current);
        }
        
        // Simulate emotion analysis
        analysisIntervalRef.current = setInterval(() => {
          const randomEmotion = emotions?.[Math.floor(Math.random() * emotions?.length)];
          const confidence = 0.7 + Math.random() * 0.3;
          
          onEmotionChange(randomEmotion?.name);
          setEmotionConfidence(confidence);
        }, 3000);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      setError(error.message);
      setIsWebcamActive(false);
      setIsAnalyzing(false);
      setVideoLoading(false);
    }
  };

  const stopWebcam = () => {
    if (videoRef?.current && videoRef?.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    // Clear the analysis interval
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }
    
    setIsWebcamActive(false);
    setIsAnalyzing(false);
    setError(null);
    setVideoLoading(false);
  };

  const emotionData = getCurrentEmotionData();

  return (
    <div className="neomorphic emotion-calm bg-card rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="w-3 h-3 rounded-full animate-biometric-pulse"
            style={{ backgroundColor: emotionData?.color }}
          />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Live Emotion Detection
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={isWebcamActive ? "destructive" : "default"}
            size="sm"
            onClick={isWebcamActive ? stopWebcam : startWebcam}
            iconName={isWebcamActive ? "VideoOff" : "Video"}
            iconPosition="left"
          >
            {isWebcamActive ? "Stop" : "Start"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Webcam Feed */}
        <div className="relative">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden neomorphic-inset">
            {isWebcamActive ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }} // Mirror the video for selfie view
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      videoRef.current.play().catch(console.error);
                    }
                  }}
                  onCanPlay={() => {
                    console.log('Video can play - stream is ready');
                  }}
                  onError={(e) => {
                    console.error('Video error:', e);
                    setError('Failed to load video stream');
                  }}
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
                {videoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm font-medium text-foreground">Loading camera...</span>
                    </div>
                  </div>
                )}
                {isAnalyzing && !videoLoading && (
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-biometric-pulse" />
                      <span className="text-xs font-medium text-foreground">Analyzing...</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Icon name="Camera" size={48} className="mb-4 opacity-50" />
                <p className="text-sm font-medium">Camera Feed</p>
                <p className="text-xs opacity-70">Click Start to begin emotion detection</p>
                {error && (
                  <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-xs text-destructive font-medium">Error: {error}</p>
                    <p className="text-xs text-destructive/70 mt-1">
                      {error.includes('HTTPS') 
                        ? 'Camera access requires HTTPS. Please access this app via HTTPS or localhost.'
                        : 'Please check camera permissions, ensure you\'re using HTTPS, or try refreshing the page.'
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Emotion Analysis */}
        <div className="space-y-4">
          {/* Current Emotion */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center neomorphic"
                style={{ backgroundColor: `${emotionData?.color}20` }}
              >
                <Icon 
                  name={emotionData?.icon} 
                  size={32} 
                  color={emotionData?.color}
                  className="animate-biometric-pulse"
                />
              </div>
            </div>
            <h4 className="text-2xl font-heading font-bold text-foreground capitalize mb-1">
              {currentEmotion}
            </h4>
            <p className="text-sm text-muted-foreground">
              {Math.round(emotionConfidence * 100)}% confidence
            </p>
          </div>

          {/* Confidence Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Confidence Level</span>
              <span>{Math.round(emotionConfidence * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 neomorphic-inset">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${emotionConfidence * 100}%`,
                  backgroundColor: emotionData?.color
                }}
              />
            </div>
          </div>

          {/* Biometric Readings */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/30 rounded-lg p-3 text-center neomorphic">
              <Icon name="Heart" size={20} color="var(--color-error)" className="mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground font-mono">
                {typeof biometricData?.heartRate === 'number' ? biometricData.heartRate.toFixed(3) : biometricData?.heartRate}
              </div>
              <div className="text-xs text-muted-foreground">BPM</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3 text-center neomorphic">
              <Icon name="Activity" size={20} color="var(--color-warning)" className="mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground capitalize">
                {biometricData?.stressLevel}
              </div>
              <div className="text-xs text-muted-foreground">Stress</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              className="flex-1"
            >
              Recalibrate
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              className="flex-1"
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
      {/* Emotion History */}
      <div className="border-t border-border pt-4">
        <h5 className="text-sm font-medium text-foreground mb-3">Recent Emotions</h5>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {emotions?.map((emotion, index) => (
            <div
              key={emotion?.name}
              className={`
                flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-xs
                ${emotion?.name === currentEmotion 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name={emotion?.icon} size={14} />
              <span className="capitalize">{emotion?.name}</span>
              {emotion?.name === currentEmotion && (
                <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveEmotionWidget;
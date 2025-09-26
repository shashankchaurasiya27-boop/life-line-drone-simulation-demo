import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthActionCard = ({ title, description, icon, color, actionType, duration, isRecommended = false }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          setProgress(((duration - newTime) / duration) * 100);
          return newTime;
        });
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      setProgress(0);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, duration]);

  const startAction = () => {
    setIsActive(true);
    setTimeRemaining(duration);
    setProgress(0);
  };

  const stopAction = () => {
    setIsActive(false);
    setTimeRemaining(0);
    setProgress(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getActionInstructions = () => {
    switch (actionType) {
      case 'breathing':
        return isActive ? 'Breathe in... hold... breathe out...' : 'Deep breathing exercise to reduce stress';
      case 'posture':
        return isActive ? 'Sit up straight, shoulders back' : 'Posture correction reminder';
      case 'break':
        return isActive ? 'Take a moment to rest your eyes' : 'Screen break to prevent eye strain';
      case 'hydration':
        return isActive ? 'Time to drink some water!' : 'Stay hydrated for better focus';
      default:
        return description;
    }
  };

  return (
    <div className={`neomorphic p-4 rounded-xl transition-all duration-300 ${isRecommended ? 'ring-2 ring-primary/30' : ''} ${isActive ? 'emotion-energy' : 'emotion-calm'}`}>
      {isRecommended && (
        <div className="flex items-center space-x-2 mb-3 text-primary">
          <Icon name="Sparkles" size={14} />
          <span className="text-xs font-medium">Recommended</span>
        </div>
      )}
      
      <div className="flex items-start space-x-3 mb-4">
        <div 
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isActive ? 'animate-biometric-pulse' : ''}`}
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon name={icon} size={20} color={color} />
        </div>
        <div className="flex-1">
          <h4 className="font-heading font-semibold text-foreground text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{getActionInstructions()}</p>
        </div>
      </div>
      
      {isActive && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-mono text-foreground">{formatTime(timeRemaining)}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-linear"
              style={{ 
                backgroundColor: color,
                width: `${progress}%`
              }}
            />
          </div>
        </div>
      )}
      
      <div className="flex space-x-2">
        {!isActive ? (
          <Button
            variant="outline"
            size="sm"
            onClick={startAction}
            className="flex-1 text-xs"
            iconName="Play"
            iconPosition="left"
            iconSize={14}
          >
            Start
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={stopAction}
            className="flex-1 text-xs"
            iconName="Square"
            iconPosition="left"
            iconSize={14}
          >
            Stop
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
        >
          <Icon name="MoreHorizontal" size={14} />
        </Button>
      </div>
    </div>
  );
};

export default HealthActionCard;
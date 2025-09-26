import React from 'react';
import Icon from '../../../components/AppIcon';

const StudyAnalytics = ({ currentSession, biometricData, currentEmotion }) => {
  const getEmotionColor = (emotion) => {
    const colors = {
      calm: 'var(--color-biometric-calm)',
      focus: 'var(--color-biometric-focus)',
      energy: 'var(--color-biometric-energy)',
      stress: 'var(--color-biometric-stress)'
    };
    return colors[emotion] || colors.calm;
  };

  const getPerformanceLevel = (accuracy) => {
    if (accuracy >= 90) return { level: 'Excellent', color: 'var(--color-success)' };
    if (accuracy >= 75) return { level: 'Good', color: 'var(--color-primary)' };
    if (accuracy >= 60) return { level: 'Fair', color: 'var(--color-warning)' };
    return { level: 'Needs Improvement', color: 'var(--color-error)' };
  };

  const performance = getPerformanceLevel(currentSession.accuracy);

  return (
    <div className="neomorphic rounded-xl p-6 emotion-calm">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="BarChart3" size={20} color="var(--color-primary)" />
        <span>Study Analytics</span>
      </h3>
      
      <div className="space-y-4">
        {/* Session Duration */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} color="var(--color-primary)" />
            <span className="text-sm text-foreground">Session Time</span>
          </div>
          <span className="text-sm font-mono text-foreground">{currentSession.duration}</span>
        </div>
        
        {/* Concepts Learned */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={16} color="var(--color-secondary)" />
            <span className="text-sm text-foreground">Concepts Learned</span>
          </div>
          <span className="text-sm font-mono text-foreground">{currentSession.conceptsLearned}</span>
        </div>
        
        {/* Accuracy */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} color={performance.color} />
            <span className="text-sm text-foreground">Accuracy</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-mono text-foreground">{currentSession.accuracy}%</span>
            <div className="text-xs text-muted-foreground">{performance.level}</div>
          </div>
        </div>
        
        {/* Streak */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Flame" size={16} color="var(--color-warning)" />
            <span className="text-sm text-foreground">Study Streak</span>
          </div>
          <span className="text-sm font-mono text-foreground">{currentSession.streak} days</span>
        </div>
        
        {/* Current Emotion Status */}
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground">Current Mood</span>
            <div className="flex items-center space-x-1">
              <div 
                className="w-2 h-2 rounded-full animate-biometric-pulse"
                style={{ backgroundColor: getEmotionColor(currentEmotion) }}
              />
              <span className="text-xs text-muted-foreground capitalize">{currentEmotion}</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${biometricData.focusLevel}%`,
                backgroundColor: getEmotionColor(currentEmotion)
              }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Focus Level: {biometricData.focusLevel}%
          </div>
        </div>
        
        {/* Biometric Data */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-2 bg-muted/20 rounded">
            <div className="font-mono text-foreground">{biometricData.heartRate} BPM</div>
            <div className="text-muted-foreground">Heart Rate</div>
          </div>
          <div className="text-center p-2 bg-muted/20 rounded">
            <div className="font-mono text-foreground capitalize">{biometricData.stressLevel}</div>
            <div className="text-muted-foreground">Stress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyAnalytics;


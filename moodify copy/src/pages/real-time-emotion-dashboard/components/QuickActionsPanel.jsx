import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActionsPanel = ({ currentEmotion, onMoodLog, onBreathingExercise, peerMoodData }) => {
  const [isLoggingMood, setIsLoggingMood] = useState(false);
  const [moodNote, setMoodNote] = useState('');
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingCount, setBreathingCount] = useState(0);

  const quickActions = [
    {
      id: 'mood-log',
      title: 'Log Mood',
      description: 'Add a note about your current state',
      icon: 'PenTool',
      color: 'var(--color-primary)',
      action: () => setIsLoggingMood(true)
    },
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      description: '4-7-8 breathing technique',
      icon: 'Wind',
      color: 'var(--color-biometric-calm)',
      action: () => startBreathingExercise()
    },
    {
      id: 'peer-mood',
      title: 'Peer Comparison',
      description: 'See how others are feeling',
      icon: 'Users',
      color: 'var(--color-secondary)',
      action: () => {}
    },
    {
      id: 'quick-break',
      title: 'Quick Break',
      description: 'Suggested 5-minute activities',
      icon: 'Coffee',
      color: 'var(--color-accent)',
      action: () => {}
    }
  ];

  const breakActivities = [
    { name: 'Walk Outside', duration: '5 min', icon: 'TreePine' },
    { name: 'Stretch', duration: '3 min', icon: 'Move' },
    { name: 'Hydrate', duration: '1 min', icon: 'Droplets' },
    { name: 'Deep Breathing', duration: '4 min', icon: 'Wind' }
  ];

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    setBreathingPhase('inhale');
    setBreathingCount(0);
    onBreathingExercise(true);

    // 4-7-8 breathing pattern
    const breathingCycle = () => {
      // Inhale for 4 seconds
      setBreathingPhase('inhale');
      setTimeout(() => {
        // Hold for 7 seconds
        setBreathingPhase('hold');
        setTimeout(() => {
          // Exhale for 8 seconds
          setBreathingPhase('exhale');
          setTimeout(() => {
            setBreathingCount(prev => {
              const newCount = prev + 1;
              if (newCount < 4) {
                breathingCycle();
              } else {
                setIsBreathingActive(false);
                setBreathingPhase('complete');
                onBreathingExercise(false);
              }
              return newCount;
            });
          }, 8000);
        }, 7000);
      }, 4000);
    };

    breathingCycle();
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
    setBreathingPhase('inhale');
    setBreathingCount(0);
    onBreathingExercise(false);
  };

  const handleMoodLog = () => {
    if (moodNote?.trim()) {
      onMoodLog({
        emotion: currentEmotion,
        note: moodNote,
        timestamp: new Date()?.toISOString()
      });
      setMoodNote('');
      setIsLoggingMood(false);
    }
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'complete':
        return 'Complete!';
      default:
        return 'Ready';
    }
  };

  const getBreathingColor = () => {
    switch (breathingPhase) {
      case 'inhale':
        return 'var(--color-success)';
      case 'hold':
        return 'var(--color-warning)';
      case 'exhale':
        return 'var(--color-biometric-calm)';
      case 'complete':
        return 'var(--color-primary)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="neomorphic emotion-focus bg-card rounded-xl p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={20} color="var(--color-primary)" />
          <span>Quick Actions</span>
        </h3>

        <div className="space-y-3">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant="ghost"
              onClick={action?.action}
              className="w-full justify-start p-4 h-auto hover:bg-muted/50"
            >
              <div className="flex items-center space-x-3 w-full">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${action?.color}20` }}
                >
                  <Icon name={action?.icon} size={20} color={action?.color} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-foreground">{action?.title}</div>
                  <div className="text-xs text-muted-foreground">{action?.description}</div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Mood Logging Modal */}
      {isLoggingMood && (
        <div className="neomorphic emotion-energy bg-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading font-semibold text-foreground">Log Your Mood</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLoggingMood(false)}
              iconName="X"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name="Smile" size={16} color="var(--color-primary)" />
              </div>
              <div>
                <div className="font-medium text-foreground capitalize">{currentEmotion}</div>
                <div className="text-xs text-muted-foreground">Current emotion</div>
              </div>
            </div>

            <Input
              label="Add a note (optional)"
              type="text"
              placeholder="What's contributing to your mood?"
              value={moodNote}
              onChange={(e) => setMoodNote(e?.target?.value)}
              className="w-full"
            />

            <div className="flex space-x-2">
              <Button
                variant="default"
                onClick={handleMoodLog}
                iconName="Check"
                iconPosition="left"
                className="flex-1"
              >
                Log Mood
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsLoggingMood(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Breathing Exercise */}
      {isBreathingActive && (
        <div className="neomorphic emotion-calm bg-card rounded-xl p-6 text-center">
          <div className="space-y-6">
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-2">
                Breathing Exercise
              </h4>
              <p className="text-sm text-muted-foreground">
                Cycle {breathingCount + 1} of 4
              </p>
            </div>

            <div className="relative">
              <div 
                className="w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-1000 animate-biometric-pulse"
                style={{ 
                  backgroundColor: `${getBreathingColor()}20`,
                  border: `3px solid ${getBreathingColor()}`
                }}
              >
                <div className="text-center">
                  <Icon 
                    name="Wind" 
                    size={32} 
                    color={getBreathingColor()}
                    className="mx-auto mb-2"
                  />
                  <div 
                    className="text-lg font-bold"
                    style={{ color: getBreathingColor() }}
                  >
                    {getBreathingInstruction()}
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={stopBreathingExercise}
              iconName="Square"
              iconPosition="left"
            >
              Stop Exercise
            </Button>
          </div>
        </div>
      )}
      {/* Peer Mood Comparison */}
      <div className="neomorphic emotion-energy bg-card rounded-xl p-6">
        <h4 className="font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Users" size={18} color="var(--color-secondary)" />
          <span>Peer Mood Snapshot</span>
        </h4>

        <div className="space-y-3">
          {peerMoodData?.map((peer, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={14} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{peer?.group}</div>
                  <div className="text-xs text-muted-foreground">{peer?.count} students</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: peer?.color }}
                />
                <span className="text-sm text-foreground capitalize">{peer?.mood}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={12} />
            <span>Anonymous data • Privacy protected</span>
          </div>
        </div>
      </div>
      {/* Quick Break Suggestions */}
      <div className="neomorphic emotion-calm bg-card rounded-xl p-6">
        <h4 className="font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Coffee" size={18} color="var(--color-accent)" />
          <span>Quick Break Ideas</span>
        </h4>

        <div className="grid grid-cols-2 gap-3">
          {breakActivities?.map((activity, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-3 flex-col space-y-2"
            >
              <Icon name={activity?.icon} size={24} color="var(--color-accent)" />
              <div className="text-center">
                <div className="text-sm font-medium text-foreground">{activity?.name}</div>
                <div className="text-xs text-muted-foreground">{activity?.duration}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;
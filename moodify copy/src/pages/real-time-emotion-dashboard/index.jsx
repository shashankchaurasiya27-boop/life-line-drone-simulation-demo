import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import LiveEmotionWidget from './components/LiveEmotionWidget';
import PersonalizedContentCards from './components/PersonalizedContentCards';
import MoodTimelineGraph from './components/MoodTimelineGraph';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';

const RealTimeEmotionDashboard = () => {
  const [currentEmotion, setCurrentEmotion] = useState('calm');
  const [biometricData, setBiometricData] = useState({
    heartRate: 72,
    stressLevel: 'low',
    bloodPressure: '120/80',
    temperature: 98.6
  });
  const [notifications, setNotifications] = useState([]);
  const [peerMoodData, setPeerMoodData] = useState([]);
  const [moodLogs, setMoodLogs] = useState([]);
  const [isBreathingExerciseActive, setIsBreathingExerciseActive] = useState(false);

  // Mock peer mood data
  useEffect(() => {
    const mockPeerData = [
      { group: 'CS 101 Class', mood: 'focus', count: 24, color: 'var(--color-biometric-focus)' },
      { group: 'Study Group', mood: 'energy', count: 8, color: 'var(--color-biometric-energy)' },
      { group: 'Dorm Floor', mood: 'calm', count: 15, color: 'var(--color-biometric-calm)' },
      { group: 'Project Team', mood: 'stress', count: 5, color: 'var(--color-biometric-stress)' }
    ];
    setPeerMoodData(mockPeerData);

    // Mock notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'mood_alert',
        title: 'Mood Pattern Detected',
        message: 'Your stress levels have been elevated for 2 hours. Consider taking a break.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false
      },
      {
        id: 2,
        type: 'peer_update',
        title: 'Study Group Mood',
        message: 'Your study group is in high-energy mode. Great time to collaborate!',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        read: false
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  // Simulate real-time biometric updates
  useEffect(() => {
    const interval = setInterval(() => {
      const emotionBiometrics = {
        calm: { heartRate: 68, stressLevel: 'low' },
        focus: { heartRate: 75, stressLevel: 'low' },
        energy: { heartRate: 85, stressLevel: 'medium' },
        stress: { heartRate: 95, stressLevel: 'high' }
      };

      const baseData = emotionBiometrics?.[currentEmotion] || emotionBiometrics?.calm;
      setBiometricData(prev => ({
        ...prev,
        heartRate: parseFloat((baseData?.heartRate + (Math.random() * 10) - 5).toFixed(3)),
        stressLevel: baseData?.stressLevel
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [currentEmotion]);

  const handleEmotionChange = (newEmotion) => {
    setCurrentEmotion(newEmotion);
    
    // Add notification for significant emotion changes
    if (newEmotion === 'stress') {
      const newNotification = {
        id: Date.now(),
        type: 'emotion_alert',
        title: 'Stress Detected',
        message: 'We noticed elevated stress levels. Would you like some suggestions to help?',
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [newNotification, ...prev]);
    }
  };

  const handleContentRating = (contentId, rating) => {
    console.log(`Content ${contentId} rated: ${rating} stars`);
    // In a real app, this would send feedback to improve AI recommendations
  };

  const handleMoodLog = (logEntry) => {
    const newLog = {
      id: Date.now(),
      ...logEntry,
      timestamp: new Date()?.toISOString()
    };
    setMoodLogs(prev => [newLog, ...prev]);
    
    // Add success notification
    const notification = {
      id: Date.now() + 1,
      type: 'success',
      title: 'Mood Logged',
      message: 'Your mood entry has been saved successfully.',
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const handleBreathingExercise = (isActive) => {
    setIsBreathingExerciseActive(isActive);
    
    if (!isActive) {
      // Add completion notification
      const notification = {
        id: Date.now(),
        type: 'success',
        title: 'Exercise Complete',
        message: 'Great job! Breathing exercise completed successfully.',
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [notification, ...prev]);
    }
  };

  const getEmotionTheme = () => {
    const themes = {
      calm: 'emotion-calm',
      focus: 'emotion-focus',
      energy: 'emotion-energy',
      stress: 'emotion-stress'
    };
    return themes?.[currentEmotion] || themes?.calm;
  };

  return (
    <div className={`min-h-screen bg-background ${getEmotionTheme()}`}>
      <Header />
      <main className="pt-16">
        <div className="w-full px-4 py-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Welcome back, Alex! 👋
                </h1>
                <p className="text-muted-foreground">
                  Your emotional well-being dashboard • {new Date()?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              {/* Notifications */}
              {notifications?.filter(n => !n?.read)?.length > 0 && (
                <div className="relative">
                  <div className="bg-card border border-border rounded-lg p-4 shadow-lg neomorphic max-w-sm">
                    <div className="flex items-start space-x-3">
                      <Icon name="Bell" size={20} color="var(--color-warning)" />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm">
                          {notifications?.[0]?.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notifications?.[0]?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full" />
                </div>
              )}
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Left Sidebar - Quick Actions (Desktop) */}
            <div className="lg:col-span-1 order-3 lg:order-1">
              <div className="sticky top-20">
                <QuickActionsPanel
                  currentEmotion={currentEmotion}
                  onMoodLog={handleMoodLog}
                  onBreathingExercise={handleBreathingExercise}
                  peerMoodData={peerMoodData}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-4 order-1 lg:order-2 space-y-6">
              {/* Top Section - Live Emotion Detection */}
              <LiveEmotionWidget
                currentEmotion={currentEmotion}
                onEmotionChange={handleEmotionChange}
                biometricData={biometricData}
              />

              {/* Center Section - Personalized Content */}
              <PersonalizedContentCards
                currentEmotion={currentEmotion}
                onContentRating={handleContentRating}
              />

              {/* Bottom Section - Mood Timeline */}
              <MoodTimelineGraph
                currentEmotion={currentEmotion}
              />

              {/* Additional Insights Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Today's Summary */}
                <div className="neomorphic emotion-calm bg-card rounded-xl p-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
                    <Icon name="Calendar" size={20} color="var(--color-primary)" />
                    <span>Today's Summary</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} color="var(--color-success)" />
                        <span className="text-sm text-foreground">Active Time</span>
                      </div>
                      <span className="text-sm font-mono text-foreground">6h 24m</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="Code" size={16} color="var(--color-secondary)" />
                        <span className="text-sm text-foreground">Coding Sessions</span>
                      </div>
                      <span className="text-sm font-mono text-foreground">3</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="Users" size={16} color="var(--color-accent)" />
                        <span className="text-sm text-foreground">Social Interactions</span>
                      </div>
                      <span className="text-sm font-mono text-foreground">12</span>
                    </div>
                  </div>
                </div>

                {/* Wellness Score */}
                <div className="neomorphic emotion-energy bg-card rounded-xl p-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
                    <Icon name="Heart" size={20} color="var(--color-error)" />
                    <span>Wellness Score</span>
                  </h3>
                  
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-foreground mb-2">87</div>
                    <div className="text-sm text-muted-foreground">Overall wellness today</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Emotional Balance</span>
                      <span className="text-foreground">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '92%' }} />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Stress Management</span>
                      <span className="text-foreground">78%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '78%' }} />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Social Connection</span>
                      <span className="text-foreground">91%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '91%' }} />
                    </div>
                  </div>
                </div>

                {/* Productivity Insights */}
                <div className="neomorphic emotion-focus bg-card rounded-xl p-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
                    <Icon name="TrendingUp" size={20} color="var(--color-secondary)" />
                    <span>Productivity Insights</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="Code" size={16} color="var(--color-primary)" />
                        <span className="text-sm text-foreground">Focus Sessions</span>
                      </div>
                      <span className="text-sm font-mono text-foreground">4.2h</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="Target" size={16} color="var(--color-success)" />
                        <span className="text-sm text-foreground">Goal Completion</span>
                      </div>
                      <span className="text-sm font-mono text-foreground">78%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="Zap" size={16} color="var(--color-warning)" />
                        <span className="text-sm text-foreground">Peak Performance</span>
                      </div>
                      <span className="text-sm font-mono text-foreground">2:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Quick Actions (Mobile Only) */}
          <div className="lg:hidden mt-6 order-2">
            <QuickActionsPanel
              currentEmotion={currentEmotion}
              onMoodLog={handleMoodLog}
              onBreathingExercise={handleBreathingExercise}
              peerMoodData={peerMoodData}
            />
          </div>
        </div>
      </main>
      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <button className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center neomorphic hover:scale-105 transition-transform">
          <Icon name="Plus" size={24} />
        </button>
      </div>
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-biometric-pulse"
          style={{ 
            backgroundColor: currentEmotion === 'calm' ? 'var(--color-biometric-calm)' :
                           currentEmotion === 'focus' ? 'var(--color-biometric-focus)' :
                           currentEmotion === 'energy' ? 'var(--color-biometric-energy)' :
                           'var(--color-biometric-stress)',
            opacity: 0.1
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl animate-biometric-pulse"
          style={{ 
            backgroundColor: currentEmotion === 'calm' ? 'var(--color-biometric-focus)' :
                           currentEmotion === 'focus' ? 'var(--color-biometric-energy)' :
                           currentEmotion === 'energy' ? 'var(--color-biometric-calm)' :
                           'var(--color-biometric-focus)',
            opacity: 0.05,
            animationDelay: '2s'
          }}
        />
      </div>
    </div>
  );
};

export default RealTimeEmotionDashboard;
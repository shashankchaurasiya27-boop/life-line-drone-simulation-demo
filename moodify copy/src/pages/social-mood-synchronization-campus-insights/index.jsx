import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import MoodHeatmap from './components/MoodHeatmap';
import StudyGroupOptimizer from './components/StudyGroupOptimizer';
import ViralMemeTracker from './components/ViralMemeTracker';
import EmotionalContagionNetwork from './components/EmotionalContagionNetwork';
import AnonymousPeerSupport from './components/AnonymousPeerSupport';

const SocialMoodSynchronizationCampusInsights = () => {
  const [currentUserMood, setCurrentUserMood] = useState('focus');
  const [notificationCount, setNotificationCount] = useState(3);
  const [campusStats, setCampusStats] = useState({
    totalStudents: 1247,
    activeNow: 456,
    dominantMood: 'focus',
    moodDistribution: {
      calm: 28,
      focus: 35,
      energy: 22,
      stress: 15
    }
  });

  useEffect(() => {
    // Simulate real-time campus mood updates
    const interval = setInterval(() => {
      setCampusStats(prev => ({
        ...prev,
        activeNow: prev?.activeNow + Math.floor((Math.random() - 0.5) * 20),
        moodDistribution: {
          calm: Math.max(10, Math.min(40, prev?.moodDistribution?.calm + Math.floor((Math.random() - 0.5) * 6))),
          focus: Math.max(10, Math.min(40, prev?.moodDistribution?.focus + Math.floor((Math.random() - 0.5) * 6))),
          energy: Math.max(10, Math.min(40, prev?.moodDistribution?.energy + Math.floor((Math.random() - 0.5) * 6))),
          stress: Math.max(10, Math.min(40, prev?.moodDistribution?.stress + Math.floor((Math.random() - 0.5) * 6)))
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getMoodColor = (mood) => {
    const colors = {
      calm: 'var(--color-biometric-calm)',
      focus: 'var(--color-biometric-focus)',
      energy: 'var(--color-biometric-energy)',
      stress: 'var(--color-biometric-stress)'
    };
    return colors?.[mood] || colors?.calm;
  };

  const getMoodIcon = (mood) => {
    const icons = {
      calm: 'Waves',
      focus: 'Target',
      energy: 'Zap',
      stress: 'AlertTriangle'
    };
    return icons?.[mood] || icons?.calm;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Social Mood Synchronization & Campus Insights - Moodify</title>
        <meta name="description" content="Connect with CS students through anonymous mood sharing and campus-wide emotional intelligence insights. Real-time mood heatmaps, study group optimization, and peer support." />
        <meta name="keywords" content="campus mood, social synchronization, peer support, study groups, emotional intelligence, CS students" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section with Campus Overview */}
        <section className="px-4 lg:px-6 py-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
          <div className="w-full">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Users" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                    Campus Mood Synchronization
                  </h1>
                  <p className="text-lg text-muted-foreground mt-1">
                    Connect, share, and thrive together through emotional intelligence
                  </p>
                </div>
              </div>
            </div>

            {/* Campus Stats Dashboard */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-card rounded-lg p-4 neomorphic text-center">
                <div className="text-2xl font-bold text-foreground">{campusStats?.totalStudents?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>
              
              <div className="bg-card rounded-lg p-4 neomorphic text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <div className="text-2xl font-bold text-foreground">{campusStats?.activeNow}</div>
                </div>
                <div className="text-sm text-muted-foreground">Active Now</div>
              </div>
              
              <div className="bg-card rounded-lg p-4 neomorphic text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Icon 
                    name={getMoodIcon(campusStats?.dominantMood)} 
                    size={16} 
                    color={getMoodColor(campusStats?.dominantMood)}
                  />
                  <div className="text-2xl font-bold text-foreground capitalize">{campusStats?.dominantMood}</div>
                </div>
                <div className="text-sm text-muted-foreground">Dominant Mood</div>
              </div>
              
              <div className="bg-card rounded-lg p-4 neomorphic text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Icon name="Bell" size={16} className="text-primary" />
                  <div className="text-2xl font-bold text-foreground">{notificationCount}</div>
                </div>
                <div className="text-sm text-muted-foreground">Mood Updates</div>
              </div>
            </div>

            {/* Mood Distribution Bar */}
            <div className="bg-card rounded-lg p-4 neomorphic mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Campus Mood Distribution</h3>
                <div className="text-sm text-muted-foreground">Live Updates</div>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden flex">
                  {Object.entries(campusStats?.moodDistribution)?.map(([mood, percentage]) => (
                    <div
                      key={mood}
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: getMoodColor(mood)
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                {Object.entries(campusStats?.moodDistribution)?.map(([mood, percentage]) => (
                  <div key={mood} className="flex items-center space-x-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getMoodColor(mood) }}
                    />
                    <span className="capitalize text-muted-foreground">{mood}</span>
                    <span className="font-mono text-foreground">{percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="px-4 lg:px-6 py-8">
          <div className="w-full space-y-8">
            {/* Campus Mood Heatmap */}
            <MoodHeatmap />

            {/* Study Group Optimizer */}
            <StudyGroupOptimizer />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Viral Meme Tracker */}
              <ViralMemeTracker />

              {/* Emotional Contagion Network */}
              <EmotionalContagionNetwork />
            </div>

            {/* Anonymous Peer Support */}
            <AnonymousPeerSupport />

            {/* Quick Actions Panel */}
            <div className="bg-card rounded-xl p-6 neomorphic">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
                  <p className="text-sm text-muted-foreground">Connect and engage with your campus community</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  iconName="MessageSquare"
                >
                  <span className="text-sm">Share Mood</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  iconName="Users"
                >
                  <span className="text-sm">Find Study Group</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  iconName="Brain"
                >
                  <span className="text-sm">Join Meditation</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2"
                  iconName="TrendingUp"
                >
                  <span className="text-sm">Create Content</span>
                </Button>
              </div>
            </div>

            {/* Privacy & Safety Notice */}
            <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-xl p-6 border border-success/20">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-success flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={20} color="white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Privacy & Safety First</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your emotional data is protected with end-to-end encryption, differential privacy algorithms, 
                    and blockchain-based data ownership controls. You maintain complete control over what you share 
                    and with whom.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs bg-success/20 text-success rounded-full border border-success/30">
                      Anonymous by Default
                    </span>
                    <span className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full border border-primary/30">
                      End-to-End Encrypted
                    </span>
                    <span className="px-3 py-1 text-xs bg-secondary/20 text-secondary rounded-full border border-secondary/30">
                      Blockchain Protected
                    </span>
                    <span className="px-3 py-1 text-xs bg-warning/20 text-warning rounded-full border border-warning/30">
                      GDPR Compliant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="px-4 lg:px-6 py-8 border-t border-border bg-muted/20">
        <div className="w-full text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Brain" size={16} color="white" />
            </div>
            <span className="text-lg font-heading font-semibold text-foreground">Moodify</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Empowering CS students through emotional intelligence and peer connection
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} Moodify. All rights reserved. • Privacy-first emotional AI platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SocialMoodSynchronizationCampusInsights;
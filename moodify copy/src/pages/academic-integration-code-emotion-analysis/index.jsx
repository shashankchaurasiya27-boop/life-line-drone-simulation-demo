import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import StudySessionTracker from './components/StudySessionTracker';
import EmotionAnalysisPanel from './components/EmotionAnalysisPanel';
import AcademicStressMapper from './components/AcademicStressMapper';
import AICareerGuidance from './components/AICareerGuidance';
import CollaborationOptimizer from './components/CollaborationOptimizer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AcademicIntegrationCodeEmotionAnalysis = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentSession, setCurrentSession] = useState({
    duration: '1h 23m',
    linesOfCode: 247,
    emotionalState: 'focused',
    productivity: 78
  });
  useEffect(() => {
    // Simulate session tracking
    const sessionInterval = setInterval(() => {
      setCurrentSession(prev => ({
        ...prev,
        duration: `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`,
        linesOfCode: prev?.linesOfCode + Math.floor(Math.random() * 10),
        productivity: Math.floor(Math.random() * 100)
      }));
    }, 30000);

    return () => clearInterval(sessionInterval);
  }, []);

  const toggleVoiceControl = () => {
    setIsVoiceActive(!isVoiceActive);
    // Voice control implementation would go here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Session Status Bar */}
        <div className="bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-biometric-pulse" />
                <span className="text-sm font-medium text-foreground">Active Session</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{currentSession?.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Code" size={14} />
                  <span>{currentSession?.linesOfCode} lines</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Activity" size={14} />
                  <span>{currentSession?.productivity}% productive</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Brain" size={14} />
                  <span className="capitalize">{currentSession?.emotionalState}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Voice Control Toggle */}
              <Button
                variant={isVoiceActive ? "default" : "ghost"}
                size="sm"
                onClick={toggleVoiceControl}
                className="relative"
              >
                <Icon name={isVoiceActive ? "MicOff" : "Mic"} size={16} />
                <span className="ml-1 hidden sm:inline">
                  {isVoiceActive ? "Voice On" : "Voice Off"}
                </span>
                {isVoiceActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full animate-biometric-pulse" />
                )}
              </Button>
              
              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Download">
                  <span className="ml-1 hidden sm:inline">Export Data</span>
                </Button>
                <Button variant="outline" size="sm" iconName="Share">
                  <span className="ml-1 hidden sm:inline">Share Report</span>
                </Button>
              </div>
              
              <Button variant="ghost" size="sm">
                <Icon name="Settings" size={16} />
                <span className="ml-1 hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="w-full p-4">
          {/* Emotion Analysis Panel - Full Width */}
          <div className="mb-6">
            <EmotionAnalysisPanel />
          </div>
          
          {/* Academic Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Study Session Tracker */}
            <div className="h-[600px]">
              <StudySessionTracker />
            </div>
            
            {/* AI Career Guidance */}
            <div className="h-[600px]">
              <AICareerGuidance />
            </div>
            
            {/* Collaboration Optimizer */}
            <div className="h-[600px]">
              <CollaborationOptimizer />
            </div>
          </div>
          
          {/* Academic Stress Mapper - Full Width Bottom */}
          <div className="mt-6">
            <AcademicStressMapper />
          </div>
        </div>

        {/* Voice Command Overlay */}
        {isVoiceActive && (
          <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg neomorphic z-50">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-error rounded-full animate-biometric-pulse" />
              <div>
                <div className="font-medium text-foreground">Voice Control Active</div>
                <div className="text-xs text-muted-foreground">Say "Hey Moodify" to start</div>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-muted-foreground">
              <div>Available commands:</div>
              <ul className="mt-1 space-y-0.5">
                <li>• "Run code" - Execute current code</li>
                <li>• "Show analysis" - Focus on emotion panel</li>
                <li>• "Take break" - Suggest break time</li>
                <li>• "Save progress" - Save current work</li>
              </ul>
            </div>
          </div>
        )}

        {/* Mobile Companion Sync Status */}
        <div className="fixed bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg neomorphic z-40 lg:hidden">
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={16} color="var(--color-success)" />
            <span className="text-sm text-foreground">Mobile Synced</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AcademicIntegrationCodeEmotionAnalysis;
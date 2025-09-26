import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StudyPlanGenerator from './components/StudyPlanGenerator';
import FlashcardGenerator from './components/FlashcardGenerator';
import ConceptExplainer from './components/ConceptExplainer';
import PracticeProblems from './components/PracticeProblems';
import StudyAnalytics from './components/StudyAnalytics';
import AdaptiveLearning from './components/AdaptiveLearning';

const AIPoweredStudyAssistant = () => {
  const [currentEmotion, setCurrentEmotion] = useState('focus');
  const [selectedSubject, setSelectedSubject] = useState('programming');
  const [studyMode, setStudyMode] = useState('adaptive');
  const [currentSession, setCurrentSession] = useState({
    duration: '0m',
    conceptsLearned: 0,
    accuracy: 0,
    streak: 0
  });
  const [biometricData, setBiometricData] = useState({
    heartRate: 72,
    stressLevel: 'low',
    focusLevel: 85,
    energyLevel: 'moderate'
  });

  const subjects = [
    { id: 'programming', name: 'Programming', icon: 'Code', color: 'var(--color-primary)' },
    { id: 'algorithms', name: 'Algorithms', icon: 'Cpu', color: 'var(--color-secondary)' },
    { id: 'datastructures', name: 'Data Structures', icon: 'Layers', color: 'var(--color-accent)' },
    { id: 'mathematics', name: 'Mathematics', icon: 'Calculator', color: 'var(--color-warning)' },
    { id: 'databases', name: 'Databases', icon: 'Database', color: 'var(--color-success)' },
    { id: 'networking', name: 'Networking', icon: 'Globe', color: 'var(--color-error)' }
  ];

  const studyModes = [
    { id: 'adaptive', name: 'Adaptive Learning', icon: 'Brain', description: 'AI adjusts to your learning pace' },
    { id: 'focused', name: 'Focused Study', icon: 'Target', description: 'Deep dive into specific topics' },
    { id: 'review', name: 'Review Mode', icon: 'RotateCcw', description: 'Reinforce previous learning' },
    { id: 'exam', name: 'Exam Prep', icon: 'FileText', description: 'Intensive exam preparation' }
  ];

  // Simulate real-time emotion detection
  useEffect(() => {
    const emotionInterval = setInterval(() => {
      const emotions = ['calm', 'focus', 'energy', 'stress'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setCurrentEmotion(randomEmotion);
      
      // Update biometric data based on emotion
      const heartRates = { calm: 68, focus: 75, energy: 85, stress: 95 };
      const stressLevels = { calm: 'low', focus: 'low', energy: 'medium', stress: 'high' };
      const focusLevels = { calm: 70, focus: 95, energy: 80, stress: 45 };
      const energyLevels = { calm: 'low', focus: 'moderate', energy: 'high', stress: 'low' };
      
      setBiometricData({
        heartRate: heartRates[randomEmotion] + Math.floor(Math.random() * 10) - 5,
        stressLevel: stressLevels[randomEmotion],
        focusLevel: focusLevels[randomEmotion] + Math.floor(Math.random() * 20) - 10,
        energyLevel: energyLevels[randomEmotion]
      });
    }, 10000);

    return () => clearInterval(emotionInterval);
  }, []);

  // Simulate study session tracking
  useEffect(() => {
    const sessionInterval = setInterval(() => {
      setCurrentSession(prev => ({
        ...prev,
        duration: `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`,
        conceptsLearned: prev.conceptsLearned + Math.floor(Math.random() * 3),
        accuracy: Math.min(100, prev.accuracy + Math.floor(Math.random() * 5)),
        streak: prev.streak + 1
      }));
    }, 30000);

    return () => clearInterval(sessionInterval);
  }, []);

  const getEmotionTheme = () => {
    const themes = {
      calm: 'emotion-calm',
      focus: 'emotion-focus',
      energy: 'emotion-energy',
      stress: 'emotion-stress'
    };
    return themes[currentEmotion] || themes.calm;
  };

  const getStudyRecommendation = () => {
    const recommendations = {
      calm: 'Perfect time for deep learning and complex concepts',
      focus: 'Great focus! Tackle challenging problems now',
      energy: 'High energy! Perfect for active learning and practice',
      stress: 'Take a break or try easier concepts to build confidence'
    };
    return recommendations[currentEmotion] || recommendations.calm;
  };

  return (
    <div className={`min-h-screen bg-background ${getEmotionTheme()}`}>
      <Helmet>
        <title>AI-Powered Study Assistant - Moodify</title>
        <meta name="description" content="Personalized learning support with AI-powered study plans, flashcards, and adaptive learning for CS students" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                AI-Powered Study Assistant
              </h1>
              <p className="text-muted-foreground mb-4">
                Personalized learning support powered by emotion-aware AI
              </p>
              
              {/* Current Session Status */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-biometric-pulse" />
                  <span className="text-foreground">Active Session: {currentSession.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="BookOpen" size={16} color="var(--color-primary)" />
                  <span className="text-foreground">{currentSession.conceptsLearned} concepts learned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={16} color="var(--color-success)" />
                  <span className="text-foreground">{currentSession.accuracy}% accuracy</span>
                </div>
              </div>
            </div>
            
            {/* Emotion Status */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Current Mood</div>
                <div className="text-lg font-semibold text-foreground capitalize">{currentEmotion}</div>
                <div className="text-xs text-muted-foreground">{getStudyRecommendation()}</div>
              </div>
              <div className="p-3 rounded-xl bg-card neomorphic">
                <Icon 
                  name={currentEmotion === 'calm' ? 'Heart' : 
                        currentEmotion === 'focus' ? 'Target' : 
                        currentEmotion === 'energy' ? 'Zap' : 'AlertTriangle'} 
                  size={24} 
                  color={currentEmotion === 'calm' ? 'var(--color-biometric-calm)' : 
                         currentEmotion === 'focus' ? 'var(--color-biometric-focus)' : 
                         currentEmotion === 'energy' ? 'var(--color-biometric-energy)' : 'var(--color-biometric-stress)'} 
                />
              </div>
            </div>
          </div>

          {/* Subject Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Choose Your Subject</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {subjects.map((subject) => (
                <Button
                  key={subject.id}
                  variant={selectedSubject === subject.id ? 'default' : 'outline'}
                  onClick={() => setSelectedSubject(subject.id)}
                  className="flex flex-col items-center space-y-2 p-4 h-auto"
                >
                  <Icon name={subject.icon} size={24} color={subject.color} />
                  <span className="text-sm font-medium">{subject.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Study Mode Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Study Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {studyModes.map((mode) => (
                <div
                  key={mode.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    studyMode === mode.id
                      ? 'border-primary bg-primary/10 neomorphic'
                      : 'border-border hover:border-primary/50 hover:bg-muted/30'
                  }`}
                  onClick={() => setStudyMode(mode.id)}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name={mode.icon} size={20} color="var(--color-primary)" />
                    <span className="font-medium text-foreground">{mode.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{mode.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Sidebar - Study Tools */}
            <div className="xl:col-span-1 space-y-6">
              {/* Study Analytics */}
              <StudyAnalytics 
                currentSession={currentSession}
                biometricData={biometricData}
                currentEmotion={currentEmotion}
              />
              
              {/* Adaptive Learning */}
              <AdaptiveLearning 
                currentEmotion={currentEmotion}
                studyMode={studyMode}
                selectedSubject={selectedSubject}
              />
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-2 space-y-6">
              {/* Study Plan Generator */}
              <StudyPlanGenerator 
                selectedSubject={selectedSubject}
                studyMode={studyMode}
                currentEmotion={currentEmotion}
              />

              {/* Flashcard Generator */}
              <FlashcardGenerator 
                selectedSubject={selectedSubject}
                currentEmotion={currentEmotion}
              />

              {/* Concept Explainer */}
              <ConceptExplainer 
                selectedSubject={selectedSubject}
                currentEmotion={currentEmotion}
              />

              {/* Practice Problems */}
              <PracticeProblems 
                selectedSubject={selectedSubject}
                studyMode={studyMode}
                currentEmotion={currentEmotion}
              />
            </div>
          </div>

          {/* Study Tips Based on Emotion */}
          <div className="mt-8 bg-muted/30 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <Icon name="Lightbulb" size={24} color="var(--color-warning)" className="mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  AI Study Recommendation
                </h3>
                <p className="text-muted-foreground mb-4">
                  Based on your current emotional state and biometric data, here are personalized study tips:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-card rounded-lg neomorphic">
                    <h4 className="font-medium text-foreground mb-2">Optimal Study Duration</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentEmotion === 'focus' ? '45-60 minutes' : 
                       currentEmotion === 'energy' ? '30-45 minutes' : 
                       currentEmotion === 'calm' ? '60-90 minutes' : '15-30 minutes'}
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-lg neomorphic">
                    <h4 className="font-medium text-foreground mb-2">Recommended Activity</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentEmotion === 'focus' ? 'Complex problem solving' : 
                       currentEmotion === 'energy' ? 'Active learning & practice' : 
                       currentEmotion === 'calm' ? 'Deep reading & analysis' : 'Review & light practice'}
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-lg neomorphic">
                    <h4 className="font-medium text-foreground mb-2">Break Frequency</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentEmotion === 'focus' ? 'Every 45 minutes' : 
                       currentEmotion === 'energy' ? 'Every 30 minutes' : 
                       currentEmotion === 'calm' ? 'Every 60 minutes' : 'Every 15 minutes'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIPoweredStudyAssistant;


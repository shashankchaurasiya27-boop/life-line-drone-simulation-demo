import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContentTypeSelector from './components/ContentTypeSelector';
import CreationWorkspace from './components/CreationWorkspace';
import GenerationHistory from './components/GenerationHistory';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AIContentGenerationHub = () => {
  const [selectedType, setSelectedType] = useState('memes');
  const [currentEmotion, setCurrentEmotion] = useState('calm');
  const [moodFilter, setMoodFilter] = useState('current');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [biometricData, setBiometricData] = useState({
    heartRate: 72,
    stressLevel: 'low',
    focusLevel: 85,
    energyLevel: 'moderate'
  });

  // Simulate real-time emotion detection
  useEffect(() => {
    const emotionInterval = setInterval(() => {
      const emotions = ['calm', 'focus', 'energy', 'stress'];
      const randomEmotion = emotions?.[Math.floor(Math.random() * emotions?.length)];
      setCurrentEmotion(randomEmotion);
      
      // Update biometric data based on emotion
      const heartRates = { calm: 68, focus: 75, energy: 85, stress: 95 };
      const stressLevels = { calm: 'low', focus: 'low', energy: 'medium', stress: 'high' };
      const focusLevels = { calm: 70, focus: 95, energy: 80, stress: 45 };
      const energyLevels = { calm: 'low', focus: 'moderate', energy: 'high', stress: 'low' };
      
      setBiometricData({
        heartRate: heartRates?.[randomEmotion] + Math.floor(Math.random() * 10) - 5,
        stressLevel: stressLevels?.[randomEmotion],
        focusLevel: focusLevels?.[randomEmotion] + Math.floor(Math.random() * 20) - 10,
        energyLevel: energyLevels?.[randomEmotion]
      });
    }, 8000);

    return () => clearInterval(emotionInterval);
  }, []);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleMoodFilterChange = (filter) => {
    setMoodFilter(filter);
  };

  const handleStartGeneration = () => {
    setIsGenerating(true);
  };

  const handleContentGenerated = (content) => {
    setGeneratedContent(content);
    setIsGenerating(false);
  };

  const handleContentSelect = (content) => {
    setGeneratedContent(content?.content);
    setSelectedType(content?.type);
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      calm: 'var(--color-biometric-calm)',
      focus: 'var(--color-biometric-focus)',
      energy: 'var(--color-biometric-energy)',
      stress: 'var(--color-biometric-stress)'
    };
    return colors?.[emotion] || colors?.calm;
  };

  const getEmotionIcon = (emotion) => {
    const icons = {
      calm: 'Waves',
      focus: 'Target',
      energy: 'Zap',
      stress: 'AlertTriangle'
    };
    return icons?.[emotion] || icons?.calm;
  };

  return (
    <>
      <Helmet>
        <title>AI Content Generation Hub - Moodify</title>
        <meta name="description" content="Create personalized motivational content using advanced AI models to boost CS student morale and engagement with real-time emotion detection." />
        <meta name="keywords" content="AI content generation, memes, motivational quotes, audio affirmations, study tips, emotion detection, CS students" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Main Content */}
        <main className="pt-16">
          {/* Mobile Header */}
          <div className="lg:hidden p-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-heading font-semibold text-foreground">Content Creator</h1>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div 
                    className="w-2 h-2 rounded-full animate-biometric-pulse"
                    style={{ backgroundColor: getEmotionColor(currentEmotion) }}
                  />
                  <span className="capitalize">{currentEmotion} mood detected</span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                iconName={isMobileMenuOpen ? 'X' : 'Menu'}
              />
            </div>

            {/* Mobile Biometric Status */}
            <div className="mt-3 p-3 bg-muted/30 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Heart" size={14} color="var(--color-error)" />
                  <span className="text-muted-foreground">HR:</span>
                  <span className="text-foreground font-mono">{typeof biometricData?.heartRate === 'number' ? biometricData.heartRate.toFixed(3) : biometricData?.heartRate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Brain" size={14} color="var(--color-primary)" />
                  <span className="text-muted-foreground">Focus:</span>
                  <span className="text-foreground font-mono">{biometricData?.focusLevel}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Activity" size={14} color="var(--color-warning)" />
                  <span className="text-muted-foreground">Stress:</span>
                  <span className="text-foreground capitalize">{biometricData?.stressLevel}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Battery" size={14} color="var(--color-success)" />
                  <span className="text-muted-foreground">Energy:</span>
                  <span className="text-foreground capitalize">{biometricData?.energyLevel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex h-[calc(100vh-4rem)]">
            {/* Left Panel - Content Type Selector */}
            <div className="w-1/4 min-w-[300px]">
              <ContentTypeSelector
                selectedType={selectedType}
                onTypeChange={handleTypeChange}
                currentEmotion={currentEmotion}
                onMoodFilterChange={handleMoodFilterChange}
                moodFilter={moodFilter}
              />
            </div>

            {/* Center Panel - Creation Workspace */}
            <div className="flex-1">
              <CreationWorkspace
                selectedType={selectedType}
                currentEmotion={currentEmotion}
                moodFilter={moodFilter}
                onContentGenerated={handleContentGenerated}
                isGenerating={isGenerating}
                onStartGeneration={handleStartGeneration}
              />
            </div>

            {/* Right Panel - Generation History */}
            <div className="w-1/4 min-w-[300px]">
              <GenerationHistory
                onContentSelect={handleContentSelect}
                newContent={generatedContent}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-80 h-full bg-background border-r border-border overflow-y-auto">
                  <ContentTypeSelector
                    selectedType={selectedType}
                    onTypeChange={(type) => {
                      handleTypeChange(type);
                      setIsMobileMenuOpen(false);
                    }}
                    currentEmotion={currentEmotion}
                    onMoodFilterChange={handleMoodFilterChange}
                    moodFilter={moodFilter}
                  />
                </div>
              </div>
            )}

            {/* Mobile Content */}
            <div className="min-h-[calc(100vh-8rem)]">
              <CreationWorkspace
                selectedType={selectedType}
                currentEmotion={currentEmotion}
                moodFilter={moodFilter}
                onContentGenerated={handleContentGenerated}
                isGenerating={isGenerating}
                onStartGeneration={handleStartGeneration}
              />
            </div>

            {/* Mobile Bottom Panel */}
            <div className="border-t border-border bg-card">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-foreground">Recent Content</h3>
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                </div>
                
                {/* Quick History Preview */}
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {[1, 2, 3, 4]?.map((item) => (
                    <div key={item} className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="FileText" size={20} color="var(--color-muted-foreground)" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Button for Mobile */}
          <div className="lg:hidden fixed bottom-6 right-6 z-30">
            <Button
              variant="default"
              size="lg"
              className="rounded-full w-14 h-14 shadow-lg"
              iconName="Plus"
              onClick={handleStartGeneration}
              disabled={isGenerating}
            />
          </div>

          {/* Real-time Emotion Indicator */}
          <div className="fixed top-20 right-4 z-20 hidden lg:block">
            <div className="bg-card border border-border rounded-lg p-3 shadow-lg neomorphic">
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={getEmotionIcon(currentEmotion)} 
                  size={16} 
                  color={getEmotionColor(currentEmotion)}
                  className="animate-biometric-pulse"
                />
                <span className="text-sm font-medium text-foreground capitalize">{currentEmotion}</span>
              </div>
              
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Heart Rate:</span>
                  <span className="font-mono">{biometricData?.heartRate} BPM</span>
                </div>
                <div className="flex justify-between">
                  <span>Focus:</span>
                  <span className="font-mono">{biometricData?.focusLevel}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Stress:</span>
                  <span className="capitalize">{biometricData?.stressLevel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Mood Indicator */}
          <div className="fixed bottom-6 left-6 z-20 hidden lg:block">
            <div className="bg-card border border-border rounded-lg p-3 shadow-lg neomorphic">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Users" size={14} color="var(--color-primary)" />
                <span className="text-sm font-medium text-foreground">Campus Mood</span>
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Energetic & Creative</span>
                </div>
                <div className="mt-1">Perfect for content sharing!</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AIContentGenerationHub;
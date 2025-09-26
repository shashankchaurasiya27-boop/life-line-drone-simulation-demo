import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CreationWorkspace = ({ 
  selectedType, 
  currentEmotion, 
  moodFilter, 
  onContentGenerated,
  isGenerating,
  onStartGeneration 
}) => {
  const [currentContent, setCurrentContent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Mock content based on type and emotion
  const mockContent = {
    memes: {
      calm: {
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop",
        text: "When your code compiles on the first try",
        subtitle: "Rare but magical moments ✨",
        template: "Success Kid"
      },
      focus: {
        image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=400&h=400&fit=crop",
        text: "Me entering the zone at 2 AM",
        subtitle: "Peak productivity hours activated 🚀",
        template: "Deep Focus"
      },
      energy: {
        image: "https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg",
        text: "When you finally fix that bug",
        subtitle: "Victory dance initiated! 💃",
        template: "Celebration"
      },
      stress: {
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop",
        text: "Debugging at 3 AM like...",
        subtitle: "Why does this always happen? 😅",
        template: "Struggle Bus"
      }
    },
    quotes: {
      calm: "Code is like poetry; both require patience, creativity, and the wisdom to know when to refactor. - AI Wisdom",
      focus: "The best programmers are not necessarily the fastest typists, but the clearest thinkers. - Focus Mode",
      energy: "Every expert was once a beginner. Every pro was once an amateur. Keep coding, keep growing! - Energy Boost",
      stress: "Bugs are just undocumented features waiting to be discovered. Take a breath, you've got this. - Stress Relief"
    },
    affirmations: {
      calm: {
        text: "I approach coding challenges with calm confidence and clear thinking.",
        duration: "2:30",
        voice: "Calm Female",
        background: "Ocean Waves"
      },
      focus: {
        text: "My mind is sharp, my focus is laser-precise, and my code flows effortlessly.",
        duration: "1:45",
        voice: "Focused Male",
        background: "White Noise"
      },
      energy: {
        text: "I am energized, motivated, and ready to tackle any programming challenge!",
        duration: "2:00",
        voice: "Energetic Female",
        background: "Upbeat Ambient"
      },
      stress: {
        text: "I release all coding stress and embrace the learning journey with patience.",
        duration: "3:15",
        voice: "Soothing Male",
        background: "Forest Sounds"
      }
    },
    'study-tips': {
      calm: {
        title: "Mindful Code Review",
        tip: "Take 5 minutes before each coding session to review your goals. This calm approach reduces errors by 40% and improves code quality.",
        steps: ["Set clear objectives", "Review previous work", "Plan your approach", "Code mindfully"]
      },
      focus: {
        title: "Pomodoro Programming",
        tip: "Use 25-minute focused coding sprints followed by 5-minute breaks. This technique maximizes concentration and prevents burnout.",
        steps: ["25 min coding", "5 min break", "Repeat 4 cycles", "30 min long break"]
      },
      energy: {
        title: "Active Learning Method",
        tip: "Explain your code out loud or teach concepts to others. This energetic approach reinforces learning and reveals knowledge gaps.",
        steps: ["Code & explain", "Teach a friend", "Create tutorials", "Join study groups"]
      },
      stress: {
        title: "Stress-Free Debugging",
        tip: "When stuck, step away for 10 minutes. Fresh perspective often reveals solutions that stressed minds miss.",
        steps: ["Acknowledge frustration", "Take a break", "Return with fresh eyes", "Ask for help if needed"]
      }
    }
  };

  const aiSuggestions = [
    "Try adding more CS-specific references",
    "Consider current academic calendar context",
    "Adjust humor level based on stress indicators",
    "Include peer collaboration elements",
    "Add motivational call-to-action"
  ];

  useEffect(() => {
    if (selectedType && currentEmotion) {
      const content = mockContent?.[selectedType]?.[currentEmotion];
      setCurrentContent(content);
      setSuggestions(aiSuggestions?.slice(0, 3));
    }
  }, [selectedType, currentEmotion, moodFilter]);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setGenerationProgress(0);
    }
  }, [isGenerating]);

  const handleGenerate = () => {
    setGenerationProgress(0);
    onStartGeneration();
    
    // Simulate generation completion
    setTimeout(() => {
      const content = mockContent?.[selectedType]?.[currentEmotion];
      setCurrentContent(content);
      onContentGenerated(content);
    }, 3000);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const renderContent = () => {
    if (!currentContent) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Sparkles" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Ready to Create</h3>
            <p className="text-muted-foreground mb-6">Select a content type and click generate to start</p>
            <Button 
              variant="default" 
              iconName="Play" 
              iconPosition="left"
              onClick={handleGenerate}
              disabled={!selectedType}
            >
              Generate Content
            </Button>
          </div>
        </div>
      );
    }

    switch (selectedType) {
      case 'memes':
        return (
          <div className="space-y-4">
            <div className="relative bg-muted rounded-lg overflow-hidden">
              <Image 
                src={currentContent?.image} 
                alt="Meme template"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4">
                <div className="text-white text-lg font-bold text-center">
                  {editMode ? (
                    <textarea 
                      className="w-full bg-transparent text-center resize-none border-none outline-none"
                      defaultValue={currentContent?.text}
                    />
                  ) : (
                    currentContent?.text
                  )}
                </div>
                <div className="text-white/80 text-sm text-center">
                  {currentContent?.subtitle}
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Template: {currentContent?.template}
            </div>
          </div>
        );

      case 'quotes':
        return (
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
            <Icon name="Quote" size={32} color="var(--color-primary)" className="mx-auto mb-4" />
            {editMode ? (
              <textarea 
                className="w-full bg-transparent text-lg font-medium text-foreground text-center resize-none border-none outline-none"
                defaultValue={currentContent}
                rows={4}
              />
            ) : (
              <blockquote className="text-lg font-medium text-foreground italic">
                "{currentContent}"
              </blockquote>
            )}
          </div>
        );

      case 'affirmations':
        return (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Audio Affirmation</h3>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm text-muted-foreground">{currentContent?.duration}</span>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              {editMode ? (
                <textarea 
                  className="w-full bg-transparent text-foreground resize-none border-none outline-none"
                  defaultValue={currentContent?.text}
                  rows={3}
                />
              ) : (
                <p className="text-foreground">{currentContent?.text}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Voice: </span>
                <span className="text-foreground">{currentContent?.voice}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Background: </span>
                <span className="text-foreground">{currentContent?.background}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <Button variant="outline" size="sm" iconName="Play">
                Preview
              </Button>
              <Button variant="outline" size="sm" iconName="Download">
                Generate Audio
              </Button>
            </div>
          </div>
        );

      case 'study-tips':
        return (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              {currentContent?.title}
            </h3>
            <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-4 mb-4">
              {editMode ? (
                <textarea 
                  className="w-full bg-transparent text-foreground resize-none border-none outline-none"
                  defaultValue={currentContent?.tip}
                  rows={3}
                />
              ) : (
                <p className="text-foreground">{currentContent?.tip}</p>
              )}
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Implementation Steps:</h4>
              <ol className="space-y-2">
                {currentContent?.steps?.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">Creation Workspace</h2>
            <p className="text-sm text-muted-foreground">
              {selectedType ? `Creating ${selectedType?.replace('-', ' ')} for ${currentEmotion} mood` : 'Select content type to begin'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {currentContent && (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  iconName={editMode ? "Check" : "Edit"} 
                  onClick={handleEdit}
                >
                  {editMode ? 'Save' : 'Edit'}
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  iconName="RefreshCw" 
                  onClick={handleGenerate}
                  loading={isGenerating}
                >
                  Regenerate
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Generation Progress */}
      {isGenerating && (
        <div className="px-4 py-2 bg-muted/30">
          <div className="flex items-center space-x-3">
            <Icon name="Sparkles" size={16} color="var(--color-primary)" className="animate-spin" />
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-foreground">Generating content...</span>
                <span className="text-muted-foreground">{Math.round(generationProgress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {renderContent()}
      </div>
      {/* AI Suggestions */}
      {suggestions?.length > 0 && currentContent && (
        <div className="p-4 border-t border-border bg-muted/20">
          <h3 className="text-sm font-medium text-foreground mb-2">AI Suggestions</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                className="text-xs px-3 py-1.5 bg-secondary/10 text-secondary rounded-full hover:bg-secondary/20 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Quick Actions */}
      {currentContent && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="Copy">
                Copy
              </Button>
              <Button variant="ghost" size="sm" iconName="Download">
                Export
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Layers">
                Batch Generate
              </Button>
              <Button variant="default" size="sm" iconName="Share">
                Share
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreationWorkspace;
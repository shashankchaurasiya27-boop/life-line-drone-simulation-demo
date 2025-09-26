import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentTypeSelector = ({ selectedType, onTypeChange, currentEmotion, onMoodFilterChange, moodFilter }) => {
  const contentTypes = [
    {
      id: 'memes',
      name: 'AI Memes',
      icon: 'Smile',
      description: 'CS-themed humor generation',
      color: 'var(--color-biometric-energy)',
      templates: ['Coding Struggles', 'Debug Life', 'Stack Overflow', 'Merge Conflicts', 'Deadline Panic']
    },
    {
      id: 'quotes',
      name: 'Motivational Quotes',
      icon: 'Quote',
      description: 'Personalized inspiration',
      color: 'var(--color-biometric-focus)',
      templates: ['Success Mindset', 'Learning Growth', 'Resilience', 'Innovation', 'Team Spirit']
    },
    {
      id: 'affirmations',
      name: 'Audio Affirmations',
      icon: 'Volume2',
      description: 'Voice-synthesized motivation',
      color: 'var(--color-biometric-calm)',
      templates: ['Confidence Boost', 'Stress Relief', 'Focus Enhancement', 'Energy Restoration', 'Sleep Preparation']
    },
    {
      id: 'study-tips',
      name: 'Study Tips',
      icon: 'BookOpen',
      description: 'Adaptive learning strategies',
      color: 'var(--color-primary)',
      templates: ['Algorithm Mastery', 'Code Review', 'System Design', 'Interview Prep', 'Project Planning']
    }
  ];

  const moodFilters = [
    { id: 'current', name: 'Current Mood', icon: 'Target', description: 'Match my current state' },
    { id: 'boost', name: 'Mood Boost', icon: 'TrendingUp', description: 'Elevate my energy' },
    { id: 'calm', name: 'Calming', icon: 'Waves', description: 'Reduce stress levels' },
    { id: 'focus', name: 'Focus Mode', icon: 'Zap', description: 'Enhance concentration' },
    { id: 'adaptive', name: 'Adaptive', icon: 'Shuffle', description: 'AI decides best approach' }
  ];

  const getEmotionColor = (emotion) => {
    const colors = {
      calm: 'var(--color-biometric-calm)',
      focus: 'var(--color-biometric-focus)',
      energy: 'var(--color-biometric-energy)',
      stress: 'var(--color-biometric-stress)'
    };
    return colors?.[emotion] || colors?.calm;
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Sparkles" size={20} color="var(--color-primary)" />
          <h2 className="text-lg font-heading font-semibold text-foreground">Content Creator</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div 
            className="w-2 h-2 rounded-full animate-biometric-pulse"
            style={{ backgroundColor: getEmotionColor(currentEmotion) }}
          />
          <span className="capitalize">Current: {currentEmotion}</span>
        </div>
      </div>
      {/* Content Types */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Content Types</h3>
          <div className="space-y-2">
            {contentTypes?.map((type) => (
              <button
                key={type?.id}
                onClick={() => onTypeChange(type?.id)}
                className={`
                  w-full p-3 rounded-lg border transition-all duration-300 text-left
                  ${selectedType === type?.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: selectedType === type?.id ? type?.color : 'var(--color-muted)' }}
                  >
                    <Icon 
                      name={type?.icon} 
                      size={16} 
                      color={selectedType === type?.id ? 'white' : 'var(--color-muted-foreground)'} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm">{type?.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{type?.description}</div>
                    {selectedType === type?.id && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {type?.templates?.slice(0, 3)?.map((template, index) => (
                          <span 
                            key={index}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {template}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mood-Based Filtering */}
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Mood Targeting</h3>
          <div className="space-y-2">
            {moodFilters?.map((filter) => (
              <button
                key={filter?.id}
                onClick={() => onMoodFilterChange(filter?.id)}
                className={`
                  w-full p-2.5 rounded-lg border transition-all duration-300 text-left
                  ${moodFilter === filter?.id
                    ? 'border-secondary bg-secondary/5' :'border-border hover:border-secondary/50 hover:bg-muted/30'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={filter?.icon} 
                    size={14} 
                    color={moodFilter === filter?.id ? 'var(--color-secondary)' : 'var(--color-muted-foreground)'} 
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{filter?.name}</div>
                    <div className="text-xs text-muted-foreground">{filter?.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generation Parameters */}
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-medium text-foreground mb-3">AI Parameters</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Creativity Level</label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Safe</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="70"
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-muted-foreground">Wild</span>
              </div>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Humor Style</label>
              <select className="w-full text-xs p-2 border border-border rounded-lg bg-background text-foreground">
                <option>Witty & Clever</option>
                <option>Sarcastic</option>
                <option>Wholesome</option>
                <option>Dark Humor</option>
                <option>Puns & Wordplay</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">CS Focus Area</label>
              <select className="w-full text-xs p-2 border border-border rounded-lg bg-background text-foreground">
                <option>General Programming</option>
                <option>Web Development</option>
                <option>Data Structures</option>
                <option>Machine Learning</option>
                <option>System Design</option>
                <option>Cybersecurity</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            fullWidth 
            iconName="Shuffle" 
            iconPosition="left"
          >
            Random Generate
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            fullWidth 
            iconName="Settings" 
            iconPosition="left"
          >
            Advanced Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentTypeSelector;
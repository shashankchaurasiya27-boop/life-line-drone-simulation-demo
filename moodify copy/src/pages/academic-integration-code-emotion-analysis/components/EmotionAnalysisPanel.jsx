import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmotionAnalysisPanel = () => {
  const [activeTab, setActiveTab] = useState('patterns');
  const [emotionData, setEmotionData] = useState([
    { time: '09:00', focus: 85, stress: 20, confidence: 70, frustration: 15 },
    { time: '10:00', focus: 75, stress: 35, confidence: 65, frustration: 25 },
    { time: '11:00', focus: 90, stress: 15, confidence: 85, frustration: 10 },
    { time: '12:00', focus: 60, stress: 50, confidence: 45, frustration: 40 },
    { time: '13:00', focus: 95, stress: 10, confidence: 90, frustration: 5 },
    { time: '14:00', focus: 70, stress: 30, confidence: 60, frustration: 20 }
  ]);

  const [commitAnalysis, setCommitAnalysis] = useState([
    {
      id: 1,
      commit: "Fix binary search edge case",
      timestamp: "2 hours ago",
      emotion: "breakthrough",
      quality: 92,
      message: "Implemented after debugging session - high confidence",
      files: 2,
      additions: 15,
      deletions: 3
    },
    {
      id: 2,
      commit: "WIP: struggling with recursion",
      timestamp: "4 hours ago", 
      emotion: "frustration",
      quality: 65,
      message: "Multiple attempts, need to revisit logic",
      files: 1,
      additions: 8,
      deletions: 12
    },
    {
      id: 3,
      commit: "Clean up data structures",
      timestamp: "6 hours ago",
      emotion: "focus",
      quality: 88,
      message: "Steady progress on optimization",
      files: 3,
      additions: 22,
      deletions: 5
    }
  ]);

  const [learningMetrics, setLearningMetrics] = useState([
    { skill: 'Algorithms', progress: 78, emotion: 'confident', trend: 'up' },
    { skill: 'Data Structures', progress: 85, emotion: 'focus', trend: 'up' },
    { skill: 'Debugging', progress: 65, emotion: 'frustrated', trend: 'down' },
    { skill: 'Problem Solving', progress: 72, emotion: 'engaged', trend: 'up' },
    { skill: 'Code Review', progress: 58, emotion: 'anxious', trend: 'stable' }
  ]);

  const getEmotionIcon = (emotion) => {
    const icons = {
      breakthrough: 'Lightbulb',
      frustration: 'AlertTriangle',
      focus: 'Target',
      confident: 'CheckCircle',
      engaged: 'Zap',
      anxious: 'AlertCircle'
    };
    return icons?.[emotion] || 'Circle';
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      breakthrough: 'var(--color-success)',
      frustration: 'var(--color-error)',
      focus: 'var(--color-biometric-focus)',
      confident: 'var(--color-biometric-calm)',
      engaged: 'var(--color-biometric-energy)',
      anxious: 'var(--color-warning)'
    };
    return colors?.[emotion] || 'var(--color-muted-foreground)';
  };

  const getTrendIcon = (trend) => {
    const icons = {
      up: 'TrendingUp',
      down: 'TrendingDown',
      stable: 'Minus'
    };
    return icons?.[trend] || 'Minus';
  };

  const tabs = [
    { id: 'patterns', label: 'Emotion Patterns', icon: 'Activity' },
    { id: 'commits', label: 'Commit Analysis', icon: 'GitCommit' },
    { id: 'learning', label: 'Learning Metrics', icon: 'BookOpen' }
  ];

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg neomorphic">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" size={20} color="var(--color-secondary)" />
          <div>
            <h3 className="font-heading font-semibold text-foreground">Emotion Analysis</h3>
            <p className="text-xs text-muted-foreground">Real-time coding insights</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm">
          <Icon name="Download" size={16} />
          <span className="ml-1">Export</span>
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all
              ${activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'patterns' && (
          <div className="space-y-6">
            {/* Emotion Timeline Chart */}
            <div>
              <h4 className="font-heading font-medium text-foreground mb-3">Today's Emotion Timeline</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={emotionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="time" 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-popover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="focus" 
                      stroke="var(--color-biometric-focus)" 
                      strokeWidth={2}
                      name="Focus"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="stress" 
                      stroke="var(--color-error)" 
                      strokeWidth={2}
                      name="Stress"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="confidence" 
                      stroke="var(--color-success)" 
                      strokeWidth={2}
                      name="Confidence"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Current State Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg neomorphic">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} color="var(--color-biometric-focus)" />
                  <span className="text-sm font-medium text-foreground">Focus Level</span>
                </div>
                <div className="text-2xl font-heading font-bold text-foreground">85%</div>
                <p className="text-xs text-muted-foreground">Optimal for complex tasks</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg neomorphic">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                  <span className="text-sm font-medium text-foreground">Stress Level</span>
                </div>
                <div className="text-2xl font-heading font-bold text-foreground">25%</div>
                <p className="text-xs text-muted-foreground">Within healthy range</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'commits' && (
          <div className="space-y-4">
            <h4 className="font-heading font-medium text-foreground">Recent Commits & Emotional Context</h4>
            
            {commitAnalysis?.map((commit) => (
              <div key={commit?.id} className="p-4 bg-muted/30 rounded-lg neomorphic">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getEmotionIcon(commit?.emotion)} 
                      size={18} 
                      color={getEmotionColor(commit?.emotion)}
                    />
                    <div>
                      <h5 className="font-medium text-foreground">{commit?.commit}</h5>
                      <p className="text-xs text-muted-foreground">{commit?.timestamp}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">Quality: {commit?.quality}%</div>
                      <div className="text-xs text-muted-foreground">
                        +{commit?.additions} -{commit?.deletions}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{commit?.message}</p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{commit?.files} files changed</span>
                  <span className="capitalize">{commit?.emotion} state</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="space-y-6">
            <h4 className="font-heading font-medium text-foreground">Learning Progress & Emotional Response</h4>
            
            <div className="space-y-4">
              {learningMetrics?.map((metric, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg neomorphic">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={getEmotionIcon(metric?.emotion)} 
                        size={16} 
                        color={getEmotionColor(metric?.emotion)}
                      />
                      <span className="font-medium text-foreground">{metric?.skill}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getTrendIcon(metric?.trend)} 
                        size={14} 
                        color={metric?.trend === 'up' ? 'var(--color-success)' : 
                               metric?.trend === 'down' ? 'var(--color-error)' : 
                               'var(--color-muted-foreground)'}
                      />
                      <span className="text-sm font-medium text-foreground">{metric?.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${metric?.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground capitalize">
                      Current state: {metric?.emotion}
                    </span>
                    <span className="text-muted-foreground">
                      Trend: {metric?.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
                <span className="font-medium text-foreground">AI Recommendations</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Take a 10-minute break to reduce debugging frustration</li>
                <li>• Practice algorithm visualization to boost confidence</li>
                <li>• Consider pair programming for complex problem solving</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionAnalysisPanel;
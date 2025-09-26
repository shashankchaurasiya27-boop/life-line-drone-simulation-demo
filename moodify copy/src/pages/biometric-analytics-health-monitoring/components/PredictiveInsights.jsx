import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictiveInsights = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('2h');
  const [insights, setInsights] = useState([]);

  const timeframes = [
    { label: '2H', value: '2h' },
    { label: '4H', value: '4h' },
    { label: '8H', value: '8h' },
    { label: '24H', value: '24h' }
  ];

  const mockInsights = {
    '2h': [
      {
        id: 1,
        type: 'mood',
        prediction: 'Stress Level Increase',
        confidence: 87,
        timeframe: '1.5 hours',
        factors: ['Upcoming deadline', 'Low sleep quality', 'High caffeine intake'],
        severity: 'medium',
        icon: 'AlertTriangle',
        color: 'var(--color-warning)',
        recommendation: 'Consider taking a 10-minute break and practicing breathing exercises'
      },
      {
        id: 2,
        type: 'energy',
        prediction: 'Energy Dip Expected',
        confidence: 92,
        timeframe: '2 hours',
        factors: ['Post-lunch metabolism', 'Screen time fatigue', 'Circadian rhythm'],
        severity: 'low',
        icon: 'Battery',
        color: 'var(--color-biometric-focus)',
        recommendation: 'Schedule lighter tasks and consider a brief walk'
      }
    ],
    '4h': [
      {
        id: 3,
        type: 'focus',
        prediction: 'Peak Focus Window',
        confidence: 78,
        timeframe: '3-4 hours',
        factors: ['Optimal cortisol levels', 'Good hydration', 'Stable glucose'],
        severity: 'positive',
        icon: 'Target',
        color: 'var(--color-success)',
        recommendation: 'Schedule complex coding tasks during this period'
      },
      {
        id: 4,
        type: 'mood',
        prediction: 'Mood Improvement',
        confidence: 84,
        timeframe: '4 hours',
        factors: ['Social interaction scheduled', 'Exercise planned', 'Natural light exposure'],
        severity: 'positive',
        icon: 'Smile',
        color: 'var(--color-biometric-calm)',
        recommendation: 'Great time for collaborative work and team meetings'
      }
    ],
    '8h': [
      {
        id: 5,
        type: 'sleep',
        prediction: 'Sleep Quality Risk',
        confidence: 76,
        timeframe: '6-8 hours',
        factors: ['Late screen exposure', 'High stress levels', 'Irregular schedule'],
        severity: 'high',
        icon: 'Moon',
        color: 'var(--color-error)',
        recommendation: 'Implement wind-down routine and reduce blue light exposure'
      }
    ],
    '24h': [
      {
        id: 6,
        type: 'overall',
        prediction: 'Burnout Risk Assessment',
        confidence: 69,
        timeframe: '18-24 hours',
        factors: ['Sustained high stress', 'Poor sleep pattern', 'Reduced social activity'],
        severity: 'high',
        icon: 'AlertCircle',
        color: 'var(--color-destructive)',
        recommendation: 'Consider scheduling recovery time and seeking support'
      }
    ]
  };

  useEffect(() => {
    setInsights(mockInsights?.[selectedTimeframe] || []);
  }, [selectedTimeframe]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'var(--color-error)';
      case 'medium': return 'var(--color-warning)';
      case 'low': return 'var(--color-biometric-focus)';
      case 'positive': return 'var(--color-success)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getConfidenceLevel = (confidence) => {
    if (confidence >= 90) return 'Very High';
    if (confidence >= 80) return 'High';
    if (confidence >= 70) return 'Medium';
    return 'Low';
  };

  return (
    <div className="neomorphic rounded-xl p-6 emotion-focus">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <Icon name="Brain" size={24} color="white" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-foreground">Predictive Insights</h3>
            <p className="text-sm text-muted-foreground">AI-powered mood forecasting & analysis</p>
          </div>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">Timeframe:</span>
          <div className="flex items-center space-x-1">
            {timeframes?.map((timeframe) => (
              <Button
                key={timeframe?.value}
                variant={selectedTimeframe === timeframe?.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe?.value)}
                className="text-xs px-3 py-1.5"
              >
                {timeframe?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {insights?.map((insight) => (
          <div key={insight?.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-200">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: `${insight?.color}15` }}
                >
                  <Icon name={insight?.icon} size={24} color={insight?.color} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-heading font-semibold text-foreground text-lg mb-1 leading-tight">
                    {insight?.prediction}
                  </h4>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getSeverityColor(insight?.severity) }}
                      />
                      <span className="text-sm font-medium text-muted-foreground">
                        {getConfidenceLevel(insight?.confidence)}
                      </span>
                    </div>
                    <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md">
                      {insight?.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeframe Section */}
            <div className="mb-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} color="var(--color-primary)" />
                <span className="text-sm font-medium text-muted-foreground">Expected Timeline:</span>
                <span className="text-sm font-semibold text-foreground">{insight?.timeframe}</span>
              </div>
            </div>

            {/* Contributing Factors Section */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="Target" size={14} color="var(--color-muted-foreground)" />
                <span>Contributing Factors</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {insight?.factors?.map((factor, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg border border-border/50"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation Section */}
            <div className="bg-gradient-to-r from-success/5 to-primary/5 rounded-lg p-4 border border-success/10">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Lightbulb" size={16} color="var(--color-success)" />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-sm font-medium text-foreground mb-2">Recommendation</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight?.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {insights?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Brain" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No predictions available for this timeframe</p>
          </div>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={12} />
            <span>AI Model v2.1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights;
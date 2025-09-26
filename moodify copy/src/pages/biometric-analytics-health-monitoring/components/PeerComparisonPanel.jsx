import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PeerComparisonPanel = () => {
  const [selectedMetric, setSelectedMetric] = useState('stress');
  const [viewMode, setViewMode] = useState('percentile');

  const metrics = [
    { id: 'stress', label: 'Stress Level', icon: 'Zap', color: 'var(--color-warning)' },
    { id: 'focus', label: 'Focus Score', icon: 'Target', color: 'var(--color-biometric-focus)' },
    { id: 'energy', label: 'Energy Level', icon: 'Battery', color: 'var(--color-success)' },
    { id: 'mood', label: 'Mood Score', icon: 'Smile', color: 'var(--color-biometric-calm)' }
  ];

  const comparisonData = {
    stress: {
      userScore: 32,
      percentile: 68,
      campusAverage: 45,
      trend: -8,
      insights: [
        'You handle stress better than 68% of CS students',
        'Your stress levels are 29% below campus average',
        'Stress decreased by 8% compared to last week'
      ]
    },
    focus: {
      userScore: 78,
      percentile: 85,
      campusAverage: 62,
      trend: 12,
      insights: [
        'Your focus is in the top 15% of students',
        'Focus score is 26% above campus average',
        'Focus improved by 12% this week'
      ]
    },
    energy: {
      userScore: 65,
      percentile: 72,
      campusAverage: 58,
      trend: 5,
      insights: [
        'Energy levels better than 72% of peers',
        'Energy is 12% above campus average',
        'Slight improvement of 5% from last week'
      ]
    },
    mood: {
      userScore: 71,
      percentile: 79,
      campusAverage: 63,
      trend: 3,
      insights: [
        'Mood score in top 21% of students',
        'Mood is 13% above campus average',
        'Stable mood with 3% improvement'
      ]
    }
  };

  const campusTrends = [
    {
      period: 'Exam Week',
      stressIncrease: '+45%',
      focusDecrease: '-23%',
      moodDecrease: '-18%',
      icon: 'BookOpen',
      color: 'var(--color-error)'
    },
    {
      period: 'Weekend',
      stressDecrease: '-32%',
      moodIncrease: '+28%',
      energyIncrease: '+15%',
      icon: 'Calendar',
      color: 'var(--color-success)'
    },
    {
      period: 'Project Deadline',
      stressIncrease: '+38%',
      focusIncrease: '+12%',
      sleepDecrease: '-25%',
      icon: 'Code',
      color: 'var(--color-warning)'
    }
  ];

  const currentMetric = comparisonData?.[selectedMetric];
  const selectedMetricInfo = metrics?.find(m => m?.id === selectedMetric);

  return (
    <div className="space-y-6">
      {/* Metric Selection */}
      <div className="neomorphic rounded-xl p-6 emotion-calm">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Peer Comparison</h3>
        <div className="grid grid-cols-2 gap-3">
          {metrics?.map((metric) => (
            <Button
              key={metric?.id}
              variant={selectedMetric === metric?.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedMetric(metric?.id)}
              className="justify-start"
              iconName={metric?.icon}
              iconPosition="left"
              iconSize={16}
            >
              {metric?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Detailed Comparison */}
      <div className="neomorphic rounded-xl p-6 emotion-focus">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${selectedMetricInfo?.color}20` }}
            >
              <Icon name={selectedMetricInfo?.icon} size={20} color={selectedMetricInfo?.color} />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground">{selectedMetricInfo?.label}</h4>
              <p className="text-sm text-muted-foreground">Your performance vs peers</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-heading font-bold" style={{ color: selectedMetricInfo?.color }}>
              {currentMetric?.userScore}
            </div>
            <div className="text-xs text-muted-foreground">Your Score</div>
          </div>
        </div>

        {/* Percentile Visualization */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Percentile Ranking</span>
            <span className="text-sm font-medium text-foreground">{currentMetric?.percentile}th percentile</span>
          </div>
          <div className="relative h-4 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000"
              style={{ 
                backgroundColor: `${selectedMetricInfo?.color}30`,
                width: '100%'
              }}
            />
            <div 
              className="absolute top-0 h-full w-1 bg-foreground rounded-full transition-all duration-1000"
              style={{ left: `${currentMetric?.percentile}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0th</span>
            <span>50th</span>
            <span>100th</span>
          </div>
        </div>

        {/* Comparison Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-xl font-heading font-bold text-foreground">{currentMetric?.campusAverage}</div>
            <div className="text-xs text-muted-foreground">Campus Average</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className={`text-xl font-heading font-bold flex items-center justify-center space-x-1 ${currentMetric?.trend > 0 ? 'text-success' : 'text-error'}`}>
              <Icon name={currentMetric?.trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
              <span>{Math.abs(currentMetric?.trend)}%</span>
            </div>
            <div className="text-xs text-muted-foreground">Weekly Trend</div>
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-2">
          {currentMetric?.insights?.map((insight, index) => (
            <div key={index} className="flex items-start space-x-2 text-sm">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{insight}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Campus Trends */}
      <div className="neomorphic rounded-xl p-6 emotion-calm">
        <h4 className="font-heading font-semibold text-foreground mb-4">Campus Mood Trends</h4>
        <div className="space-y-3">
          {campusTrends?.map((trend, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-muted/20 rounded-lg">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${trend?.color}20` }}
              >
                <Icon name={trend?.icon} size={16} color={trend?.color} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">{trend?.period}</div>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                  {trend?.stressIncrease && <span>Stress {trend?.stressIncrease}</span>}
                  {trend?.stressDecrease && <span>Stress {trend?.stressDecrease}</span>}
                  {trend?.focusDecrease && <span>Focus {trend?.focusDecrease}</span>}
                  {trend?.focusIncrease && <span>Focus {trend?.focusIncrease}</span>}
                  {trend?.moodDecrease && <span>Mood {trend?.moodDecrease}</span>}
                  {trend?.moodIncrease && <span>Mood {trend?.moodIncrease}</span>}
                  {trend?.energyIncrease && <span>Energy {trend?.energyIncrease}</span>}
                  {trend?.sleepDecrease && <span>Sleep {trend?.sleepDecrease}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Privacy Notice */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Privacy Protected</p>
            <p>All comparisons use anonymized, aggregated data. Individual identities are never revealed or stored.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerComparisonPanel;
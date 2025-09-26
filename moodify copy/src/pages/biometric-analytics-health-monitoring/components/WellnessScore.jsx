import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WellnessScore = ({ score = 78, trend = 5 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({
    physical: 82,
    mental: 75,
    emotional: 79,
    social: 73
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--color-success)';
    if (score >= 60) return 'var(--color-biometric-calm)';
    if (score >= 40) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="neomorphic rounded-xl p-6 emotion-calm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Wellness Score</h3>
          <p className="text-sm text-muted-foreground">Overall health assessment</p>
        </div>
        <div className={`flex items-center space-x-1 text-sm ${trend > 0 ? 'text-success' : 'text-error'}`}>
          <Icon name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
          <span className="font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--color-muted)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={getScoreColor(animatedScore)}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-2000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div 
                className="text-3xl font-heading font-bold transition-all duration-2000"
                style={{ color: getScoreColor(animatedScore) }}
              >
                {animatedScore}
              </div>
              <div className="text-xs text-muted-foreground">{getScoreLabel(animatedScore)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-heading font-semibold text-foreground text-sm">Score Breakdown</h4>
        
        {Object.entries(scoreBreakdown)?.map(([category, value]) => {
          const categoryIcons = {
            physical: 'Heart',
            mental: 'Brain',
            emotional: 'Smile',
            social: 'Users'
          };
          
          const categoryLabels = {
            physical: 'Physical Health',
            mental: 'Mental Focus',
            emotional: 'Emotional State',
            social: 'Social Connection'
          };

          return (
            <div key={category} className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${getScoreColor(value)}20` }}
              >
                <Icon name={categoryIcons?.[category]} size={16} color={getScoreColor(value)} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{categoryLabels?.[category]}</span>
                  <span className="text-sm font-mono text-muted-foreground">{value}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      backgroundColor: getScoreColor(value),
                      width: `${value}%`
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date()?.toLocaleString()}</span>
          <div className="flex items-center space-x-1">
            <Icon name="RefreshCw" size={12} />
            <span>Auto-refresh</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessScore;
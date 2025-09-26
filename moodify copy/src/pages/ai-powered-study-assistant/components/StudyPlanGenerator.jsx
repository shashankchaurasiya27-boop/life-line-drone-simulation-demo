import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudyPlanGenerator = ({ selectedSubject, studyMode, currentEmotion }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [studyPlan, setStudyPlan] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('1h');

  const durations = [
    { value: '30m', label: '30 minutes' },
    { value: '1h', label: '1 hour' },
    { value: '2h', label: '2 hours' },
    { value: '3h', label: '3 hours' }
  ];

  const generateStudyPlan = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const plans = {
        programming: {
          '30m': [
            { time: '0-10m', activity: 'Quick coding warm-up', type: 'practice' },
            { time: '10-25m', activity: 'Solve 2-3 coding problems', type: 'challenge' },
            { time: '25-30m', activity: 'Review solutions and notes', type: 'review' }
          ],
          '1h': [
            { time: '0-15m', activity: 'Coding warm-up exercises', type: 'practice' },
            { time: '15-40m', activity: 'Work on medium difficulty problems', type: 'challenge' },
            { time: '40-50m', activity: 'Debug and optimize code', type: 'analysis' },
            { time: '50-60m', activity: 'Review and document learnings', type: 'review' }
          ],
          '2h': [
            { time: '0-20m', activity: 'Coding fundamentals review', type: 'review' },
            { time: '20-50m', activity: 'Solve complex algorithms', type: 'challenge' },
            { time: '50-80m', activity: 'Build a small project', type: 'project' },
            { time: '80-100m', activity: 'Code review and refactoring', type: 'analysis' },
            { time: '100-120m', activity: 'Documentation and testing', type: 'review' }
          ]
        },
        algorithms: {
          '30m': [
            { time: '0-10m', activity: 'Algorithm theory review', type: 'theory' },
            { time: '10-25m', activity: 'Practice algorithm problems', type: 'practice' },
            { time: '25-30m', activity: 'Time complexity analysis', type: 'analysis' }
          ],
          '1h': [
            { time: '0-15m', activity: 'Algorithm patterns study', type: 'theory' },
            { time: '15-40m', activity: 'Solve algorithm challenges', type: 'challenge' },
            { time: '40-50m', activity: 'Optimize solutions', type: 'optimization' },
            { time: '50-60m', activity: 'Compare different approaches', type: 'analysis' }
          ]
        }
      };

      const subjectPlans = plans[selectedSubject] || plans.programming;
      const durationPlan = subjectPlans[selectedDuration] || subjectPlans['1h'];
      
      setStudyPlan({
        subject: selectedSubject,
        duration: selectedDuration,
        mode: studyMode,
        emotion: currentEmotion,
        activities: durationPlan
      });
      setIsGenerating(false);
    }, 2000);
  };

  const getActivityIcon = (type) => {
    const icons = {
      practice: 'Code',
      challenge: 'Target',
      review: 'BookOpen',
      analysis: 'Search',
      project: 'Folder',
      theory: 'Book',
      optimization: 'Zap'
    };
    return icons[type] || 'BookOpen';
  };

  const getActivityColor = (type) => {
    const colors = {
      practice: 'var(--color-primary)',
      challenge: 'var(--color-error)',
      review: 'var(--color-success)',
      analysis: 'var(--color-secondary)',
      project: 'var(--color-accent)',
      theory: 'var(--color-warning)',
      optimization: 'var(--color-biometric-energy)'
    };
    return colors[type] || 'var(--color-primary)';
  };

  return (
    <div className="neomorphic rounded-xl p-6 emotion-focus">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Calendar" size={20} color="var(--color-primary)" />
          <span>AI Study Plan Generator</span>
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="px-3 py-1 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {durations.map((duration) => (
              <option key={duration.value} value={duration.value}>
                {duration.label}
              </option>
            ))}
          </select>
          <Button
            onClick={generateStudyPlan}
            disabled={isGenerating}
            iconName={isGenerating ? 'Loader' : 'Sparkles'}
            iconPosition="left"
          >
            {isGenerating ? 'Generating...' : 'Generate Plan'}
          </Button>
        </div>
      </div>

      {studyPlan ? (
        <div className="space-y-4">
          {/* Plan Header */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">
                {studyPlan.subject.charAt(0).toUpperCase() + studyPlan.subject.slice(1)} Study Plan
              </h4>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Duration: {studyPlan.duration}</span>
                <span>Mode: {studyPlan.mode}</span>
                <span className="capitalize">Mood: {studyPlan.emotion}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Personalized study plan based on your current emotional state and learning preferences
            </p>
          </div>

          {/* Study Activities */}
          <div className="space-y-3">
            {studyPlan.activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-card rounded-lg neomorphic">
                <div className="flex-shrink-0">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${getActivityColor(activity.type)}20` }}
                  >
                    <Icon 
                      name={getActivityIcon(activity.type)} 
                      size={18} 
                      color={getActivityColor(activity.type)} 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-foreground">{activity.activity}</h5>
                    <span className="text-sm text-muted-foreground font-mono">{activity.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span 
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${getActivityColor(activity.type)}20`,
                        color: getActivityColor(activity.type)
                      }}
                    >
                      {activity.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {activity.type === 'practice' && 'Hands-on coding'}
                      {activity.type === 'challenge' && 'Problem solving'}
                      {activity.type === 'review' && 'Knowledge consolidation'}
                      {activity.type === 'analysis' && 'Critical thinking'}
                      {activity.type === 'project' && 'Practical application'}
                      {activity.type === 'theory' && 'Conceptual learning'}
                      {activity.type === 'optimization' && 'Performance improvement'}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="Play" size={16} />
                </Button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>Total Duration: {studyPlan.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Export Plan
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Share" size={16} className="mr-2" />
                Share
              </Button>
              <Button size="sm">
                <Icon name="Play" size={16} className="mr-2" />
                Start Study
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">Generate Your Study Plan</h4>
          <p className="text-muted-foreground mb-6">
            AI will create a personalized study plan based on your subject, duration, and current mood
          </p>
          <Button onClick={generateStudyPlan} disabled={isGenerating}>
            <Icon name="Sparkles" size={16} className="mr-2" />
            Generate Study Plan
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudyPlanGenerator;


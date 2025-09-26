import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdaptiveLearning = ({ currentEmotion, studyMode, selectedSubject }) => {
  const [isAdaptiveMode, setIsAdaptiveMode] = useState(true);
  
  const getEmotionRecommendations = () => {
    const recommendations = {
      calm: {
        title: 'Deep Learning Mode',
        description: 'Perfect for complex concepts and detailed analysis',
        suggestions: [
          'Read comprehensive materials',
          'Work on challenging problems',
          'Create detailed notes',
          'Practice advanced concepts'
        ],
        color: 'var(--color-biometric-calm)'
      },
      focus: {
        title: 'Focused Study Mode',
        description: 'Optimal concentration for intensive learning',
        suggestions: [
          'Tackle difficult problems',
          'Practice coding challenges',
          'Review complex algorithms',
          'Work on projects'
        ],
        color: 'var(--color-biometric-focus)'
      },
      energy: {
        title: 'Active Learning Mode',
        description: 'High energy perfect for interactive learning',
        suggestions: [
          'Practice with flashcards',
          'Take practice quizzes',
          'Work on coding exercises',
          'Collaborate with peers'
        ],
        color: 'var(--color-biometric-energy)'
      },
      stress: {
        title: 'Gentle Learning Mode',
        description: 'Take it easy with lighter study activities',
        suggestions: [
          'Review previous materials',
          'Take short breaks',
          'Practice basic concepts',
          'Use relaxation techniques'
        ],
        color: 'var(--color-biometric-stress)'
      }
    };
    return recommendations[currentEmotion] || recommendations.calm;
  };

  const getDifficultyLevel = () => {
    const levels = {
      calm: 'Advanced',
      focus: 'Intermediate-Advanced',
      energy: 'Intermediate',
      stress: 'Beginner-Intermediate'
    };
    return levels[currentEmotion] || 'Intermediate';
  };

  const getStudyPace = () => {
    const paces = {
      calm: 'Slow & Steady',
      focus: 'Moderate',
      energy: 'Fast',
      stress: 'Very Slow'
    };
    return paces[currentEmotion] || 'Moderate';
  };

  const recommendation = getEmotionRecommendations();

  return (
    <div className="neomorphic rounded-xl p-6 emotion-focus">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Brain" size={20} color="var(--color-primary)" />
          <span>Adaptive Learning</span>
        </h3>
        <Button
          variant={isAdaptiveMode ? 'default' : 'outline'}
          size="sm"
          onClick={() => setIsAdaptiveMode(!isAdaptiveMode)}
        >
          {isAdaptiveMode ? 'ON' : 'OFF'}
        </Button>
      </div>
      
      {isAdaptiveMode ? (
        <div className="space-y-4">
          {/* Current Recommendation */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: `${recommendation.color}20` }}>
            <h4 className="font-medium text-foreground mb-2" style={{ color: recommendation.color }}>
              {recommendation.title}
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {recommendation.description}
            </p>
            <div className="text-xs text-muted-foreground">
              Based on your current emotional state
            </div>
          </div>
          
          {/* Study Suggestions */}
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Recommended Activities:</h5>
            <div className="space-y-2">
              {recommendation.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                  <span className="text-muted-foreground">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Learning Parameters */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-muted/30 rounded-lg text-center">
              <div className="font-medium text-foreground">{getDifficultyLevel()}</div>
              <div className="text-muted-foreground">Difficulty</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg text-center">
              <div className="font-medium text-foreground">{getStudyPace()}</div>
              <div className="text-muted-foreground">Pace</div>
            </div>
          </div>
          
          {/* Subject-specific Tips */}
          <div className="p-3 bg-muted/20 rounded-lg">
            <h5 className="text-sm font-medium text-foreground mb-2">
              {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)} Tips:
            </h5>
            <p className="text-xs text-muted-foreground">
              {selectedSubject === 'programming' && 'Focus on hands-on coding practice and debugging skills'}
              {selectedSubject === 'algorithms' && 'Practice problem-solving patterns and time complexity analysis'}
              {selectedSubject === 'datastructures' && 'Visualize data structures and practice implementation'}
              {selectedSubject === 'mathematics' && 'Work through proofs and practice problem-solving techniques'}
              {selectedSubject === 'databases' && 'Practice SQL queries and database design principles'}
              {selectedSubject === 'networking' && 'Study protocols and practice network configuration'}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Brain" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Adaptive learning is disabled</p>
          <p className="text-xs text-muted-foreground mt-2">
            Enable to get personalized study recommendations
          </p>
        </div>
      )}
    </div>
  );
};

export default AdaptiveLearning;


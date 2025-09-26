import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudyGroupOptimizer = () => {
  const [selectedCourse, setSelectedCourse] = useState('cs-algorithms');
  const [optimizationMode, setOptimizationMode] = useState('balanced');
  const [suggestedGroups, setSuggestedGroups] = useState([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const courses = [
    { id: 'cs-algorithms', name: 'Data Structures & Algorithms', students: 156 },
    { id: 'cs-systems', name: 'Computer Systems', students: 89 },
    { id: 'cs-ml', name: 'Machine Learning', students: 234 },
    { id: 'cs-web', name: 'Web Development', students: 178 },
    { id: 'cs-security', name: 'Cybersecurity', students: 67 }
  ];

  const mockStudents = [
    {
      id: 1,
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      currentMood: 'focus',
      learningStyle: 'visual',
      stressLevel: 0.3,
      skillLevel: 'intermediate',
      preferredTime: 'evening',
      compatibility: 0.92,
      strengths: ['Problem Solving', 'Code Review'],
      weaknesses: ['Time Management']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      currentMood: 'calm',
      learningStyle: 'kinesthetic',
      stressLevel: 0.2,
      skillLevel: 'advanced',
      preferredTime: 'morning',
      compatibility: 0.88,
      strengths: ['Leadership', 'Debugging'],
      weaknesses: ['Documentation']
    },
    {
      id: 3,
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      currentMood: 'energy',
      learningStyle: 'auditory',
      stressLevel: 0.4,
      skillLevel: 'beginner',
      preferredTime: 'afternoon',
      compatibility: 0.85,
      strengths: ['Communication', 'Testing'],
      weaknesses: ['Algorithm Design']
    },
    {
      id: 4,
      name: 'Emily Zhang',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      currentMood: 'focus',
      learningStyle: 'visual',
      stressLevel: 0.5,
      skillLevel: 'intermediate',
      preferredTime: 'evening',
      compatibility: 0.90,
      strengths: ['Research', 'Documentation'],
      weaknesses: ['Public Speaking']
    }
  ];

  useEffect(() => {
    generateOptimizedGroups();
  }, [selectedCourse, optimizationMode]);

  const generateOptimizedGroups = async () => {
    setIsOptimizing(true);
    
    // Simulate AI optimization process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const groups = [
      {
        id: 1,
        name: 'Algorithm Aces',
        members: mockStudents?.slice(0, 3),
        compatibilityScore: 0.89,
        moodBalance: 'optimal',
        skillDistribution: 'balanced',
        estimatedSuccess: 0.94,
        meetingTime: 'Tuesday 7:00 PM',
        focusAreas: ['Dynamic Programming', 'Graph Algorithms'],
        predictedOutcomes: {
          productivity: 0.91,
          satisfaction: 0.87,
          learningGain: 0.93
        }
      },
      {
        id: 2,
        name: 'Code Crusaders',
        members: [mockStudents?.[0], mockStudents?.[3], mockStudents?.[1]],
        compatibilityScore: 0.85,
        moodBalance: 'good',
        skillDistribution: 'complementary',
        estimatedSuccess: 0.88,
        meetingTime: 'Thursday 6:30 PM',
        focusAreas: ['Tree Structures', 'Sorting Algorithms'],
        predictedOutcomes: {
          productivity: 0.86,
          satisfaction: 0.89,
          learningGain: 0.85
        }
      },
      {
        id: 3,
        name: 'Debug Dynasty',
        members: [mockStudents?.[2], mockStudents?.[1], mockStudents?.[3]],
        compatibilityScore: 0.82,
        moodBalance: 'moderate',
        skillDistribution: 'diverse',
        estimatedSuccess: 0.83,
        meetingTime: 'Friday 5:00 PM',
        focusAreas: ['Problem Analysis', 'Code Optimization'],
        predictedOutcomes: {
          productivity: 0.84,
          satisfaction: 0.82,
          learningGain: 0.87
        }
      }
    ];
    
    setSuggestedGroups(groups);
    setIsOptimizing(false);
  };

  const getMoodColor = (mood) => {
    const colors = {
      calm: 'var(--color-biometric-calm)',
      focus: 'var(--color-biometric-focus)',
      energy: 'var(--color-biometric-energy)',
      stress: 'var(--color-biometric-stress)'
    };
    return colors?.[mood] || colors?.calm;
  };

  const getMoodIcon = (mood) => {
    const icons = {
      calm: 'Waves',
      focus: 'Target',
      energy: 'Zap',
      stress: 'AlertTriangle'
    };
    return icons?.[mood] || icons?.calm;
  };

  const getSkillLevelColor = (level) => {
    const colors = {
      beginner: 'var(--color-warning)',
      intermediate: 'var(--color-primary)',
      advanced: 'var(--color-success)'
    };
    return colors?.[level] || colors?.intermediate;
  };

  const getCompatibilityColor = (score) => {
    if (score >= 0.9) return 'var(--color-success)';
    if (score >= 0.8) return 'var(--color-primary)';
    if (score >= 0.7) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  return (
    <div className="bg-card rounded-xl p-6 neomorphic">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
            <Icon name="Users" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Study Group Optimizer</h3>
            <p className="text-sm text-muted-foreground">AI-powered team formation</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e?.target?.value)}
            className="px-3 py-1.5 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {courses?.map(course => (
              <option key={course?.id} value={course?.id}>
                {course?.name} ({course?.students})
              </option>
            ))}
          </select>

          <select
            value={optimizationMode}
            onChange={(e) => setOptimizationMode(e?.target?.value)}
            className="px-3 py-1.5 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="balanced">Balanced Skills</option>
            <option value="complementary">Complementary</option>
            <option value="similar">Similar Levels</option>
            <option value="mood-focused">Mood Harmony</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={generateOptimizedGroups}
            loading={isOptimizing}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Optimize
          </Button>
        </div>
      </div>
      {isOptimizing ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Analyzing emotional compatibility...</p>
            <p className="text-xs text-muted-foreground mt-1">Processing {mockStudents?.length * 4} data points</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {suggestedGroups?.map((group) => (
            <div key={group?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-foreground">{group?.name}</h4>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} color={getCompatibilityColor(group?.compatibilityScore)} />
                    <span className="text-sm font-mono" style={{ color: getCompatibilityColor(group?.compatibilityScore) }}>
                      {Math.round(group?.compatibilityScore * 100)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{group?.meetingTime}</span>
                  <Button variant="outline" size="sm">
                    Join Group
                  </Button>
                </div>
              </div>

              {/* Group Members */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {group?.members?.map((member) => (
                  <div key={member?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="relative">
                      <img
                        src={member?.avatar}
                        alt={member?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                        style={{ backgroundColor: getMoodColor(member?.currentMood) }}
                      >
                        <Icon name={getMoodIcon(member?.currentMood)} size={8} color="white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{member?.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: getSkillLevelColor(member?.skillLevel) }}
                        >
                          {member?.skillLevel}
                        </span>
                        <span className="text-xs text-muted-foreground">{member?.learningStyle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Group Analytics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">
                    {Math.round(group?.predictedOutcomes?.productivity * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Productivity</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">
                    {Math.round(group?.predictedOutcomes?.satisfaction * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">
                    {Math.round(group?.predictedOutcomes?.learningGain * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Learning Gain</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">
                    {Math.round(group?.estimatedSuccess * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
              </div>

              {/* Focus Areas */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground">Focus Areas:</span>
                {group?.focusAreas?.map((area, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Optimization Tips */}
      <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-foreground mb-1">Optimization Tips</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Groups with complementary mood states show 23% higher productivity</li>
              <li>• Mixed skill levels improve learning outcomes by 31%</li>
              <li>• Evening study sessions have 18% better completion rates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroupOptimizer;
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudySessionTracker = () => {
  const [sessionData, setSessionData] = useState({
    currentSubject: 'Data Structures & Algorithms',
    sessionTime: '2h 15m',
    focusScore: 87,
    breakTime: '5m',
    nextBreak: '25m',
    studyStreak: 7,
    totalStudyTime: '45h 30m'
  });

  const [isSessionActive, setIsSessionActive] = useState(true);
  const [currentTask, setCurrentTask] = useState('Binary Search Implementation');

  const subjects = [
    'Data Structures & Algorithms',
    'Machine Learning',
    'Web Development',
    'Database Systems',
    'Computer Networks',
    'Software Engineering'
  ];

  const tasks = [
    'Binary Search Implementation',
    'Graph Traversal Algorithms',
    'Dynamic Programming Problems',
    'System Design Concepts',
    'Database Query Optimization',
    'API Development'
  ];

  const studyMetrics = [
    {
      label: 'Focus Level',
      value: sessionData.focusScore,
      unit: '%',
      color: 'var(--color-success)',
      icon: 'Target',
      trend: '+5%'
    },
    {
      label: 'Session Time',
      value: sessionData.sessionTime,
      color: 'var(--color-primary)',
      icon: 'Clock',
      trend: 'Active'
    },
    {
      label: 'Study Streak',
      value: sessionData.studyStreak,
      unit: 'days',
      color: 'var(--color-warning)',
      icon: 'Flame',
      trend: '+2'
    },
    {
      label: 'Total Time',
      value: sessionData.totalStudyTime,
      color: 'var(--color-biometric-calm)',
      icon: 'TrendingUp',
      trend: 'This week'
    }
  ];

  const recentActivities = [
    {
      time: '2:15 PM',
      activity: 'Completed Binary Search Algorithm',
      type: 'achievement',
      icon: 'CheckCircle',
      color: 'var(--color-success)'
    },
    {
      time: '1:45 PM',
      activity: 'Started Graph Theory Chapter',
      type: 'study',
      icon: 'BookOpen',
      color: 'var(--color-primary)'
    },
    {
      time: '1:30 PM',
      activity: 'Took 10-minute break',
      type: 'break',
      icon: 'Coffee',
      color: 'var(--color-warning)'
    },
    {
      time: '12:00 PM',
      activity: 'Completed Data Structures Quiz',
      type: 'quiz',
      icon: 'Award',
      color: 'var(--color-biometric-focus)'
    }
  ];

  const upcomingTasks = [
    {
      title: 'Implement Quick Sort Algorithm',
      subject: 'Algorithms',
      priority: 'high',
      estimatedTime: '45m',
      dueDate: 'Today'
    },
    {
      title: 'Review Graph Theory Concepts',
      subject: 'Data Structures',
      priority: 'medium',
      estimatedTime: '30m',
      dueDate: 'Tomorrow'
    },
    {
      title: 'Complete System Design Assignment',
      subject: 'Software Engineering',
      priority: 'high',
      estimatedTime: '2h',
      dueDate: 'Friday'
    },
    {
      title: 'Database Normalization Exercise',
      subject: 'Database Systems',
      priority: 'medium',
      estimatedTime: '1h',
      dueDate: 'Monday'
    },
    {
      title: 'Machine Learning Project Proposal',
      subject: 'AI/ML',
      priority: 'high',
      estimatedTime: '3h',
      dueDate: 'Next Week'
    },
    {
      title: 'Network Security Quiz Preparation',
      subject: 'Computer Networks',
      priority: 'medium',
      estimatedTime: '1.5h',
      dueDate: 'Wednesday'
    },
    {
      title: 'Software Testing Lab Report',
      subject: 'Software Engineering',
      priority: 'low',
      estimatedTime: '2h',
      dueDate: 'Thursday'
    },
    {
      title: 'Operating Systems Assignment',
      subject: 'OS',
      priority: 'high',
      estimatedTime: '4h',
      dueDate: 'Next Friday'
    }
  ];

  const startBreak = () => {
    // Break functionality
    console.log('Starting break...');
  };

  const endSession = () => {
    setIsSessionActive(false);
  };

  const startNewSession = () => {
    setIsSessionActive(true);
  };

  return (
    <div className="h-full bg-card border border-border rounded-xl flex flex-col">
      {/* Fixed Header */}
      <div className="p-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <Icon name="GraduationCap" size={16} color="white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Study Session</h3>
              <p className="text-xs text-muted-foreground">Progress tracking</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isSessionActive ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
            <span className="text-xs text-muted-foreground">
              {isSessionActive ? 'Active' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Current Session Info */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-sm font-semibold text-foreground">{sessionData.currentSubject}</h4>
              <p className="text-xs text-muted-foreground">{currentTask}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{sessionData.sessionTime}</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Target" size={14} color="var(--color-success)" />
              <span className="text-xs text-muted-foreground">Focus:</span>
              <span className="text-xs font-semibold text-foreground">{sessionData.focusScore}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Coffee" size={14} color="var(--color-warning)" />
              <span className="text-xs text-muted-foreground">Break:</span>
              <span className="text-xs font-semibold text-foreground">{sessionData.nextBreak}</span>
            </div>
          </div>
        </div>

        {/* Study Metrics */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {studyMetrics.map((metric, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-1">
                  <Icon name={metric.icon} size={12} color={metric.color} />
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                </div>
                <span className="text-xs text-success">{metric.trend}</span>
              </div>
              <div className="text-sm font-semibold text-foreground">
                {metric.value}{metric.unit}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {isSessionActive ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={startBreak}
                iconName="Coffee"
                className="flex-1 text-xs"
              >
                Break
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={endSession}
                iconName="Square"
                className="flex-1 text-xs"
              >
                End
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={startNewSession}
              iconName="Play"
              className="w-full text-xs"
            >
              Start Session
            </Button>
          )}
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent p-4 pt-3">
        {/* Recent Activities */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">Recent Activities</h4>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-muted/20 rounded-lg">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${activity.color}20` }}>
                  <Icon name={activity.icon} size={16} color={activity.color} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{activity.activity}</div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">Upcoming Tasks</h4>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">{upcomingTasks.length} tasks</span>
              <Icon name="ChevronDown" size={14} color="var(--color-muted-foreground)" />
            </div>
          </div>
          <div className="space-y-2">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-error' : 
                    task.priority === 'medium' ? 'bg-warning' : 'bg-success'
                  }`} />
                  <div>
                    <div className="text-sm font-medium text-foreground">{task.title}</div>
                    <div className="text-xs text-muted-foreground">{task.subject} • {task.estimatedTime}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                  <div className={`text-xs font-medium ${
                    task.priority === 'high' ? 'text-error' : 
                    task.priority === 'medium' ? 'text-warning' : 'text-success'
                  }`}>
                    {task.priority.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Tips Section */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">Study Tips</h4>
          <div className="space-y-2">
            <div className="p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
                <div>
                  <div className="text-sm font-medium text-foreground">Pomodoro Technique</div>
                  <div className="text-xs text-muted-foreground">Study for 25 minutes, then take a 5-minute break</div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-success/5 to-primary/5 rounded-lg border border-success/10">
              <div className="flex items-start space-x-3">
                <Icon name="Target" size={16} color="var(--color-success)" />
                <div>
                  <div className="text-sm font-medium text-foreground">Active Recall</div>
                  <div className="text-xs text-muted-foreground">Test yourself regularly to improve retention</div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-warning/5 to-primary/5 rounded-lg border border-warning/10">
              <div className="flex items-start space-x-3">
                <Icon name="BookOpen" size={16} color="var(--color-warning)" />
                <div>
                  <div className="text-sm font-medium text-foreground">Spaced Repetition</div>
                  <div className="text-xs text-muted-foreground">Review material at increasing intervals</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Resources */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">Quick Resources</h4>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left">
              <div className="text-xs font-medium text-foreground">Khan Academy</div>
              <div className="text-xs text-muted-foreground">Free courses</div>
            </button>
            <button className="p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left">
              <div className="text-xs font-medium text-foreground">Coursera</div>
              <div className="text-xs text-muted-foreground">Online learning</div>
            </button>
            <button className="p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left">
              <div className="text-xs font-medium text-foreground">YouTube</div>
              <div className="text-xs text-muted-foreground">Video tutorials</div>
            </button>
            <button className="p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left">
              <div className="text-xs font-medium text-foreground">Stack Overflow</div>
              <div className="text-xs text-muted-foreground">Q&A platform</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySessionTracker;

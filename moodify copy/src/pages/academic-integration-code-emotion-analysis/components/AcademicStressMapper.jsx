import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AcademicStressMapper = () => {
  const [selectedView, setSelectedView] = useState('timeline');
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    {
      id: 1,
      title: "Data Structures Assignment",
      course: "CS 201",
      dueDate: "2025-08-22",
      priority: "high",
      estimatedStress: 85,
      timeRemaining: "3 days",
      completion: 60,
      emotionalImpact: "anxiety"
    },
    {
      id: 2,
      title: "Algorithm Analysis Project",
      course: "CS 301",
      dueDate: "2025-08-25",
      priority: "medium",
      estimatedStress: 70,
      timeRemaining: "6 days",
      completion: 30,
      emotionalImpact: "pressure"
    },
    {
      id: 3,
      title: "Database Design Midterm",
      course: "CS 340",
      dueDate: "2025-08-28",
      priority: "high",
      estimatedStress: 90,
      timeRemaining: "9 days",
      completion: 15,
      emotionalImpact: "overwhelm"
    }
  ]);

  const [stressTimeline, setStressTimeline] = useState([
    { date: '08-15', stress: 45, workload: 60, mood: 70 },
    { date: '08-16', stress: 55, workload: 70, mood: 65 },
    { date: '08-17', stress: 60, workload: 75, mood: 60 },
    { date: '08-18', stress: 70, workload: 80, mood: 55 },
    { date: '08-19', stress: 85, workload: 90, mood: 45 },
    { date: '08-20', stress: 90, workload: 95, mood: 40 },
    { date: '08-21', stress: 95, workload: 100, mood: 35 }
  ]);

  const [examSchedule, setExamSchedule] = useState([
    {
      id: 1,
      subject: "Algorithms",
      date: "2025-08-28",
      time: "09:00 AM",
      duration: "3 hours",
      preparedness: 65,
      stressLevel: 80,
      studyHours: 25
    },
    {
      id: 2,
      subject: "Database Systems",
      date: "2025-09-02",
      time: "02:00 PM", 
      duration: "2.5 hours",
      preparedness: 45,
      stressLevel: 90,
      studyHours: 15
    },
    {
      id: 3,
      subject: "Software Engineering",
      date: "2025-09-05",
      time: "10:00 AM",
      duration: "2 hours",
      preparedness: 70,
      stressLevel: 60,
      studyHours: 30
    }
  ]);

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'var(--color-error)',
      medium: 'var(--color-warning)',
      low: 'var(--color-success)'
    };
    return colors?.[priority] || colors?.medium;
  };

  const getEmotionalImpactIcon = (impact) => {
    const icons = {
      anxiety: 'AlertTriangle',
      pressure: 'Clock',
      overwhelm: 'AlertCircle',
      stress: 'Zap'
    };
    return icons?.[impact] || 'Circle';
  };

  const getStressLevelColor = (level) => {
    if (level >= 80) return 'var(--color-error)';
    if (level >= 60) return 'var(--color-warning)';
    return 'var(--color-success)';
  };

  const viewOptions = [
    { id: 'timeline', label: 'Stress Timeline', icon: 'TrendingUp' },
    { id: 'deadlines', label: 'Upcoming Deadlines', icon: 'Calendar' },
    { id: 'exams', label: 'Exam Schedule', icon: 'BookOpen' }
  ];

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg neomorphic">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={20} color="var(--color-accent)" />
          <div>
            <h3 className="font-heading font-semibold text-foreground">Academic Stress Mapper</h3>
            <p className="text-xs text-muted-foreground">Predictive stress analysis</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Bell" size={16} />
          </Button>
        </div>
      </div>
      {/* View Selector */}
      <div className="flex border-b border-border">
        {viewOptions?.map((option) => (
          <button
            key={option?.id}
            onClick={() => setSelectedView(option?.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all
              ${selectedView === option?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            <Icon name={option?.icon} size={16} />
            <span>{option?.label}</span>
          </button>
        ))}
      </div>
      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {selectedView === 'timeline' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-heading font-medium text-foreground mb-3">7-Day Stress Prediction</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stressTimeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="date" 
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
                    <Area 
                      type="monotone" 
                      dataKey="stress" 
                      stackId="1"
                      stroke="var(--color-error)" 
                      fill="var(--color-error)"
                      fillOpacity={0.3}
                      name="Stress Level"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="workload" 
                      stackId="2"
                      stroke="var(--color-warning)" 
                      fill="var(--color-warning)"
                      fillOpacity={0.3}
                      name="Workload"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="mood" 
                      stackId="3"
                      stroke="var(--color-success)" 
                      fill="var(--color-success)"
                      fillOpacity={0.3}
                      name="Mood"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stress Alerts */}
            <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
                <span className="font-medium text-foreground">High Stress Alert</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Predicted stress spike on Aug 22nd due to multiple deadlines convergence.
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Calendar" size={14} />
                  <span className="ml-1">Reschedule Tasks</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="MessageCircle" size={14} />
                  <span className="ml-1">Get Support</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'deadlines' && (
          <div className="space-y-4">
            <h4 className="font-heading font-medium text-foreground">Upcoming Deadlines & Emotional Impact</h4>
            
            {upcomingDeadlines?.map((deadline) => (
              <div key={deadline?.id} className="p-4 bg-muted/30 rounded-lg neomorphic">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full mt-1"
                      style={{ backgroundColor: getPriorityColor(deadline?.priority) }}
                    />
                    <div>
                      <h5 className="font-medium text-foreground">{deadline?.title}</h5>
                      <p className="text-sm text-muted-foreground">{deadline?.course}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{deadline?.timeRemaining}</div>
                    <div className="text-xs text-muted-foreground">{deadline?.dueDate}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Completion</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${deadline?.completion}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{deadline?.completion}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Stress Level</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-500"
                          style={{ 
                            width: `${deadline?.estimatedStress}%`,
                            backgroundColor: getStressLevelColor(deadline?.estimatedStress)
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium">{deadline?.estimatedStress}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Impact</div>
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getEmotionalImpactIcon(deadline?.emotionalImpact)} 
                        size={14} 
                        color={getStressLevelColor(deadline?.estimatedStress)}
                      />
                      <span className="text-xs capitalize">{deadline?.emotionalImpact}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`
                    text-xs px-2 py-1 rounded-full font-medium
                    ${deadline?.priority === 'high' ? 'bg-error/10 text-error' :
                      deadline?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                    }
                  `}>
                    {deadline?.priority} priority
                  </span>
                  
                  <Button variant="ghost" size="sm">
                    <Icon name="ExternalLink" size={14} />
                    <span className="ml-1">Open Task</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedView === 'exams' && (
          <div className="space-y-4">
            <h4 className="font-heading font-medium text-foreground">Exam Schedule & Preparedness</h4>
            
            {examSchedule?.map((exam) => (
              <div key={exam?.id} className="p-4 bg-muted/30 rounded-lg neomorphic">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="font-medium text-foreground">{exam?.subject}</h5>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span>{exam?.date}</span>
                      <span>{exam?.time}</span>
                      <span>{exam?.duration}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {Math.ceil((new Date(exam.date) - new Date()) / (1000 * 60 * 60 * 24))} days
                    </div>
                    <div className="text-xs text-muted-foreground">remaining</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Preparedness</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-error to-success transition-all duration-500"
                          style={{ width: `${exam?.preparedness}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{exam?.preparedness}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Stress Level</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-500"
                          style={{ 
                            width: `${exam?.stressLevel}%`,
                            backgroundColor: getStressLevelColor(exam?.stressLevel)
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">{exam?.stressLevel}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Study Hours</div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={14} color="var(--color-primary)" />
                      <span className="text-sm font-medium">{exam?.studyHours}h</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Study Recommendations */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="BookOpen" size={16} color="var(--color-primary)" />
                <span className="font-medium text-foreground">Study Recommendations</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={14} color="var(--color-success)" />
                  <span>Focus on Database Systems - lowest preparedness</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} color="var(--color-warning)" />
                  <span>Schedule 3-hour study blocks to reduce stress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={14} color="var(--color-primary)" />
                  <span>Consider study group for Algorithms exam</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicStressMapper;
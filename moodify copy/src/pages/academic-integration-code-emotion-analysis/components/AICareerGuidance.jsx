import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AICareerGuidance = () => {
  const [activeSection, setActiveSection] = useState('skills');
  const [skillAssessment, setSkillAssessment] = useState([
    { skill: 'Algorithms', current: 78, target: 90, emotion: 'confident' },
    { skill: 'Data Structures', current: 85, target: 95, emotion: 'engaged' },
    { skill: 'System Design', current: 45, target: 80, emotion: 'challenged' },
    { skill: 'Machine Learning', current: 60, target: 85, emotion: 'curious' },
    { skill: 'Web Development', current: 90, target: 95, emotion: 'comfortable' },
    { skill: 'Database Design', current: 70, target: 85, emotion: 'steady' }
  ]);

  const [careerPaths, setCareerPaths] = useState([
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Startup",
      match: 92,
      emotionalFit: "high",
      skills: ["React", "Node.js", "Python", "AWS"],
      growth: "rapid",
      stress: "medium",
      satisfaction: 85,
      description: "Full-stack development with modern technologies"
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Fortune 500",
      match: 78,
      emotionalFit: "medium",
      skills: ["Python", "ML", "Statistics", "SQL"],
      growth: "steady",
      stress: "low",
      satisfaction: 80,
      description: "Analytics and machine learning implementation"
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "Cloud Provider",
      match: 65,
      emotionalFit: "medium",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      growth: "high",
      stress: "high",
      satisfaction: 75,
      description: "Infrastructure automation and deployment"
    }
  ]);

  const [learningPath, setLearningPath] = useState([
    {
      id: 1,
      phase: "Foundation",
      duration: "2 months",
      status: "completed",
      topics: ["Data Structures", "Basic Algorithms", "Programming Fundamentals"],
      emotionalJourney: "Building confidence through structured learning"
    },
    {
      id: 2,
      phase: "Intermediate",
      duration: "3 months",
      status: "current",
      topics: ["Advanced Algorithms", "System Design", "Database Concepts"],
      emotionalJourney: "Overcoming challenges with persistence"
    },
    {
      id: 3,
      phase: "Advanced",
      duration: "4 months",
      status: "upcoming",
      topics: ["Machine Learning", "Distributed Systems", "Architecture"],
      emotionalJourney: "Embracing complexity and innovation"
    },
    {
      id: 4,
      phase: "Specialization",
      duration: "6 months",
      status: "planned",
      topics: ["AI/ML Deep Dive", "Cloud Architecture", "Leadership"],
      emotionalJourney: "Developing expertise and mentoring others"
    }
  ]);

  const [industryTrends, setIndustryTrends] = useState([
    { technology: 'AI/ML', demand: 95, growth: 'exponential', emotion: 'excitement' },
    { technology: 'Cloud Computing', demand: 90, growth: 'high', emotion: 'opportunity' },
    { technology: 'Cybersecurity', demand: 88, growth: 'steady', emotion: 'security' },
    { technology: 'Blockchain', demand: 70, growth: 'volatile', emotion: 'uncertainty' },
    { technology: 'IoT', demand: 75, growth: 'moderate', emotion: 'curiosity' },
    { technology: 'Quantum Computing', demand: 40, growth: 'emerging', emotion: 'fascination' }
  ]);

  const getEmotionColor = (emotion) => {
    const colors = {
      confident: 'var(--color-success)',
      engaged: 'var(--color-biometric-focus)',
      challenged: 'var(--color-warning)',
      curious: 'var(--color-biometric-energy)',
      comfortable: 'var(--color-biometric-calm)',
      steady: 'var(--color-primary)',
      excitement: 'var(--color-biometric-energy)',
      opportunity: 'var(--color-success)',
      security: 'var(--color-biometric-calm)',
      uncertainty: 'var(--color-warning)',
      fascination: 'var(--color-secondary)'
    };
    return colors?.[emotion] || 'var(--color-muted-foreground)';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: 'CheckCircle',
      current: 'Play',
      upcoming: 'Clock',
      planned: 'Calendar'
    };
    return icons?.[status] || 'Circle';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'var(--color-success)',
      current: 'var(--color-primary)',
      upcoming: 'var(--color-warning)',
      planned: 'var(--color-muted-foreground)'
    };
    return colors?.[status] || 'var(--color-muted-foreground)';
  };

  const sections = [
    { id: 'skills', label: 'Skill Assessment', icon: 'Target' },
    { id: 'careers', label: 'Career Paths', icon: 'Briefcase' },
    { id: 'learning', label: 'Learning Path', icon: 'BookOpen' },
    { id: 'trends', label: 'Industry Trends', icon: 'TrendingUp' }
  ];

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg neomorphic">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Compass" size={20} color="var(--color-success)" />
          <div>
            <h3 className="font-heading font-semibold text-foreground">AI Career Guidance</h3>
            <p className="text-xs text-muted-foreground">Personalized career development</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm">
          <Icon name="Share" size={16} />
          <span className="ml-1">Share Report</span>
        </Button>
      </div>
      {/* Section Navigation */}
      <div className="flex border-b border-border overflow-x-auto">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => setActiveSection(section?.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap
              ${activeSection === section?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            <Icon name={section?.icon} size={16} />
            <span>{section?.label}</span>
          </button>
        ))}
      </div>
      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeSection === 'skills' && (
          <div className="space-y-6">
            {/* Skill Radar Chart */}
            <div>
              <h4 className="font-heading font-medium text-foreground mb-3">Skill Assessment Overview</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillAssessment}>
                    <PolarGrid stroke="var(--color-border)" />
                    <PolarAngleAxis 
                      dataKey="skill" 
                      tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]}
                      tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
                    />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="var(--color-primary)"
                      fill="var(--color-primary)"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Target"
                      dataKey="target"
                      stroke="var(--color-success)"
                      fill="var(--color-success)"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed Skill Breakdown */}
            <div className="space-y-3">
              <h4 className="font-heading font-medium text-foreground">Detailed Skill Analysis</h4>
              {skillAssessment?.map((skill, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg neomorphic">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getEmotionColor(skill?.emotion) }}
                      />
                      <span className="font-medium text-foreground">{skill?.skill}</span>
                    </div>
                    <span className="text-sm text-muted-foreground capitalize">{skill?.emotion}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current Level</span>
                      <span className="font-medium text-foreground">{skill?.current}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${skill?.current}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Target Level</span>
                      <span className="font-medium text-foreground">{skill?.target}%</span>
                    </div>
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-success transition-all duration-500"
                        style={{ width: `${skill?.target}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'careers' && (
          <div className="space-y-4">
            <h4 className="font-heading font-medium text-foreground">Recommended Career Paths</h4>
            
            {careerPaths?.map((career) => (
              <div key={career?.id} className="p-4 bg-muted/30 rounded-lg neomorphic">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-foreground">{career?.title}</h5>
                    <p className="text-sm text-muted-foreground">{career?.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">{career?.description}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{career?.match}%</div>
                    <div className="text-xs text-muted-foreground">match</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Emotional Fit</div>
                    <div className={`
                      text-sm font-medium capitalize
                      ${career?.emotionalFit === 'high' ? 'text-success' :
                        career?.emotionalFit === 'medium' ? 'text-warning' : 'text-error'
                      }
                    `}>
                      {career?.emotionalFit}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Growth</div>
                    <div className="text-sm font-medium text-foreground capitalize">{career?.growth}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Stress Level</div>
                    <div className={`
                      text-sm font-medium capitalize
                      ${career?.stress === 'low' ? 'text-success' :
                        career?.stress === 'medium' ? 'text-warning' : 'text-error'
                      }
                    `}>
                      {career?.stress}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Satisfaction</div>
                    <div className="text-sm font-medium text-foreground">{career?.satisfaction}%</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-muted-foreground mb-2">Required Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {career?.skills?.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    <Icon name="BookOpen" size={14} />
                    <span className="ml-1">Learn More</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Heart" size={14} />
                    <span className="ml-1">Save</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'learning' && (
          <div className="space-y-4">
            <h4 className="font-heading font-medium text-foreground">Personalized Learning Journey</h4>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
              
              {learningPath?.map((phase, index) => (
                <div key={phase?.id} className="relative flex items-start space-x-4 pb-8">
                  {/* Timeline Node */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-card border-2 border-border neomorphic">
                    <Icon 
                      name={getStatusIcon(phase?.status)} 
                      size={20} 
                      color={getStatusColor(phase?.status)}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 pb-4">
                    <div className="p-4 bg-muted/30 rounded-lg neomorphic">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-foreground">{phase?.phase}</h5>
                        <span className="text-sm text-muted-foreground">{phase?.duration}</span>
                      </div>
                      
                      <div className={`
                        inline-block px-2 py-1 rounded-full text-xs font-medium mb-3
                        ${phase?.status === 'completed' ? 'bg-success/10 text-success' :
                          phase?.status === 'current' ? 'bg-primary/10 text-primary' :
                          phase?.status === 'upcoming'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                        }
                      `}>
                        {phase?.status}
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-xs text-muted-foreground mb-2">Topics</div>
                        <div className="flex flex-wrap gap-2">
                          {phase?.topics?.map((topic, topicIndex) => (
                            <span 
                              key={topicIndex}
                              className="px-2 py-1 bg-card border border-border text-xs rounded"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Emotional Journey</div>
                        <p className="text-sm text-foreground italic">{phase?.emotionalJourney}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'trends' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-heading font-medium text-foreground mb-3">Industry Demand Trends</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={industryTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="technology" 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
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
                    <Bar 
                      dataKey="demand" 
                      fill="var(--color-primary)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-heading font-medium text-foreground">Technology Insights</h4>
              {industryTrends?.map((trend, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg neomorphic">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getEmotionColor(trend?.emotion) }}
                      />
                      <span className="font-medium text-foreground">{trend?.technology}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{trend?.demand}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Growth: {trend?.growth}</span>
                    <span className="text-muted-foreground capitalize">Feeling: {trend?.emotion}</span>
                  </div>
                  
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${trend?.demand}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICareerGuidance;
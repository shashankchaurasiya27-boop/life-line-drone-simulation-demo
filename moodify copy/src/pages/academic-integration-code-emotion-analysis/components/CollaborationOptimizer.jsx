import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CollaborationOptimizer = () => {
  const [activeView, setActiveView] = useState('teams');
  const [teamSuggestions, setTeamSuggestions] = useState([
    {
      id: 1,
      projectName: "E-commerce Platform",
      compatibility: 94,
      teamSize: 4,
      duration: "8 weeks",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      emotionalBalance: "optimal",
      members: [
        {
          id: 1,
          name: "Alex Chen",
          role: "Frontend Lead",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          emotion: "focused",
          skills: ["React", "TypeScript", "UI/UX"],
          compatibility: 96
        },
        {
          id: 2,
          name: "Sarah Johnson",
          role: "Backend Developer",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          emotion: "confident",
          skills: ["Node.js", "Python", "Database"],
          compatibility: 92
        },
        {
          id: 3,
          name: "Mike Rodriguez",
          role: "DevOps Engineer",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          emotion: "steady",
          skills: ["AWS", "Docker", "CI/CD"],
          compatibility: 94
        }
      ]
    },
    {
      id: 2,
      projectName: "ML Recommendation System",
      compatibility: 87,
      teamSize: 3,
      duration: "6 weeks",
      skills: ["Python", "TensorFlow", "Data Analysis"],
      emotionalBalance: "good",
      members: [
        {
          id: 4,
          name: "Emma Davis",
          role: "ML Engineer",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          emotion: "curious",
          skills: ["Python", "ML", "Statistics"],
          compatibility: 89
        },
        {
          id: 5,
          name: "David Kim",
          role: "Data Scientist",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          emotion: "analytical",
          skills: ["R", "SQL", "Visualization"],
          compatibility: 85
        }
      ]
    }
  ]);

  const [currentTeams, setCurrentTeams] = useState([
    {
      id: 1,
      name: "Algorithm Aces",
      project: "Binary Search Tree Visualization",
      members: 4,
      moodSync: 78,
      productivity: 85,
      status: "active",
      lastActivity: "2 hours ago",
      emotionalState: "focused",
      challenges: ["Time management", "Code review delays"],
      strengths: ["Strong communication", "Complementary skills"]
    },
    {
      id: 2,
      name: "Data Dynamos",
      project: "Student Performance Analytics",
      members: 3,
      moodSync: 92,
      productivity: 90,
      status: "active",
      lastActivity: "30 minutes ago",
      emotionalState: "energized",
      challenges: ["Dataset complexity"],
      strengths: ["High motivation", "Clear goals"]
    }
  ]);

  const [peerAnalysis, setPeerAnalysis] = useState([
    {
      id: 1,
      name: "Jessica Liu",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      compatibility: 95,
      workStyle: "Collaborative",
      timezone: "PST",
      skills: ["React", "Python", "Design"],
      emotion: "enthusiastic",
      availability: "high",
      pastProjects: 8,
      rating: 4.9
    },
    {
      id: 2,
      name: "Ryan Thompson",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      compatibility: 88,
      workStyle: "Independent",
      timezone: "EST",
      skills: ["Java", "Spring", "AWS"],
      emotion: "focused",
      availability: "medium",
      pastProjects: 12,
      rating: 4.7
    },
    {
      id: 3,
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      compatibility: 91,
      workStyle: "Mentor",
      timezone: "IST",
      skills: ["ML", "Data Science", "Research"],
      emotion: "patient",
      availability: "high",
      pastProjects: 15,
      rating: 4.8
    }
  ]);

  const getEmotionColor = (emotion) => {
    const colors = {
      focused: 'var(--color-biometric-focus)',
      confident: 'var(--color-success)',
      steady: 'var(--color-biometric-calm)',
      curious: 'var(--color-biometric-energy)',
      analytical: 'var(--color-secondary)',
      energized: 'var(--color-biometric-energy)',
      enthusiastic: 'var(--color-accent)',
      patient: 'var(--color-biometric-calm)'
    };
    return colors[emotion] || 'var(--color-muted-foreground)';
  };

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'var(--color-success)';
    if (score >= 80) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'var(--color-success)',
      paused: 'var(--color-warning)',
      completed: 'var(--color-primary)'
    };
    return colors[status] || 'var(--color-muted-foreground)';
  };

  const viewOptions = [
    { id: 'teams', label: 'Team Suggestions', icon: 'Users' },
    { id: 'current', label: 'Current Teams', icon: 'UserCheck' },
    { id: 'peers', label: 'Peer Analysis', icon: 'UserSearch' }
  ];

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg neomorphic">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Users" size={20} color="var(--color-biometric-energy)" />
          <div>
            <h3 className="font-heading font-semibold text-foreground">Collaboration Optimizer</h3>
            <p className="text-xs text-muted-foreground">AI-powered team formation</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm">
          <Icon name="Settings" size={16} />
          <span className="ml-1">Preferences</span>
        </Button>
      </div>

      {/* View Selector */}
      <div className="flex border-b border-border">
        {viewOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveView(option.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all
              ${activeView === option.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            <Icon name={option.icon} size={16} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeView === 'teams' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-medium text-foreground">Optimal Team Matches</h4>
              <Button variant="outline" size="sm">
                <Icon name="RefreshCw" size={14} />
                <span className="ml-1">Refresh</span>
              </Button>
            </div>
            
            {teamSuggestions.map((team) => (
              <div key={team.id} className="p-4 bg-muted/30 rounded-lg neomorphic">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="font-medium text-foreground">{team.projectName}</h5>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span>{team.teamSize} members</span>
                      <span>{team.duration}</span>
                      <span className="capitalize">{team.emotionalBalance} balance</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: getCompatibilityColor(team.compatibility) }}
                    >
                      {team.compatibility}%
                    </div>
                    <div className="text-xs text-muted-foreground">compatibility</div>
                  </div>
                </div>
                
                {/* Skills */}
                <div className="mb-4">
                  <div className="text-xs text-muted-foreground mb-2">Required Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {team.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Team Members */}
                <div className="mb-4">
                  <div className="text-xs text-muted-foreground mb-3">Suggested Team Members</div>
                  <div className="space-y-3">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
                        <Image 
                          src={member.avatar} 
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{member.name}</span>
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: getEmotionColor(member.emotion) }}
                            />
                          </div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {member.skills.slice(0, 3).map((skill, index) => (
                              <span 
                                key={index}
                                className="text-xs bg-muted text-muted-foreground px-1 py-0.5 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-foreground">{member.compatibility}%</div>
                          <div className="text-xs text-muted-foreground">match</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    <Icon name="MessageCircle" size={14} />
                    <span className="ml-1">Contact Team</span>
                  </Button>
                  <Button variant="default" size="sm">
                    <Icon name="UserPlus" size={14} />
                    <span className="ml-1">Join Project</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === 'current' && (
          <div className="space-y-4">
            <h4 className="font-heading font-medium text-foreground">Your Active Teams</h4>
            
            {currentTeams.map((team) => (
              <div key={team.id} className="p-4 bg-muted/30 rounded-lg neomorphic">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h5 className="font-medium text-foreground">{team.name}</h5>
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getStatusColor(team.status) }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{team.project}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last activity: {team.lastActivity}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{team.members} members</div>
                    <div className="text-xs text-muted-foreground capitalize">{team.status}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Mood Sync</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-error to-success transition-all duration-500"
                          style={{ width: `${team.moodSync}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{team.moodSync}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Productivity</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${team.productivity}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{team.productivity}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Current Challenges</div>
                    <ul className="text-sm text-foreground space-y-1">
                      {team.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Icon name="AlertCircle" size={12} color="var(--color-warning)" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Team Strengths</div>
                    <ul className="text-sm text-foreground space-y-1">
                      {team.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={12} color="var(--color-success)" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getEmotionColor(team.emotionalState) }}
                    />
                    <span className="text-sm text-muted-foreground capitalize">
                      Team mood: {team.emotionalState}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="MessageSquare" size={14} />
                      <span className="ml-1">Chat</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="BarChart3" size={14} />
                      <span className="ml-1">Analytics</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === 'peers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-medium text-foreground">Peer Compatibility Analysis</h4>
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={14} />
                <span className="ml-1">Filter</span>
              </Button>
            </div>
            
            {peerAnalysis.map((peer) => (
              <div key={peer.id} className="p-4 bg-muted/30 rounded-lg neomorphic">
                <div className="flex items-start space-x-4">
                  <Image 
                    src={peer.avatar} 
                    alt={peer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-foreground">{peer.name}</h5>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{peer.workStyle}</span>
                          <span>•</span>
                          <span>{peer.timezone}</span>
                          <div 
                            className="w-2 h-2 rounded-full ml-2"
                            style={{ backgroundColor: getEmotionColor(peer.emotion) }}
                          />
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div 
                          className="text-xl font-bold"
                          style={{ color: getCompatibilityColor(peer.compatibility) }}
                        >
                          {peer.compatibility}%
                        </div>
                        <div className="text-xs text-muted-foreground">compatibility</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Skills</div>
                        <div className="flex flex-wrap gap-1">
                          {peer.skills.slice(0, 3).map((skill, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Experience</div>
                        <div className="text-sm text-foreground">
                          {peer.pastProjects} projects • {peer.rating}★
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Availability</div>
                        <div className={`
                          text-sm font-medium capitalize
                          ${peer.availability === 'high' ? 'text-success' :
                            peer.availability === 'medium' ? 'text-warning' : 'text-error'
                          }
                        `}>
                          {peer.availability}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span className="capitalize">Current mood: {peer.emotion}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Icon name="MessageCircle" size={14} />
                          <span className="ml-1">Message</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="UserPlus" size={14} />
                          <span className="ml-1">Invite</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationOptimizer;
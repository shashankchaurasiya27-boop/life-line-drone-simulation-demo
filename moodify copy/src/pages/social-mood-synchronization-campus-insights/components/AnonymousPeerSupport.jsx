import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const AnonymousPeerSupport = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState('all');
  const [supportMessages, setSupportMessages] = useState([]);
  const [meditationSessions, setMeditationSessions] = useState([]);

  const mockSupportMessages = [
    {
      id: 1,
      content: `Feeling overwhelmed with my data structures assignment. The recursive algorithms are making my brain hurt. Anyone else struggling with this?\n\nI've been staring at this binary tree problem for 3 hours and I'm starting to doubt if I'm cut out for CS.`,
      mood: 'stress',
      timestamp: new Date(Date.now() - 900000),
      replies: 7,
      supportCount: 23,
      isAnonymous: true,
      tags: ['algorithms', 'data-structures', 'help-needed'],
      responses: [
        {
          id: 101,
          content: `I totally get this! Binary trees clicked for me when I started drawing them out on paper. Try visualizing each step - it really helps with the recursion logic.`,
          mood: 'calm',
          timestamp: new Date(Date.now() - 600000),
          supportCount: 12,
          isHelpful: true
        },
        {
          id: 102,
          content: `You're definitely not alone! I spent 5 hours on a similar problem last week. Sometimes taking a break and coming back with fresh eyes makes all the difference.`,
          mood: 'energy',
          timestamp: new Date(Date.now() - 300000),
          supportCount: 8,
          isHelpful: true
        }
      ]
    },
    {
      id: 2,
      content: `Just wanted to share some good vibes! Finally got my first internship offer after 47 rejections. Don't give up, everyone! The grind is worth it.`,mood: 'energy',
      timestamp: new Date(Date.now() - 1800000),
      replies: 15,
      supportCount: 89,
      isAnonymous: true,
      tags: ['internship', 'motivation', 'success-story'],
      responses: []
    },
    {
      id: 3,
      content: `Anyone else feeling like they're behind compared to their peers? Seeing everyone's LinkedIn updates about internships and projects is making me anxious.`,mood: 'stress',
      timestamp: new Date(Date.now() - 3600000),
      replies: 12,
      supportCount: 34,
      isAnonymous: true,
      tags: ['comparison', 'anxiety', 'career'],
      responses: []
    },
    {
      id: 4,
      content: `Pro tip: If you're debugging late at night and nothing makes sense, just go to sleep. I've solved more bugs in the shower the next morning than in 3 AM coding sessions.`,mood: 'calm',
      timestamp: new Date(Date.now() - 7200000),
      replies: 8,
      supportCount: 56,
      isAnonymous: true,
      tags: ['debugging', 'productivity', 'self-care'],
      responses: []
    }
  ];

  const mockMeditationSessions = [
    {
      id: 1,
      title: 'Coding Stress Relief',
      description: 'Guided meditation for programming anxiety',
      duration: '10 min',
      participants: 23,
      startTime: new Date(Date.now() + 1800000), // 30 minutes from now
      mood: 'calm',
      instructor: 'Anonymous Guide',
      isLive: false
    },
    {
      id: 2,
      title: 'Focus & Flow State',
      description: 'Enhance concentration for deep work',
      duration: '15 min',
      participants: 45,
      startTime: new Date(Date.now() + 3600000), // 1 hour from now
      mood: 'focus',
      instructor: 'Anonymous Guide',
      isLive: true
    },
    {
      id: 3,
      title: 'Energy Boost Break',
      description: 'Quick energizing session between classes',
      duration: '5 min',
      participants: 12,
      startTime: new Date(Date.now() + 900000), // 15 minutes from now
      mood: 'energy',
      instructor: 'Anonymous Guide',
      isLive: false
    }
  ];

  useEffect(() => {
    setSupportMessages(mockSupportMessages);
    setMeditationSessions(mockMeditationSessions);
  }, []);

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

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      const message = {
        id: Date.now(),
        content: newMessage,
        mood: 'calm', // Would be detected from user's current state
        timestamp: new Date(),
        replies: 0,
        supportCount: 0,
        isAnonymous: true,
        tags: [],
        responses: []
      };
      
      setSupportMessages(prev => [message, ...prev]);
      setNewMessage('');
    }
  };

  const handleSupportMessage = (messageId) => {
    setSupportMessages(prev => prev?.map(msg => 
      msg?.id === messageId 
        ? { ...msg, supportCount: msg?.supportCount + 1 }
        : msg
    ));
  };

  const filteredMessages = selectedMoodFilter === 'all' 
    ? supportMessages 
    : supportMessages?.filter(msg => msg?.mood === selectedMoodFilter);

  const formatTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - timestamp?.getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatTimeUntil = (timestamp) => {
    const minutes = Math.floor((timestamp?.getTime() - Date.now()) / 60000);
    if (minutes < 60) return `in ${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `in ${hours}h`;
  };

  return (
    <div className="bg-card rounded-xl p-6 neomorphic">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-success to-primary flex items-center justify-center">
            <Icon name="Heart" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Anonymous Peer Support</h3>
            <p className="text-sm text-muted-foreground">Safe space for sharing and support</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-xs text-success">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>Anonymous Mode</span>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 mb-6 bg-muted/30 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'messages' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="MessageSquare" size={16} />
            <span>Support Messages</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('meditation')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'meditation' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Brain" size={16} />
            <span>Group Meditation</span>
          </div>
        </button>
      </div>
      {activeTab === 'messages' && (
        <div className="space-y-6">
          {/* Message Composer */}
          <div className="p-4 bg-muted/20 rounded-lg border border-border">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Share anonymously</span>
            </div>
            
            <div className="space-y-3">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e?.target?.value)}
                placeholder="Share what's on your mind... Your identity is completely protected."
                className="w-full h-24 px-3 py-2 text-sm bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Lock" size={12} />
                  <span>End-to-end encrypted • No data stored</span>
                </div>
                
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!newMessage?.trim()}
                  iconName="Send"
                  iconPosition="right"
                >
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Mood Filter */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">Filter by mood:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedMoodFilter('all')}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  selectedMoodFilter === 'all' ?'bg-primary text-primary-foreground border-primary' :'bg-muted text-muted-foreground border-border hover:border-primary'
                }`}
              >
                All
              </button>
              {['calm', 'focus', 'energy', 'stress']?.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMoodFilter(mood)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all capitalize ${
                    selectedMoodFilter === mood
                      ? 'text-white border-transparent' :'bg-muted text-muted-foreground border-border hover:border-primary'
                  }`}
                  style={{
                    backgroundColor: selectedMoodFilter === mood ? getMoodColor(mood) : undefined
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <Icon name={getMoodIcon(mood)} size={12} />
                    <span>{mood}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Messages Feed */}
          <div className="space-y-4">
            {filteredMessages?.map((message) => (
              <div key={message?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: getMoodColor(message?.mood) }}
                    >
                      <Icon name={getMoodIcon(message?.mood)} size={16} color="white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-foreground">Anonymous Student</span>
                        <span className="text-xs text-muted-foreground">{formatTimeAgo(message?.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="Shield" size={12} className="text-success" />
                        <span className="text-xs text-success">Verified Student</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{message?.content}</p>
                </div>

                {message?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {message?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleSupportMessage(message?.id)}
                      className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-success transition-colors"
                    >
                      <Icon name="Heart" size={16} />
                      <span>{message?.supportCount}</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="MessageCircle" size={16} />
                      <span>{message?.replies}</span>
                    </button>
                  </div>

                  <Button variant="ghost" size="sm">
                    Reply
                  </Button>
                </div>

                {/* Sample Responses */}
                {message?.responses?.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-muted space-y-3">
                    {message?.responses?.slice(0, 2)?.map((response) => (
                      <div key={response?.id} className="p-3 bg-muted/20 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: getMoodColor(response?.mood) }}
                          >
                            <Icon name={getMoodIcon(response?.mood)} size={12} color="white" />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(response?.timestamp)}
                          </span>
                          {response?.isHelpful && (
                            <span className="text-xs bg-success/20 text-success px-1.5 py-0.5 rounded-full">
                              Helpful
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-foreground">{response?.content}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-success">
                            <Icon name="Heart" size={12} />
                            <span>{response?.supportCount}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'meditation' && (
        <div className="space-y-6">
          <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <Icon name="Brain" size={32} className="text-primary mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Group Meditation Sessions</h4>
            <p className="text-sm text-muted-foreground">
              Join anonymous meditation sessions with fellow students. All sessions are guided and completely private.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meditationSessions?.map((session) => (
              <div key={session?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: getMoodColor(session?.mood) }}
                    >
                      <Icon name={getMoodIcon(session?.mood)} size={20} color="white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">{session?.title}</h5>
                      <p className="text-sm text-muted-foreground">{session?.description}</p>
                    </div>
                  </div>
                  
                  {session?.isLive && (
                    <span className="px-2 py-1 text-xs bg-error text-error-foreground rounded-full animate-pulse">
                      LIVE
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-mono">{session?.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Participants:</span>
                    <span className="font-mono">{session?.participants}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Starts:</span>
                    <span className="font-mono">{formatTimeUntil(session?.startTime)}</span>
                  </div>
                </div>

                <Button
                  variant={session?.isLive ? "default" : "outline"}
                  fullWidth
                  iconName={session?.isLive ? "Play" : "Calendar"}
                  iconPosition="left"
                >
                  {session?.isLive ? "Join Now" : "Set Reminder"}
                </Button>
              </div>
            ))}
          </div>

          {/* Privacy Notice */}
          <div className="p-4 bg-muted/20 rounded-lg border border-border">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={16} className="text-success mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-foreground mb-1">Privacy & Safety</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• All meditation sessions are anonymous and encrypted</li>
                  <li>• No audio or video is recorded or stored</li>
                  <li>• Guided by trained peer volunteers</li>
                  <li>• Report any inappropriate behavior instantly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnonymousPeerSupport;
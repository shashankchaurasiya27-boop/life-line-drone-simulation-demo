import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ViralMemeTracker = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [viralContent, setViralContent] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);

  const locations = [
    { id: 'all', name: 'All Campus', count: 1247 },
    { id: 'cs-building', name: 'CS Building', count: 456 },
    { id: 'library', name: 'Library', count: 234 },
    { id: 'dormitories', name: 'Dormitories', count: 345 },
    { id: 'cafeteria', name: 'Cafeteria', count: 212 }
  ];

  const mockViralContent = [
    {
      id: 1,
      type: 'meme',
      title: 'When your code works on first try',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      shares: 1247,
      likes: 3456,
      comments: 234,
      viralityScore: 0.94,
      moodImpact: 'energy',
      trending: true,
      timePosted: '2 hours ago',
      peakTime: '3:30 PM',
      demographics: {
        'CS Students': 67,
        'Engineering': 23,
        'Other': 10
      },
      locations: {
        'CS Building': 45,
        'Library': 28,
        'Dormitories': 27
      },
      emotionalResponse: {
        'joy': 78,
        'surprise': 15,
        'amusement': 7
      }
    },
    {
      id: 2,
      type: 'motivational',
      title: 'You got this! Finals week motivation',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
      shares: 892,
      likes: 2134,
      comments: 156,
      viralityScore: 0.87,
      moodImpact: 'calm',
      trending: true,
      timePosted: '4 hours ago',
      peakTime: '1:15 PM',
      demographics: {
        'CS Students': 52,
        'Engineering': 31,
        'Other': 17
      },
      locations: {
        'Library': 58,
        'CS Building': 25,
        'Cafeteria': 17
      },
      emotionalResponse: {
        'hope': 65,
        'determination': 25,
        'calm': 10
      }
    },
    {
      id: 3,
      type: 'relatable',
      title: 'Debugging at 3 AM be like...',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400',
      shares: 634,
      likes: 1876,
      comments: 89,
      viralityScore: 0.79,
      moodImpact: 'stress',
      trending: false,
      timePosted: '6 hours ago',
      peakTime: '11:45 PM',
      demographics: {
        'CS Students': 89,
        'Engineering': 8,
        'Other': 3
      },
      locations: {
        'Dormitories': 67,
        'CS Building': 23,
        'Library': 10
      },
      emotionalResponse: {
        'frustration': 45,
        'relatability': 35,
        'humor': 20
      }
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Just landed my first internship!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      shares: 445,
      likes: 1234,
      comments: 67,
      viralityScore: 0.72,
      moodImpact: 'energy',
      trending: false,
      timePosted: '8 hours ago',
      peakTime: '9:20 AM',
      demographics: {
        'CS Students': 78,
        'Engineering': 15,
        'Other': 7
      },
      locations: {
        'CS Building': 42,
        'Student Center': 31,
        'Cafeteria': 27
      },
      emotionalResponse: {
        'pride': 56,
        'inspiration': 32,
        'joy': 12
      }
    }
  ];

  const mockTrendingTopics = [
    { tag: '#DebuggingLife', count: 234, growth: '+45%', mood: 'stress' },
    { tag: '#CodeWorks', count: 189, growth: '+67%', mood: 'energy' },
    { tag: '#FinalsWeek', count: 156, growth: '+23%', mood: 'stress' },
    { tag: '#InternshipSeason', count: 134, growth: '+89%', mood: 'energy' },
    { tag: '#StudyMotivation', count: 98, growth: '+12%', mood: 'calm' },
    { tag: '#CampusLife', count: 87, growth: '+34%', mood: 'energy' }
  ];

  useEffect(() => {
    setViralContent(mockViralContent);
    setTrendingTopics(mockTrendingTopics);
  }, [selectedTimeframe, selectedLocation]);

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

  const getViralityLevel = (score) => {
    if (score >= 0.9) return { level: 'Viral', color: 'var(--color-error)' };
    if (score >= 0.8) return { level: 'Trending', color: 'var(--color-warning)' };
    if (score >= 0.7) return { level: 'Popular', color: 'var(--color-primary)' };
    return { level: 'Growing', color: 'var(--color-success)' };
  };

  const formatNumber = (num) => {
    if (num >= 1000) return `${(num / 1000)?.toFixed(1)}k`;
    return num?.toString();
  };

  return (
    <div className="bg-card rounded-xl p-6 neomorphic overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-warning flex items-center justify-center flex-shrink-0">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">Viral Meme Tracker</h3>
            <p className="text-sm text-muted-foreground truncate">Campus content virality engine</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e?.target?.value)}
            className="px-3 py-1.5 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary min-w-0"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last Week</option>
            <option value="30d">Last Month</option>
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e?.target?.value)}
            className="px-3 py-1.5 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary min-w-0"
          >
            {locations?.map(location => (
              <option key={location?.id} value={location?.id}>
                {location?.name} ({location?.count})
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
        {/* Viral Content Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-semibold text-foreground mb-4">Trending Content</h4>
          
          {viralContent?.map((content) => {
            const virality = getViralityLevel(content?.viralityScore);
            
            return (
              <div key={content?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow overflow-hidden">
                <div className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={content?.image}
                      alt={content?.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    {content?.trending && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full flex items-center justify-center">
                        <Icon name="Flame" size={10} color="white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h5 className="font-medium text-foreground text-sm leading-tight line-clamp-2">{content?.title}</h5>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span
                          className="px-2 py-1 text-xs rounded-full text-white font-medium whitespace-nowrap"
                          style={{ backgroundColor: virality?.color }}
                        >
                          {virality?.level}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Icon 
                            name={getMoodIcon(content?.moodImpact)} 
                            size={14} 
                            color={getMoodColor(content?.moodImpact)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Share" size={12} />
                        <span>{formatNumber(content?.shares)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={12} />
                        <span>{formatNumber(content?.likes)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MessageCircle" size={12} />
                        <span>{formatNumber(content?.comments)}</span>
                      </div>
                      <span>•</span>
                      <span className="whitespace-nowrap">{content?.timePosted}</span>
                    </div>

                    {/* Virality Score Bar */}
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs text-muted-foreground flex-shrink-0">Virality:</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden min-w-0">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${content?.viralityScore * 100}%`,
                            backgroundColor: virality?.color
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono flex-shrink-0">{Math.round(content?.viralityScore * 100)}%</span>
                    </div>

                    {/* Top Locations */}
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(content?.locations)?.slice(0, 3)?.map(([location, percentage]) => (
                        <span
                          key={location}
                          className="px-2 py-1 text-xs bg-muted rounded-full text-muted-foreground whitespace-nowrap"
                        >
                          {location}: {percentage}%
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trending Topics Sidebar */}
        <div className="space-y-6 min-w-0">
          <div>
            <h4 className="font-semibold text-foreground mb-4">Trending Topics</h4>
            <div className="space-y-3">
              {trendingTopics?.map((topic, index) => (
                <div key={topic?.tag} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg overflow-hidden">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="text-lg font-bold text-muted-foreground flex-shrink-0">
                      #{index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-foreground truncate">{topic?.tag}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatNumber(topic?.count)} posts
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={getMoodIcon(topic?.mood)} 
                        size={12} 
                        color={getMoodColor(topic?.mood)}
                      />
                      <span className="text-xs text-success font-medium whitespace-nowrap">{topic?.growth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Virality Prediction */}
          <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Brain" size={16} className="text-primary" />
              <h5 className="font-semibold text-foreground">AI Prediction</h5>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Next viral content likely to emerge from:
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">CS Building</span>
                <span className="text-sm font-mono text-primary">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Library</span>
                <span className="text-sm font-mono text-primary">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dormitories</span>
                <span className="text-sm font-mono text-primary">52%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Peak time: 3:00-4:00 PM (Study break period)
            </p>
          </div>

          {/* Create Content Button */}
          <Button
            variant="default"
            fullWidth
            iconName="Plus"
            iconPosition="left"
          >
            Create Viral Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViralMemeTracker;
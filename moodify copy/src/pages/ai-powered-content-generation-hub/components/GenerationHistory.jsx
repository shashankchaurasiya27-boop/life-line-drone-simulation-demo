import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const GenerationHistory = ({ onContentSelect, newContent }) => {
  const [historyItems, setHistoryItems] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [activeTab, setActiveTab] = useState('recent');
  const [viralityPredictions, setViralityPredictions] = useState({});

  // Mock history data
  const mockHistory = [
    {
      id: 1,
      type: 'memes',
      content: {
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop",
        text: "When your code compiles on the first try",
        subtitle: "Rare but magical moments ✨"
      },
      emotion: 'calm',
      timestamp: new Date(Date.now() - 3600000),
      shares: 24,
      likes: 156,
      viralScore: 78
    },
    {
      id: 2,
      type: 'quotes',
      content: "The best programmers are not necessarily the fastest typists, but the clearest thinkers.",
      emotion: 'focus',
      timestamp: new Date(Date.now() - 7200000),
      shares: 12,
      likes: 89,
      viralScore: 65
    },
    {
      id: 3,
      type: 'affirmations',
      content: {
        text: "I approach coding challenges with calm confidence and clear thinking.",
        duration: "2:30",
        voice: "Calm Female"
      },
      emotion: 'calm',
      timestamp: new Date(Date.now() - 10800000),
      shares: 8,
      likes: 34,
      viralScore: 42
    },
    {
      id: 4,
      type: 'study-tips',
      content: {
        title: "Pomodoro Programming",
        tip: "Use 25-minute focused coding sprints followed by 5-minute breaks."
      },
      emotion: 'focus',
      timestamp: new Date(Date.now() - 14400000),
      shares: 18,
      likes: 127,
      viralScore: 71
    },
    {
      id: 5,
      type: 'memes',
      content: {
        image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=200&h=200&fit=crop",
        text: "Me entering the zone at 2 AM",
        subtitle: "Peak productivity hours activated 🚀"
      },
      emotion: 'energy',
      timestamp: new Date(Date.now() - 18000000),
      shares: 31,
      likes: 203,
      viralScore: 85
    }
  ];

  useEffect(() => {
    setHistoryItems(mockHistory);
    
    // Generate virality predictions
    const predictions = {};
    mockHistory?.forEach(item => {
      predictions[item.id] = {
        campusReach: Math.floor(Math.random() * 500) + 100,
        peakTime: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)?.toString()?.padStart(2, '0')} ${Math.random() > 0.5 ? 'PM' : 'AM'}`,
        trendingProbability: Math.floor(Math.random() * 100)
      };
    });
    setViralityPredictions(predictions);
  }, []);

  useEffect(() => {
    if (newContent) {
      const newItem = {
        id: Date.now(),
        type: 'memes', // This would come from the actual content type
        content: newContent,
        emotion: 'calm', // This would come from current emotion
        timestamp: new Date(),
        shares: 0,
        likes: 0,
        viralScore: Math.floor(Math.random() * 100)
      };
      setHistoryItems(prev => [newItem, ...prev]);
    }
  }, [newContent]);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites?.has(id)) {
        newFavorites?.delete(id);
      } else {
        newFavorites?.add(id);
      }
      return newFavorites;
    });
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      calm: 'var(--color-biometric-calm)',
      focus: 'var(--color-biometric-focus)',
      energy: 'var(--color-biometric-energy)',
      stress: 'var(--color-biometric-stress)'
    };
    return colors?.[emotion] || colors?.calm;
  };

  const getTypeIcon = (type) => {
    const icons = {
      memes: 'Smile',
      quotes: 'Quote',
      affirmations: 'Volume2',
      'study-tips': 'BookOpen'
    };
    return icons?.[type] || 'FileText';
  };

  const getViralityLevel = (score) => {
    if (score >= 80) return { level: 'High', color: 'var(--color-success)', icon: 'TrendingUp' };
    if (score >= 60) return { level: 'Medium', color: 'var(--color-warning)', icon: 'BarChart3' };
    return { level: 'Low', color: 'var(--color-muted-foreground)', icon: 'TrendingDown' };
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  const renderContentPreview = (item) => {
    switch (item?.type) {
      case 'memes':
        return (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
            <Image 
              src={item?.content?.image} 
              alt="Meme preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Icon name="Smile" size={16} color="white" />
            </div>
          </div>
        );
      
      case 'quotes':
        return (
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Icon name="Quote" size={20} color="var(--color-primary)" />
          </div>
        );
      
      case 'affirmations':
        return (
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-success/20 to-primary/20 flex items-center justify-center">
            <Icon name="Volume2" size={20} color="var(--color-success)" />
          </div>
        );
      
      case 'study-tips':
        return (
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-warning/20 to-success/20 flex items-center justify-center">
            <Icon name="BookOpen" size={20} color="var(--color-warning)" />
          </div>
        );
      
      default:
        return (
          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
            <Icon name="FileText" size={20} color="var(--color-muted-foreground)" />
          </div>
        );
    }
  };

  const filteredItems = activeTab === 'favorites' 
    ? historyItems?.filter(item => favorites?.has(item?.id))
    : historyItems;

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Content Library</h2>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('recent')}
            className={`
              flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all
              ${activeTab === 'recent' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            Recent
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`
              flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all
              ${activeTab === 'favorites' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            Favorites
          </button>
        </div>
      </div>
      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredItems?.length === 0 ? (
          <div className="text-center py-8">
            <Icon 
              name={activeTab === 'favorites' ? 'Heart' : 'Clock'} 
              size={32} 
              color="var(--color-muted-foreground)" 
              className="mx-auto mb-2" 
            />
            <p className="text-muted-foreground text-sm">
              {activeTab === 'favorites' ? 'No favorites yet' : 'No content generated yet'}
            </p>
          </div>
        ) : (
          filteredItems?.map((item) => {
            const virality = getViralityLevel(item?.viralScore);
            const prediction = viralityPredictions?.[item?.id];
            
            return (
              <div
                key={item?.id}
                className="group p-3 border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onContentSelect(item)}
              >
                <div className="flex items-start space-x-3">
                  {renderContentPreview(item)}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getTypeIcon(item?.type)} 
                          size={14} 
                          color="var(--color-muted-foreground)" 
                        />
                        <span className="text-xs text-muted-foreground capitalize">
                          {item?.type?.replace('-', ' ')}
                        </span>
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getEmotionColor(item?.emotion) }}
                        />
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e?.stopPropagation();
                          toggleFavorite(item?.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon 
                          name={favorites?.has(item?.id) ? 'Heart' : 'Heart'} 
                          size={14} 
                          color={favorites?.has(item?.id) ? 'var(--color-error)' : 'var(--color-muted-foreground)'}
                          className={favorites?.has(item?.id) ? 'fill-current' : ''}
                        />
                      </button>
                    </div>
                    
                    <div className="text-sm text-foreground font-medium mb-1 truncate">
                      {typeof item?.content === 'string' ? item?.content?.substring(0, 50) +'...' : item?.content?.text || item?.content?.title ||'Generated content'
                      }
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatTimeAgo(item?.timestamp)}</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Icon name="Heart" size={12} />
                          <span>{item?.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Share" size={12} />
                          <span>{item?.shares}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Virality Prediction */}
                    <div className="mt-2 p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-1">
                          <Icon name={virality?.icon} size={12} color={virality?.color} />
                          <span className="text-xs font-medium" style={{ color: virality?.color }}>
                            {virality?.level} Viral Potential
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{item?.viralScore}%</span>
                      </div>
                      
                      {prediction && (
                        <div className="text-xs text-muted-foreground">
                          <div>Campus reach: ~{prediction?.campusReach} students</div>
                          <div>Peak time: {prediction?.peakTime}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Sharing Options */}
      <div className="p-4 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Share</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" iconName="Users" iconPosition="left">
            Study Group
          </Button>
          <Button variant="outline" size="sm" iconName="Globe" iconPosition="left">
            Campus Board
          </Button>
          <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
            Discord
          </Button>
          <Button variant="outline" size="sm" iconName="Share2" iconPosition="left">
            Social Media
          </Button>
        </div>
        
        <div className="mt-3 p-2 bg-primary/5 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} color="var(--color-primary)" />
            <span className="text-xs text-primary font-medium">
              Campus Mood: Energetic 🚀
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Perfect time for motivational content!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenerationHistory;
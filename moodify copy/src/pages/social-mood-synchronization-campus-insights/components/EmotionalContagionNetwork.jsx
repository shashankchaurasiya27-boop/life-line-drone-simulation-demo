import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmotionalContagionNetwork = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [networkData, setNetworkData] = useState([]);
  const [contagionFlow, setContagionFlow] = useState([]);
  const [timeRange, setTimeRange] = useState('1h');
  const [isAnimating, setIsAnimating] = useState(true);

  const mockNetworkNodes = [
    {
      id: 'user-1',
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      currentMood: 'focus',
      influence: 0.85,
      connections: 12,
      position: { x: 50, y: 50 },
      moodHistory: ['calm', 'focus', 'focus', 'energy'],
      isInfluencer: true
    },
    {
      id: 'user-2',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      currentMood: 'energy',
      influence: 0.72,
      connections: 8,
      position: { x: 25, y: 30 },
      moodHistory: ['calm', 'energy', 'energy', 'focus'],
      isInfluencer: false
    },
    {
      id: 'user-3',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      currentMood: 'calm',
      influence: 0.68,
      connections: 15,
      position: { x: 75, y: 25 },
      moodHistory: ['stress', 'calm', 'calm', 'calm'],
      isInfluencer: true
    },
    {
      id: 'user-4',
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      currentMood: 'stress',
      influence: 0.45,
      connections: 6,
      position: { x: 30, y: 70 },
      moodHistory: ['focus', 'stress', 'stress', 'energy'],
      isInfluencer: false
    },
    {
      id: 'user-5',
      name: 'Emily Zhang',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      currentMood: 'focus',
      influence: 0.79,
      connections: 11,
      position: { x: 70, y: 75 },
      moodHistory: ['energy', 'focus', 'focus', 'calm'],
      isInfluencer: false
    },
    {
      id: 'user-6',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      currentMood: 'energy',
      influence: 0.63,
      connections: 9,
      position: { x: 15, y: 55 },
      moodHistory: ['calm', 'energy', 'energy', 'stress'],
      isInfluencer: false
    }
  ];

  const mockContagionFlows = [
    { from: 'user-1', to: 'user-2', strength: 0.8, mood: 'focus', timestamp: Date.now() - 300000 },
    { from: 'user-3', to: 'user-5', strength: 0.6, mood: 'calm', timestamp: Date.now() - 600000 },
    { from: 'user-2', to: 'user-6', strength: 0.7, mood: 'energy', timestamp: Date.now() - 900000 },
    { from: 'user-1', to: 'user-4', strength: 0.4, mood: 'focus', timestamp: Date.now() - 1200000 },
    { from: 'user-5', to: 'user-3', strength: 0.5, mood: 'focus', timestamp: Date.now() - 1500000 }
  ];

  useEffect(() => {
    setNetworkData(mockNetworkNodes);
    setContagionFlow(mockContagionFlows);

    // Simulate real-time mood changes and contagion
    const interval = setInterval(() => {
      if (isAnimating) {
        setNetworkData(prev => prev?.map(node => ({
          ...node,
          influence: Math.max(0.1, Math.min(1, node?.influence + (Math.random() - 0.5) * 0.1))
        })));

        // Add new contagion flow
        const randomFrom = mockNetworkNodes?.[Math.floor(Math.random() * mockNetworkNodes?.length)];
        const randomTo = mockNetworkNodes?.[Math.floor(Math.random() * mockNetworkNodes?.length)];
        if (randomFrom?.id !== randomTo?.id) {
          const newFlow = {
            from: randomFrom?.id,
            to: randomTo?.id,
            strength: Math.random() * 0.8 + 0.2,
            mood: randomFrom?.currentMood,
            timestamp: Date.now()
          };
          
          setContagionFlow(prev => [newFlow, ...prev?.slice(0, 9)]);
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimating]);

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

  const getInfluenceSize = (influence) => {
    return 30 + (influence * 20); // Base size 30px, max additional 20px
  };

  const handleNodeClick = (node) => {
    setSelectedNode(selectedNode?.id === node?.id ? null : node);
  };

  const getConnectionStrength = (fromId, toId) => {
    const flow = contagionFlow?.find(f => 
      (f?.from === fromId && f?.to === toId) || (f?.from === toId && f?.to === fromId)
    );
    return flow ? flow?.strength : 0;
  };

  const formatTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-card rounded-xl p-6 neomorphic overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <Icon name="Network" size={20} color="white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">Emotional Contagion Network</h3>
            <p className="text-sm text-muted-foreground truncate">Mood influence visualization</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-1.5 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary min-w-0"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="week">This Week</option>
          </select>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAnimating(!isAnimating)}
            iconName={isAnimating ? 'Pause' : 'Play'}
            iconPosition="left"
            className="whitespace-nowrap"
          >
            {isAnimating ? 'Pause' : 'Play'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
        {/* Network Visualization */}
        <div className="lg:col-span-2">
          <div className="relative w-full h-96 bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg border border-border overflow-hidden">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {networkData?.map((fromNode) =>
                networkData?.map((toNode) => {
                  if (fromNode?.id === toNode?.id) return null;
                  const strength = getConnectionStrength(fromNode?.id, toNode?.id);
                  if (strength < 0.3) return null;

                  return (
                    <line
                      key={`${fromNode?.id}-${toNode?.id}`}
                      x1={`${fromNode?.position?.x}%`}
                      y1={`${fromNode?.position?.y}%`}
                      x2={`${toNode?.position?.x}%`}
                      y2={`${toNode?.position?.y}%`}
                      stroke={getMoodColor(fromNode?.currentMood)}
                      strokeWidth={strength * 3}
                      strokeOpacity={strength * 0.6}
                      strokeDasharray={isAnimating ? "5,5" : "none"}
                      className={isAnimating ? "animate-pulse" : ""}
                    />
                  );
                })
              )}
            </svg>

            {/* Network Nodes */}
            {networkData?.map((node) => (
              <div
                key={node?.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110"
                style={{
                  left: `${node?.position?.x}%`,
                  top: `${node?.position?.y}%`,
                  width: `${getInfluenceSize(node?.influence)}px`,
                  height: `${getInfluenceSize(node?.influence)}px`
                }}
                onClick={() => handleNodeClick(node)}
              >
                {/* Influence Aura */}
                <div
                  className="absolute inset-0 rounded-full blur-sm animate-pulse"
                  style={{
                    backgroundColor: getMoodColor(node?.currentMood),
                    opacity: node?.influence * 0.3,
                    transform: 'scale(1.5)'
                  }}
                />

                {/* Node Avatar */}
                <div className="relative w-full h-full rounded-full border-2 border-white shadow-lg overflow-hidden">
                  <img
                    src={node?.avatar}
                    alt={node?.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Mood Indicator */}
                  <div
                    className="absolute bottom-0 right-0 w-1/3 h-1/3 rounded-full border border-white flex items-center justify-center"
                    style={{ backgroundColor: getMoodColor(node?.currentMood) }}
                  >
                    <Icon name={getMoodIcon(node?.currentMood)} size={8} color="white" />
                  </div>

                  {/* Influencer Badge */}
                  {node?.isInfluencer && (
                    <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-warning rounded-full border border-white flex items-center justify-center">
                      <Icon name="Star" size={6} color="white" />
                    </div>
                  )}
                </div>

                {/* Node Label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs text-center">
                  <div className="font-medium text-foreground whitespace-nowrap">{node?.name}</div>
                  <div className="text-muted-foreground">{Math.round(node?.influence * 100)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6 min-w-0">
          {/* Selected Node Details */}
          {selectedNode && (
            <div className="p-4 bg-muted/20 rounded-lg border border-border overflow-hidden">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={selectedNode?.avatar}
                  alt={selectedNode?.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground truncate">{selectedNode?.name}</h4>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getMoodIcon(selectedNode?.currentMood)} 
                      size={14} 
                      color={getMoodColor(selectedNode?.currentMood)}
                    />
                    <span className="text-sm capitalize truncate">{selectedNode?.currentMood}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Influence Score</span>
                  <span className="text-sm font-mono">{Math.round(selectedNode?.influence * 100)}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Connections</span>
                  <span className="text-sm font-mono">{selectedNode?.connections}</span>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">Mood History</span>
                  <div className="flex space-x-1 flex-wrap">
                    {selectedNode?.moodHistory?.map((mood, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-white flex-shrink-0"
                        style={{ backgroundColor: getMoodColor(mood) }}
                        title={mood}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contagion Flow Feed */}
          <div className="min-w-0">
            <h4 className="font-semibold text-foreground mb-4">Recent Contagion Events</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {contagionFlow?.slice(0, 8)?.map((flow, index) => {
                const fromNode = networkData?.find(n => n?.id === flow?.from);
                const toNode = networkData?.find(n => n?.id === flow?.to);
                
                return (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-muted/10 rounded-lg overflow-hidden">
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <img
                        src={fromNode?.avatar}
                        alt={fromNode?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                      <img
                        src={toNode?.avatar}
                        alt={toNode?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getMoodIcon(flow?.mood)} 
                          size={12} 
                          color={getMoodColor(flow?.mood)}
                        />
                        <span className="text-xs capitalize truncate">{flow?.mood}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {Math.round(flow?.strength * 100)}%
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {formatTimeAgo(flow?.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Network Stats */}
          <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <h5 className="font-semibold text-foreground mb-3">Network Insights</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Avg Influence</span>
                <span className="font-mono">
                  {Math.round(networkData?.reduce((acc, node) => acc + node?.influence, 0) / networkData?.length * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active Connections</span>
                <span className="font-mono">{contagionFlow?.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Dominant Mood</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={12} className="text-energy" />
                  <span>Energy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalContagionNetwork;
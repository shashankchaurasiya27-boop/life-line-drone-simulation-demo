import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MoodHeatmap = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [timeRange, setTimeRange] = useState('current');
  const [heatmapData, setHeatmapData] = useState([]);

  const campusBuildings = [
    {
      id: 'cs-building',
      name: 'Computer Science Building',
      position: { x: 45, y: 30 },
      currentMood: 'focus',
      intensity: 0.8,
      studentCount: 156,
      avgStress: 0.6,
      topEmotions: ['focus', 'stress', 'energy']
    },
    {
      id: 'library',
      name: 'Main Library',
      position: { x: 60, y: 45 },
      currentMood: 'calm',
      intensity: 0.9,
      studentCount: 234,
      avgStress: 0.3,
      topEmotions: ['calm', 'focus', 'energy']
    },
    {
      id: 'student-center',
      name: 'Student Center',
      position: { x: 30, y: 60 },
      currentMood: 'energy',
      intensity: 0.7,
      studentCount: 89,
      avgStress: 0.4,
      topEmotions: ['energy', 'calm', 'focus']
    },
    {
      id: 'engineering-hall',
      name: 'Engineering Hall',
      position: { x: 70, y: 25 },
      currentMood: 'stress',
      intensity: 0.6,
      studentCount: 112,
      avgStress: 0.8,
      topEmotions: ['stress', 'focus', 'energy']
    },
    {
      id: 'dormitory-a',
      name: 'Dormitory A',
      position: { x: 20, y: 80 },
      currentMood: 'calm',
      intensity: 0.5,
      studentCount: 67,
      avgStress: 0.2,
      topEmotions: ['calm', 'energy', 'focus']
    },
    {
      id: 'cafeteria',
      name: 'Main Cafeteria',
      position: { x: 50, y: 70 },
      currentMood: 'energy',
      intensity: 0.8,
      studentCount: 145,
      avgStress: 0.3,
      topEmotions: ['energy', 'calm', 'focus']
    }
  ];

  useEffect(() => {
    // Simulate real-time mood data updates
    const interval = setInterval(() => {
      setHeatmapData(prev => {
        const newData = campusBuildings?.map(building => ({
          ...building,
          intensity: Math.max(0.1, Math.min(1, building?.intensity + (Math.random() - 0.5) * 0.2)),
          studentCount: building?.studentCount + Math.floor((Math.random() - 0.5) * 20),
          avgStress: Math.max(0, Math.min(1, building?.avgStress + (Math.random() - 0.5) * 0.1))
        }));
        return newData;
      });
    }, 3000);

    setHeatmapData(campusBuildings);
    return () => clearInterval(interval);
  }, []);

  const getMoodColor = (mood, intensity = 1) => {
    const colors = {
      calm: `rgba(74, 144, 226, ${intensity})`,
      focus: `rgba(123, 104, 238, ${intensity})`,
      energy: `rgba(255, 107, 107, ${intensity})`,
      stress: `rgba(237, 137, 54, ${intensity})`
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

  const handleBuildingClick = (building) => {
    setSelectedBuilding(selectedBuilding?.id === building?.id ? null : building);
  };

  return (
    <div className="bg-card rounded-xl p-6 neomorphic">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="Map" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Campus Mood Heatmap</h3>
            <p className="text-sm text-muted-foreground">Real-time emotional landscape</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-1.5 text-sm bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="current">Current</option>
            <option value="1hour">Last Hour</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </select>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>
      </div>
      <div className="relative">
        {/* Campus Map Container */}
        <div className="relative w-full h-96 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border border-border overflow-hidden">
          {/* Campus Background */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Campus paths */}
              <path d="M10,50 Q50,30 90,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M50,10 Q30,50 50,90" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M20,20 L80,80" stroke="currentColor" strokeWidth="0.3" fill="none" />
              <path d="M80,20 L20,80" stroke="currentColor" strokeWidth="0.3" fill="none" />
            </svg>
          </div>

          {/* Building Mood Indicators */}
          {heatmapData?.map((building) => (
            <div
              key={building?.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                left: `${building?.position?.x}%`,
                top: `${building?.position?.y}%`
              }}
              onClick={() => handleBuildingClick(building)}
            >
              {/* Mood Aura */}
              <div
                className="absolute inset-0 rounded-full blur-md animate-pulse"
                style={{
                  backgroundColor: getMoodColor(building?.currentMood, building?.intensity * 0.3),
                  width: `${40 + building?.intensity * 20}px`,
                  height: `${40 + building?.intensity * 20}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
              
              {/* Building Icon */}
              <div
                className="relative w-8 h-8 rounded-lg flex items-center justify-center border-2 border-white shadow-lg z-10"
                style={{ backgroundColor: getMoodColor(building?.currentMood, building?.intensity) }}
              >
                <Icon name={getMoodIcon(building?.currentMood)} size={16} color="white" />
              </div>

              {/* Student Count Badge */}
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-xs rounded-full flex items-center justify-center font-mono">
                {building?.studentCount > 99 ? '99+' : building?.studentCount}
              </div>
            </div>
          ))}

          {/* Mood Flow Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {heatmapData?.map((building, index) => {
              const nextBuilding = heatmapData?.[(index + 1) % heatmapData?.length];
              return (
                <line
                  key={`flow-${building?.id}`}
                  x1={`${building?.position?.x}%`}
                  y1={`${building?.position?.y}%`}
                  x2={`${nextBuilding?.position?.x}%`}
                  y2={`${nextBuilding?.position?.y}%`}
                  stroke={getMoodColor(building?.currentMood, 0.2)}
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              );
            })}
          </svg>
        </div>

        {/* Building Details Panel */}
        {selectedBuilding && (
          <div className="absolute top-4 right-4 w-72 bg-popover border border-border rounded-lg shadow-lg p-4 neomorphic z-20">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">{selectedBuilding?.name}</h4>
              <button
                onClick={() => setSelectedBuilding(null)}
                className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Mood</span>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getMoodIcon(selectedBuilding?.currentMood)} 
                    size={16} 
                    color={getMoodColor(selectedBuilding?.currentMood, 1)}
                  />
                  <span className="text-sm font-medium capitalize">{selectedBuilding?.currentMood}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Students Present</span>
                <span className="text-sm font-mono">{selectedBuilding?.studentCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Stress Level</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-success via-warning to-error transition-all duration-300"
                      style={{ width: `${selectedBuilding?.avgStress * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono">{Math.round(selectedBuilding?.avgStress * 100)}%</span>
                </div>
              </div>

              <div>
                <span className="text-sm text-muted-foreground mb-2 block">Top Emotions</span>
                <div className="flex flex-wrap gap-1">
                  {selectedBuilding?.topEmotions?.map((emotion, index) => (
                    <span
                      key={emotion}
                      className="px-2 py-1 text-xs rounded-full border"
                      style={{
                        backgroundColor: getMoodColor(emotion, 0.1),
                        borderColor: getMoodColor(emotion, 0.3),
                        color: getMoodColor(emotion, 1)
                      }}
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Legend */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Mood Intensity:</span>
          {['calm', 'focus', 'energy', 'stress']?.map((mood) => (
            <div key={mood} className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getMoodColor(mood, 1) }}
              />
              <span className="text-xs capitalize text-muted-foreground">{mood}</span>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date()?.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MoodHeatmap;
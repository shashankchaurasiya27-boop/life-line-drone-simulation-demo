import React, { useState, useEffect } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodTimelineGraph = ({ currentEmotion }) => {
  const [timeRange, setTimeRange] = useState('today');
  const [moodData, setMoodData] = useState([]);
  const [academicEvents, setAcademicEvents] = useState([]);
  const [showAcademicMarkers, setShowAcademicMarkers] = useState(true);

  // Mock mood data generation
  const generateMoodData = (range) => {
    const emotionValues = {
      calm: 3,
      focus: 4,
      energy: 5,
      stress: 2
    };

    const now = new Date();
    const data = [];
    let intervals, stepSize, formatTime;

    switch (range) {
      case 'today':
        intervals = 24;
        stepSize = 60 * 60 * 1000; // 1 hour
        formatTime = (date) => date?.getHours()?.toString()?.padStart(2, '0') + ':00';
        break;
      case 'week':
        intervals = 7;
        stepSize = 24 * 60 * 60 * 1000; // 1 day
        formatTime = (date) => date?.toLocaleDateString('en-US', { weekday: 'short' });
        break;
      case 'month':
        intervals = 30;
        stepSize = 24 * 60 * 60 * 1000; // 1 day
        formatTime = (date) => date?.getDate()?.toString();
        break;
      default:
        intervals = 24;
        stepSize = 60 * 60 * 1000;
        formatTime = (date) => date?.getHours()?.toString()?.padStart(2, '0') + ':00';
    }

    for (let i = intervals - 1; i >= 0; i--) {
      const time = new Date(now.getTime() - (i * stepSize));
      const baseValue = emotionValues?.[currentEmotion] || 3;
      const variation = (Math.random() - 0.5) * 2;
      const moodValue = Math.max(1, Math.min(5, baseValue + variation));

      data?.push({
        time: formatTime(time),
        fullTime: time,
        mood: Math.round(moodValue * 10) / 10,
        emotion: currentEmotion,
        heartRate: 65 + Math.random() * 30,
        stressLevel: Math.max(0, Math.min(100, (6 - moodValue) * 20 + Math.random() * 20))
      });
    }

    return data;
  };

  // Mock academic events
  const generateAcademicEvents = (range) => {
    const events = [
      { time: '09:00', type: 'class', title: 'Data Structures Lecture', color: 'var(--color-primary)' },
      { time: '11:30', type: 'coding', title: 'Algorithm Practice', color: 'var(--color-secondary)' },
      { time: '14:00', type: 'deadline', title: 'Project Submission', color: 'var(--color-error)' },
      { time: '16:30', type: 'study', title: 'Group Study Session', color: 'var(--color-success)' },
      { time: '19:00', type: 'coding', title: 'Personal Project', color: 'var(--color-accent)' }
    ];

    return range === 'today' ? events : [];
  };

  useEffect(() => {
    const data = generateMoodData(timeRange);
    const events = generateAcademicEvents(timeRange);
    setMoodData(data);
    setAcademicEvents(events);
  }, [timeRange, currentEmotion]);

  const getMoodLabel = (value) => {
    if (value >= 4.5) return 'Excellent';
    if (value >= 3.5) return 'Good';
    if (value >= 2.5) return 'Neutral';
    if (value >= 1.5) return 'Low';
    return 'Very Low';
  };

  const getMoodColor = (value) => {
    if (value >= 4.5) return 'var(--color-success)';
    if (value >= 3.5) return 'var(--color-biometric-energy)';
    if (value >= 2.5) return 'var(--color-warning)';
    if (value >= 1.5) return 'var(--color-accent)';
    return 'var(--color-error)';
  };

  const getEventIcon = (type) => {
    const icons = {
      class: 'GraduationCap',
      coding: 'Code',
      deadline: 'Clock',
      study: 'BookOpen'
    };
    return icons?.[type] || 'Calendar';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg neomorphic">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Mood:</span>
              <span className="text-sm font-medium" style={{ color: getMoodColor(data?.mood) }}>
                {getMoodLabel(data?.mood)} ({data?.mood})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Heart Rate:</span>
              <span className="text-sm font-mono">{Math.round(data?.heartRate)} BPM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Stress:</span>
              <span className="text-sm font-mono">{Math.round(data?.stressLevel)}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const currentMood = moodData?.length > 0 ? moodData?.[moodData?.length - 1]?.mood : 3;
  const avgMood = moodData?.length > 0 ? moodData?.reduce((sum, d) => sum + d?.mood, 0) / moodData?.length : 3;

  return (
    <div className="neomorphic emotion-calm bg-card rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Mood Timeline
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            {['today', 'week', 'month']?.map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="px-3 py-1 text-xs"
              >
                {range?.charAt(0)?.toUpperCase() + range?.slice(1)}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAcademicMarkers(!showAcademicMarkers)}
            iconName={showAcademicMarkers ? "Eye" : "EyeOff"}
            className="text-xs"
          >
            Events
          </Button>
        </div>
      </div>
      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-muted/30 rounded-lg p-3 text-center neomorphic">
          <div className="text-lg font-bold text-foreground">
            {getMoodLabel(currentMood)}
          </div>
          <div className="text-xs text-muted-foreground">Current Mood</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-3 text-center neomorphic">
          <div className="text-lg font-bold text-foreground">
            {getMoodLabel(avgMood)}
          </div>
          <div className="text-xs text-muted-foreground">Average</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-3 text-center neomorphic">
          <div className="text-lg font-bold text-foreground">
            {Math.max(...moodData?.map(d => d?.mood))?.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">Peak</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-3 text-center neomorphic">
          <div className="text-lg font-bold text-foreground">
            {Math.min(...moodData?.map(d => d?.mood))?.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">Low</div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={moodData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              domain={[1, 5]}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => getMoodLabel(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Average line */}
            <ReferenceLine 
              y={avgMood} 
              stroke="var(--color-muted-foreground)" 
              strokeDasharray="5 5"
              label={{ value: "Average", position: "topRight" }}
            />
            
            <Area
              type="monotone"
              dataKey="mood"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#moodGradient)"
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Academic Events Timeline */}
      {showAcademicMarkers && timeRange === 'today' && academicEvents?.length > 0 && (
        <div className="border-t border-border pt-4">
          <h5 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span>Academic Context</span>
          </h5>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {academicEvents?.map((event, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg text-xs neomorphic"
              >
                <Icon 
                  name={getEventIcon(event?.type)} 
                  size={14} 
                  color={event?.color}
                />
                <div>
                  <div className="font-medium text-foreground">{event?.time}</div>
                  <div className="text-muted-foreground">{event?.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Insights */}
      <div className="bg-muted/20 rounded-lg p-4 neomorphic-inset">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} color="var(--color-warning)" />
          <div>
            <h5 className="text-sm font-medium text-foreground mb-1">Mood Insights</h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentMood > avgMood 
                ? `Your mood is ${((currentMood - avgMood) * 20)?.toFixed(0)}% above average today. Great job maintaining positive energy!`
                : currentMood < avgMood
                ? `Your mood is ${((avgMood - currentMood) * 20)?.toFixed(0)}% below average. Consider taking a break or trying a mood-boosting activity.`
                : "Your mood is stable and consistent with your average. Keep up the good work!"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTimelineGraph;
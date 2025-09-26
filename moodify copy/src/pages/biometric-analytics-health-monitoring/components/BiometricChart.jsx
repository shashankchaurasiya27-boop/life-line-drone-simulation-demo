import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BiometricChart = ({ title, data, dataKey, color, type = 'line', timeRange = '24h' }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(timeRange);
  const [filteredData, setFilteredData] = useState(data);

  const timeRanges = [
    { label: '1H', value: '1h' },
    { label: '6H', value: '6h' },
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' }
  ];

  // Define fixed Y-axis ranges based on chart type and title
  const getFixedYAxisRange = () => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('heart rate') || titleLower.includes('hrv')) {
      return {
        domain: [50, 100],
        ticks: [50, 60, 70, 80, 90, 100]
      };
    } else if (titleLower.includes('stress')) {
      return {
        domain: [0, 80],
        ticks: [0, 20, 40, 60, 80]
      };
    } else if (titleLower.includes('sleep') || titleLower.includes('wellness')) {
      return {
        domain: [40, 100],
        ticks: [40, 60, 80, 100]
      };
    } else if (titleLower.includes('fatigue') || titleLower.includes('energy')) {
      return {
        domain: [0, 100],
        ticks: [0, 25, 50, 75, 100]
      };
    } else {
      // Default range
      return {
        domain: [0, 100],
        ticks: [0, 25, 50, 75, 100]
      };
    }
  };

  const yAxisConfig = getFixedYAxisRange();

  useEffect(() => {
    // Filter data based on selected time range
    const now = new Date();
    let filterHours = 24;
    
    switch (selectedRange) {
      case '1h': filterHours = 1; break;
      case '6h': filterHours = 6; break;
      case '24h': filterHours = 24; break;
      case '7d': filterHours = 24 * 7; break;
      case '30d': filterHours = 24 * 30; break;
    }
    
    const filtered = data?.filter(item => {
      const itemTime = new Date(item.timestamp);
      const diffHours = (now - itemTime) / (1000 * 60 * 60);
      return diffHours <= filterHours;
    });
    
    setFilteredData(filtered);
  }, [selectedRange, data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{`Time: ${label}`}</p>
          <p className="text-sm font-medium" style={{ color }}>
            {`${title}: ${Math.round(payload?.[0]?.value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const ChartComponent = type === 'area' ? AreaChart : LineChart;
  const DataComponent = type === 'area' ? Area : Line;

  return (
    <div className={`neomorphic rounded-xl transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50 bg-background' : 'h-96'} overflow-hidden`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-heading font-semibold text-foreground">{title}</h3>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span>Live Data</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Icon name={isFullscreen ? 'Minimize2' : 'Maximize2'} size={16} />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeRanges?.map((range) => (
            <Button
              key={range?.value}
              variant={selectedRange === range?.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedRange(range?.value)}
              className="text-xs"
            >
              {range?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className={`p-4 ${isFullscreen ? 'h-full' : 'h-80'} overflow-hidden`}>
        <div className="w-full h-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent 
              key={`${title}-${selectedRange}`}
              data={filteredData} 
              margin={{ top: 20, right: 20, left: 50, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={11}
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                height={30}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={11}
                tick={{ fontSize: 10 }}
                domain={yAxisConfig.domain}
                ticks={yAxisConfig.ticks}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value.toString()}
                width={45}
                tickMargin={8}
                allowDataOverflow={false}
                scale="linear"
                type="number"
              />
              <Tooltip content={<CustomTooltip />} />
              <DataComponent
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                fill={type === 'area' ? `${color}20` : 'none'}
                dot={{ fill: color, strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: color, strokeWidth: 2 }}
              />
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BiometricChart;
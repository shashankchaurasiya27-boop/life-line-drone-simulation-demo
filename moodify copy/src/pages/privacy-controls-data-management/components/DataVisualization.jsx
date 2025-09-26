import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const DataVisualization = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedDataType, setSelectedDataType] = useState('all');

  const dataCollectionStats = [
    { name: 'Emotion Data', value: 2847, color: 'var(--color-primary)' },
    { name: 'Biometric Data', value: 1923, color: 'var(--color-secondary)' },
    { name: 'Voice Analysis', value: 1456, color: 'var(--color-accent)' },
    { name: 'Code Analysis', value: 892, color: 'var(--color-success)' },
    { name: 'Social Data', value: 634, color: 'var(--color-warning)' }
  ];

  const processingLocation = [
    { name: 'Local (WebAssembly)', value: 89, color: 'var(--color-success)' },
    { name: 'Edge Computing', value: 8, color: 'var(--color-warning)' },
    { name: 'Cloud (Encrypted)', value: 3, color: 'var(--color-error)' }
  ];

  const weeklyDataTrend = [
    { day: 'Mon', collected: 420, processed: 418, deleted: 15 },
    { day: 'Tue', collected: 380, processed: 375, deleted: 12 },
    { day: 'Wed', collected: 450, processed: 445, deleted: 18 },
    { day: 'Thu', collected: 520, processed: 515, deleted: 22 },
    { day: 'Fri', collected: 490, processed: 485, deleted: 20 },
    { day: 'Sat', collected: 320, processed: 318, deleted: 8 },
    { day: 'Sun', collected: 280, processed: 278, deleted: 6 }
  ];

  const retentionSchedule = [
    {
      dataType: 'Emotion Snapshots',
      retention: '24 hours',
      nextDeletion: '2025-08-20 23:32:05',
      count: 1247,
      icon: 'Brain'
    },
    {
      dataType: 'Voice Patterns',
      retention: '7 days',
      nextDeletion: '2025-08-26 23:32:05',
      count: 892,
      icon: 'Mic'
    },
    {
      dataType: 'Biometric Signals',
      retention: '30 days',
      nextDeletion: '2025-09-18 23:32:05',
      count: 2156,
      icon: 'Activity'
    },
    {
      dataType: 'Code Analysis',
      retention: '90 days',
      nextDeletion: '2025-11-17 23:32:05',
      count: 634,
      icon: 'Code'
    }
  ];

  const timeframes = [
    { key: '24h', label: '24 Hours' },
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' }
  ];

  const getRetentionColor = (retention) => {
    if (retention?.includes('24 hours')) return 'text-success';
    if (retention?.includes('7 days')) return 'text-warning';
    if (retention?.includes('30 days')) return 'text-accent';
    return 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Data Collection Visualization</h3>
          <p className="text-sm text-muted-foreground">
            Real-time insights into your biometric data processing and storage
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeframes?.map((tf) => (
              <option key={tf?.key} value={tf?.key}>{tf?.label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Data Collection Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Types Distribution */}
        <div className="neomorphic p-6 rounded-xl bg-card border border-border">
          <h4 className="text-lg font-medium text-foreground mb-4">Data Types Collected</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataCollectionStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataCollectionStats?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [value?.toLocaleString(), 'Data Points']}
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {dataCollectionStats?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-xs text-muted-foreground">{item?.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Location */}
        <div className="neomorphic p-6 rounded-xl bg-card border border-border">
          <h4 className="text-lg font-medium text-foreground mb-4">Processing Location</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={processingLocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {processingLocation?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Processing']}
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {processingLocation?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-xs text-muted-foreground">{item?.name}</span>
                </div>
                <span className="text-xs font-medium text-foreground">{item?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Weekly Data Trend */}
      <div className="neomorphic p-6 rounded-xl bg-card border border-border">
        <h4 className="text-lg font-medium text-foreground mb-4">Weekly Data Processing Trend</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyDataTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
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
              <Line 
                type="monotone" 
                dataKey="collected" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="Collected"
              />
              <Line 
                type="monotone" 
                dataKey="processed" 
                stroke="var(--color-success)" 
                strokeWidth={2}
                name="Processed"
              />
              <Line 
                type="monotone" 
                dataKey="deleted" 
                stroke="var(--color-error)" 
                strokeWidth={2}
                name="Auto-Deleted"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Retention Schedule */}
      <div className="neomorphic p-6 rounded-xl bg-card border border-border">
        <h4 className="text-lg font-medium text-foreground mb-4">Automatic Deletion Schedule</h4>
        <div className="space-y-4">
          {retentionSchedule?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name={item?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground">{item?.dataType}</h5>
                  <p className="text-xs text-muted-foreground">
                    {item?.count?.toLocaleString()} data points
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-sm font-medium ${getRetentionColor(item?.retention)}`}>
                  {item?.retention}
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  Next: {new Date(item.nextDeletion)?.toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <div className="text-xs text-success">
              <strong>Privacy Guarantee:</strong> All data is automatically deleted according to the schedule above. 
              99% of processing occurs locally on your device via WebAssembly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
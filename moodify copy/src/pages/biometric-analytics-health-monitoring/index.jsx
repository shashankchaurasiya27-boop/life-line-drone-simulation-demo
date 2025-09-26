import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import VitalSignsCard from './components/VitalSignsCard';
import BiometricChart from './components/BiometricChart';
import HealthActionCard from './components/HealthActionCard';
import PredictiveInsights from './components/PredictiveInsights';
import PeerComparisonPanel from './components/PeerComparisonPanel';
import WellnessScore from './components/WellnessScore';

const BiometricAnalyticsHealthMonitoring = () => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedView, setSelectedView] = useState('overview');

  // Mock real-time biometric data
  const [biometricData, setBiometricData] = useState({
    heartRate: 72,
    hrv: 45,
    stressLevel: 32,
    fatigueLevel: 28,
    oxygenSaturation: 98,
    bloodPressure: { systolic: 120, diastolic: 80 }
  });

  // Mock chart data with values that fit within fixed Y-axis ranges
  const heartRateData = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    let baseValue = 70;
    
    // Simulate natural heart rate variation throughout the day (50-100 range)
    if (hour >= 6 && hour <= 8) baseValue = 75; // Morning rise
    else if (hour >= 9 && hour <= 17) baseValue = 72; // Work hours
    else if (hour >= 18 && hour <= 22) baseValue = 68; // Evening
    else baseValue = 65; // Night
    
    const variation = Math.sin(i * 0.3) * 8 + (Math.random() - 0.5) * 6;
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      value: Math.round(Math.max(50, Math.min(100, baseValue + variation))),
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000)
    };
  });

  const stressData = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    let baseValue = 25;
    
    // Simulate stress patterns (0-80 range)
    if (hour >= 9 && hour <= 11) baseValue = 35; // Morning work stress
    else if (hour >= 14 && hour <= 16) baseValue = 40; // Afternoon peak
    else if (hour >= 18 && hour <= 20) baseValue = 30; // Evening wind down
    else if (hour >= 22 || hour <= 6) baseValue = 20; // Sleep time
    
    const variation = Math.sin(i * 0.4) * 10 + (Math.random() - 0.5) * 8;
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      value: Math.round(Math.max(0, Math.min(80, baseValue + variation))),
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000)
    };
  });

  const sleepQualityData = Array.from({ length: 7 }, (_, i) => {
    const day = i + 1;
    const baseValue = 75 + Math.sin(day * 0.5) * 15;
    const variation = (Math.random() - 0.5) * 10;
    return {
      time: `Day ${day}`,
      value: Math.round(Math.max(40, Math.min(100, baseValue + variation))),
      timestamp: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)
    };
  });

  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'detailed', label: 'Detailed Analysis', icon: 'BarChart3' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'comparison', label: 'Peer Comparison', icon: 'Users' }
  ];

  const vitalSigns = [
    {
      title: 'Heart Rate',
      value: biometricData?.heartRate,
      unit: 'BPM',
      trend: 2.3,
      icon: 'Heart',
      color: 'var(--color-error)',
      description: 'Resting heart rate',
      isActive: isWebcamActive
    },
    {
      title: 'HRV',
      value: biometricData?.hrv,
      unit: 'ms',
      trend: -1.2,
      icon: 'Activity',
      color: 'var(--color-biometric-calm)',
      description: 'Heart rate variability',
      isActive: isWebcamActive
    },
    {
      title: 'Stress Level',
      value: biometricData?.stressLevel,
      unit: '%',
      trend: -5.8,
      icon: 'Zap',
      color: 'var(--color-warning)',
      description: 'Current stress index',
      isActive: isWebcamActive
    },
    {
      title: 'Fatigue',
      value: biometricData?.fatigueLevel,
      unit: '%',
      trend: 3.1,
      icon: 'Battery',
      color: 'var(--color-biometric-focus)',
      description: 'Energy depletion level',
      isActive: isWebcamActive
    }
  ];

  const healthActions = [
    {
      title: 'Deep Breathing',
      description: 'Reduce stress with guided breathing',
      icon: 'Wind',
      color: 'var(--color-biometric-calm)',
      actionType: 'breathing',
      duration: 300,
      isRecommended: biometricData?.stressLevel > 40
    },
    {
      title: 'Posture Check',
      description: 'Improve your sitting posture',
      icon: 'User',
      color: 'var(--color-biometric-focus)',
      actionType: 'posture',
      duration: 60,
      isRecommended: true
    },
    {
      title: 'Eye Break',
      description: 'Rest your eyes from screen',
      icon: 'Eye',
      color: 'var(--color-success)',
      actionType: 'break',
      duration: 120,
      isRecommended: false
    },
    {
      title: 'Hydration',
      description: 'Time to drink water',
      icon: 'Droplets',
      color: 'var(--color-biometric-calm)',
      actionType: 'hydration',
      duration: 30,
      isRecommended: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate real-time biometric updates
      if (isWebcamActive) {
        setBiometricData(prev => ({
          ...prev,
          heartRate: parseFloat((70 + Math.sin(Date.now() / 10000) * 8 + Math.random() * 4).toFixed(3)),
          hrv: parseFloat((40 + Math.sin(Date.now() / 15000) * 10 + Math.random() * 3).toFixed(3)),
          stressLevel: parseFloat(Math.max(0, Math.min(100, prev?.stressLevel + (Math.random() - 0.5) * 2)).toFixed(3)),
          fatigueLevel: parseFloat(Math.max(0, Math.min(100, prev?.fatigueLevel + (Math.random() - 0.5) * 1.5)).toFixed(3))
        }));
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [isWebcamActive]);

  const toggleWebcam = () => {
    setIsWebcamActive(!isWebcamActive);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Biometric Analytics & Health Monitoring - Moodify</title>
        <meta name="description" content="Comprehensive health dashboard for CS students with real-time biometric analysis, predictive insights, and wellness monitoring." />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Biometric Analytics & Health Monitoring
              </h1>
              <p className="text-muted-foreground">
                Real-time wellness insights powered by AI emotion detection
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <span>{currentTime?.toLocaleString()}</span>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${isWebcamActive ? 'bg-success animate-biometric-pulse' : 'bg-muted-foreground'}`} />
                  <span>{isWebcamActive ? 'Live Monitoring' : 'Monitoring Paused'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant={isWebcamActive ? 'destructive' : 'default'}
                onClick={toggleWebcam}
                iconName={isWebcamActive ? 'VideoOff' : 'Video'}
                iconPosition="left"
              >
                {isWebcamActive ? 'Stop Monitoring' : 'Start Monitoring'}
              </Button>
              
              <div className="flex items-center space-x-1 bg-muted rounded-lg">
                {viewOptions?.map((option) => (
                  <Button
                    key={option?.id}
                    variant={selectedView === option?.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedView(option?.id)}
                    iconName={option?.icon}
                    iconPosition="left"
                    iconSize={16}
                    className="text-xs"
                  >
                    <span className="hidden sm:inline">{option?.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Sidebar - Health Actions */}
            <div className="lg:col-span-3 space-y-4">
              <div className="neomorphic rounded-xl p-4 emotion-calm">
                <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="Sparkles" size={18} color="var(--color-primary)" />
                  <span>Quick Actions</span>
                </h3>
                <div className="space-y-3">
                  {healthActions?.map((action, index) => (
                    <HealthActionCard key={index} {...action} />
                  ))}
                </div>
              </div>

              {/* Wellness Score */}
              <WellnessScore score={78} trend={5} />
            </div>

            {/* Center Content */}
            <div className="xl:col-span-6 space-y-6 min-w-0">
              {/* Vital Signs Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vitalSigns?.map((vital, index) => (
                  <VitalSignsCard key={index} {...vital} />
                ))}
              </div>

              {/* Interactive Charts */}
              {selectedView === 'overview' && (
                <div className="space-y-6 min-w-0">
                  <div className="w-full overflow-hidden">
                    <BiometricChart
                      title="Heart Rate Variability"
                      data={heartRateData}
                      dataKey="value"
                      color="var(--color-error)"
                      type="line"
                    />
                  </div>
                  <div className="w-full overflow-hidden">
                    <BiometricChart
                      title="Stress Level Trends"
                      data={stressData}
                      dataKey="value"
                      color="var(--color-warning)"
                      type="area"
                    />
                  </div>
                </div>
              )}

              {selectedView === 'detailed' && (
                <div className="space-y-6 min-w-0">
                  <div className="w-full overflow-hidden">
                    <BiometricChart
                      title="Sleep Quality Analysis"
                      data={sleepQualityData}
                      dataKey="value"
                      color="var(--color-biometric-calm)"
                      type="area"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="neomorphic rounded-xl p-6">
                      <h4 className="font-heading font-semibold text-foreground mb-4">Blood Pressure</h4>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">
                          {biometricData?.bloodPressure?.systolic}/{biometricData?.bloodPressure?.diastolic}
                        </div>
                        <div className="text-sm text-muted-foreground">mmHg</div>
                        <div className="text-xs text-success mt-2">Normal Range</div>
                      </div>
                    </div>
                    <div className="neomorphic rounded-xl p-6">
                      <h4 className="font-heading font-semibold text-foreground mb-4">Oxygen Saturation</h4>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-biometric-calm">
                          {biometricData?.oxygenSaturation}%
                        </div>
                        <div className="text-sm text-muted-foreground">SpO2</div>
                        <div className="text-xs text-success mt-2">Excellent</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedView === 'trends' && (
                <div className="space-y-6 min-w-0">
                  <div className="w-full overflow-hidden">
                    <BiometricChart
                      title="7-Day Wellness Trend"
                      data={sleepQualityData}
                      dataKey="value"
                      color="var(--color-primary)"
                      type="line"
                    />
                  </div>
                  <div className="neomorphic rounded-xl p-6">
                    <h4 className="font-heading font-semibold text-foreground mb-4">Weekly Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-success">+12%</div>
                        <div className="text-xs text-muted-foreground">Energy Improvement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-error">-8%</div>
                        <div className="text-xs text-muted-foreground">Stress Reduction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-biometric-calm">+5%</div>
                        <div className="text-xs text-muted-foreground">Sleep Quality</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-warning">-3%</div>
                        <div className="text-xs text-muted-foreground">Focus Score</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="xl:col-span-3 space-y-6">
              {selectedView === 'comparison' ? (
                <PeerComparisonPanel />
              ) : (
                <>
                  <PredictiveInsights />
                  
                  {/* Early Warning System */}
                  <div className="neomorphic rounded-xl p-6 emotion-calm">
                    <h4 className="font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={18} color="var(--color-warning)" />
                      <span>Health Alerts</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                        <Icon name="Clock" size={16} color="var(--color-warning)" className="mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-foreground">Extended Screen Time</div>
                          <div className="text-xs text-muted-foreground">Consider taking a break in 15 minutes</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
                        <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-foreground">Good Hydration</div>
                          <div className="text-xs text-muted-foreground">Keep up the healthy habits!</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Integration Status */}
                  <div className="neomorphic rounded-xl p-6 emotion-calm">
                    <h4 className="font-heading font-semibold text-foreground mb-4">Device Integration</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon name="Smartphone" size={16} color="var(--color-success)" />
                          <span className="text-sm text-foreground">Webcam PPG</span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${isWebcamActive ? 'bg-success' : 'bg-muted-foreground'}`} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon name="Watch" size={16} color="var(--color-muted-foreground)" />
                          <span className="text-sm text-muted-foreground">Smart Watch</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon name="Activity" size={16} color="var(--color-muted-foreground)" />
                          <span className="text-sm text-muted-foreground">Fitness Tracker</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 text-xs">
                      Connect Devices
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 bg-muted/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-heading font-semibold text-foreground mb-2">Privacy & Security</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  All biometric processing occurs locally via WebAssembly. Your health data never leaves your device unless you explicitly choose encrypted cloud backup.
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Cpu" size={12} />
                    <span>Edge AI Processing</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Lock" size={12} />
                    <span>End-to-End Encryption</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Trash2" size={12} />
                    <span>Auto-Delete After 30 Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BiometricAnalyticsHealthMonitoring;
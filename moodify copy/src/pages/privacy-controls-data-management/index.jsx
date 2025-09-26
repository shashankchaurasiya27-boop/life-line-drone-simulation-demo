import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import PrivacyStatusCard from './components/PrivacyStatusCard';
import PrivacyMatrix from './components/PrivacyMatrix';
import EncryptionSettings from './components/EncryptionSettings';
import DataVisualization from './components/DataVisualization';
import ExplainableAI from './components/ExplainableAI';
import DataExport from './components/DataExport';
import EmergencyControls from './components/EmergencyControls';

const PrivacyControlsDataManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [privacyStatus, setPrivacyStatus] = useState({
    webcamAccess: true,
    voiceRecording: false,
    biometricAnalysis: true,
    socialSharing: false,
    academicIntegration: true,
    cloudProcessing: false
  });

  const [globalPrivacyMode, setGlobalPrivacyMode] = useState('standard');
  const [lastDataSync, setLastDataSync] = useState('2025-08-19 23:15:32');

  const tabs = [
    { id: 'overview', label: 'Privacy Overview', icon: 'Shield' },
    { id: 'matrix', label: 'Permission Matrix', icon: 'Grid3X3' },
    { id: 'encryption', label: 'Encryption Settings', icon: 'Lock' },
    { id: 'visualization', label: 'Data Insights', icon: 'BarChart3' },
    { id: 'ai-transparency', label: 'AI Transparency', icon: 'Brain' },
    { id: 'export', label: 'Data Export', icon: 'Download' },
    { id: 'emergency', label: 'Emergency Controls', icon: 'AlertTriangle' }
  ];

  const privacyCards = [
    {
      title: 'Webcam Access',
      description: 'Real-time facial expression analysis for emotion detection',
      status: 'Active',
      icon: 'Camera',
      isActive: privacyStatus?.webcamAccess,
      riskLevel: 'medium',
      dataPoints: 15847,
      lastUpdated: '2 minutes ago'
    },
    {
      title: 'Voice Recording',
      description: 'Voice prosody analysis for enhanced emotion recognition',
      status: 'Disabled',
      icon: 'Mic',
      isActive: privacyStatus?.voiceRecording,
      riskLevel: 'high',
      dataPoints: 0,
      lastUpdated: 'Never'
    },
    {
      title: 'Biometric Analysis',
      description: 'Heart rate and stress level monitoring via camera PPG',
      status: 'Active',
      icon: 'Activity',
      isActive: privacyStatus?.biometricAnalysis,
      riskLevel: 'low',
      dataPoints: 12356,
      lastUpdated: '1 minute ago'
    },
    {
      title: 'Social Sharing',
      description: 'Anonymous mood synchronization with peers and study groups',
      status: 'Disabled',
      icon: 'Users',
      isActive: privacyStatus?.socialSharing,
      riskLevel: 'medium',
      dataPoints: 0,
      lastUpdated: 'Disabled by user'
    },
    {
      title: 'Academic Integration',
      description: 'Calendar and assignment correlation for stress prediction',
      status: 'Active',
      icon: 'GraduationCap',
      isActive: privacyStatus?.academicIntegration,
      riskLevel: 'low',
      dataPoints: 1892,
      lastUpdated: '5 minutes ago'
    },
    {
      title: 'Cloud Processing',
      description: 'Advanced AI features requiring encrypted cloud computation',
      status: 'Disabled',
      icon: 'Cloud',
      isActive: privacyStatus?.cloudProcessing,
      riskLevel: 'high',
      dataPoints: 0,
      lastUpdated: 'Local processing only'
    }
  ];

  const togglePrivacySetting = (settingKey) => {
    setPrivacyStatus(prev => ({
      ...prev,
      [settingKey]: !prev?.[settingKey]
    }));
  };

  const getPrivacyModeColor = (mode) => {
    const colors = {
      minimal: 'text-success',
      standard: 'text-primary',
      enhanced: 'text-warning'
    };
    return colors?.[mode] || colors?.standard;
  };

  const getActiveDataSources = () => {
    return Object.values(privacyStatus)?.filter(Boolean)?.length;
  };

  const getTotalDataPoints = () => {
    return privacyCards?.reduce((total, card) => total + (card?.isActive ? card?.dataPoints : 0), 0);
  };

  useEffect(() => {
    // Simulate real-time data sync updates
    const interval = setInterval(() => {
      setLastDataSync(new Date()?.toLocaleString());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Global Privacy Status */}
            <div className="neomorphic p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Global Privacy Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive overview of your data collection and processing settings
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getPrivacyModeColor(globalPrivacyMode)}`}>
                    {globalPrivacyMode?.charAt(0)?.toUpperCase() + globalPrivacyMode?.slice(1)} Mode
                  </div>
                  <div className="text-xs text-muted-foreground">Last sync: {lastDataSync}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">{getActiveDataSources()}</div>
                  <div className="text-xs text-muted-foreground">Active Sources</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-success mb-1">89%</div>
                  <div className="text-xs text-muted-foreground">Local Processing</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-warning mb-1">{getTotalDataPoints()?.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Data Points</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">24h</div>
                  <div className="text-xs text-muted-foreground">Retention</div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  Quick Privacy Scan
                </Button>
                <Button variant="default" className="flex-1">
                  Update Settings
                </Button>
              </div>
            </div>
            {/* Privacy Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {privacyCards?.map((card, index) => (
                <PrivacyStatusCard
                  key={index}
                  title={card?.title}
                  description={card?.description}
                  status={card?.status}
                  icon={card?.icon}
                  onToggle={() => togglePrivacySetting(Object.keys(privacyStatus)?.[index])}
                  isActive={card?.isActive}
                  riskLevel={card?.riskLevel}
                  dataPoints={card?.dataPoints}
                  lastUpdated={card?.lastUpdated}
                />
              ))}
            </div>
          </div>
        );
      case 'matrix':
        return <PrivacyMatrix />;
      case 'encryption':
        return <EncryptionSettings />;
      case 'visualization':
        return <DataVisualization />;
      case 'ai-transparency':
        return <ExplainableAI />;
      case 'export':
        return <DataExport />;
      case 'emergency':
        return <EmergencyControls />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Controls & Data Management - Moodify</title>
        <meta name="description" content="Comprehensive privacy center with granular control over biometric data and AI processing preferences for CS students" />
      </Helmet>
      <Header />
      <div className="pt-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-primary/10 neomorphic">
                <Icon name="Shield" size={32} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Privacy Controls & Data Management</h1>
                <p className="text-lg text-muted-foreground">
                  Granular control over your biometric data and AI processing preferences
                </p>
              </div>
            </div>

            {/* Privacy Status Indicator */}
            <div className="flex items-center space-x-4 p-4 bg-success/10 border border-success/20 rounded-lg">
              <Icon name="ShieldCheck" size={20} color="var(--color-success)" />
              <div className="flex-1">
                <div className="text-sm font-medium text-success">Privacy Protection Active</div>
                <div className="text-xs text-success/80">
                  Homomorphic encryption enabled • 89% local processing • Differential privacy active
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Audit Log
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                      ${activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {renderTabContent()}
          </div>

          {/* Footer Information */}
          <div className="mt-12 p-6 bg-muted/30 rounded-xl border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <Icon name="Lock" size={20} color="var(--color-primary)" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">End-to-End Encryption</h4>
                  <p className="text-xs text-muted-foreground">
                    All sensitive data is encrypted using AES-256 with perfect forward secrecy
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Smartphone" size={20} color="var(--color-success)" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Local Processing</h4>
                  <p className="text-xs text-muted-foreground">
                    89% of AI processing occurs locally on your device via WebAssembly
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Trash2" size={20} color="var(--color-warning)" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Automatic Deletion</h4>
                  <p className="text-xs text-muted-foreground">
                    Data is automatically deleted according to your retention preferences
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">
                Moodify is committed to protecting your privacy. All data processing complies with GDPR, CCPA, and FERPA regulations. 
                <br />
                For questions about data handling, contact our privacy team at privacy@moodify.ai
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControlsDataManagement;
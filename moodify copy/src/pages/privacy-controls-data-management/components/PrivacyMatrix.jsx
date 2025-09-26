import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyMatrix = () => {
  const [matrixSettings, setMatrixSettings] = useState({
    emotionDetection: {
      webcamAccess: true,
      voiceAnalysis: false,
      facialRecognition: true,
      biometricData: false
    },
    contentGeneration: {
      personalizedMemes: true,
      voiceSynthesis: false,
      behaviorAnalysis: true,
      socialData: false
    },
    peerComparison: {
      anonymousSharing: true,
      moodSynchronization: false,
      academicData: true,
      socialNetworking: false
    },
    academicIntegration: {
      codeAnalysis: true,
      performanceTracking: false,
      calendarAccess: true,
      gradeCorrelation: false
    }
  });

  const features = [
    {
      key: 'emotionDetection',
      title: 'Emotion Detection',
      icon: 'Brain',
      description: 'Real-time mood analysis and prediction'
    },
    {
      key: 'contentGeneration', 
      title: 'Content Generation',
      icon: 'Sparkles',
      description: 'AI-powered personalized content creation'
    },
    {
      key: 'peerComparison',
      title: 'Peer Comparison', 
      icon: 'Users',
      description: 'Social mood synchronization and insights'
    },
    {
      key: 'academicIntegration',
      title: 'Academic Integration',
      icon: 'GraduationCap', 
      description: 'Code emotion analysis and performance tracking'
    }
  ];

  const dataTypes = [
    { key: 'webcamAccess', label: 'Webcam Access', icon: 'Camera' },
    { key: 'voiceAnalysis', label: 'Voice Analysis', icon: 'Mic' },
    { key: 'facialRecognition', label: 'Facial Recognition', icon: 'Scan' },
    { key: 'biometricData', label: 'Biometric Data', icon: 'Activity' },
    { key: 'personalizedMemes', label: 'Personalized Memes', icon: 'Image' },
    { key: 'voiceSynthesis', label: 'Voice Synthesis', icon: 'Volume2' },
    { key: 'behaviorAnalysis', label: 'Behavior Analysis', icon: 'TrendingUp' },
    { key: 'socialData', label: 'Social Data', icon: 'Share2' },
    { key: 'anonymousSharing', label: 'Anonymous Sharing', icon: 'UserX' },
    { key: 'moodSynchronization', label: 'Mood Sync', icon: 'RefreshCw' },
    { key: 'academicData', label: 'Academic Data', icon: 'BookOpen' },
    { key: 'socialNetworking', label: 'Social Networking', icon: 'Network' },
    { key: 'codeAnalysis', label: 'Code Analysis', icon: 'Code' },
    { key: 'performanceTracking', label: 'Performance Tracking', icon: 'BarChart3' },
    { key: 'calendarAccess', label: 'Calendar Access', icon: 'Calendar' },
    { key: 'gradeCorrelation', label: 'Grade Correlation', icon: 'Award' }
  ];

  const toggleSetting = (feature, dataType) => {
    setMatrixSettings(prev => ({
      ...prev,
      [feature]: {
        ...prev?.[feature],
        [dataType]: !prev?.[feature]?.[dataType]
      }
    }));
  };

  const getFeatureDataTypes = (featureKey) => {
    return Object.keys(matrixSettings?.[featureKey]);
  };

  return (
    <div className="neomorphic p-6 rounded-xl bg-card border border-border">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Privacy Matrix</h3>
        <p className="text-sm text-muted-foreground">
          Customize data usage permissions for each feature. Toggle individual data types to control what information each feature can access.
        </p>
      </div>
      <div className="space-y-6">
        {features?.map((feature) => (
          <div key={feature?.key} className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{feature?.title}</h4>
                <p className="text-xs text-muted-foreground">{feature?.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {getFeatureDataTypes(feature?.key)?.map((dataTypeKey) => {
                const dataType = dataTypes?.find(dt => dt?.key === dataTypeKey);
                const isEnabled = matrixSettings?.[feature?.key]?.[dataTypeKey];
                
                return (
                  <button
                    key={dataTypeKey}
                    onClick={() => toggleSetting(feature?.key, dataTypeKey)}
                    className={`
                      p-3 rounded-lg border transition-all duration-200 text-left
                      ${isEnabled 
                        ? 'bg-success/10 border-success/30 text-success' :'bg-background border-border text-muted-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon 
                        name={dataType?.icon || 'Settings'} 
                        size={16} 
                        color={isEnabled ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
                      />
                      <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-success' : 'bg-muted-foreground'}`} />
                    </div>
                    <div className="text-xs font-medium">
                      {dataType?.label || dataTypeKey}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
          <div className="text-xs text-warning">
            <strong>Privacy Notice:</strong> Disabling certain data types may reduce feature effectiveness. 
            All processing occurs locally via WebAssembly when possible.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyMatrix;
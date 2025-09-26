import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyControls = () => {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const emergencyActions = [
    {
      id: 'pause-all',
      title: 'Pause All Data Collection',
      description: 'Immediately stop all biometric data collection and AI processing',
      icon: 'Pause',
      severity: 'medium',
      action: 'Instant',
      reversible: true
    },
    {
      id: 'disable-sharing',
      title: 'Disable Social Sharing',
      description: 'Stop all peer mood synchronization and social data sharing',
      icon: 'UserX',
      severity: 'low',
      action: 'Instant',
      reversible: true
    },
    {
      id: 'local-only',
      title: 'Local Processing Only',
      description: 'Force all AI processing to occur locally, disable cloud features',
      icon: 'Smartphone',
      severity: 'medium',
      action: 'Instant',
      reversible: true
    },
    {
      id: 'delete-recent',
      title: 'Delete Recent Data (24h)',
      description: 'Permanently delete all data collected in the last 24 hours',
      icon: 'Trash2',
      severity: 'high',
      action: '< 5 minutes',
      reversible: false
    },
    {
      id: 'delete-all',
      title: 'Complete Data Deletion',
      description: 'Permanently delete ALL collected biometric and emotional data',
      icon: 'AlertTriangle',
      severity: 'critical',
      action: '< 15 minutes',
      reversible: false
    }
  ];

  const privacyModes = [
    {
      id: 'standard',
      name: 'Standard Mode',
      description: 'Normal operation with full feature access',
      features: ['Real-time emotion detection', 'Biometric analysis', 'Social features', 'Cloud processing'],
      icon: 'Settings'
    },
    {
      id: 'enhanced',
      name: 'Enhanced Privacy',
      description: 'Reduced data collection with core features maintained',
      features: ['Basic emotion detection', 'Local processing only', 'No social sharing', 'Limited history'],
      icon: 'Shield'
    },
    {
      id: 'minimal',
      name: 'Minimal Data Mode',
      description: 'Essential features only with maximum privacy',
      features: ['Manual mood logging', 'No biometric collection', 'Offline operation', 'No data retention'],
      icon: 'ShieldCheck'
    },
    {
      id: 'emergency',
      name: 'Emergency Privacy',
      description: 'Complete data collection pause with immediate deletion options',
      features: ['All collection stopped', 'Immediate deletion available', 'Audit trail maintained', 'Quick restore'],
      icon: 'AlertOctagon'
    }
  ];

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'text-success border-success/30 bg-success/10',
      medium: 'text-warning border-warning/30 bg-warning/10',
      high: 'text-error border-error/30 bg-error/10',
      critical: 'text-error border-error/50 bg-error/20'
    };
    return colors?.[severity] || colors?.low;
  };

  const handleEmergencyAction = (actionId) => {
    if (actionId === 'delete-all') {
      setShowDeleteConfirmation(true);
      return;
    }
    
    // Handle other emergency actions
    console.log(`Executing emergency action: ${actionId}`);
  };

  const handleCompleteDataDeletion = async () => {
    if (deleteConfirmationText !== 'DELETE ALL MY DATA') {
      return;
    }
    
    setIsDeleting(true);
    // Simulate deletion process
    await new Promise(resolve => setTimeout(resolve, 5000));
    setIsDeleting(false);
    setShowDeleteConfirmation(false);
    setDeleteConfirmationText('');
    
    alert('All data has been permanently deleted. This action cannot be undone.');
  };

  const toggleEmergencyMode = () => {
    setEmergencyMode(!emergencyMode);
  };

  return (
    <div className="space-y-6">
      {/* Emergency Mode Toggle */}
      <div className="neomorphic p-6 rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${emergencyMode ? 'bg-error/20' : 'bg-muted'}`}>
              <Icon 
                name="AlertOctagon" 
                size={24} 
                color={emergencyMode ? 'var(--color-error)' : 'var(--color-muted-foreground)'} 
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Emergency Privacy Mode</h3>
              <p className="text-sm text-muted-foreground">
                Instant privacy controls for urgent situations
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleEmergencyMode}
            className={`
              relative w-16 h-8 rounded-full transition-colors duration-200
              ${emergencyMode ? 'bg-error' : 'bg-muted-foreground'}
            `}
          >
            <div className={`
              absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 flex items-center justify-center
              ${emergencyMode ? 'translate-x-8' : 'translate-x-1'}
            `}>
              <Icon 
                name={emergencyMode ? 'AlertTriangle' : 'Shield'} 
                size={12} 
                color={emergencyMode ? 'var(--color-error)' : 'var(--color-muted-foreground)'}
              />
            </div>
          </button>
        </div>

        {emergencyMode && (
          <div className="p-4 bg-error/10 border border-error/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
              <div className="text-sm text-error">
                <strong>Emergency Mode Active:</strong> All non-essential data collection has been paused. 
                You can now perform immediate privacy actions below.
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Privacy Mode Selection */}
      <div className="neomorphic p-6 rounded-xl bg-card border border-border">
        <h4 className="text-lg font-medium text-foreground mb-4">Privacy Mode Selection</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {privacyModes?.map((mode) => (
            <button
              key={mode?.id}
              className={`
                p-4 rounded-lg border text-left transition-all duration-200
                ${mode?.id === 'emergency' && !emergencyMode ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}
                ${mode?.id === 'standard' ? 'bg-primary/10 border-primary/30' : 'bg-background border-border'}
              `}
              disabled={mode?.id === 'emergency' && !emergencyMode}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${mode?.id === 'standard' ? 'bg-primary/20' : 'bg-muted'}`}>
                  <Icon 
                    name={mode?.icon} 
                    size={20} 
                    color={mode?.id === 'standard' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                  />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-1">{mode?.name}</h5>
                  <p className="text-xs text-muted-foreground mb-3">{mode?.description}</p>
                  <div className="space-y-1">
                    {mode?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Emergency Actions */}
      <div className="neomorphic p-6 rounded-xl bg-card border border-border">
        <h4 className="text-lg font-medium text-foreground mb-4">Emergency Actions</h4>
        <div className="space-y-4">
          {emergencyActions?.map((action) => (
            <div
              key={action?.id}
              className={`p-4 rounded-lg border ${getSeverityColor(action?.severity)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={action?.icon} size={20} />
                  <div>
                    <h5 className="font-medium">{action?.title}</h5>
                    <p className="text-xs opacity-80">{action?.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right text-xs">
                    <div className="font-medium">{action?.action}</div>
                    <div className="opacity-70">
                      {action?.reversible ? 'Reversible' : 'Permanent'}
                    </div>
                  </div>
                  
                  <Button
                    variant={action?.severity === 'critical' ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => handleEmergencyAction(action?.id)}
                    disabled={!emergencyMode && action?.severity !== 'low'}
                  >
                    Execute
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!emergencyMode && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} color="var(--color-warning)" />
              <div className="text-xs text-warning">
                <strong>Note:</strong> Most emergency actions require Emergency Privacy Mode to be enabled. 
                Toggle the switch above to access all emergency controls.
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Complete Data Deletion Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4 neomorphic">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-error/20">
                <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Complete Data Deletion</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-error/10 border border-error/30 rounded-lg">
                <div className="text-sm text-error space-y-2">
                  <p><strong>This will permanently delete:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>All emotion detection data and predictions</li>
                    <li>Complete biometric measurement history</li>
                    <li>Voice analysis patterns and recordings</li>
                    <li>Code emotion analysis and productivity metrics</li>
                    <li>Social interaction data and peer connections</li>
                    <li>Academic integration data and correlations</li>
                    <li>All AI model personalizations</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Type "DELETE ALL MY DATA" to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmationText}
                  onChange={(e) => setDeleteConfirmationText(e?.target?.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-error"
                  placeholder="DELETE ALL MY DATA"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteConfirmation(false);
                    setDeleteConfirmationText('');
                  }}
                  className="flex-1"
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCompleteDataDeletion}
                  disabled={deleteConfirmationText !== 'DELETE ALL MY DATA' || isDeleting}
                  loading={isDeleting}
                  className="flex-1"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Forever'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyControls;
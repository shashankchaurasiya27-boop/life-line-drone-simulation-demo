import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EncryptionSettings = () => {
  const [encryptionLevel, setEncryptionLevel] = useState('standard');
  const [homomorphicEnabled, setHomomorphicEnabled] = useState(true);
  const [federatedLearning, setFederatedLearning] = useState(false);
  const [privacyBudget, setPrivacyBudget] = useState(0.5);

  const encryptionLevels = [
    {
      key: 'basic',
      title: 'Basic Encryption',
      description: 'Standard AES-256 encryption for data at rest',
      performance: 'High Performance',
      privacy: 'Standard Privacy',
      icon: 'Shield'
    },
    {
      key: 'standard',
      title: 'Advanced Encryption',
      description: 'End-to-end encryption with perfect forward secrecy',
      performance: 'Good Performance', 
      privacy: 'High Privacy',
      icon: 'ShieldCheck'
    },
    {
      key: 'maximum',
      title: 'Maximum Security',
      description: 'Homomorphic encryption with zero-knowledge proofs',
      performance: 'Reduced Performance',
      privacy: 'Maximum Privacy',
      icon: 'Lock'
    }
  ];

  const getPerformanceColor = (level) => {
    const colors = {
      'High Performance': 'text-success',
      'Good Performance': 'text-warning',
      'Reduced Performance': 'text-error'
    };
    return colors?.[level] || 'text-muted-foreground';
  };

  const handlePrivacyBudgetChange = (e) => {
    setPrivacyBudget(parseFloat(e?.target?.value));
  };

  return (
    <div className="neomorphic p-6 rounded-xl bg-card border border-border">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Encryption & Privacy Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure advanced privacy-preserving computation methods and encryption levels for your biometric data.
        </p>
      </div>
      {/* Encryption Level Selection */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-foreground mb-4">Encryption Level</h4>
        <div className="grid gap-4">
          {encryptionLevels?.map((level) => (
            <button
              key={level?.key}
              onClick={() => setEncryptionLevel(level?.key)}
              className={`
                p-4 rounded-lg border text-left transition-all duration-200
                ${encryptionLevel === level?.key
                  ? 'bg-primary/10 border-primary/30 text-primary' :'bg-background border-border hover:bg-muted'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${encryptionLevel === level?.key ? 'bg-primary/20' : 'bg-muted'}`}>
                  <Icon 
                    name={level?.icon} 
                    size={20} 
                    color={encryptionLevel === level?.key ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium">{level?.title}</h5>
                    <div className="flex items-center space-x-4">
                      <span className={`text-xs font-medium ${getPerformanceColor(level?.performance)}`}>
                        {level?.performance}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        {level?.privacy}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{level?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Homomorphic Encryption */}
      <div className="mb-8 p-4 border border-border rounded-lg bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Icon name="Calculator" size={20} color="var(--color-primary)" />
            <div>
              <h4 className="font-medium text-foreground">Homomorphic Encryption</h4>
              <p className="text-xs text-muted-foreground">Compute on encrypted data without decryption</p>
            </div>
          </div>
          <button
            onClick={() => setHomomorphicEnabled(!homomorphicEnabled)}
            className={`
              relative w-12 h-6 rounded-full transition-colors duration-200
              ${homomorphicEnabled ? 'bg-success' : 'bg-muted-foreground'}
            `}
          >
            <div className={`
              absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200
              ${homomorphicEnabled ? 'translate-x-6' : 'translate-x-0.5'}
            `} />
          </button>
        </div>
        {homomorphicEnabled && (
          <div className="text-xs text-success bg-success/10 p-2 rounded border border-success/20">
            ✓ Mathematical guarantees: Your data remains encrypted during AI processing
          </div>
        )}
      </div>
      {/* Federated Learning */}
      <div className="mb-8 p-4 border border-border rounded-lg bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Icon name="Network" size={20} color="var(--color-secondary)" />
            <div>
              <h4 className="font-medium text-foreground">Federated Learning</h4>
              <p className="text-xs text-muted-foreground">Contribute to AI improvements without sharing raw data</p>
            </div>
          </div>
          <button
            onClick={() => setFederatedLearning(!federatedLearning)}
            className={`
              relative w-12 h-6 rounded-full transition-colors duration-200
              ${federatedLearning ? 'bg-secondary' : 'bg-muted-foreground'}
            `}
          >
            <div className={`
              absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200
              ${federatedLearning ? 'translate-x-6' : 'translate-x-0.5'}
            `} />
          </button>
        </div>
        {federatedLearning && (
          <div className="text-xs text-secondary bg-secondary/10 p-2 rounded border border-secondary/20">
            ✓ Only model updates are shared, never your personal data
          </div>
        )}
      </div>
      {/* Differential Privacy */}
      <div className="mb-6 p-4 border border-border rounded-lg bg-muted/30">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Shuffle" size={20} color="var(--color-accent)" />
          <div>
            <h4 className="font-medium text-foreground">Differential Privacy</h4>
            <p className="text-xs text-muted-foreground">Mathematical noise injection for anonymization</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Privacy Budget (ε)</span>
            <span className="text-sm font-mono text-foreground">{privacyBudget?.toFixed(2)}</span>
          </div>
          
          <input
            type="range"
            min="0.1"
            max="2.0"
            step="0.1"
            value={privacyBudget}
            onChange={handlePrivacyBudgetChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>High Privacy</span>
            <span>Balanced</span>
            <span>High Utility</span>
          </div>
          
          <div className={`text-xs p-2 rounded border ${
            privacyBudget <= 0.5 
              ? 'text-success bg-success/10 border-success/20' 
              : privacyBudget <= 1.0
              ? 'text-warning bg-warning/10 border-warning/20' :'text-error bg-error/10 border-error/20'
          }`}>
            {privacyBudget <= 0.5 && '✓ Strong privacy guarantees with mathematical proof'}
            {privacyBudget > 0.5 && privacyBudget <= 1.0 && '⚠ Moderate privacy with good utility'}
            {privacyBudget > 1.0 && '⚠ Reduced privacy for maximum feature accuracy'}
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline" className="flex-1">
          Reset to Defaults
        </Button>
        <Button variant="default" className="flex-1">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default EncryptionSettings;
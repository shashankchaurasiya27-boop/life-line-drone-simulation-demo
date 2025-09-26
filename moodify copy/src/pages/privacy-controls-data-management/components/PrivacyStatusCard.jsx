import React from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyStatusCard = ({ 
  title, 
  description, 
  status, 
  icon, 
  onToggle, 
  isActive,
  riskLevel = 'low',
  dataPoints = 0,
  lastUpdated 
}) => {
  const getRiskColor = (level) => {
    const colors = {
      low: 'text-success',
      medium: 'text-warning', 
      high: 'text-error'
    };
    return colors?.[level] || colors?.low;
  };

  const getStatusColor = (active) => {
    return active ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground';
  };

  return (
    <div className="neomorphic p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${isActive ? 'bg-primary/10' : 'bg-muted'}`}>
            <Icon 
              name={icon} 
              size={24} 
              color={isActive ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <div 
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(isActive)}`}
          >
            {isActive ? 'Active' : 'Disabled'}
          </div>
          <div className={`text-xs font-medium ${getRiskColor(riskLevel)}`}>
            {riskLevel?.toUpperCase()} RISK
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Data Points Collected</span>
          <span className="text-sm font-medium text-foreground font-mono">{dataPoints?.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last Updated</span>
          <span className="text-xs text-muted-foreground font-mono">{lastUpdated}</span>
        </div>

        <div className="pt-3 border-t border-border">
          <button
            onClick={onToggle}
            className={`
              w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive 
                ? 'bg-error/10 text-error hover:bg-error/20' :'bg-success/10 text-success hover:bg-success/20'
              }
            `}
          >
            {isActive ? 'Disable Collection' : 'Enable Collection'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyStatusCard;
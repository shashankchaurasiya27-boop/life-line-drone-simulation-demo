import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VitalSignsCard = ({ title, value, unit, trend, icon, color, description, isActive = true }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, isActive]);

  const getTrendIcon = () => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className={`neomorphic p-6 rounded-xl transition-all duration-500 ${isActive ? 'emotion-focus' : 'opacity-60'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon name={icon} size={24} color={color} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          <Icon name={getTrendIcon()} size={16} />
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span 
          className="text-3xl font-heading font-bold transition-all duration-1000"
          style={{ color }}
        >
          {isActive ? (typeof animatedValue === 'number' ? animatedValue.toFixed(3) : animatedValue) : '--'}
        </span>
        <span className="text-lg text-muted-foreground font-medium">{unit}</span>
      </div>
      
      {isActive && (
        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ 
              backgroundColor: color,
              width: `${Math.min((animatedValue / 100) * 100, 100)}%`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VitalSignsCard;
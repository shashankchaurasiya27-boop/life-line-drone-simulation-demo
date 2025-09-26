import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [currentEmotion, setCurrentEmotion] = useState('calm');
  const [privacyStatus, setPrivacyStatus] = useState('active');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [biometricData, setBiometricData] = useState({
    heartRate: 72,
    stressLevel: 'low'
  });

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/real-time-emotion-dashboard',
      icon: 'Activity',
      tooltip: 'Real-time emotion monitoring and insights'
    },
    {
      label: 'Analytics',
      path: '/biometric-analytics-health-monitoring',
      icon: 'BarChart3',
      tooltip: 'Comprehensive biometric analysis and health trends'
    },
    {
      label: 'Create',
      path: '/ai-powered-content-generation-hub',
      icon: 'Sparkles',
      tooltip: 'AI-powered content generation for mood enhancement'
    },
    {
      label: 'Code Editor',
      path: '/code-editor',
      icon: 'Code',
      tooltip: 'Multi-language code editor with compilation support'
    },
    {
      label: 'Study Assistant',
      path: '/ai-powered-study-assistant',
      icon: 'BookOpen',
      tooltip: 'AI-powered personalized learning support'
    },
    {
      label: 'Academic',
      path: '/academic-integration-code-emotion-analysis',
      icon: 'GraduationCap',
      tooltip: 'Code emotion analysis and academic integration'
    },
    {
      label: 'Social',
      path: '/social-mood-synchronization-campus-insights',
      icon: 'Users',
      tooltip: 'Campus mood synchronization and peer insights'
    }
  ];

  const secondaryItems = [
    {
      label: 'Privacy',
      path: '/privacy-controls-data-management',
      icon: 'Shield',
      tooltip: 'Data management and privacy controls'
    }
  ];

  useEffect(() => {
    // Simulate real-time emotion detection
    const emotionInterval = setInterval(() => {
      const emotions = ['calm', 'focus', 'energy', 'stress'];
      const randomEmotion = emotions?.[Math.floor(Math.random() * emotions?.length)];
      setCurrentEmotion(randomEmotion);
      
      // Update biometric data based on emotion
      const heartRates = { calm: 68, focus: 75, energy: 85, stress: 95 };
      const stressLevels = { calm: 'low', focus: 'low', energy: 'medium', stress: 'high' };
      
      setBiometricData({
        heartRate: heartRates?.[randomEmotion] + Math.floor(Math.random() * 10) - 5,
        stressLevel: stressLevels?.[randomEmotion]
      });
    }, 5000);

    return () => clearInterval(emotionInterval);
  }, []);

  const getEmotionColor = (emotion) => {
    const colors = {
      calm: 'var(--color-biometric-calm)',
      focus: 'var(--color-biometric-focus)',
      energy: 'var(--color-biometric-energy)',
      stress: 'var(--color-biometric-stress)'
    };
    return colors?.[emotion] || colors?.calm;
  };

  const getEmotionIcon = (emotion) => {
    const icons = {
      calm: 'Waves',
      focus: 'Target',
      energy: 'Zap',
      stress: 'AlertTriangle'
    };
    return icons?.[emotion] || icons?.calm;
  };

  const togglePrivacy = () => {
    setPrivacyStatus(prev => prev === 'active' ? 'paused' : 'active');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/real-time-emotion-dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Brain" size={20} color="white" />
            </div>
            <div 
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-biometric-pulse"
              style={{ backgroundColor: getEmotionColor(currentEmotion) }}
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-heading font-semibold text-foreground">Moodify</h1>
            <p className="text-xs text-muted-foreground font-caption">Emotional AI Platform</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              title={item?.tooltip}
            >
              <div className="flex items-center space-x-2">
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </div>
              {isActivePath(item?.path) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          {/* Emotion Status Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-muted/50 neomorphic">
            <Icon 
              name={getEmotionIcon(currentEmotion)} 
              size={16} 
              color={getEmotionColor(currentEmotion)}
              className="animate-biometric-pulse"
            />
            <div className="text-xs">
              <div className="font-medium text-foreground capitalize">{currentEmotion}</div>
              <div className="text-muted-foreground font-mono">{biometricData?.heartRate} BPM</div>
            </div>
          </div>

          {/* Privacy Status Badge */}
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePrivacy}
            className={`
              relative px-3 py-1.5 rounded-lg transition-all duration-300
              ${privacyStatus === 'active' ?'text-success hover:bg-success/10' :'text-warning hover:bg-warning/10'
              }
            `}
            title={`Privacy: ${privacyStatus === 'active' ? 'Active' : 'Paused'}`}
          >
            <Icon 
              name={privacyStatus === 'active' ? 'Shield' : 'ShieldOff'} 
              size={16} 
            />
            <span className="hidden sm:inline ml-1 text-xs font-medium">
              {privacyStatus === 'active' ? 'Protected' : 'Paused'}
            </span>
            <div 
              className={`
                absolute -top-1 -right-1 w-2 h-2 rounded-full
                ${privacyStatus === 'active' ? 'bg-success' : 'bg-warning'}
              `}
            />
          </Button>

          {/* Secondary Navigation Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-2 py-1.5"
            >
              <Icon name="MoreHorizontal" size={16} />
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50 neomorphic">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        flex items-center space-x-2 px-4 py-2 text-sm transition-colors
                        ${isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }
                      `}
                      title={item?.tooltip}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden px-2 py-1.5"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={18} />
                <div>
                  <div>{item?.label}</div>
                  <div className="text-xs opacity-70">{item?.tooltip}</div>
                </div>
              </Link>
            ))}
            
            <div className="border-t border-border pt-2 mt-2">
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={18} />
                  <div>
                    <div>{item?.label}</div>
                    <div className="text-xs opacity-70">{item?.tooltip}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Emotion Status */}
            <div className="flex items-center justify-between px-4 py-3 mt-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getEmotionIcon(currentEmotion)} 
                  size={18} 
                  color={getEmotionColor(currentEmotion)}
                  className="animate-biometric-pulse"
                />
                <div>
                  <div className="text-sm font-medium capitalize">{currentEmotion}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {biometricData?.heartRate} BPM • {biometricData?.stressLevel} stress
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
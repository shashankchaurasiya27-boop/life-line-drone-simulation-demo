import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeEditorPanel = () => {
  const [currentEmotion, setCurrentEmotion] = useState('focus');
  const [frustrationLevel, setFrustrationLevel] = useState(25);
  const [cognitiveLoad, setCognitiveLoad] = useState(60);
  const [codeContent, setCodeContent] = useState(`// Binary Search Implementation
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Test the function
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(numbers, 7)); // Output: 3`);

  const [emotionOverlays, setEmotionOverlays] = useState([
    { line: 8, type: 'breakthrough', message: 'Great logic flow!' },
    { line: 15, type: 'confusion', message: 'Consider edge cases' },
    { line: 20, type: 'confidence', message: 'Clean implementation' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const emotions = ['calm', 'focus', 'energy', 'stress'];
      setCurrentEmotion(emotions?.[Math.floor(Math.random() * emotions?.length)]);
      setFrustrationLevel(Math.floor(Math.random() * 100));
      setCognitiveLoad(Math.floor(Math.random() * 100));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getEmotionColor = (emotion) => {
    const colors = {
      calm: 'var(--color-biometric-calm)',
      focus: 'var(--color-biometric-focus)', 
      energy: 'var(--color-biometric-energy)',
      stress: 'var(--color-biometric-stress)'
    };
    return colors?.[emotion] || colors?.focus;
  };

  const getOverlayIcon = (type) => {
    const icons = {
      breakthrough: 'Lightbulb',
      confusion: 'AlertCircle',
      confidence: 'CheckCircle'
    };
    return icons?.[type] || 'Info';
  };

  const getOverlayColor = (type) => {
    const colors = {
      breakthrough: 'var(--color-success)',
      confusion: 'var(--color-warning)',
      confidence: 'var(--color-biometric-focus)'
    };
    return colors?.[type] || 'var(--color-muted-foreground)';
  };

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg neomorphic">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Code" size={20} color="var(--color-primary)" />
          <div>
            <h3 className="font-heading font-semibold text-foreground">Code Editor</h3>
            <p className="text-xs text-muted-foreground">algorithm-practice.js</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Real-time Emotion Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-muted/50">
            <div 
              className="w-2 h-2 rounded-full animate-biometric-pulse"
              style={{ backgroundColor: getEmotionColor(currentEmotion) }}
            />
            <span className="text-xs font-medium capitalize">{currentEmotion}</span>
          </div>
          
          <Button variant="ghost" size="sm">
            <Icon name="Play" size={16} />
            <span className="ml-1">Run</span>
          </Button>
        </div>
      </div>
      {/* Emotion Metrics Bar */}
      <div className="flex items-center justify-between p-3 bg-muted/30 border-b border-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Brain" size={16} color="var(--color-biometric-stress)" />
            <span className="text-xs text-muted-foreground">Frustration</span>
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-success to-error transition-all duration-500"
                style={{ width: `${frustrationLevel}%` }}
              />
            </div>
            <span className="text-xs font-mono">{frustrationLevel}%</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} color="var(--color-biometric-energy)" />
            <span className="text-xs text-muted-foreground">Cognitive Load</span>
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-biometric-calm to-biometric-energy transition-all duration-500"
                style={{ width: `${cognitiveLoad}%` }}
              />
            </div>
            <span className="text-xs font-mono">{cognitiveLoad}%</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>Session: 1h 23m</span>
        </div>
      </div>
      {/* Code Editor Area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 p-4">
          <div className="relative h-full">
            {/* Line Numbers */}
            <div className="absolute left-0 top-0 w-12 h-full bg-muted/20 border-r border-border flex flex-col text-xs text-muted-foreground font-mono">
              {codeContent?.split('\n')?.map((_, index) => (
                <div key={index} className="h-6 flex items-center justify-end pr-2">
                  {index + 1}
                </div>
              ))}
            </div>
            
            {/* Code Content */}
            <div className="ml-12 h-full">
              <textarea
                value={codeContent}
                onChange={(e) => setCodeContent(e?.target?.value)}
                className="w-full h-full p-4 bg-transparent text-sm font-mono text-foreground resize-none outline-none leading-6"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
                spellCheck={false}
              />
              
              {/* Emotion Overlays */}
              {emotionOverlays?.map((overlay, index) => (
                <div
                  key={index}
                  className="absolute right-4 bg-popover border border-border rounded-lg px-3 py-2 shadow-lg z-10 neomorphic"
                  style={{ top: `${overlay?.line * 24 + 16}px` }}
                >
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getOverlayIcon(overlay?.type)} 
                      size={14} 
                      color={getOverlayColor(overlay?.type)}
                    />
                    <span className="text-xs text-foreground">{overlay?.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Editor Footer */}
      <div className="flex items-center justify-between p-3 border-t border-border bg-muted/20">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span>JavaScript</span>
          <span>•</span>
          <span>UTF-8</span>
          <span>•</span>
          <span>Ln 8, Col 16</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="GitBranch" size={14} />
            <span className="ml-1 text-xs">main</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Save" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPanel;
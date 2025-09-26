import React, { useState, useEffect, useRef } from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';

const VoiceControl = ({ currentPage, onVoiceCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [voiceStatus, setVoiceStatus] = useState('idle'); // idle, listening, processing, speaking
  const [availableCommands, setAvailableCommands] = useState([]);
  const [showCommands, setShowCommands] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  // Page-specific command sets
  const pageCommands = {
    'real-time-emotion-dashboard': [
      { command: 'show emotions', action: 'focus_emotion_panel', description: 'Focus on emotion analysis panel' },
      { command: 'show biometrics', action: 'focus_biometric_panel', description: 'Show biometric data' },
      { command: 'start monitoring', action: 'start_monitoring', description: 'Begin real-time monitoring' },
      { command: 'export data', action: 'export_data', description: 'Export current data' },
      { command: 'take screenshot', action: 'screenshot', description: 'Capture current view' },
      { command: 'show timeline', action: 'show_timeline', description: 'Display emotion timeline' },
      { command: 'refresh data', action: 'refresh_data', description: 'Refresh all data' }
    ],
    'biometric-analytics-health-monitoring': [
      { command: 'show heart rate', action: 'focus_heart_rate', description: 'Focus on heart rate metrics' },
      { command: 'show stress levels', action: 'focus_stress', description: 'Display stress analysis' },
      { command: 'show sleep data', action: 'focus_sleep', description: 'Show sleep patterns' },
      { command: 'generate report', action: 'generate_report', description: 'Create health report' },
      { command: 'show trends', action: 'show_trends', description: 'Display trend analysis' },
      { command: 'export health data', action: 'export_health', description: 'Export health metrics' },
      { command: 'set reminder', action: 'set_reminder', description: 'Set health reminder' }
    ],
    'ai-powered-content-generation-hub': [
      { command: 'generate content', action: 'generate_content', description: 'Start content generation' },
      { command: 'create mood playlist', action: 'create_playlist', description: 'Generate mood-based playlist' },
      { command: 'write motivational quote', action: 'write_quote', description: 'Generate inspirational quote' },
      { command: 'create study plan', action: 'create_study_plan', description: 'Generate study schedule' },
      { command: 'generate meditation', action: 'generate_meditation', description: 'Create meditation content' },
      { command: 'export content', action: 'export_content', description: 'Export generated content' },
      { command: 'share content', action: 'share_content', description: 'Share with others' }
    ],
    'code-editor': [
      { command: 'run code', action: 'run_code', description: 'Execute current code' },
      { command: 'compile code', action: 'compile_code', description: 'Compile the code' },
      { command: 'clear output', action: 'clear_output', description: 'Clear output panel' },
      { command: 'save file', action: 'save_file', description: 'Save current file' },
      { command: 'new file', action: 'new_file', description: 'Create new file' },
      { command: 'change language', action: 'change_language', description: 'Switch programming language' },
      { command: 'format code', action: 'format_code', description: 'Format current code' },
      { command: 'show errors', action: 'show_errors', description: 'Display code errors' }
    ],
    'ai-powered-study-assistant': [
      { command: 'generate study plan', action: 'generate_study_plan', description: 'Create personalized study plan' },
      { command: 'create flashcards', action: 'create_flashcards', description: 'Generate study flashcards' },
      { command: 'explain concept', action: 'explain_concept', description: 'Get concept explanation' },
      { command: 'start practice', action: 'start_practice', description: 'Begin practice problems' },
      { command: 'show progress', action: 'show_progress', description: 'Display study progress' },
      { command: 'take break', action: 'take_break', description: 'Suggest break time' },
      { command: 'change subject', action: 'change_subject', description: 'Switch study subject' },
      { command: 'show analytics', action: 'show_analytics', description: 'Display study analytics' }
    ],
    'academic-integration-code-emotion-analysis': [
      { command: 'show analysis', action: 'focus_emotion_panel', description: 'Focus on emotion analysis' },
      { command: 'start study session', action: 'start_study_session', description: 'Begin study session' },
      { command: 'show career guidance', action: 'show_career_guidance', description: 'Display career suggestions' },
      { command: 'optimize collaboration', action: 'optimize_collaboration', description: 'Show team optimization' },
      { command: 'save progress', action: 'save_progress', description: 'Save current work' },
      { command: 'export report', action: 'export_report', description: 'Export academic report' },
      { command: 'show stress levels', action: 'show_stress_levels', description: 'Display stress analysis' }
    ],
    'social-mood-synchronization-campus-insights': [
      { command: 'show mood heatmap', action: 'show_heatmap', description: 'Display campus mood map' },
      { command: 'find study groups', action: 'find_study_groups', description: 'Find compatible study groups' },
      { command: 'show peer support', action: 'show_peer_support', description: 'Display peer support options' },
      { command: 'join community', action: 'join_community', description: 'Join campus community' },
      { command: 'share mood', action: 'share_mood', description: 'Share current mood' },
      { command: 'show trends', action: 'show_social_trends', description: 'Display social trends' },
      { command: 'find friends', action: 'find_friends', description: 'Find mood-compatible friends' }
    ],
    'privacy-controls-data-management': [
      { command: 'show privacy settings', action: 'show_privacy_settings', description: 'Display privacy controls' },
      { command: 'export data', action: 'export_all_data', description: 'Export all personal data' },
      { command: 'delete data', action: 'delete_data', description: 'Delete selected data' },
      { command: 'show data usage', action: 'show_data_usage', description: 'Display data usage stats' },
      { command: 'enable encryption', action: 'enable_encryption', description: 'Enable data encryption' },
      { command: 'show permissions', action: 'show_permissions', description: 'Display app permissions' },
      { command: 'backup data', action: 'backup_data', description: 'Create data backup' }
    ]
  };

  // Global commands available on all pages
  const globalCommands = [
    { command: 'navigate to dashboard', action: 'navigate_dashboard', description: 'Go to emotion dashboard' },
    { command: 'navigate to analytics', action: 'navigate_analytics', description: 'Go to biometric analytics' },
    { command: 'navigate to study assistant', action: 'navigate_study', description: 'Go to study assistant' },
    { command: 'navigate to code editor', action: 'navigate_editor', description: 'Go to code editor' },
    { command: 'show help', action: 'show_help', description: 'Display available commands' },
    { command: 'toggle voice control', action: 'toggle_voice', description: 'Enable/disable voice control' },
    { command: 'what can you do', action: 'show_capabilities', description: 'Show voice capabilities' },
    { command: 'go back', action: 'go_back', description: 'Navigate back' },
    { command: 'refresh page', action: 'refresh_page', description: 'Reload current page' },
    { command: 'take screenshot', action: 'screenshot', description: 'Capture current view' }
  ];

  useEffect(() => {
    // Check for speech recognition support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setVoiceStatus('listening');
        setTranscript('');
      };

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal) {
          processCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setVoiceStatus('idle');
        speak('Sorry, I didn\'t catch that. Please try again.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setVoiceStatus('idle');
      };
    }

    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    // Set available commands for current page
    const pageSpecificCommands = pageCommands[currentPage] || [];
    setAvailableCommands([...globalCommands, ...pageSpecificCommands]);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentPage]);

  const processCommand = async (command) => {
    setIsProcessing(true);
    setVoiceStatus('processing');
    setLastCommand(command);

    const normalizedCommand = command.toLowerCase().trim();
    
    // Find matching command
    const allCommands = [...globalCommands, ...(pageCommands[currentPage] || [])];
    const matchedCommand = allCommands.find(cmd => 
      normalizedCommand.includes(cmd.command.toLowerCase())
    );

    if (matchedCommand) {
      // Execute the command
      await executeCommand(matchedCommand.action, matchedCommand.command);
      speak(`Executing ${matchedCommand.description}`);
    } else {
      // Try fuzzy matching
      const fuzzyMatch = findFuzzyMatch(normalizedCommand, allCommands);
      if (fuzzyMatch) {
        await executeCommand(fuzzyMatch.action, fuzzyMatch.command);
        speak(`I think you meant ${fuzzyMatch.description}. Executing now.`);
      } else {
        speak('I didn\'t understand that command. Say "show help" to see available commands.');
      }
    }

    setIsProcessing(false);
    setVoiceStatus('idle');
  };

  const findFuzzyMatch = (command, commands) => {
    const words = command.split(' ');
    return commands.find(cmd => {
      const cmdWords = cmd.command.toLowerCase().split(' ');
      return words.some(word => cmdWords.some(cmdWord => 
        cmdWord.includes(word) || word.includes(cmdWord)
      ));
    });
  };

  const executeCommand = async (action, command) => {
    // Call the parent component's command handler
    if (onVoiceCommand) {
      await onVoiceCommand(action, command);
    }

    // Handle navigation commands
    if (action.startsWith('navigate_')) {
      const pageMap = {
        'navigate_dashboard': '/real-time-emotion-dashboard',
        'navigate_analytics': '/biometric-analytics-health-monitoring',
        'navigate_study': '/ai-powered-study-assistant',
        'navigate_editor': '/code-editor',
        'navigate_academic': '/academic-integration-code-emotion-analysis',
        'navigate_social': '/social-mood-synchronization-campus-insights',
        'navigate_privacy': '/privacy-controls-data-management'
      };
      
      const path = pageMap[action];
      if (path) {
        window.location.href = path;
      }
    }

    // Handle other global commands
    switch (action) {
      case 'show_help':
        setShowCommands(true);
        break;
      case 'toggle_voice':
        if (isListening) {
          stopListening();
        } else {
          startListening();
        }
        break;
      case 'refresh_page':
        window.location.reload();
        break;
      case 'go_back':
        window.history.back();
        break;
      case 'screenshot':
        // This would require additional implementation
        speak('Screenshot feature coming soon!');
        break;
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speak = (text) => {
    if (synthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      synthesisRef.current.speak(utterance);
      setVoiceStatus('speaking');
      
      utterance.onend = () => {
        setVoiceStatus('idle');
      };
    }
  };

  const toggleVoiceControl = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const getVoiceStatusColor = () => {
    switch (voiceStatus) {
      case 'listening': return 'var(--color-error)';
      case 'processing': return 'var(--color-warning)';
      case 'speaking': return 'var(--color-primary)';
      default: return 'var(--color-success)';
    }
  };

  const getVoiceStatusIcon = () => {
    switch (voiceStatus) {
      case 'listening': return 'Mic';
      case 'processing': return 'Loader';
      case 'speaking': return 'Volume2';
      default: return 'MicOff';
    }
  };

  if (!isSupported) {
    return (
      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-center space-x-2 text-warning">
          <Icon name="AlertTriangle" size={16} />
          <span className="text-sm">Voice control not supported in this browser</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Voice Control Status */}
      <div className="flex items-center justify-between p-4 bg-card rounded-lg neomorphic">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Button
              onClick={toggleVoiceControl}
              className={`p-3 rounded-full transition-all duration-300 ${
                isListening ? 'bg-error/20 text-error' : 'bg-primary/20 text-primary'
              }`}
              disabled={isProcessing}
            >
              <Icon 
                name={getVoiceStatusIcon()} 
                size={20} 
                color={getVoiceStatusColor()}
                className={isProcessing ? 'animate-spin' : ''}
              />
            </Button>
            {isListening && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-pulse" />
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-foreground">
              Voice Control {isListening ? 'Active' : 'Ready'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isListening ? 'Listening...' : 
               isProcessing ? 'Processing...' : 
               voiceStatus === 'speaking' ? 'Speaking...' : 
               'Say "Hey Moodify" to start'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCommands(!showCommands)}
            iconName="HelpCircle"
            iconPosition="left"
          >
            Commands
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => speak('Voice control is ready. Say "show help" to see available commands.')}
            iconName="Volume2"
            iconPosition="left"
          >
            Test
          </Button>
        </div>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">You said:</h4>
          <p className="text-muted-foreground italic">"{transcript}"</p>
        </div>
      )}

      {/* Last Command */}
      {lastCommand && (
        <div className="p-4 bg-primary/10 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Last Command:</h4>
          <p className="text-muted-foreground">"{lastCommand}"</p>
        </div>
      )}

      {/* Available Commands */}
      {showCommands && (
        <div className="p-4 bg-card rounded-lg neomorphic">
          <h4 className="font-medium text-foreground mb-4">Available Voice Commands</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableCommands.map((cmd, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <div className="font-medium text-foreground text-sm">"{cmd.command}"</div>
                <div className="text-xs text-muted-foreground mt-1">{cmd.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => speak('Hello! I\'m your Moodify voice assistant. How can I help you today?')}
          className="text-xs"
        >
          <Icon name="Volume2" size={14} className="mr-1" />
          Test Voice
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCommands(!showCommands)}
          className="text-xs"
        >
          <Icon name="HelpCircle" size={14} className="mr-1" />
          Show Help
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => speak('Voice control is now active. You can speak naturally to interact with the application.')}
          className="text-xs"
        >
          <Icon name="Mic" size={14} className="mr-1" />
          Start Listening
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => speak('Goodbye! Voice control is now disabled.')}
          className="text-xs"
        >
          <Icon name="MicOff" size={14} className="mr-1" />
          Stop
        </Button>
      </div>
    </div>
  );
};

export default VoiceControl;


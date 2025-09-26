import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConceptExplainer = ({ selectedSubject, currentEmotion }) => {
  const [selectedConcept, setSelectedConcept] = useState('');
  const [explanation, setExplanation] = useState(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanationLevel, setExplanationLevel] = useState('intermediate');

  const concepts = {
    programming: [
      'Variables and Data Types',
      'Control Structures (if/else, loops)',
      'Functions and Methods',
      'Object-Oriented Programming',
      'Error Handling',
      'Recursion',
      'Memory Management',
      'Design Patterns'
    ],
    algorithms: [
      'Sorting Algorithms',
      'Searching Algorithms',
      'Graph Algorithms',
      'Dynamic Programming',
      'Greedy Algorithms',
      'Divide and Conquer',
      'Backtracking',
      'Time Complexity Analysis'
    ],
    datastructures: [
      'Arrays and Lists',
      'Stacks and Queues',
      'Linked Lists',
      'Trees and Binary Trees',
      'Hash Tables',
      'Graphs',
      'Heaps',
      'Tries'
    ],
    mathematics: [
      'Linear Algebra',
      'Calculus',
      'Discrete Mathematics',
      'Probability and Statistics',
      'Number Theory',
      'Combinatorics',
      'Graph Theory',
      'Optimization'
    ],
    databases: [
      'SQL Queries',
      'Database Design',
      'Normalization',
      'Indexing',
      'Transactions',
      'ACID Properties',
      'NoSQL Databases',
      'Database Optimization'
    ],
    networking: [
      'OSI Model',
      'TCP/IP Protocol',
      'HTTP and HTTPS',
      'DNS',
      'Load Balancing',
      'Security Protocols',
      'Network Topologies',
      'Wireless Networks'
    ]
  };

  const explanationLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Simple explanations with basic examples' },
    { value: 'intermediate', label: 'Intermediate', description: 'Detailed explanations with practical examples' },
    { value: 'advanced', label: 'Advanced', description: 'In-depth analysis with complex scenarios' }
  ];

  const explainConcept = () => {
    if (!selectedConcept) return;
    
    setIsExplaining(true);
    
    // Simulate AI explanation generation
    setTimeout(() => {
      const explanations = {
        'Variables and Data Types': {
          beginner: {
            title: 'Variables and Data Types - Beginner',
            explanation: 'Variables are like labeled boxes that store information. Data types tell us what kind of information we can store.',
            examples: [
              'int age = 25; // stores whole numbers',
              'string name = "John"; // stores text',
              'bool isStudent = true; // stores true/false'
            ],
            keyPoints: [
              'Variables hold values that can change',
              'Data types define what values are allowed',
              'Common types: numbers, text, true/false'
            ]
          },
          intermediate: {
            title: 'Variables and Data Types - Intermediate',
            explanation: 'Variables are memory locations with symbolic names that store data. Data types determine the size, range, and operations that can be performed on the data.',
            examples: [
              'int count = 0; // 32-bit integer',
              'double price = 19.99; // 64-bit floating point',
              'char grade = \'A\'; // single character',
              'string message = "Hello World"; // sequence of characters'
            ],
            keyPoints: [
              'Memory allocation based on data type',
              'Type safety prevents invalid operations',
              'Implicit and explicit type conversions',
              'Variable scope and lifetime management'
            ]
          },
          advanced: {
            title: 'Variables and Data Types - Advanced',
            explanation: 'Variables represent memory addresses with type information. Advanced concepts include type systems, memory layout, and optimization considerations.',
            examples: [
              'const int MAX_SIZE = 100; // compile-time constant',
              'volatile int* ptr = &data; // volatile pointer',
              'auto result = calculate(); // type deduction',
              'std::variant<int, string> value; // union type'
            ],
            keyPoints: [
              'Static vs dynamic typing',
              'Memory alignment and padding',
              'Type erasure and templates',
              'RAII and resource management'
            ]
          }
        },
        'Sorting Algorithms': {
          beginner: {
            title: 'Sorting Algorithms - Beginner',
            explanation: 'Sorting algorithms arrange data in a specific order, like alphabetical or numerical.',
            examples: [
              'Bubble Sort: Compare adjacent elements and swap if needed',
              'Selection Sort: Find minimum and place at beginning',
              'Insertion Sort: Build sorted array one element at a time'
            ],
            keyPoints: [
              'Arranges data in ascending or descending order',
              'Different algorithms have different speeds',
              'Some are easier to understand than others'
            ]
          },
          intermediate: {
            title: 'Sorting Algorithms - Intermediate',
            explanation: 'Sorting algorithms are fundamental computer science concepts that arrange elements in a specific order. Understanding their time and space complexity is crucial for algorithm selection.',
            examples: [
              'Quick Sort: O(n log n) average, O(n²) worst case',
              'Merge Sort: O(n log n) guaranteed, stable sort',
              'Heap Sort: O(n log n) guaranteed, in-place sort'
            ],
            keyPoints: [
              'Time complexity analysis (Big O notation)',
              'Space complexity considerations',
              'Stable vs unstable sorting',
              'In-place vs out-of-place algorithms'
            ]
          },
          advanced: {
            title: 'Sorting Algorithms - Advanced',
            explanation: 'Advanced sorting involves understanding lower bounds, adaptive algorithms, and specialized sorting techniques for different data distributions.',
            examples: [
              'Radix Sort: O(d(n+k)) for integers with d digits',
              'Counting Sort: O(n+k) for small integer ranges',
              'Tim Sort: Hybrid stable sort used in Python'
            ],
            keyPoints: [
              'Comparison-based sorting lower bound Ω(n log n)',
              'Non-comparison sorting algorithms',
              'Adaptive algorithms and their benefits',
              'Cache-efficient sorting techniques'
            ]
          }
        }
      };

      const conceptExplanations = explanations[selectedConcept] || explanations['Variables and Data Types'];
      const levelExplanation = conceptExplanations[explanationLevel] || conceptExplanations.intermediate;
      
      setExplanation(levelExplanation);
      setIsExplaining(false);
    }, 2000);
  };

  const getEmotionBasedLevel = () => {
    const levels = {
      calm: 'advanced',
      focus: 'intermediate',
      energy: 'beginner',
      stress: 'beginner'
    };
    return levels[currentEmotion] || 'intermediate';
  };

  const getStudySuggestion = () => {
    const suggestions = {
      calm: 'Perfect time for deep, complex explanations',
      focus: 'Great concentration for detailed technical concepts',
      energy: 'High energy for interactive learning and examples',
      stress: 'Keep explanations simple and take breaks'
    };
    return suggestions[currentEmotion] || suggestions.focus;
  };

  return (
    <div className="neomorphic rounded-xl p-6 emotion-calm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="BookOpen" size={20} color="var(--color-primary)" />
          <span>AI Concept Explainer</span>
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={explanationLevel}
            onChange={(e) => setExplanationLevel(e.target.value)}
            className="px-3 py-1 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {explanationLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {/* Concept Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Select a concept to explain:
          </label>
          <select
            value={selectedConcept}
            onChange={(e) => setSelectedConcept(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Choose a concept...</option>
            {concepts[selectedSubject]?.map((concept) => (
              <option key={concept} value={concept}>
                {concept}
              </option>
            ))}
          </select>
        </div>

        {/* Explanation Level Info */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium text-foreground mb-1">
            {explanationLevels.find(l => l.value === explanationLevel)?.label} Level
          </h4>
          <p className="text-sm text-muted-foreground">
            {explanationLevels.find(l => l.value === explanationLevel)?.description}
          </p>
        </div>

        {/* Generate Button */}
        <Button
          onClick={explainConcept}
          disabled={!selectedConcept || isExplaining}
          className="w-full"
          iconName={isExplaining ? 'Loader' : 'Sparkles'}
          iconPosition="left"
        >
          {isExplaining ? 'Generating Explanation...' : 'Explain Concept'}
        </Button>

        {/* Explanation Display */}
        {explanation && (
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg neomorphic">
              <h4 className="text-lg font-medium text-foreground mb-3">{explanation.title}</h4>
              <p className="text-muted-foreground mb-4">{explanation.explanation}</p>
              
              {/* Examples */}
              <div className="mb-4">
                <h5 className="font-medium text-foreground mb-2">Examples:</h5>
                <div className="space-y-2">
                  {explanation.examples?.map((example, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg">
                      <code className="text-sm text-foreground font-mono">{example}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Points */}
              <div>
                <h5 className="font-medium text-foreground mb-2">Key Points:</h5>
                <ul className="space-y-1">
                  {explanation.keyPoints?.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Lightbulb" size={16} />
                <span>{getStudySuggestion()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Bookmark" size={16} className="mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Share" size={16} className="mr-2" />
                  Share
                </Button>
                <Button size="sm">
                  <Icon name="Play" size={16} className="mr-2" />
                  Practice
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Emotion-based Study Tip */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Brain" size={20} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-foreground mb-1">AI Recommendation</h5>
              <p className="text-sm text-muted-foreground">
                Based on your current mood, I recommend the {getEmotionBasedLevel()} level for optimal learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptExplainer;


import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PracticeProblems = ({ selectedSubject, studyMode, currentEmotion }) => {
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [difficulty, setDifficulty] = useState('medium');

  const difficulties = [
    { value: 'easy', label: 'Easy', color: 'var(--color-success)' },
    { value: 'medium', label: 'Medium', color: 'var(--color-warning)' },
    { value: 'hard', label: 'Hard', color: 'var(--color-error)' }
  ];

  const generateProblems = () => {
    setIsGenerating(true);
    
    // Simulate AI problem generation
    setTimeout(() => {
      const problemSets = {
        programming: [
          {
            id: 1,
            title: 'Variable Declaration',
            description: 'Write a program to declare and initialize three variables: name (string), age (int), and isStudent (boolean).',
            difficulty: 'easy',
            solution: 'string name = "John";\nint age = 20;\nbool isStudent = true;',
            hints: ['Use appropriate data types', 'Initialize with sample values'],
            testCases: [
              { input: 'name', expected: 'string type' },
              { input: 'age', expected: 'integer type' },
              { input: 'isStudent', expected: 'boolean type' }
            ]
          },
          {
            id: 2,
            title: 'Array Sum',
            description: 'Write a function that takes an array of integers and returns the sum of all elements.',
            difficulty: 'medium',
            solution: 'int arraySum(int[] arr) {\n  int sum = 0;\n  for(int i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n}',
            hints: ['Use a loop to iterate through the array', 'Initialize sum to 0', 'Add each element to sum'],
            testCases: [
              { input: '[1, 2, 3, 4]', expected: '10' },
              { input: '[-1, 0, 1]', expected: '0' },
              { input: '[]', expected: '0' }
            ]
          },
          {
            id: 3,
            title: 'Binary Search',
            description: 'Implement binary search algorithm to find a target value in a sorted array.',
            difficulty: 'hard',
            solution: 'int binarySearch(int[] arr, int target) {\n  int left = 0, right = arr.length - 1;\n  while (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (arr[mid] == target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}',
            hints: ['Use two pointers (left and right)', 'Calculate middle index', 'Compare with target and adjust pointers'],
            testCases: [
              { input: '[1, 3, 5, 7, 9], target=5', expected: '2' },
              { input: '[1, 3, 5, 7, 9], target=4', expected: '-1' },
              { input: '[1, 2, 3], target=2', expected: '1' }
            ]
          }
        ],
        algorithms: [
          {
            id: 1,
            title: 'Bubble Sort',
            description: 'Implement bubble sort algorithm to sort an array in ascending order.',
            difficulty: 'easy',
            solution: 'void bubbleSort(int[] arr) {\n  int n = arr.length;\n  for (int i = 0; i < n-1; i++) {\n    for (int j = 0; j < n-i-1; j++) {\n      if (arr[j] > arr[j+1]) {\n        swap(arr[j], arr[j+1]);\n      }\n    }\n  }\n}',
            hints: ['Use nested loops', 'Compare adjacent elements', 'Swap if out of order'],
            testCases: [
              { input: '[64, 34, 25, 12, 22]', expected: '[12, 22, 25, 34, 64]' },
              { input: '[5, 2, 8, 1, 9]', expected: '[1, 2, 5, 8, 9]' }
            ]
          },
          {
            id: 2,
            title: 'Two Sum',
            description: 'Given an array of integers and a target sum, find two numbers that add up to the target.',
            difficulty: 'medium',
            solution: 'int[] twoSum(int[] nums, int target) {\n  Map<Integer, Integer> map = new HashMap<>();\n  for (int i = 0; i < nums.length; i++) {\n    int complement = target - nums[i];\n    if (map.containsKey(complement)) {\n      return new int[]{map.get(complement), i};\n    }\n    map.put(nums[i], i);\n  }\n  return new int[0];\n}',
            hints: ['Use a hash map to store complements', 'Check if complement exists', 'Return indices when found'],
            testCases: [
              { input: '[2, 7, 11, 15], target=9', expected: '[0, 1]' },
              { input: '[3, 2, 4], target=6', expected: '[1, 2]' }
            ]
          }
        ]
      };

      const subjectProblems = problemSets[selectedSubject] || problemSets.programming;
      const filteredProblems = subjectProblems.filter(p => p.difficulty === difficulty);
      setProblems(filteredProblems);
      setCurrentProblem(0);
      setUserAnswer('');
      setShowSolution(false);
      setScore({ correct: 0, total: 0 });
      setIsGenerating(false);
    }, 2000);
  };

  const nextProblem = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setUserAnswer('');
      setShowSolution(false);
    }
  };

  const prevProblem = () => {
    if (currentProblem > 0) {
      setCurrentProblem(currentProblem - 1);
      setUserAnswer('');
      setShowSolution(false);
    }
  };

  const checkAnswer = () => {
    // Simple answer checking (in real app, would use more sophisticated comparison)
    const isCorrect = userAnswer.toLowerCase().includes('correct') || userAnswer.length > 10;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    setShowSolution(true);
  };

  const getDifficultyColor = (level) => {
    const colors = {
      easy: 'var(--color-success)',
      medium: 'var(--color-warning)',
      hard: 'var(--color-error)'
    };
    return colors[level] || colors.medium;
  };

  const getEmotionBasedDifficulty = () => {
    const difficulties = {
      calm: 'hard',
      focus: 'medium',
      energy: 'easy',
      stress: 'easy'
    };
    return difficulties[currentEmotion] || 'medium';
  };

  const getStudyMotivation = () => {
    const motivations = {
      calm: 'Perfect focus for challenging problems',
      focus: 'Great concentration for problem-solving',
      energy: 'High energy for active coding practice',
      stress: 'Take it easy with simpler problems'
    };
    return motivations[currentEmotion] || motivations.focus;
  };

  useEffect(() => {
    setDifficulty(getEmotionBasedDifficulty());
  }, [currentEmotion]);

  return (
    <div className="neomorphic rounded-xl p-6 emotion-energy">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Code" size={20} color="var(--color-primary)" />
          <span>AI Practice Problems</span>
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-3 py-1 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {difficulties.map((diff) => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
          <Button
            onClick={generateProblems}
            disabled={isGenerating}
            iconName={isGenerating ? 'Loader' : 'Sparkles'}
            iconPosition="left"
          >
            {isGenerating ? 'Generating...' : 'Generate Problems'}
          </Button>
        </div>
      </div>

      {problems.length > 0 ? (
        <div className="space-y-6">
          {/* Progress and Score */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Problem {currentProblem + 1} of {problems.length}</span>
              <span>Score: {score.correct}/{score.total}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
                />
              </div>
              <span>{Math.round(((currentProblem + 1) / problems.length) * 100)}%</span>
            </div>
          </div>

          {/* Current Problem */}
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg neomorphic">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-foreground">
                  {problems[currentProblem]?.title}
                </h4>
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `${getDifficultyColor(problems[currentProblem]?.difficulty)}20`,
                    color: getDifficultyColor(problems[currentProblem]?.difficulty)
                  }}
                >
                  {problems[currentProblem]?.difficulty?.toUpperCase()}
                </span>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {problems[currentProblem]?.description}
              </p>

              {/* Test Cases */}
              <div className="mb-4">
                <h5 className="font-medium text-foreground mb-2">Test Cases:</h5>
                <div className="space-y-2">
                  {problems[currentProblem]?.testCases?.map((testCase, index) => (
                    <div key={index} className="p-2 bg-muted/30 rounded text-sm">
                      <span className="text-muted-foreground">Input: </span>
                      <code className="text-foreground">{testCase.input}</code>
                      <span className="text-muted-foreground ml-2">Expected: </span>
                      <code className="text-foreground">{testCase.expected}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hints */}
              <div className="mb-4">
                <h5 className="font-medium text-foreground mb-2">Hints:</h5>
                <ul className="space-y-1">
                  {problems[currentProblem]?.hints?.map((hint, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <Icon name="Lightbulb" size={14} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Answer Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Solution:
                </label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Write your code here..."
                  className="w-full h-32 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  iconName="CheckCircle"
                  iconPosition="left"
                >
                  Check Answer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSolution(!showSolution)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  {showSolution ? 'Hide' : 'Show'} Solution
                </Button>
              </div>

              {/* Solution Display */}
              {showSolution && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h5 className="font-medium text-foreground mb-2">Solution:</h5>
                  <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                    {problems[currentProblem]?.solution}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevProblem}
              disabled={currentProblem === 0}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={() => {
                  setUserAnswer('');
                  setShowSolution(false);
                }}
              >
                Reset
              </Button>
            </div>
            
            <Button
              variant="outline"
              onClick={nextProblem}
              disabled={currentProblem === problems.length - 1}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>

          {/* Motivation Tip */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Zap" size={20} color="var(--color-warning)" className="mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-foreground mb-1">Study Motivation</h5>
                <p className="text-sm text-muted-foreground">{getStudyMotivation()}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="Code" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">Generate Practice Problems</h4>
          <p className="text-muted-foreground mb-6">
            AI will create personalized practice problems for {selectedSubject} at {difficulty} difficulty
          </p>
          <Button onClick={generateProblems} disabled={isGenerating}>
            <Icon name="Sparkles" size={16} className="mr-2" />
            Generate Problems
          </Button>
        </div>
      )}
    </div>
  );
};

export default PracticeProblems;


import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FlashcardGenerator = ({ selectedSubject, currentEmotion }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [studyMode, setStudyMode] = useState('study'); // study, quiz, review

  const generateFlashcards = () => {
    setIsGenerating(true);
    
    // Simulate AI generation based on subject and emotion
    setTimeout(() => {
      const cardSets = {
        programming: [
          { front: 'What is a variable?', back: 'A named storage location that holds a value and can be changed during program execution.' },
          { front: 'What is the difference between == and === in JavaScript?', back: '== performs type coercion, === checks both value and type without coercion.' },
          { front: 'What is recursion?', back: 'A programming technique where a function calls itself to solve a problem by breaking it into smaller subproblems.' },
          { front: 'What is Big O notation?', back: 'A mathematical notation used to describe the time complexity of an algorithm in terms of input size.' },
          { front: 'What is a closure in JavaScript?', back: 'A function that has access to variables in its outer scope even after the outer function returns.' }
        ],
        algorithms: [
          { front: 'What is the time complexity of binary search?', back: 'O(log n) - it halves the search space with each comparison.' },
          { front: 'What is the difference between BFS and DFS?', back: 'BFS uses a queue and explores level by level, DFS uses a stack and goes deep first.' },
          { front: 'What is dynamic programming?', back: 'A method for solving complex problems by breaking them down into simpler subproblems and storing solutions.' },
          { front: 'What is a hash table?', back: 'A data structure that maps keys to values using a hash function for O(1) average lookup time.' },
          { front: 'What is the greedy algorithm approach?', back: 'Making locally optimal choices at each step in hopes of finding a global optimum.' }
        ],
        datastructures: [
          { front: 'What is a stack?', back: 'A LIFO (Last In, First Out) data structure with push and pop operations.' },
          { front: 'What is a queue?', back: 'A FIFO (First In, First Out) data structure with enqueue and dequeue operations.' },
          { front: 'What is a binary tree?', back: 'A tree data structure where each node has at most two children.' },
          { front: 'What is a linked list?', back: 'A linear data structure where elements are stored in nodes with pointers to the next node.' },
          { front: 'What is a heap?', back: 'A complete binary tree where parent nodes are greater (max-heap) or smaller (min-heap) than children.' }
        ]
      };

      const subjectCards = cardSets[selectedSubject] || cardSets.programming;
      setFlashcards(subjectCards);
      setCurrentCard(0);
      setIsFlipped(false);
      setIsGenerating(false);
    }, 1500);
  };

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const getEmotionBasedHint = () => {
    const hints = {
      calm: 'Take your time to understand each concept deeply',
      focus: 'Perfect concentration for memorizing key concepts',
      energy: 'Great energy for active recall practice',
      stress: 'Take breaks between cards and don\'t rush'
    };
    return hints[currentEmotion] || hints.calm;
  };

  useEffect(() => {
    if (flashcards.length > 0) {
      setIsFlipped(false);
    }
  }, [currentCard, flashcards]);

  return (
    <div className="neomorphic rounded-xl p-6 emotion-energy">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="CreditCard" size={20} color="var(--color-primary)" />
          <span>AI Flashcard Generator</span>
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={studyMode}
            onChange={(e) => setStudyMode(e.target.value)}
            className="px-3 py-1 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="study">Study Mode</option>
            <option value="quiz">Quiz Mode</option>
            <option value="review">Review Mode</option>
          </select>
          <Button
            onClick={generateFlashcards}
            disabled={isGenerating}
            iconName={isGenerating ? 'Loader' : 'Sparkles'}
            iconPosition="left"
          >
            {isGenerating ? 'Generating...' : 'Generate Cards'}
          </Button>
        </div>
      </div>

      {flashcards.length > 0 ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <span>Card {currentCard + 1} of {flashcards.length}</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
                />
              </div>
              <span>{Math.round(((currentCard + 1) / flashcards.length) * 100)}%</span>
            </div>
          </div>

          {/* Flashcard */}
          <div className="relative">
            <div 
              className={`w-full h-64 bg-card rounded-xl neomorphic cursor-pointer transition-all duration-500 transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={flipCard}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`absolute inset-0 p-6 flex items-center justify-center text-center ${
                isFlipped ? 'hidden' : 'block'
              }`}>
                <div>
                  <Icon name="HelpCircle" size={32} color="var(--color-primary)" className="mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-foreground mb-2">Question</h4>
                  <p className="text-muted-foreground">{flashcards[currentCard]?.front}</p>
                  <p className="text-xs text-muted-foreground mt-4">Click to reveal answer</p>
                </div>
              </div>
              
              <div className={`absolute inset-0 p-6 flex items-center justify-center text-center ${
                isFlipped ? 'block' : 'hidden'
              }`}>
                <div>
                  <Icon name="CheckCircle" size={32} color="var(--color-success)" className="mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-foreground mb-2">Answer</h4>
                  <p className="text-muted-foreground">{flashcards[currentCard]?.back}</p>
                  <p className="text-xs text-muted-foreground mt-4">Click to see question</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevCard}
              disabled={currentCard === 0}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={shuffleCards}
                iconName="Shuffle"
                iconPosition="left"
              >
                Shuffle
              </Button>
              <Button
                variant="outline"
                onClick={flipCard}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Flip
              </Button>
            </div>
            
            <Button
              variant="outline"
              onClick={nextCard}
              disabled={currentCard === flashcards.length - 1}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>

          {/* Emotion-based Study Tip */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={20} color="var(--color-warning)" className="mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-foreground mb-1">Study Tip</h5>
                <p className="text-sm text-muted-foreground">{getEmotionBasedHint()}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="CreditCard" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">Generate Flashcards</h4>
          <p className="text-muted-foreground mb-6">
            AI will create personalized flashcards for {selectedSubject} based on your learning needs
          </p>
          <Button onClick={generateFlashcards} disabled={isGenerating}>
            <Icon name="Sparkles" size={16} className="mr-2" />
            Generate Flashcards
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlashcardGenerator;


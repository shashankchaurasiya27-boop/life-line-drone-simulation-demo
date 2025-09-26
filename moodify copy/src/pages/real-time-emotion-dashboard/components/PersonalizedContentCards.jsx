import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PersonalizedContentCards = ({ currentEmotion, onContentRating }) => {
  const [contentCards, setContentCards] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock content data based on emotion
  const generateContentForEmotion = (emotion) => {
    const contentMap = {
      calm: [
        {
          id: 1,
          type: 'meme',
          title: 'Peaceful Coding Vibes',
          content: 'When your code compiles on the first try and all tests pass... 🧘‍♂️',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
          aiGenerated: true,
          rating: 0,
          tags: ['coding', 'zen', 'success']
        },
        {
          id: 2,
          type: 'quote',
          title: 'Motivational Quote',
          content: `"The best way to get started is to quit talking and begin doing." - Walt Disney\n\nYour calm energy is perfect for tackling that challenging algorithm today.`,
          aiGenerated: true,
          rating: 0,
          tags: ['motivation', 'productivity']
        },
        {
          id: 3,
          type: 'recommendation',
          title: 'Study Recommendation',
          content: `Perfect time for deep learning! Your calm state is ideal for:\n• Reading research papers\n• Working on complex algorithms\n• Code refactoring`,
          icon: 'BookOpen',
          aiGenerated: true,
          rating: 0,
          tags: ['study', 'focus']
        }
      ],
      focus: [
        {
          id: 4,
          type: 'meme',
          title: 'Focus Mode Activated',
          content: 'Me entering the zone: *puts on headphones* *cracks knuckles* Time to code! 💻⚡',
          image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?w=400&h=300&fit=crop',
          aiGenerated: true,
          rating: 0,
          tags: ['focus', 'coding', 'productivity']
        },
        {
          id: 5,
          type: 'quote',
          title: 'Focus Affirmation',
          content: `"Concentrate all your thoughts upon the work at hand." - Alexander Graham Bell\n\nYour focused energy is your superpower right now!`,
          aiGenerated: true,
          rating: 0,
          tags: ['focus', 'concentration']
        }
      ],
      energy: [
        {
          id: 6,
          type: 'meme',
          title: 'High Energy Coding',
          content: 'When you have 5 cups of coffee and suddenly understand recursion perfectly! 🚀☕',
          image: 'https://images.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg?w=400&h=300&fit=crop',
          aiGenerated: true,
          rating: 0,
          tags: ['energy', 'coffee', 'breakthrough']
        },
        {
          id: 7,
          type: 'recommendation',
          title: 'High Energy Tasks',
          content: `Channel your energy into:\n• Pair programming sessions\n• Hackathon participation\n• Learning new frameworks\n• Code reviews and debugging`,
          icon: 'Zap',
          aiGenerated: true,
          rating: 0,
          tags: ['energy', 'collaboration']
        }
      ],
      stress: [
        {
          id: 8,
          type: 'meme',
          title: 'Debugging Life',
          content: 'Debugging: Being the detective in a crime movie where you are also the murderer 🕵️‍♂️',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
          aiGenerated: true,
          rating: 0,
          tags: ['debugging', 'humor', 'relatable']
        },
        {
          id: 9,
          type: 'quote',
          title: 'Stress Relief',
          content: `"It's not a bug, it's a feature!" - Anonymous Developer\n\nTake a deep breath. Every expert was once a beginner. You've got this! 💪`,
          aiGenerated: true,
          rating: 0,
          tags: ['stress-relief', 'encouragement']
        },
        {
          id: 10,
          type: 'recommendation',title: 'Stress Management',
          content: `Time to decompress:\n• Take a 10-minute walk\n• Practice breathing exercises\n• Switch to easier tasks\n• Ask for help from peers`,
          icon: 'Heart',
          aiGenerated: true,
          rating: 0,
          tags: ['wellness', 'self-care']
        }
      ]
    };

    return contentMap?.[emotion] || contentMap?.calm;
  };

  useEffect(() => {
    setIsGenerating(true);
    // Simulate AI content generation delay
    const timer = setTimeout(() => {
      const newContent = generateContentForEmotion(currentEmotion);
      setContentCards(newContent);
      setActiveCardIndex(0);
      setIsGenerating(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentEmotion]);

  const handleRating = (cardId, rating) => {
    setContentCards(prev => 
      prev?.map(card => 
        card?.id === cardId ? { ...card, rating } : card
      )
    );
    onContentRating(cardId, rating);
  };

  const nextCard = () => {
    setActiveCardIndex(prev => (prev + 1) % contentCards?.length);
  };

  const prevCard = () => {
    setActiveCardIndex(prev => (prev - 1 + contentCards?.length) % contentCards?.length);
  };

  const getCardIcon = (type) => {
    const icons = {
      meme: 'Smile',
      quote: 'Quote',
      recommendation: 'Lightbulb'
    };
    return icons?.[type] || 'Sparkles';
  };

  const getCardColor = (type) => {
    const colors = {
      meme: 'var(--color-accent)',
      quote: 'var(--color-secondary)',
      recommendation: 'var(--color-primary)'
    };
    return colors?.[type] || 'var(--color-primary)';
  };

  if (isGenerating) {
    return (
      <div className="neomorphic emotion-focus bg-card rounded-xl p-6">
        <div className="flex items-center justify-center space-x-3 py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="text-center">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              Generating Content
            </h3>
            <p className="text-sm text-muted-foreground">
              Creating personalized content for your {currentEmotion} mood...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (contentCards?.length === 0) return null;

  const activeCard = contentCards?.[activeCardIndex];

  return (
    <div className="neomorphic emotion-energy bg-card rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon 
            name={getCardIcon(activeCard?.type)} 
            size={24} 
            color={getCardColor(activeCard?.type)}
          />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Personalized Content
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevCard}
            iconName="ChevronLeft"
            disabled={contentCards?.length <= 1}
          />
          <span className="text-xs text-muted-foreground font-mono">
            {activeCardIndex + 1} / {contentCards?.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextCard}
            iconName="ChevronRight"
            disabled={contentCards?.length <= 1}
          />
        </div>
      </div>
      {/* Active Content Card */}
      <div className="relative min-h-[300px]">
        <div className="bg-muted/30 rounded-lg p-6 neomorphic-inset">
          {/* Card Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${getCardColor(activeCard?.type)}20` }}
              >
                <Icon 
                  name={getCardIcon(activeCard?.type)} 
                  size={16} 
                  color={getCardColor(activeCard?.type)}
                />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">
                  {activeCard?.title}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="capitalize">{activeCard?.type}</span>
                  {activeCard?.aiGenerated && (
                    <>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Sparkles" size={12} />
                        <span>AI Generated</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="space-y-4">
            {activeCard?.image && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <Image
                  src={activeCard?.image}
                  alt={activeCard?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {activeCard?.icon && !activeCard?.image && (
              <div className="flex justify-center py-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${getCardColor(activeCard?.type)}20` }}
                >
                  <Icon 
                    name={activeCard?.icon} 
                    size={32} 
                    color={getCardColor(activeCard?.type)}
                  />
                </div>
              </div>
            )}

            <div className="prose prose-sm max-w-none">
              <p className="text-foreground whitespace-pre-line leading-relaxed">
                {activeCard?.content}
              </p>
            </div>

            {/* Tags */}
            {activeCard?.tags && (
              <div className="flex flex-wrap gap-2">
                {activeCard?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Rating Section */}
          <div className="flex items-center justify-between pt-4 border-t border-border mt-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Rate this content:</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5]?.map((rating) => (
                  <Button
                    key={rating}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRating(activeCard?.id, rating)}
                    className="p-1"
                  >
                    <Icon
                      name="Star"
                      size={16}
                      color={rating <= activeCard?.rating ? 'var(--color-warning)' : 'var(--color-muted-foreground)'}
                      className={rating <= activeCard?.rating ? 'fill-current' : ''}
                    />
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Share"
                iconPosition="left"
              >
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Bookmark"
                iconPosition="left"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Content Navigation Dots */}
      <div className="flex justify-center space-x-2">
        {contentCards?.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveCardIndex(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index === activeCardIndex 
                ? 'bg-primary w-6' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalizedContentCards;
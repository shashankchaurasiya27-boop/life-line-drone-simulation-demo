import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ExplainableAI = () => {
  const [selectedRecommendation, setSelectedRecommendation] = useState(0);

  const recommendations = [
    {
      id: 1,
      type: 'Content Generation',
      recommendation: 'Motivational meme about debugging',
      confidence: 87,
      reasoning: 'Detected frustration patterns in recent code commits',
      factors: [
        { factor: 'Code Commit Frequency', weight: 0.35, value: 'Decreased 40%' },
        { factor: 'Facial Expression Analysis', weight: 0.25, value: 'Frustration detected' },
        { factor: 'Time of Day', weight: 0.20, value: 'Late night coding' },
        { factor: 'Historical Preferences', weight: 0.20, value: 'Prefers humor' }
      ],
      biasCheck: 'Low risk - No demographic bias detected',
      culturalSensitivity: 'Appropriate for CS student culture'
    },
    {
      id: 2,
      type: 'Mood Prediction',
      recommendation: 'Stress level likely to increase in 2 hours',
      confidence: 73,
      reasoning: 'Calendar shows upcoming exam + current biometric trends',
      factors: [
        { factor: 'Calendar Events', weight: 0.40, value: 'Exam in 2 hours' },
        { factor: 'Heart Rate Trend', weight: 0.30, value: 'Gradually increasing' },
        { factor: 'Historical Patterns', weight: 0.20, value: 'Pre-exam anxiety' },
        { factor: 'Sleep Quality', weight: 0.10, value: 'Below average' }
      ],
      biasCheck: 'Medium risk - Consider individual variation',
      culturalSensitivity: 'Culturally neutral prediction'
    },
    {
      id: 3,
      type: 'Social Recommendation',
      recommendation: 'Join study group - compatible mood states detected',
      confidence: 91,
      reasoning: 'Peer analysis shows complementary emotional states',
      factors: [
        { factor: 'Peer Mood Analysis', weight: 0.45, value: 'Complementary states' },
        { factor: 'Academic Subject Match', weight: 0.25, value: 'Same course' },
        { factor: 'Social Preferences', weight: 0.20, value: 'Prefers group study' },
        { factor: 'Location Proximity', weight: 0.10, value: 'Same building' }
      ],
      biasCheck: 'Low risk - Diverse group composition',
      culturalSensitivity: 'Respects cultural study preferences'
    }
  ];

  const biasMetrics = [
    { category: 'Gender', score: 92, status: 'Excellent' },
    { category: 'Ethnicity', score: 88, status: 'Good' },
    { category: 'Age', score: 95, status: 'Excellent' },
    { category: 'Academic Level', score: 85, status: 'Good' },
    { category: 'Socioeconomic', score: 90, status: 'Excellent' },
    { category: 'Cultural Background', score: 87, status: 'Good' }
  ];

  const algorithmTransparency = [
    {
      algorithm: 'Emotion Detection',
      model: 'Vision Transformer + BERT Fusion',
      accuracy: 94.2,
      lastUpdated: '2025-08-15',
      dataSource: 'Facial expressions, voice prosody',
      processing: 'Local WebAssembly'
    },
    {
      algorithm: 'Mood Prediction',
      model: 'LSTM + Attention Mechanism',
      accuracy: 87.6,
      lastUpdated: '2025-08-12',
      dataSource: 'Biometric trends, calendar data',
      processing: 'Edge computing'
    },
    {
      algorithm: 'Content Generation',
      model: 'GPT-4 + Stable Diffusion',
      accuracy: 91.8,
      lastUpdated: '2025-08-18',
      dataSource: 'Preference history, mood state',
      processing: 'Encrypted cloud'
    }
  ];

  const currentRecommendation = recommendations?.[selectedRecommendation];

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 75) return 'text-warning';
    return 'text-error';
  };

  const getBiasColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="space-y-6">
      <div className="neomorphic p-6 rounded-xl bg-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-2">AI Decision Transparency</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Understand how AI algorithms make recommendations and detect potential biases in decision-making processes.
        </p>

        {/* Recommendation Selector */}
        <div className="mb-6">
          <h4 className="text-lg font-medium text-foreground mb-3">Recent AI Recommendations</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recommendations?.map((rec, index) => (
              <button
                key={rec?.id}
                onClick={() => setSelectedRecommendation(index)}
                className={`
                  p-4 rounded-lg border text-left transition-all duration-200
                  ${selectedRecommendation === index
                    ? 'bg-primary/10 border-primary/30 text-primary' :'bg-background border-border hover:bg-muted'
                  }
                `}
              >
                <div className="font-medium text-sm mb-1">{rec?.type}</div>
                <div className="text-xs text-muted-foreground mb-2">{rec?.recommendation}</div>
                <div className={`text-xs font-medium ${getConfidenceColor(rec?.confidence)}`}>
                  {rec?.confidence}% confidence
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Recommendation Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Decision Factors */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-foreground">Decision Factors</h4>
            <div className="space-y-3">
              {currentRecommendation?.factors?.map((factor, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{factor?.factor}</span>
                    <span className="text-xs text-muted-foreground">
                      {(factor?.weight * 100)?.toFixed(0)}% weight
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${factor?.weight * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{factor?.value}</div>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="text-sm font-medium text-primary mb-1">AI Reasoning</div>
              <div className="text-xs text-primary">{currentRecommendation?.reasoning}</div>
            </div>
          </div>

          {/* Bias & Cultural Analysis */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-foreground">Bias & Cultural Analysis</h4>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-start space-x-2 mb-3">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <div>
                  <div className="text-sm font-medium text-foreground">Bias Check</div>
                  <div className="text-xs text-muted-foreground">{currentRecommendation?.biasCheck}</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Icon name="Globe" size={16} color="var(--color-secondary)" />
                <div>
                  <div className="text-sm font-medium text-foreground">Cultural Sensitivity</div>
                  <div className="text-xs text-muted-foreground">{currentRecommendation?.culturalSensitivity}</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <div className="text-sm font-medium text-foreground mb-3">Confidence Score</div>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      currentRecommendation?.confidence >= 90 ? 'bg-success' :
                      currentRecommendation?.confidence >= 75 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${currentRecommendation?.confidence}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getConfidenceColor(currentRecommendation?.confidence)}`}>
                  {currentRecommendation?.confidence}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bias Detection Dashboard */}
      <div className="neomorphic p-6 rounded-xl bg-card border border-border">
        <h4 className="text-lg font-medium text-foreground mb-4">Algorithmic Bias Detection</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {biasMetrics?.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg border border-border">
              <div className="text-xs text-muted-foreground mb-2">{metric?.category}</div>
              <div className={`text-2xl font-bold mb-1 ${getBiasColor(metric?.score)}`}>
                {metric?.score}
              </div>
              <div className={`text-xs font-medium ${getBiasColor(metric?.score)}`}>
                {metric?.status}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <div className="text-xs text-success">
              <strong>Bias Monitoring Active:</strong> All algorithms are continuously monitored for fairness across demographic groups. 
              Scores above 80 indicate acceptable bias levels.
            </div>
          </div>
        </div>
      </div>
      {/* Algorithm Transparency */}
      <div className="neomorphic p-6 rounded-xl bg-card border border-border">
        <h4 className="text-lg font-medium text-foreground mb-4">Algorithm Transparency</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Algorithm</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Model</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Accuracy</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Data Source</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Processing</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Updated</th>
              </tr>
            </thead>
            <tbody>
              {algorithmTransparency?.map((algo, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium text-foreground">{algo?.algorithm}</td>
                  <td className="py-3 px-4 text-muted-foreground">{algo?.model}</td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${getConfidenceColor(algo?.accuracy)}`}>
                      {algo?.accuracy}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">{algo?.dataSource}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      algo?.processing === 'Local WebAssembly' ? 'bg-success/20 text-success' :
                      algo?.processing === 'Edge computing'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                    }`}>
                      {algo?.processing}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs font-mono">{algo?.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExplainableAI;
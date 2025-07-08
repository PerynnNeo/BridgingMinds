import React, { useState, useRef } from 'react';
import { Play, Mic, MicOff, Volume2, Star, Award, Users, MessageCircle } from 'lucide-react';
import '../styles/PlayLearn.css';

const PlayLearnPage = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userProgress, setUserProgress] = useState({ score: 0, level: 1, badges: [] });
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const games = [
    {
      id: 'scenarios',
      title: 'Real-Life Scenarios',
      description: 'Practice conversations in everyday situations',
      icon: <Users className="game-icon" />,
      color: 'scenarios-gradient',
      scenarios: [
        {
          title: 'Ordering at a Restaurant',
          context: 'You\'re at a restaurant and the waiter approaches your table.',
          prompt: 'Waiter: "Good evening! Welcome to our restaurant. Can I start you off with something to drink?"',
          tips: 'Remember to be polite, make eye contact, and speak clearly.'
        },
        {
          title: 'Job Interview',
          context: 'You\'re in a job interview for a position you really want.',
          prompt: 'Interviewer: "Tell me about yourself and why you\'re interested in this position."',
          tips: 'Be confident, highlight your strengths, and show enthusiasm.'
        },
        {
          title: 'Making New Friends',
          context: 'You\'re at a social gathering and want to start a conversation.',
          prompt: 'Someone nearby: "Hi! I don\'t think we\'ve met before. I\'m Sarah."',
          tips: 'Be friendly, ask questions, and find common interests.'
        }
      ]
    },
    {
      id: 'pronunciation',
      title: 'Pronunciation Practice',
      description: 'Improve your speaking clarity and confidence',
      icon: <Volume2 className="game-icon" />,
      color: 'pronunciation-gradient',
      exercises: [
        { word: 'Communication', difficulty: 'Medium' },
        { word: 'Pronunciation', difficulty: 'Hard' },
        { word: 'Confidence', difficulty: 'Medium' },
        { word: 'Expression', difficulty: 'Easy' }
      ]
    },
    {
      id: 'storytelling',
      title: 'Story Builder',
      description: 'Create stories and tell engaging stories',
      icon: <MessageCircle className="game-icon" />,
      color: 'storytelling-gradient',
      prompts: [
        'Tell a story about your favorite childhood memory',
        'Describe an adventure you\'d like to go on',
        'Share about someone who inspires you'
      ]
    },
    {
      id: 'emotions',
      title: 'Emotion Express',
      description: 'Learn to convey different emotions effectively',
      icon: <Star className="game-icon" />,
      color: 'emotions-gradient',
      emotions: ['Happy', 'Excited', 'Concerned', 'Grateful', 'Confident', 'Curious']
    }
  ];

  const FeedbackPanel = ({ feedback, onNext }) => (
    <div className="feedback-panel">
      <div className="feedback-header">
        <Award className="feedback-icon" />
        <h3 className="feedback-title">Your Performance</h3>
      </div>
      <div className="feedback-content">
        <div className="score-section">
          <span className="score-label">Score:</span>
          <div className="score-display">
            <span className="score-number">{feedback.score}/100</span>
          </div>
        </div>
        <div className="feedback-grid">
          <div className="strengths-section">
            <h4 className="section-title strengths">Strengths ✨</h4>
            <ul className="feedback-list">
              {feedback.strengths.map((strength, i) => <li key={i}>• {strength}</li>)}
            </ul>
          </div>
          <div className="improvements-section">
            <h4 className="section-title improvements">Areas to Improve 📈</h4>
            <ul className="feedback-list">
              {feedback.improvements.map((improvement, i) => <li key={i}>• {improvement}</li>)}
            </ul>
          </div>
        </div>
        <div className="suggestion-section">
          <h4 className="section-title suggestion">AI Suggestion 🤖</h4>
          <p className="suggestion-text">{feedback.suggestion}</p>
        </div>
      </div>
      <div className="feedback-actions">
        <button onClick={onNext} className="next-button">Next Scenario</button>
        <button onClick={() => setShowFeedback(false)} className="try-again-button">Try Again</button>
      </div>
    </div>
  );

  const generateFeedback = () => {
    const feedbacks = [
      {
        score: 85,
        strengths: ['Clear pronunciation', 'Good pace', 'Confident tone'],
        improvements: ['Try to vary your tone more', 'Add more pauses between sentences'],
        suggestion: 'Practice emphasizing key words to make your speech more engaging.'
      },
      {
        score: 92,
        strengths: ['Excellent expression', 'Natural flow', 'Good volume'],
        improvements: ['Work on reducing filler words'],
        suggestion: 'You\'re doing great! Try recording longer responses to build stamina.'
      }
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        setShowFeedback(true);
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const renderGameContent = () => {
    if (!selectedGame) return null;
    const game = games.find(g => g.id === selectedGame);
    switch (selectedGame) {
      case 'scenarios':
        return (
          <div className="game-content">
            <div className="scenario-container">
              <h3 className="scenario-title">{game.scenarios[currentScenario].title}</h3>
              <p className="scenario-context">{game.scenarios[currentScenario].context}</p>
              <div className="scenario-prompt">
                <p>{game.scenarios[currentScenario].prompt}</p>
              </div>
              <div className="scenario-tip">
                <p>💡 Tip: {game.scenarios[currentScenario].tips}</p>
              </div>
              <div className="recording-controls">
                <button onClick={isRecording ? stopRecording : startRecording} className={`record-button ${isRecording ? 'recording' : ''}`}>
                  {isRecording ? <MicOff className="button-icon" /> : <Mic className="button-icon" />}
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              </div>
              {showFeedback && <FeedbackPanel feedback={generateFeedback()} onNext={() => { setCurrentScenario((prev) => (prev + 1) % game.scenarios.length); setShowFeedback(false); setRecordedAudio(null); }} />}
            </div>
          </div>
        );
      case 'pronunciation':
        return (
          <div className="game-content">
            <div className="exercises-grid">
              {game.exercises.map((ex, i) => (
                <div key={i} className="exercise-card">
                  <h4 className="exercise-word">{ex.word}</h4>
                  <span className={`difficulty-badge ${ex.difficulty.toLowerCase()}`}>{ex.difficulty}</span>
                  <button className="practice-button">Practice</button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="default-game-content">
            <div className="default-game-container">
              <h3 className="default-game-title">{game.title}</h3>
              <p className="default-game-description">{game.description}</p>
              <button className="start-game-button">Start Game</button>
            </div>
          </div>
        );
    }
  };

  if (selectedGame) {
    return (
      <div className="game-page full-width">
        <div className="game-container">
          <div className="game-header">
            <button onClick={() => setSelectedGame(null)} className="back-button">←</button>
            <h1 className="game-page-title">{games.find(g => g.id === selectedGame)?.title}</h1>
          </div>
          {renderGameContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="main-page full-width">
      <div className="main-container">
        <div className="main-header-with-stats">
        <div className="main-header-text">
            <h1 className="main-title">Play & Learn Hub</h1>
            <p className="main-subtitle">
            Interactive games to improve your communication skills through practice and AI-powered feedback
            </p>
        </div>
        <div className="top-stats-circles">
  <div className="circle-stat">
    <div className="circle-number">24</div>
    <div className="circle-label">Scenarios</div>
  </div>
  <div className="circle-stat">
    <div className="circle-number">89%</div>
    <div className="circle-label">Score</div>
  </div>
  <div className="circle-stat">
    <div className="circle-number">12</div>
    <div className="circle-label">Hours</div>
  </div>
</div>

        </div>

        <div className="progress-card">
  <div className="progress-stats spaced">
    <div className="stat-item">
      <div className="stat-number">1</div>
      <div className="stat-label">Level</div>
    </div>
    <div className="stat-item">
      <div className="stat-number">0</div>
      <div className="stat-label">Total Score</div>
    </div>
    <div className="stat-item">
      <div className="stat-number">0</div>
      <div className="stat-label">Badges</div>
    </div>
  </div>
  <div className="achievement-badge">🏆 Communication Champion</div>
</div>

        <div className="games-grid">
          {games.map((game) => (
            <div key={game.id} onClick={() => setSelectedGame(game.id)} className="game-card">
              <div className={`game-card-content ${game.color}`}>
                <div className="game-card-header">
                  <div className="game-icon-container">{game.icon}</div>
                  <h3 className="game-card-title">{game.title}</h3>
                </div>
                <p className="game-card-description">{game.description}</p>
                <div className="game-card-footer">
                  <button className="start-playing-button">Start Playing</button>
                  <Play className="play-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default PlayLearnPage;
 
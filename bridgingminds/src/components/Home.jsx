import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Play, 
  ArrowRight,
  Flame,
  Star,
  Brain,
  Clock,
  Target,
  Zap,
  Volume2,
  Mic,
  Settings,
  Bell,
  Smile,
  Heart
} from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streakAnimation, setStreakAnimation] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    setTimeout(() => setStreakAnimation(true), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const recentActivities = [
    { name: 'Breathing Exercise', completed: true, xp: 10 },
    { name: 'Emotion Check-In', progress: 50, xp: 8 },
    { name: 'Used Visual Schedule', completed: true, xp: 5 }
  ];

  const handleStressBallTap = () => {
    setTapCount(prev => prev + 1);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="greeting-section">
            <h1 className="greeting">
              {getGreeting()}! 
            </h1>
            <p className="subtitle">Let's support your day, one step at a time.</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-button">
            <Bell size={20} />
          </button>
          <button className="icon-button">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Stress Relief Zone */}
      <div className="stress-relief-zone">
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: '#3c3f75',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          Stress Relief Zone
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Stress Ball */}
          <div className="stress-items">
            <button 
              className="stress-ball"
              onClick={handleStressBallTap}
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '1.5rem 2rem',
                borderRadius: '2rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(251, 191, 36, 0.3)',
                transition: 'all 0.2s ease',
                transform: 'scale(1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 12px 30px rgba(251, 191, 36, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 20px rgba(251, 191, 36, 0.3)';
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
            >
              <Smile size={28} />
              <span>Tap Me!</span>
            </button>
            <div className="tap-counter" style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#3c3f75',
              marginTop: '0.5rem'
            }}>
              Tapped {tapCount} times! 🎉
            </div>
          </div>

          {/* Breathing Animation */}
          <div className="breathing-box">
            <div className="breathing-circle" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
              border: '4px solid rgba(255, 255, 255, 0.8)'
            }}></div>
            <p className="breathing-text" style={{
              fontSize: '1.1rem',
              color: '#3c3f75',
              fontWeight: '600',
              marginTop: '1rem'
            }}>
              Breathe In... Breathe Out...
            </p>
          </div>
        </div>

        {/* Additional calming elements */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '1rem',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{
            fontSize: '0.9rem',
            color: '#6b7280',
            textAlign: 'center',
            margin: 0
          }}>
            💡 <strong>Tip:</strong> Take a moment whenever you feel overwhelmed. You're doing great! 
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="main-grid">
        {/* Daily Focus */}
        <div className="daily-challenge">
          <div className="bg-decoration bg-decoration-1"></div>
          <div className="bg-decoration bg-decoration-2"></div>
          <div className="challenge-content">
            <div className="challenge-header">
              <Target size={32} />
              <h2>Today's Focus</h2>
            </div>
            <h3 className="challenge-title">Take 3 Deep Breaths</h3>
            <p className="challenge-description">
              Breathing slowly helps calm your body and mind. Try it now!
            </p>
            <div className="challenge-actions">
              <button className="start-button">
                <Play size={20} />
                <span>Start Breathing</span>
                <ArrowRight size={20} />
              </button>
              <div className="xp-badge">
                <Award size={20} />
                <span>+10 XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Daily Progress</h3>
              <Flame size={24} className={`flame-icon ${streakAnimation ? 'bounce' : ''}`} />
            </div>
            <div className="stat-value">2 of 3 activities</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '66%'}}></div>
            </div>
            <div className="stat-subtitle">You're doing great today!</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Completed Tasks</h3>
              <Star size={24} className="star-icon" />
            </div>
            <div className="stat-value">5</div>
            <div className="stat-subtitle">Nice job staying on track!</div>
          </div>
        </div>
      </div>

      {/* Next Step & Quick Actions */}
      <div className="activity-grid">
        <div className="next-activity">
          <div className="activity-header">
            <div className="activity-icon">
              <Mic size={20} />
            </div>
            <h2>Next Step</h2>
          </div>
          <div className="activity-content">
            <h3>Emotion Check-In</h3>
            <p>How are you feeling now? Tap to share with your Buddy.</p>
            <div className="lesson-progress">
              <div className="lesson-progress-bar" style={{width: '50%'}}></div>
            </div>
            <div className="progress-text">50% complete</div>
          </div>
          <button className="continue-button">
            <Play size={20} />
            <span>Check In</span>
          </button>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-list">
            <button className="action-item">
              <div className="action-icon voice-icon">
                <Volume2 size={24} />
              </div>
              <div className="action-text">
                <div className="action-title">Play Calming Sound</div>
                <div className="action-subtitle">Take a short break</div>
              </div>
              <ArrowRight size={20} className="action-arrow" />
            </button>
            <button className="action-item">
              <div className="action-icon brain-icon">
                <Brain size={24} />
              </div>
              <div className="action-text">
                <div className="action-title">Play and Learn</div>
                <div className="action-subtitle">A safe space to learn, play, and express.</div>
              </div>
              <ArrowRight size={20} className="action-arrow" />
            </button>
            <button className="action-item">
              <div className="action-icon zap-icon">
                <Zap size={24} />
              </div>
              <div className="action-text">
                <div className="action-title">Translate My Words</div>
                <div className="action-subtitle">Help others understand me</div>
              </div>
              <ArrowRight size={20} className="action-arrow" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-grid">
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-list-item">
                <div className={`activity-list-icon ${activity.completed ? 'completed' : 'in-progress'}`}>
                  {activity.completed ? <Award size={20} /> : <Clock size={20} />}
                </div>
                <div className="activity-list-content">
                  <div className="activity-list-title">{activity.name}</div>
                  <div className="activity-list-status">
                    {activity.completed ? 'Completed' : `${activity.progress}% complete`}
                  </div>
                </div>
                <div className="activity-xp">+{activity.xp} XP</div>
              </div>
            ))}
          </div>
        </div>

        <div className="tip-card">
          <div className="tip-decoration"></div>
          <div className="tip-content">
            <div className="tip-emoji">💡</div>
            <h3>Daily Tip</h3>
            <p>
              Using a visual schedule can help you feel more prepared and calm. Try checking it each morning!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
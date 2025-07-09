import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Play, 
  ArrowRight,
  Flame,
  Star,
  Brain,
  Target,
  Zap,
  Volume2,
  Settings,
  Bell,
  Heart,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streakAnimation, setStreakAnimation] = useState(false);

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

  const quickActions = [
    {
      title: 'Play Calming Sound',
      subtitle: 'Take a short break',
      icon: <Volume2 size={20} />,
      bgColor: 'emerald-bg',
      iconColor: 'emerald-text'
    },
    {
      title: 'Play and Learn',
      subtitle: 'A safe space to learn and express',
      icon: <Brain size={20} />,
      bgColor: 'purple-bg',
      iconColor: 'purple-text'
    },
    {
      title: 'Translate My Words',
      subtitle: 'Help others understand me',
      icon: <Zap size={20} />,
      bgColor: 'orange-bg',
      iconColor: 'orange-text'
    }
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="greeting">
            {getGreeting()}! 
          </h1>
          <p className="subtitle">
            Let's support your day, one step at a time.
          </p>
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

      {/* Main Content */}
      <div className="main-content">
        {/* Daily Progress */}
        <div className="progress-card">
          <div className="progress-header">
            <h2 className="section-title">
              <Target size={24} className="title-icon blue" />
              Daily Progress
            </h2>
          <div className="progress-header-right">
  <div className="streak-info">
    <Flame size={18} className="flame-icon" />
    <span className="streak-text">3 day streak</span>
  </div>
  <div className="xp-info">
    <Star size={18} className="star-icon" />
    <span className="xp-number">23</span>
    <span className="xp-label">XP earned</span>
  </div>
</div>


            
          </div>

          {/* Progress Ring */}
          <div className="progress-ring-container">
            <div className="progress-ring">
              <svg className="ring-svg" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="314"
                  strokeDashoffset="104"
                  strokeLinecap="round"
                  className="progress-stroke"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="progress-center">
                <div className="progress-text">
                  <div className="progress-number">2/3</div>
                  <div className="progress-label">completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Items */}
          <div className="progress-items">
            <div className="progress-item completed">
              <CheckCircle2 size={20} className="item-icon" />
              <div className="item-content">
                <div className="item-title">Breathing Exercise</div>
                <div className="item-subtitle">Completed this morning</div>
              </div>
              <div className="item-xp">
                <Award size={16} />
                +10 XP
              </div>
            </div>
            
            <div className="progress-item in-progress">
              <div className="item-status-icon">
                <div className="status-dot"></div>
              </div>
              <div className="item-content">
                <div className="item-title">Emotion Check-In</div>
                <div className="item-subtitle">50% complete</div>
              </div>
              <div className="item-xp">
                <Award size={16} />
                +8 XP
              </div>
            </div>
            
            <div className="progress-item not-started">
              <div className="item-status-icon">
                <div className="status-circle"></div>
              </div>
              <div className="item-content">
                <div className="item-title">Visual Schedule</div>
                <div className="item-subtitle">Not started</div>
              </div>
              <div className="item-xp">
                <Award size={16} />
                +5 XP
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button className="continue-button">
            <Play size={20} />
            Continue Progress
          </button>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-card">
          <h2 className="section-title">
            <Zap size={24} className="title-icon purple" />
            Quick Actions
          </h2>
          
          <div className="actions-list">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="action-item"
              >
                <div className={`action-icon ${action.bgColor}`}>
                  <span className={action.iconColor}>{action.icon}</span>
                </div>
                <div className="action-content">
                  <div className="action-title">{action.title}</div>
                  <div className="action-subtitle">{action.subtitle}</div>
                </div>
                <ArrowRight size={20} className="action-arrow" />
              </button>
            ))}
          </div>
        </div>

        {/* Daily Tip */}
        <div className="daily-tip-card">
          <div className="tip-decoration-1"></div>
          <div className="tip-decoration-2"></div>
          
          <div className="tip-content">
            <div className="tip-header">
              <div className="tip-emoji">💡</div>
              <h2 className="tip-title">Daily Tip</h2>
            </div>
            <p className="tip-text">
              Using a visual schedule can help you feel more prepared and calm. Try checking it each morning to start your day with confidence!
            </p>
            <div className="tip-footer">
              <Calendar size={16} />
              <span className="tip-update">Updated daily</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="bottom-padding"></div>
    </div>
  );
};

export default Home;
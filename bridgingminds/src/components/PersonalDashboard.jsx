

import React, { useState } from 'react';
import { Trophy, Clock, Target, TrendingUp, Calendar, BookOpen, Flame, CheckCircle, Headphones } from 'lucide-react';
import '../styles/PersonalDashboard.css';

const PersonalDashboard = () => {

  const [userProfile] = useState({
    name: 'Amy',
    level: 'Intermediate',
    joinDate: '2024-01-15',
    totalLearningTime: 1250,
    currentStreak: 5,
    longestStreak: 12,
    sessionsCompleted: 45,
    wordsLearned: 156,
    phrasesCompleted: 89,
    accuracy: 78,
    weeklyGoal: 210,
    weeklyProgress: 180
  });

  const [todaysProgress] = useState({
    timeSpent: 35,
    exercisesCompleted: 5,
    wordsLearned: 8,
    accuracy: 82,
    goal: 30
  });

  const [weeklyData] = useState([
    { day: 'Mon', minutes: 35, exercises: 5, accuracy: 78, completed: true },
    { day: 'Tue', minutes: 42, exercises: 6, accuracy: 82, completed: true },
    { day: 'Wed', minutes: 28, exercises: 4, accuracy: 75, completed: true },
    { day: 'Thu', minutes: 38, exercises: 5, accuracy: 85, completed: true },
    { day: 'Fri', minutes: 45, exercises: 7, accuracy: 80, completed: true },
    { day: 'Sat', minutes: 0, exercises: 0, accuracy: 0, completed: false },
    { day: 'Sun', minutes: 32, exercises: 4, accuracy: 88, completed: true }
  ]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const ProgressTab = () => (
    <div className="space-y-6">
      <div className="todays-progress">
        <h3>Today's Learning Journey</h3>
        <div className="progress-stats">
          <div className="progress-stat"><div className="progress-stat-value">{todaysProgress.timeSpent}m</div><div className="progress-stat-label">Time Spent</div></div>
          <div className="progress-stat"><div className="progress-stat-value">{todaysProgress.exercisesCompleted}</div><div className="progress-stat-label">Exercises</div></div>
          <div className="progress-stat"><div className="progress-stat-value">{todaysProgress.wordsLearned}</div><div className="progress-stat-label">Words Learned</div></div>
          <div className="progress-stat"><div className="progress-stat-value">{todaysProgress.accuracy}%</div><div className="progress-stat-label">Accuracy</div></div>
        </div>
        <div className="goal-progress">
          <div className="goal-progress-header">
            <span>Daily Goal Progress</span>
            <span>{todaysProgress.timeSpent}/{todaysProgress.goal} minutes</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${Math.min((todaysProgress.timeSpent / todaysProgress.goal) * 100, 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="weekly-activity">
        <h3 className="section-header"><Calendar className="section-icon" />This Week's Activity</h3>
        <div className="week-grid">
          {weeklyData.map((day, index) => (
            <div key={index} className="day-column">
              <div className="day-label">{day.day}</div>
              <div className={`day-card ${day.completed ? 'completed' : 'incomplete'}`}>
                {day.completed && <CheckCircle className="day-check" />}
                <div className="day-minutes">{day.minutes}m</div>
                <div className="day-exercises">{day.exercises} exercises</div>
                {day.accuracy > 0 && <div className="day-accuracy">{day.accuracy}% accuracy</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon orange"><Flame className="w-5 h-5" /></div>
            <div><h3 className="stat-title">Current Streak</h3><p className="stat-value orange">{userProfile.currentStreak}</p></div>
          </div>
          <p className="stat-description">Keep it up! 🔥</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon blue"><BookOpen className="w-5 h-5" /></div>
            <div><h3 className="stat-title">Words Learned</h3><p className="stat-value blue">{userProfile.wordsLearned}</p></div>
          </div>
          <p className="stat-description">Amazing progress! 📚</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon green"><Target className="w-5 h-5" /></div>
            <div><h3 className="stat-title">Accuracy</h3><p className="stat-value green">{userProfile.accuracy}%</p></div>
          </div>
          <p className="stat-description">Getting better! 🎯</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon purple"><Clock className="w-5 h-5" /></div>
            <div><h3 className="stat-title">Total Time</h3><p className="stat-value purple">{formatTime(userProfile.totalLearningTime)}</p></div>
          </div>
          <p className="stat-description">Dedication pays off! ⏰</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="w-full px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hi {userProfile.name}! 👋</h1>
              <p className="text-gray-600 mt-1">Here's your learning journey so far</p>
            </div>
           <div className="level-box">
  <div className="level-label">Current Level</div>
  <div className="level-value">{userProfile.level}</div>
</div>

          </div>
        </div>
      </div>

      <div className="w-full px-6 py-6">
        
      <ProgressTab />
      </div>
    </div>
  );
};

export default PersonalDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext.jsx';
import '../../styles/LoginSignup.css';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, login, error, setError } = useAuth();
  const navigate = useNavigate();

  // Clear error when switching between login/signup
  useEffect(() => {
    setError(null);
  }, [isSignUp, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let result;
      
      if (isSignUp) {
        result = await register({ name, email, password });
        if (result.success) {
          // After successful registration, switch to login mode
          setIsSignUp(false);
          setEmail('');
          setPassword('');
          setMessage('Registration successful! Please sign in.');
        }
      } else {
        result = await login({ email, password });
        if (result.success) {
          // Navigate to home page after successful login
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setMessage = (msg) => {
    // This is a simple message display - you might want to use a toast library
    console.log(msg);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{isSignUp ? 'Sign Up' : 'Sign In'}</div>
        <div className="underline"></div>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="input">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
        )}
        <div className="input">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="input">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>
      </form>
      <div className="toggle-auth">
        {isSignUp ? (
          <span>Already have an account? <button onClick={() => setIsSignUp(false)} disabled={isSubmitting}>Sign In</button></span>
        ) : (
          <span>Don't have an account? <button onClick={() => setIsSignUp(true)} disabled={isSubmitting}>Sign Up</button></span>
        )}
      </div>
      {error && <div className="message error">{error}</div>}
    </div>
  );
};

export default LoginSignup;

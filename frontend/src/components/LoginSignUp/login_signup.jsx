import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const API_URL = 'http://localhost:3000/api/auth'; // Adjust if backend runs elsewhere

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const endpoint = isSignUp ? '/register' : '/login';
    const payload = isSignUp ? { name, email, password } : { email, password };
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        if (isSignUp) {
          setMessage('Registration successful! You can now sign in.');
          setIsSignUp(false);
        } else {
          setMessage('Login successful!');
          localStorage.setItem('token', data.token);
          // Redirect or update auth state here
        }
      } else {
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setMessage('Server error.');
    }
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
          />
        </div>
        <button type="submit" className="submit-btn">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <div className="toggle-auth">
        {isSignUp ? (
          <span>Already have an account? <button onClick={() => setIsSignUp(false)}>Sign In</button></span>
        ) : (
          <span>Don't have an account? <button onClick={() => setIsSignUp(true)}>Sign Up</button></span>
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default LoginSignup;

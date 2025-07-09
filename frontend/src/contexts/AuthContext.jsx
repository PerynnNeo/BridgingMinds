import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/userApi';

const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Register function
  const register = async (userData) => {
    try {
      console.log('Registering user:', userData);
      setError(null);
      const result = await authAPI.register(userData);
      console.log('Register result:', result);
      
      if (result.success) {
        // Backend returns { message, user, token }
        const { user, token } = result.data;
        setUser(user);
        authAPI.setAuthToken(token);
        console.log('User registered successfully:', user);
      } else {
        setError(result.error);
        console.error('Registration failed:', result.error);
      }
      
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      console.log('Logging in user:', credentials.email);
      setError(null);
      const result = await authAPI.login(credentials);
      console.log('Login result:', result);
      
      if (result.success) {
        // Backend returns { message, user, token }
        const { user, token } = result.data;
        setUser(user);
        authAPI.setAuthToken(token);
        console.log('User logged in successfully:', user);
      } else {
        setError(result.error);
        console.error('Login failed:', result.error);
      }
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    authAPI.removeAuthToken();
  };

  // Load user from token on app start
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    console.log('Loading user from token:', token ? 'Token exists' : 'No token');
    
    if (token) {
      authAPI.setAuthToken(token);
      
      const result = await authAPI.getCurrentUser();
      console.log('Load user result:', result);
      
      if (result.success) {
        // Backend returns { user }
        setUser(result.data.user);
        console.log('User loaded successfully:', result.data.user);
      } else {
        console.error('Failed to load user:', result.error);
        // Token might be invalid, remove it
        authAPI.removeAuthToken();
      }
    }
    
    setLoading(false);
  };

  // Refresh user data (useful for profile updates)
  const refreshUser = async () => {
    const result = await authAPI.getCurrentUser();
    
    if (result.success) {
      setUser(result.data.user);
      return result;
    } else {
      setError(result.error);
      return result;
    }
  };

  // Load user on component mount
  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    refreshUser,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
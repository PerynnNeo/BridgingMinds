import axios from 'axios';
import { config } from '../../config.js';

// Validate API URL is set
if (!config.API_URL) {
  console.error('VITE_API_URL is not set in .env file');
  throw new Error('API URL not configured. Please set VITE_API_URL in your .env file');
}

// Create axios instance with base URL from environment
const API = axios.create({
  baseURL: config.API_URL,
});

console.log('API Base URL:', config.API_URL);

// Add token to requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.ENABLE_DEBUG) {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
  }
  return config;
});

// Handle token expiration
API.interceptors.response.use(
  (response) => {
    if (config.ENABLE_DEBUG) {
      console.log('API Response:', response.status, response.data);
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  // Register user
  register: async (userData) => {
    try {
      if (config.ENABLE_DEBUG) {
        console.log('Making register request to:', '/api/auth/register');
      }
      const response = await API.post('/api/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      if (config.ENABLE_DEBUG) {
        console.error('Register API error:', errorMessage);
      }
      return { success: false, error: errorMessage };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      if (config.ENABLE_DEBUG) {
        console.log('Making login request to:', '/api/auth/login');
      }
      const response = await API.post('/api/auth/login', credentials);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      if (config.ENABLE_DEBUG) {
        console.error('Login API error:', errorMessage);
      }
      return { success: false, error: errorMessage };
    }
  },

  // Get current user data
  getCurrentUser: async () => {
    try {
      if (config.ENABLE_DEBUG) {
        console.log('Making getCurrentUser request to:', '/api/auth/me');
      }
      const response = await API.get('/api/auth/me');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching current user:', error);
      return { success: false, error: error.response?.data?.message || 'Failed to fetch user data' };
    }
  },

  // Set auth token
  setAuthToken: (token) => {
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      if (config.ENABLE_DEBUG) {
        console.log('Auth token set');
      }
    } else {
      delete API.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      if (config.ENABLE_DEBUG) {
        console.log('Auth token removed');
      }
    }
  },

  // Remove auth token
  removeAuthToken: () => {
    delete API.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    if (config.ENABLE_DEBUG) {
      console.log('Auth token removed');
    }
  }
};

// Export the configured axios instance for other API calls
export default API;
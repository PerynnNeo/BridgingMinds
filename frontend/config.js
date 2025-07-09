// Configuration file that uses environment variables from .env
// All values should be set in your .env file

export const config = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL,
  
  // Frontend Configuration
  PORT: import.meta.env.VITE_PORT,
  
  // Environment
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  
  // Feature Flags
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS !== 'false',
};

// Validate required environment variables
const requiredEnvVars = ['VITE_API_URL', 'VITE_PORT', 'VITE_NODE_ENV'];
const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
  console.error('Please check your .env file');
}

// Log configuration in development
if (config.NODE_ENV === 'development') {
  console.log('Frontend Configuration:', config);
} 
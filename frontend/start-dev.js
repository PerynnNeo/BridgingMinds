#!/usr/bin/env node

// Helper script to start development server with environment variables
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if .env file exists
const envPath = join(__dirname, '.env');
if (!existsSync(envPath)) {
  console.error('❌ .env file not found!');
  console.error('Please create a .env file with the following variables:');
  console.error('VITE_PORT=8000');
  console.error('VITE_API_URL=http://localhost:3000');
  console.error('VITE_NODE_ENV=development');
  console.error('VITE_ENABLE_DEBUG=true');
  process.exit(1);
}

// Read .env file
const envContent = readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value && key.startsWith('VITE_')) {
    envVars[key] = value.trim();
  }
});

// Validate required variables
const required = ['VITE_PORT', 'VITE_API_URL', 'VITE_NODE_ENV'];
const missing = required.filter(key => !envVars[key]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:', missing);
  console.error('Please check your .env file');
  process.exit(1);
}

console.log('✅ Environment variables loaded:');
console.log(`   Port: ${envVars.VITE_PORT}`);
console.log(`   API URL: ${envVars.VITE_API_URL}`);
console.log(`   Environment: ${envVars.VITE_NODE_ENV}`);
console.log('');

// Start the development server
console.log('🚀 Starting development server...');
const child = spawn('npx', ['vite'], {
  stdio: 'inherit',
  env: { ...process.env, ...envVars }
});

child.on('error', (error) => {
  console.error('❌ Failed to start development server:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code);
}); 
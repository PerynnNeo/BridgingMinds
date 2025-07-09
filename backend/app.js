
// backend/server.js - Add the missing screening route
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');




// Import routes
const authRoutes = require('./routes/auth'); //Auth Route

// Connect to database
connectDB();

const app = express();

// Trust proxy for IP address tracking (needed for quiz analytics)
app.set('trust proxy', true);

// Middleware
app.use(cors({
  origin: 'http://localhost:8000', // React app url
  credentials: true
}));

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Handle 404 routes - Fixed the wildcard route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
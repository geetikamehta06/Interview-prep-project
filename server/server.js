const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from client
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const forumRoutes = require('./routes/forumRoutes');

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/forum', forumRoutes);

// Create uploads directory for storing files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Hardcode the MongoDB URI that we know works from the test file
    const MONGO_URI = 'mongodb+srv://geetika:Harshit@cluster0.1e9685w.mongodb.net/interview-prep?retryWrites=true&w=majority';
    console.log('Connecting to MongoDB Atlas directly...');
    
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000
    });
    
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
};

connectDB();

// Start the server with port fallback mechanism
const startServer = async (initialPort) => {
  const findAvailablePort = async (startPort) => {
    let port = startPort;
    while (port < startPort + 10) { // Try up to 10 ports
      try {
        await new Promise((resolve, reject) => {
          const server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            resolve(server);
          }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
              console.log(`Port ${port} is busy, trying next port...`);
              port++;
              reject(err);
            } else {
              reject(err);
            }
          });
        });
        return port; // If successful, return the port
      } catch (err) {
        if (port === startPort + 9) {
          throw new Error('Could not find an available port after multiple attempts');
        }
        // Continue to next port
      }
    }
  };

  try {
    const port = await findAvailablePort(initialPort);
    console.log(`Server successfully started on port ${port}`);
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

// Initialize server with preferred port
const PORT = process.env.PORT || 5000;
startServer(PORT); 
const mongoose = require('mongoose');

// Use the connection string directly instead of from .env
const MONGO_URI = 'mongodb+srv://geetika:Harshit@cluster0.1e9685w.mongodb.net/interview-prep?retryWrites=true&w=majority';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000
    });
    
    console.log(`MongoDB connected successfully to: ${conn.connection.host}`);
    // Close the connection after successful test
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full error details:', error);
  }
}

// Run the test
testConnection(); 
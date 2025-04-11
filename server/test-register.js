const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

// Use the connection string directly
const MONGO_URI = 'mongodb+srv://geetika:Harshit@cluster0.1e9685w.mongodb.net/interview-prep?retryWrites=true&w=majority';

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full error details:', error);
    process.exit(1);
  }
}

async function testRegister() {
  try {
    console.log('Testing registration endpoint...');
    
    // Test user data
    const userData = {
      name: 'Test User',
      email: 'testuser' + Date.now() + '@example.com', // Use timestamp to ensure unique email
      password: 'password123',
      role: 'user'
    };
    
    console.log('Registering with data:', userData);
    
    // Make direct request to register endpoint
    const response = await axios.post('http://localhost:5000/api/users/register', userData);
    
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    
    console.log('Registration test complete!');
  } catch (error) {
    console.error('Registration failed!');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

async function runTests() {
  // First test the MongoDB connection
  await testConnection();
  
  // Then test the registration endpoint
  await testRegister();
  
  // Close MongoDB connection
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
}

// Run the tests
runTests(); 
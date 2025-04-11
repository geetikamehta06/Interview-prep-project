const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  uploadResume,
  uploadProfilePicture,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// File upload routes
router.post('/upload-resume', protect, (req, res, next) => {
  req.uploadType = 'resume';
  next();
}, upload.single('resume'), uploadResume);

router.post('/upload-profile-picture', protect, (req, res, next) => {
  req.uploadType = 'image';
  next();
}, upload.single('profilePicture'), uploadProfilePicture);

module.exports = router; 
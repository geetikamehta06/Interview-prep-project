const express = require('express');
const router = express.Router();
const {
  createInterview,
  getInterviews,
  getInterviewById,
  submitAnswer,
  completeInterview,
  bookmarkInterview,
  getPerformanceAnalytics,
} = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

// Protected routes
router.post('/', protect, createInterview);
router.get('/', protect, getInterviews);
router.get('/analytics', protect, getPerformanceAnalytics);
router.get('/:id', protect, getInterviewById);
router.put('/:id/complete', protect, completeInterview);
router.put('/:id/bookmark', protect, bookmarkInterview);

// Submit answer routes
router.put('/:id/answer/:questionIndex', protect, submitAnswer);

// Video/Audio upload route
router.post('/:id/upload/:questionIndex', protect, (req, res, next) => {
  const { type } = req.query;
  req.uploadType = type === 'video' ? 'video' : 'audio';
  next();
}, upload.single('media'), async (req, res) => {
  try {
    // Return file path to be used in submitAnswer
    const filePath = `/uploads/${req.uploadType || ''}/${req.file.filename}`;
    res.json({
      success: true,
      filePath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router; 
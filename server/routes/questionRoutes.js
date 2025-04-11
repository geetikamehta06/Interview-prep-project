const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getRandomQuestions,
  generateAIQuestions,
} = require('../controllers/questionController');
const { protect, recruiter } = require('../middleware/authMiddleware');

// Protected routes
router.get('/', protect, getQuestions);
router.get('/random', protect, getRandomQuestions);
router.get('/:id', protect, getQuestionById);

// Routes requiring admin/recruiter permissions
router.post('/', protect, recruiter, createQuestion);
router.put('/:id', protect, updateQuestion); // Update has custom permission check
router.delete('/:id', protect, deleteQuestion); // Delete has custom permission check

// AI question generation
router.post('/generate', protect, generateAIQuestions);

module.exports = router; 
const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  likePost,
  likeComment,
} = require('../controllers/forumController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected routes
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/comments', protect, addComment);
router.put('/:id/like', protect, likePost);
router.put('/:id/comments/:commentId/like', protect, likeComment);

module.exports = router; 
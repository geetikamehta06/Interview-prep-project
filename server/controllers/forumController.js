const ForumPost = require('../models/forumModel');

// @desc    Get all forum posts
// @route   GET /api/forum
// @access  Public
const getPosts = async (req, res) => {
  try {
    const { 
      category, 
      search, 
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};
    
    if (category) query.category = category;
    
    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Find posts
    const posts = await ForumPost.find(query)
      .populate('user', 'name profilePicture')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await ForumPost.countDocuments(query);

    res.json({
      success: true,
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get forum post by ID
// @route   GET /api/forum/:id
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id)
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new forum post
// @route   POST /api/forum
// @access  Private
const createPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    // Create post
    const post = await ForumPost.create({
      title,
      content,
      category,
      tags: tags || [],
      user: req.user._id,
    });

    const populatedPost = await ForumPost.findById(post._id).populate(
      'user',
      'name profilePicture'
    );

    res.status(201).json({
      success: true,
      post: populatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update forum post
// @route   PUT /api/forum/:id
// @access  Private (Only post creator)
const updatePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check if user is post creator
    if (post.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post',
      });
    }

    // Update post fields
    const { title, content, category, tags } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    post.tags = tags || post.tags;

    const updatedPost = await post.save();

    const populatedPost = await ForumPost.findById(updatedPost._id)
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');

    res.json({
      success: true,
      post: populatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete forum post
// @route   DELETE /api/forum/:id
// @access  Private (Only post creator or admin)
const deletePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check if user is post creator or admin
    if (post.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: 'Post removed',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add comment to post
// @route   POST /api/forum/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required',
      });
    }

    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Add comment
    post.comments.push({
      user: req.user._id,
      text,
    });

    await post.save();

    const updatedPost = await ForumPost.findById(req.params.id)
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');

    res.status(201).json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Like/unlike post
// @route   PUT /api/forum/:id/like
// @access  Private
const likePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check if post is already liked by the user
    const isLiked = post.likes.some(
      like => like.toString() === req.user._id.toString()
    );

    if (isLiked) {
      // Unlike the post
      post.likes = post.likes.filter(
        like => like.toString() !== req.user._id.toString()
      );
    } else {
      // Like the post
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({
      success: true,
      likes: post.likes.length,
      isLiked: !isLiked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Like/unlike comment
// @route   PUT /api/forum/:id/comments/:commentId/like
// @access  Private
const likeComment = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Find the comment
    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // Check if comment is already liked by the user
    const isLiked = comment.likes.some(
      like => like.toString() === req.user._id.toString()
    );

    if (isLiked) {
      // Unlike the comment
      comment.likes = comment.likes.filter(
        like => like.toString() !== req.user._id.toString()
      );
    } else {
      // Like the comment
      comment.likes.push(req.user._id);
    }

    await post.save();

    res.json({
      success: true,
      likes: comment.likes.length,
      isLiked: !isLiked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  likePost,
  likeComment,
}; 
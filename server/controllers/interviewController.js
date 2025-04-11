const Interview = require('../models/interviewModel');
const User = require('../models/userModel');

// @desc    Create new interview session
// @route   POST /api/interviews
// @access  Private
const createInterview = async (req, res) => {
  try {
    const { title, jobRole, difficulty, questions, mode } = req.body;

    // Create interview
    const interview = await Interview.create({
      user: req.user._id,
      title,
      jobRole,
      difficulty: difficulty || 'medium',
      questions: questions.map(q => ({
        question: q,
        answer: '',
      })),
      mode: mode || 'text',
    });

    // Add interview to user's interview history
    await User.findByIdAndUpdate(req.user._id, {
      $push: { interviewHistory: interview._id },
    });

    res.status(201).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all interviews for the logged-in user
// @route   GET /api/interviews
// @access  Private
const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'questions.question',
        select: 'text category difficulty',
      });

    res.json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get interview by ID
// @route   GET /api/interviews/:id
// @access  Private
const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate({
      path: 'questions.question',
      select: 'text category difficulty sampleAnswer',
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found',
      });
    }

    // Check if the interview belongs to the user
    if (interview.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this interview',
      });
    }

    res.json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Submit answer to a question in an interview
// @route   PUT /api/interviews/:id/answer/:questionIndex
// @access  Private
const submitAnswer = async (req, res) => {
  try {
    const { answer, videoUrl, audioUrl } = req.body;
    const { id, questionIndex } = req.params;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found',
      });
    }

    // Check if the interview belongs to the user
    if (interview.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this interview',
      });
    }

    // Update the answer for the specific question
    if (interview.questions[questionIndex]) {
      interview.questions[questionIndex].answer = answer || '';
      
      if (videoUrl) {
        interview.questions[questionIndex].videoUrl = videoUrl;
      }
      
      if (audioUrl) {
        interview.questions[questionIndex].audioUrl = audioUrl;
      }

      // Generate mock feedback (in a real app, this would use AI)
      const feedback = generateMockFeedback();
      interview.questions[questionIndex].feedback = feedback;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Question index out of range',
      });
    }

    // Check if all questions have been answered
    const allAnswered = interview.questions.every(q => q.answer.trim() !== '');
    if (allAnswered) {
      interview.status = 'completed';
      
      // Calculate overall score (average of all feedback scores)
      const totalScores = interview.questions.reduce((acc, q) => {
        return acc + (q.feedback.fluency + q.feedback.clarity + q.feedback.confidence) / 3;
      }, 0);
      
      interview.overallScore = (totalScores / interview.questions.length) * 10;
    }

    const updatedInterview = await interview.save();

    res.json({
      success: true,
      interview: updatedInterview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Complete interview
// @route   PUT /api/interviews/:id/complete
// @access  Private
const completeInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found',
      });
    }

    // Check if the interview belongs to the user
    if (interview.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this interview',
      });
    }

    // Update interview status
    interview.status = 'completed';
    
    // Calculate overall score (average of all feedback scores)
    const answeredQuestions = interview.questions.filter(q => q.answer.trim() !== '');
    if (answeredQuestions.length > 0) {
      const totalScores = answeredQuestions.reduce((acc, q) => {
        return acc + (q.feedback.fluency + q.feedback.clarity + q.feedback.confidence) / 3;
      }, 0);
      
      interview.overallScore = (totalScores / answeredQuestions.length) * 10;
    }

    const updatedInterview = await interview.save();

    res.json({
      success: true,
      interview: updatedInterview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Bookmark interview
// @route   PUT /api/interviews/:id/bookmark
// @access  Private
const bookmarkInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found',
      });
    }

    // Check if the interview belongs to the user
    if (interview.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to bookmark this interview',
      });
    }

    // Toggle bookmark status
    interview.isBookmarked = !interview.isBookmarked;

    const updatedInterview = await interview.save();

    res.json({
      success: true,
      isBookmarked: updatedInterview.isBookmarked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user performance analytics
// @route   GET /api/interviews/analytics
// @access  Private
const getPerformanceAnalytics = async (req, res) => {
  try {
    const interviews = await Interview.find({ 
      user: req.user._id,
      status: 'completed',
    });

    if (interviews.length === 0) {
      return res.json({
        success: true,
        message: 'No completed interviews found',
        analytics: {
          totalInterviews: 0,
          averageScore: 0,
          interviewsByDifficulty: { easy: 0, medium: 0, hard: 0 },
          scoreProgression: [],
          strengthAreas: [],
          improvementAreas: [],
        },
      });
    }

    // Calculate overall stats
    const totalInterviews = interviews.length;
    const averageScore = interviews.reduce((acc, interview) => acc + interview.overallScore, 0) / totalInterviews;

    // Count interviews by difficulty
    const interviewsByDifficulty = {
      easy: interviews.filter(i => i.difficulty === 'easy').length,
      medium: interviews.filter(i => i.difficulty === 'medium').length,
      hard: interviews.filter(i => i.difficulty === 'hard').length,
    };

    // Score progression over time
    const scoreProgression = interviews
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map(interview => ({
        date: interview.createdAt,
        score: interview.overallScore,
        title: interview.title,
      }));

    // Mock strength and improvement areas
    const strengthAreas = ['Communication', 'Technical knowledge', 'Problem-solving'];
    const improvementAreas = ['Confidence', 'Specific examples', 'Structured answers'];

    res.json({
      success: true,
      analytics: {
        totalInterviews,
        averageScore,
        interviewsByDifficulty,
        scoreProgression,
        strengthAreas,
        improvementAreas,
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

// Helper function to generate mock feedback
const generateMockFeedback = () => {
  return {
    fluency: Math.floor(Math.random() * 5) + 5, // Random score between 5-10
    clarity: Math.floor(Math.random() * 5) + 5,
    confidence: Math.floor(Math.random() * 5) + 5,
    comments: 'Good answer! Consider providing more specific examples to strengthen your response.',
  };
};

module.exports = {
  createInterview,
  getInterviews,
  getInterviewById,
  submitAnswer,
  completeInterview,
  bookmarkInterview,
  getPerformanceAnalytics,
}; 
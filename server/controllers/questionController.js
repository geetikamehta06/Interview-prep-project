const Question = require('../models/questionModel');

// @desc    Get all questions
// @route   GET /api/questions
// @access  Private
const getQuestions = async (req, res) => {
  try {
    const { 
      jobRole, 
      category, 
      difficulty, 
      search, 
      page = 1, 
      limit = 10 
    } = req.query;

    // Build query
    const query = {};
    
    if (jobRole) query.jobRole = jobRole;
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    
    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Find questions
    const questions = await Question.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await Question.countDocuments(query);

    res.json({
      success: true,
      questions,
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

// @desc    Get question by ID
// @route   GET /api/questions/:id
// @access  Private
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      'createdBy',
      'name'
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    res.json({
      success: true,
      question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new question
// @route   POST /api/questions
// @access  Private (Admin/Recruiter)
const createQuestion = async (req, res) => {
  try {
    const { text, category, jobRole, difficulty, sampleAnswer, tags } = req.body;

    // Create question
    const question = await Question.create({
      text,
      category,
      jobRole,
      difficulty: difficulty || 'medium',
      sampleAnswer: sampleAnswer || '',
      tags: tags || [],
      createdBy: req.user._id,
      isAIGenerated: false,
    });

    res.status(201).json({
      success: true,
      question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private (Admin/Recruiter/Creator)
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    // Check if user is creator or admin/recruiter
    if (
      question.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin' &&
      req.user.role !== 'recruiter'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this question',
      });
    }

    // Update question fields
    const { text, category, jobRole, difficulty, sampleAnswer, tags } = req.body;

    question.text = text || question.text;
    question.category = category || question.category;
    question.jobRole = jobRole || question.jobRole;
    question.difficulty = difficulty || question.difficulty;
    question.sampleAnswer = sampleAnswer || question.sampleAnswer;
    question.tags = tags || question.tags;

    const updatedQuestion = await question.save();

    res.json({
      success: true,
      question: updatedQuestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private (Admin/Recruiter/Creator)
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    // Check if user is creator or admin/recruiter
    if (
      question.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin' &&
      req.user.role !== 'recruiter'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this question',
      });
    }

    await question.deleteOne();

    res.json({
      success: true,
      message: 'Question removed',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get random questions for interview
// @route   GET /api/questions/random
// @access  Private
const getRandomQuestions = async (req, res) => {
  try {
    const { jobRole, difficulty, count = 5 } = req.query;

    if (!jobRole) {
      return res.status(400).json({
        success: false,
        message: 'Job role is required',
      });
    }

    // Build query
    const query = { jobRole };
    if (difficulty) query.difficulty = difficulty;

    // Find random questions
    const questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: parseInt(count) } },
    ]);

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Generate AI questions
// @route   POST /api/questions/generate
// @access  Private
const generateAIQuestions = async (req, res) => {
  try {
    const { jobRole, difficulty, count = 5 } = req.body;

    if (!jobRole) {
      return res.status(400).json({
        success: false,
        message: 'Job role is required',
      });
    }

    // Pre-defined questions by job role (simulating AI generation)
    const questionsByRole = {
      'Software Engineer': [
        'Describe the difference between a stack and a queue.',
        'Explain the concept of time complexity and provide examples.',
        'How would you implement a linked list in JavaScript?',
        'What is the difference between HTTP and HTTPS?',
        'Explain the MVC architecture pattern.',
        'What is the difference between let, const, and var in JavaScript?',
        'Describe a challenging project you worked on and how you solved problems.',
        'Explain RESTful API design principles.',
        'How do you approach debugging a complex issue?',
        'What is your experience with agile development methodologies?',
      ],
      'Data Analyst': [
        'Explain the difference between supervised and unsupervised learning.',
        'What tools have you used for data visualization?',
        'Describe a time when you had to clean messy data.',
        'How would you detect outliers in a dataset?',
        'Explain the difference between correlation and causation.',
        'What statistical methods do you commonly use in your analyses?',
        'How do you communicate technical findings to non-technical stakeholders?',
        'Describe your experience with SQL and database querying.',
        'What is your approach to validating the results of your analysis?',
        'How do you stay updated with the latest trends in data analysis?',
      ],
      'Project Manager': [
        'How do you handle scope creep in a project?',
        'Describe your approach to risk management.',
        'How do you prioritize tasks in a project with tight deadlines?',
        'Tell me about a time when you had to deal with a difficult team member.',
        'What project management methodologies are you familiar with?',
        'How do you ensure effective communication among team members?',
        'Describe a project that failed and what you learned from it.',
        'How do you track project progress?',
        'What tools do you use for project management?',
        'How do you handle budget constraints in a project?',
      ],
    };

    // Get questions for the selected job role (or default to generic)
    const availableQuestions = questionsByRole[jobRole] || [
      'Tell me about yourself.',
      'What are your strengths and weaknesses?',
      'Why are you interested in this role?',
      'Describe a challenging situation you faced and how you handled it.',
      'Where do you see yourself in 5 years?',
    ];

    // Select random questions from the available set
    const selectedQuestions = [];
    for (let i = 0; i < Math.min(count, availableQuestions.length); i++) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const question = availableQuestions.splice(randomIndex, 1)[0];
      
      // Create question object
      const newQuestion = new Question({
        text: question,
        category: 'general',
        jobRole,
        difficulty: difficulty || 'medium',
        createdBy: req.user._id,
        isAIGenerated: true,
      });
      
      await newQuestion.save();
      selectedQuestions.push(newQuestion);
    }

    res.status(201).json({
      success: true,
      questions: selectedQuestions,
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
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getRandomQuestions,
  generateAIQuestions,
}; 
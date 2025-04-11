const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'technical',
        'behavioral',
        'hr',
        'problem-solving',
        'leadership',
        'project-management',
        'other',
      ],
    },
    jobRole: {
      type: String,
      required: [true, 'Job role is required'],
      trim: true,
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty level is required'],
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    sampleAnswer: {
      type: String,
      default: '',
    },
    tags: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isAIGenerated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search optimization
questionSchema.index({ text: 'text', tags: 'text', jobRole: 'text' });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question; 
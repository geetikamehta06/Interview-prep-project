const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Interview title is required'],
      trim: true,
    },
    jobRole: {
      type: String,
      required: [true, 'Job role is required'],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    questions: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
          required: true,
        },
        answer: {
          type: String,
          default: '',
        },
        videoUrl: {
          type: String,
          default: '',
        },
        audioUrl: {
          type: String,
          default: '',
        },
        feedback: {
          fluency: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
          },
          clarity: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
          },
          confidence: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
          },
          comments: {
            type: String,
            default: '',
          },
        },
      },
    ],
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    totalDuration: {
      type: Number, // in seconds
      default: 0,
    },
    mode: {
      type: String,
      enum: ['video', 'audio', 'text'],
      default: 'text',
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed', 'reviewed'],
      default: 'in-progress',
    },
    feedback: {
      type: String,
      default: '',
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview; 
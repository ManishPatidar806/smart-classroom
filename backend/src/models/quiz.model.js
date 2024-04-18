import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";
  
// Define schema for quiz
const quizSchema = new Schema({
  title: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  questions: [{
      questionText: {
          type: String,
          required: true
      },
      options: {
          type: [String],
          required: true
      },
      correctOptionIndex: {
          type: Number,
          required: true
      }
  }],
  createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  }
},
{
  timestamps: true,
});

export const Quiz = mongoose.model("Quiz", quizSchema);


// Quiz Result Schema
const quizResultSchema = new Schema({
  quiz: {
    type: Schema.Types.ObjectId, // Reference to the User model
    ref: 'Quiz',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId, // Reference to the User model
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  incorrectAnswers: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  }
});

export const QuizResult = mongoose.model('quizResultSchema', quizResultSchema);
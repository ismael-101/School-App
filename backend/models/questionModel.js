import mongoose, { Schema, Types } from "mongoose";

const answerSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = mongoose.Schema({
  // _id: { type: Schema.Types.ObjectId, required: true },
  _id: { type: String, required: true },
  question: {
    type: String,
    required: true,
  },
  answers: [answerSchema],
});

const quizSchema = mongoose.Schema({
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  // _id: { type: Schema.Types.ObjectId, required: true },
  _id: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  // Lukas
  // category: String,
  // difficulty: String,
});

const Quiz = mongoose.model("Quiz", quizSchema);

export { Quiz };

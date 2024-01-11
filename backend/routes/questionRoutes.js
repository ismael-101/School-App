import express from "express";
import { Quiz } from "../models/questionModel.js";

const quizRouter = express.Router();

quizRouter.post("/", async (req, res) => {
  try {
    const quiz = new Quiz({
      _id: req.body._id,
      name: req.body.name,
      questions: req.body.questions.map((question) => ({
        _id: question._id,
        question,
        answers: question.answers.map((answer) => ({
          text: answer.text,
          isCorrect: answer.isCorrect,
        })),
      })),
    });

    const createdQuiz = await quiz.save();
    res.status(201).json(createdQuiz);
  } catch (error) {
    console.error("Error handling POST request:", error);
    res.status(400).json({ message: error.message });
  }
});

quizRouter.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default quizRouter;

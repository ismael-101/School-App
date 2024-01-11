import React, { useState } from "react";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Quiz {
  _id: string;
  question: string;
  answers: Answer[];
  selectedAnswer: number | null;
  answeredCorrectly: boolean;
}

function MainQuiz() {
  const fetchedQuiz: Quiz[] = [
    {
      _id: "1",
      question: "What is 1 + 1?",
      answers: [
        { text: "1", isCorrect: false },
        { text: "2", isCorrect: true },
        { text: "3", isCorrect: false },
        { text: "4", isCorrect: false },
      ],
      selectedAnswer: null,
      answeredCorrectly: false,
    },
    {
      _id: "2",
      question: "What is 1 + 2?",
      answers: [
        { text: "1", isCorrect: false },
        { text: "2", isCorrect: false },
        { text: "3", isCorrect: true },
        { text: "4", isCorrect: false },
      ],
      selectedAnswer: null,
      answeredCorrectly: false,
    },
    {
      _id: "3",
      question: "What is 1 + 3?",
      answers: [
        { text: "1", isCorrect: false },
        { text: "2", isCorrect: false },
        { text: "3", isCorrect: false },
        { text: "4", isCorrect: true },
      ],
      selectedAnswer: null,
      answeredCorrectly: false,
    },
  ];

  const [quizzes, setQuizzes] = useState<Quiz[]>(fetchedQuiz);
  const [userChoices, setUserChoices] = useState<{ [key: string]: number | null }>({});
  const alphabet = ["A", "B", "C", "D"];

  const handleAnswerClick = (quizId: string, answerIndex: number) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz._id === quizId
          ? {
              ...quiz,
              selectedAnswer: answerIndex,
              answeredCorrectly: quiz.answers[answerIndex].isCorrect,
            }
          : quiz
      )
    );
  
    setUserChoices((prevChoices) => {
      return {
        ...prevChoices,
        [quizId]: answerIndex,
      };
    });
  };
  
  const handleSendButtonClick = () => {
    const dataToSend = Object.entries(userChoices).map(([quizId, selectedAnswer]) => ({
      _id: quizId,
      selectedAnswer,
    }));
  
    console.log("Sending to database:", dataToSend);
    // You can implement your database submission logic here
  };

  const calculateScore = () => {
    return quizzes.reduce((totalScore, quiz) => {
      return totalScore + (quiz.answeredCorrectly ? 1 : 0);
    }, 0);
  };

  return (
    <div>
      <h1>Quiz</h1>
      <p>Score: {calculateScore()}</p>
      {quizzes.map((quiz) => (
        <div key={quiz._id}>
          <p>{quiz.question}</p>
          {quiz.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <label>
                <input
                  type="radio"
                  name={quiz._id}
                  onClick={() => handleAnswerClick(quiz._id, answerIndex)}
                />
                <span>
                  {alphabet[answerIndex]} - {answer.text}
                </span>
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSendButtonClick}>Send</button>
    </div>
  );
}

export default MainQuiz;


// import { useState } from "react";

// interface QuizData {
//   _id?: string;
//   name: string;
//   questions: Question[];
// }
// interface Question {
//   _id?: string;
//   question: string;
//   answers: Answer[];
// }
// interface Answer {
//   _id?: string;
//   text: string;
//   isCorrect: boolean;
// }

// function Quiz() {
//   const [quiz, setQuiz] = useState<QuizData[]>([]);
//   const [ques, setQues] = useState<string>("");
//   const [answers, setAnswers] = useState<Answer[]>(
//     Array.from({ length: 4 }, () => ({ text: "", isCorrect: false }))
//   );

//   const [questions, setQuestions] = useState<Question[]>([]);

//   const handleAddQuestion = () => {
//     // Validate inputs before adding a question
//     if (
//       ques.trim() === "" ||
//       answers.some((answer) => answer.text.trim() === "")
//     ) {
//       console.error("Please fill in all fields");
//       return;
//     }

//     // Validate that at least one answer is marked as correct
//     if (!answers.some((answer) => answer.isCorrect)) {
//       console.error("Please mark at least one answer as correct");
//       return;
//     }

//     // Create a new question with the answers
//     const newQuestion: Question = {
//       question: ques,
//       answers: [...answers],
//     };

//     setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

//     // Clear input fields and reset answer options after adding a question
//     setQues("");
//     setAnswers(
//       Array.from({ length: 4 }, () => ({ text: "", isCorrect: false }))
//     );
//   };

//   const handleSaveQuestion = async () => {
//     // Validate that at least one question has been added
//     if (questions.length === 0) {
//       console.error("Please add at least one question");
//       return;
//     }
//     // Save the questions to the database
//     try {
//       // Send a POST request to save the questions to the database
//       const response = await fetch("http://localhost:5000/api/quiz", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(questions),
//       });

//       if (response.ok) {
//         console.log("Questions saved to the database successfully");
//       } else {
//         console.error("Failed to save questions to the database");
//       }
//     } catch (error) {
//       console.error("Error saving questions to the database:", error);
//     }
//     console.log(questions);
//   };

//   const handleUpdateAnswer = (index: number, value: string) => {
//     // Update the text of an answer at the specified index
//     setAnswers((prevAnswers) =>
//       prevAnswers.map((ans, i) =>
//         i === index ? { text: value, isCorrect: ans.isCorrect } : ans
//       )
//     );
//   };

//   const handleToggleCorrect = (index: number) => {
//     // Toggle the correctness of an answer
//     setAnswers((prevAnswers) =>
//       prevAnswers.map((ans, i) =>
//         i === index ? { ...ans, isCorrect: !ans.isCorrect } : ans
//       )
//     );
//   };

//   return (
//     <>
//       <h1>Quiz</h1>
//       <div>
//         <label>Quiz Name</label>
//         <input type="text" value={quiz} onChange={setQuiz} />
//       </div>
//       <div>
//         <label>Question:</label>
//         <input
//           type="text"
//           value={ques}
//           onChange={(e) => setQues(e.target.value)}
//         />
//       </div>

//       {/* Answers */}
//       {answers.map((answer, index) => (
//         <div key={index}>
//           <label>Answer {index + 1}:</label>
//           <input
//             type="text"
//             value={answer.text}
//             onChange={(e) => handleUpdateAnswer(index, e.target.value)}
//           />
//           <button onClick={() => handleToggleCorrect(index)}>
//             {answer.isCorrect ? "True" : "False"}
//           </button>
//         </div>
//       ))}

//       <button onClick={handleAddQuestion}>Add Question</button>

//       {/*Lukas <input placeholder="Set Category" />
//       <input placeholder="Set Difficulty" /> */}

//       {/* Display added questions */}
//       <div>
//         <h2>Added Questions:</h2>
//         <ul>
//           {quiz.name}
//           {questions.map((q, index) => (
//             <li key={index}>
//               {q.question} - Answers:{" "}
//               {q.answers.map((ans) => ans.text).join(", ")}
//             </li>
//           ))}
//         </ul>
//         <button onClick={handleSaveQuestion}>save</button>
//         {questions.length > 0 && (
//           <button onClick={() => setQuestions([])}>clear</button>
//         )}
//       </div>
//     </>
//   );
// }

// export default Quiz;
import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from  'uuid'

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
}

interface QuizData {
  name: string;
  questions: Question[];
}

const QuizCreationComponent: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData>({
    name: "",
    questions: [
      {
        question: "",
        answers: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    isAnswer = false
  ) => {
    const { name, value } = e.target;
    const updatedQuiz: QuizData = { ...quizData };

    if (name === "name") {
      // Update quiz name
      updatedQuiz.name = value;
    } else if (isAnswer) {
      // Update answer text
      const answerIndex = parseInt(name, 10);
      updatedQuiz.questions[index].answers[answerIndex].text = value;
    } else {
      // Update question text
      const questionIndex = index;
      const updatedQuestions = [...updatedQuiz.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        [name]: value,
      };

      updatedQuiz.questions = updatedQuestions;
    }

    setQuizData(updatedQuiz);
  };

  const handleAddQuestion = () => {
    setQuizData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        {
          question: "",
          answers: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
    }));
  };

  const handleAddAnswer = (questionIndex: number) => {
    setQuizData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[questionIndex].answers.push({
        text: "",
        isCorrect: false,
      });
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleCreateQuiz = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/quiz", {
        _id: uuidv4(), // Use a library like 'uuid' to generate a unique ID
        name: quizData.name,
        questions: quizData.questions.map((question) => ({
          _id: uuidv4(), // Generate a unique ID for each question
          question: question.question,
          answers: question.answers,
        })),
      });
      console.log("Quiz Created:", response.data);
      // You can handle the response as needed
    } catch (error) {
      console.error("Error creating quiz:", error);
      // You can handle errors here
    }
  };

  const handleAnswerCheckboxChange = (
    questionIndex: number,
    answerIndex: number
  ) => {
    // Add your logic for handling checkbox changes here
    const updatedQuiz = { ...quizData };
    updatedQuiz.questions[questionIndex].answers[answerIndex].isCorrect =
      !updatedQuiz.questions[questionIndex].answers[answerIndex].isCorrect;
    setQuizData(updatedQuiz);
  };

  return (
    <div>
      <h1>Create a Quiz</h1>
      <label>
        Quiz Name:
        <input
          type="text"
          name="name"
          value={quizData.name}
          onChange={(e) => handleInputChange(e, 0)}
        />
      </label>

      {quizData.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label>
            Question:
            <input
              type="text"
              name="question"
              value={question.question}
              onChange={(e) => handleInputChange(e, questionIndex)}
            />
          </label>

          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <label>
                Answer {answerIndex + 1}:
                <input
                  type="text"
                  name={answerIndex.toString()}
                  value={answer.text}
                  onChange={(e) => handleInputChange(e, questionIndex, true)}
                />
              </label>
              <label>
                Correct Answer:
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={() =>
                    handleAnswerCheckboxChange(questionIndex, answerIndex)
                  }
                />
              </label>
            </div>
          ))}

          <button onClick={() => handleAddAnswer(questionIndex)}>
            Add Answer
          </button>
        </div>
      ))}

      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleCreateQuiz}>Create Quiz</button>
    </div>
  );
};

export default QuizCreationComponent;

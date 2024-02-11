import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import logo from "../../assets/Q-removebg-preview.png";
import { RootState } from "../../store/store";
import StartQuizCard from "./components/StartQuizCard";
import "../../styles/StartQuiz.css";
import SuccessModal from "../../components/modal/SuccessModal";

const StartExamPage: React.FC = () => {
  const [attemptedQuestion, setAttemptedQuestion] = useState({});
  const [result, setResult] = useState();
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: RootState) => state.token.token);
  const startQuizData = useSelector(
    (state: RootState) => state.StartQuiz.startQuiz
  );

  const submitQuizHandler = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3002/exam",
        { quizId: id, attemptedQuestion },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      if (res.data.status === "success") {
        setResult(res.data.data.result);
        setIsExamSubmitted(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="absolute z-50 -top-[100px] w-full bg-[#FEF9C3]">
      <img src={logo} alt="" width={100} className="ml-10" />

      <div className="start-quiz-container">
        <div className="w-[90%] pb-4">
          <h1 className="text-center text-4xl text-[#064E3B]">
            {startQuizData.name}
          </h1>
          <div className="flex flex-col sm:flex-row items-center sm:justify-around mt-4 text-xl">
            <h2>
              Category:{" "}
              <span className="text-[#475569]">{startQuizData.category}</span>
            </h2>
            <h2>
              Passing Percentage:{" "}
              <span className="text-[#475569]">
                {startQuizData.passingPercentage}%
              </span>
            </h2>
          </div>
        </div>

        <div className="start-quiz-card-container">
          {startQuizData.questionList.map(
            (
              question: {
                _id: string;
                question: string;
                questionNumber: number;
                options: { 1: ""; 2: ""; 3: ""; 4: "" };
              },
              index
            ) => {
              return (
                <StartQuizCard
                  question={question}
                  index={index}
                  attemptedQuestion={attemptedQuestion}
                  setAttemptedQuestion={setAttemptedQuestion}
                  key={question._id}
                />
              );
            }
          )}
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-text bg-[#fdba74]">
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => submitQuizHandler(startQuizData._id)}
              className="submit-btn"
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {isExamSubmitted && (
        <SuccessModal
          successMessage="Submitted"
          optionalMessage={`Result : ${result}`}
          subTitle="Go to Home"
          isExamSubmitted={isExamSubmitted}
        />
      )}
    </div>
  );
};

export default StartExamPage;

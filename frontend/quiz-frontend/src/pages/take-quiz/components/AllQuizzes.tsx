import React, { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { RootState } from "../../../store/store";
import { getAllPublishedQuiz } from "../../../store/slices/allQuizSlice";
import { startQuiz } from "../../../store/slices/startExamSlice";

interface AllQuizPropsType {
  searchInput: string;
}

const AllQuizzes: React.FC<AllQuizPropsType> = ({ searchInput }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allPublishedQuiz, setAllPublishedQuiz] = useState<[]>();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllQuizdata = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "http://localhost:3002/quiz/allpublishedquiz",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllPublishedQuiz(res.data.data);
        if (res.data.status === "success") {
          dispatch(getAllPublishedQuiz(res.data.data));
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllQuizdata();
  }, [token, dispatch]);

  const AllQuizData =
    searchInput === "all" || searchInput === undefined
      ? allPublishedQuiz
      : allPublishedQuiz?.filter(
          (allQuiz: any) =>
            allQuiz.name.toLowerCase().includes(searchInput) ||
            allQuiz.category.toLowerCase().includes(searchInput)
        );

  const startExam = async (quizId: string) => {
    try {
      const res = await axios.get(`http://localhost:3002/exam/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status === "success") {
        dispatch(startQuiz(res.data.data));
        navigate("/start-exam");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pb-5 px-10 pt-10">
      <h1 className="text-4xl font-[sans] text-[#1E293B] text-center">
        Take Quiz
      </h1>
      {AllQuizData?.length ? (
        <div className="quiz-cards-container">
          {AllQuizData?.map((quiz: any) => {
            return (
              <React.Fragment key={quiz._id}>
                {isLoading ? (
                  <div className="animated-background h-32"></div>
                ) : (
                  <div className="quiz-card-contianer relative">
                    <div className="quiz-name-card">
                      <h1 className="text-xl">{quiz.name}</h1>
                    </div>
                    <div className="bottom-line"></div>
                    <div className="quiz-card">
                      <h1 className="text-xl">{quiz.name}</h1>
                      <h3>
                        Category: <span>{quiz.category}</span>
                      </h3>
                      <h4>
                        Passing Percentage:{" "}
                        <span>{quiz.passingPercentage}%</span>
                      </h4>
                      <button
                        className="start-quiz-btn"
                        onClick={() => startExam(quiz._id)}
                      >
                        Start Exam
                      </button>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20">
          <p className="text-center text-xl">No Quiz Found</p>
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            // ariaLabel="falling-lines-loading"
          />
        </div>
      )}
    </div>
  );
};

export default AllQuizzes;

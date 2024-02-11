import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

import { RootState } from "../../store/store";
import "../../styles/singleQuiz.css";
import LoaderModel from "../../components/modal/LoaderModel";
import OnSuccessModal from "../../components/modal/OnSuccessModal";

interface SingleQuizProps {
  setPublishing: Dispatch<SetStateAction<boolean>>;
}

const SingleQuizPage: React.FC<SingleQuizProps> = ({ setPublishing }) => {
  const [isPublished, setIsPublished] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [data, setData] = useState<any>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token.token);
  // const myQuizzes = useSelector((state: RootState) => state.myQuiz.quizData);
  const param = useParams();

  const publishQuizHandler = async (quizId: string) => {
    const publishQuizId = {
      quizId,
    };
    try {
      setPublishing(true);
      const res = await axios.patch(
        "http://localhost:3002/quiz/publish",
        publishQuizId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPublishing(false);
      if (res.data.status === "success") {
        setIsPublished(true);
        setTimeout(() => {
          setIsPublished(false);
          navigate("/my-quizzes");
        }, 1000);
      }
    } catch (error) {
      setPublishing(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchParticularQuizData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3002/quiz/${param.quizId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === "success") {
          setData(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchParticularQuizData();
  }, [param.quizId, token]);

  const deleteQuizHandler = async () => {
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `http://localhost:3002/quiz/${param.quizId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsDeleting(false);
      if (res.data.status === "success") {
        setIsDeleted(true);
        setTimeout(() => {
          setIsDeleted(false);
          navigate("/my-quizzes");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="ml-6 w-5 cursor-pointer text-xl">
        <FaArrowLeftLong onClick={() => navigate("/my-quizzes")} />
      </h1>
      <div className="relative flex flex-col py-10 px-3 sm:px-6 md:px-10">
        <div className="quiz-content">
          <div className="flex justify-between pb-6 px-0 md:px-4 text-[#164E63] text-sm sm:text-lg">
            <div>
              <h1>
                Quiz Name: <span className="text-[#0E7490]">{data?.name}</span>
              </h1>
              <h1>
                Category:{" "}
                <span className="text-[#0E7490]">{data?.category}</span>
              </h1>
              <h1>
                Published:{" "}
                {data?.isPublished ? (
                  <span className="text-[#0E7490]">Yes</span>
                ) : (
                  <span className="text-[#0E7490]">No</span>
                )}
              </h1>
            </div>
            <div>
              <h1>
                Passing Percentage:{" "}
                <span className="text-[#0E7490]">
                  {data?.passingPercentage}%
                </span>
              </h1>
              {data?.isPublicQuiz ? (
                <h1 className="text-[#0E7490]">Public Quiz</h1>
              ) : (
                <h1 className="text-[#0E7490]">Private Quiz</h1>
              )}
            </div>
          </div>

          <div>
            {data?.questionList.map((questionPack: any) => {
              return (
                <div key={questionPack._id} className="question-pack">
                  <h1 className="font-semibold">
                    <span>{questionPack.questionNumber}. </span>{" "}
                    {questionPack.question}
                  </h1>
                  <div className="px-0 sm:px-4">
                    <p>1) {questionPack.options[1]}</p>
                    <p>2) {questionPack.options[2]}</p>
                    <p>3) {questionPack.options[3]}</p>
                    <p>4) {questionPack.options[4]}</p>
                  </div>
                  <h1 className="pt-1 text-[#14532D] font-semibold">
                    <span>answer: </span>{" "}
                    {data?.answers[questionPack.questionNumber]}
                  </h1>
                </div>
              );
            })}
          </div>

          {data?.isPublished || (
            <>
              <div className="relative flex flex-col items-center gap-3 pt-4 mt-4">
                <div>
                  {" "}
                  <button className="btns update-btn uppercase mr-4">
                    Update
                  </button>
                  <button
                    className="btns uppercase"
                    onClick={() => publishQuizHandler(data?._id)}
                  >
                    Publish
                  </button>
                </div>
                <button
                  className="back-btn"
                  onClick={() => setDeleteConfirmation(true)}
                >
                  DELETE
                </button>
                {deleteConfirmation && (
                  <div className="absolute w-[300px] top-[-30px] bg-[#fff] rounded-md p-6">
                    <div className="flex justify-end">
                      <RxCross1
                        className="cursor-pointer text-[#837f7f]"
                        onClick={() => setDeleteConfirmation(false)}
                      />
                    </div>
                    <div className="flex flex-col gap-6 items-center">
                      <div className="del-icon-cont">
                        <RxCross1 className="del-icon" />
                      </div>
                      <h1 className="text-xl">Are you sure?</h1>
                      <p className="text-[#a8a8aa] text-sm">
                        Do you really want to delete this?
                      </p>
                      <div className="flex justify-center gap-2 w-full">
                        <button
                          className="popup-btns bg-[#c1c1c1]"
                          onClick={() => setDeleteConfirmation(false)}
                        >
                          Cancel
                        </button>{" "}
                        <button
                          className="popup-btns bg-[#b91c1c]"
                          onClick={deleteQuizHandler}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {isDeleting && <LoaderModel text="Deleting" />}
                {isDeleted && <OnSuccessModal text="deleted" />}
              </div>
            </>
          )}
        </div>

        {isPublished && <OnSuccessModal text="Published" />}

        <h1 className="mt-6 ml-10 w-5 cursor-pointer text-xl">
          <FaArrowLeftLong onClick={() => navigate("/my-quizzes")} />
        </h1>
      </div>
    </>
  );
};

export default SingleQuizPage;

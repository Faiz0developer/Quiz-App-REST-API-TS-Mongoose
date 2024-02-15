import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { MdDoubleArrow } from "react-icons/md";
import { FallingLines } from "react-loader-spinner";
import axios from "axios";

import { myQuizData } from "../../store/slices/quizSlice";
import { RootState } from "../../store/store";
import "../../styles/myQuiz.css";
import { BsCalendar2DateFill } from "react-icons/bs";
import { ConnectionResponse } from "../../utils/interfaces";

interface MyQuizType {
  _id: string;
  isPublished: boolean;
  name: string;
  category: string;
  createdAt: any;
}

const MyQuizPage: React.FC<ConnectionResponse> = ({setIsConnectionError}) => {
  const [searchInput, setSearchInput] = useState("");
  const [myQuizzes, setMyQuizzes] = useState<MyQuizType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const myQuizDataFetch = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://quizzle-app-backend.vercel.app/quiz", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setMyQuizzes(res.data.data);
        if (res.data.status === "success") {
          dispatch(myQuizData(res.data.data));
        }
      } catch (error) {
        setIsLoading(false);
        setIsConnectionError(true)
      }
    };

    myQuizDataFetch();
  }, [token, dispatch]);

  const singleQuizDataHandler = (quizId: string) => {
    navigate(`/my-quizzes/${quizId}`);
  };

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const searchInputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchInput(e.target.value);
  };

  const quizData =
    searchInput === "all"
      ? myQuizzes
      : myQuizzes?.filter(
          (myQuiz) =>
            myQuiz.name.toLowerCase().includes(searchInput) ||
            myQuiz.category.toLowerCase().includes(searchInput)
        );

  return (
    <div className="px-2 py-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="my-quiz-loader-wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <span>Loading</span>
          </div>
        </div>
      ) : (
        <>
          <div className="px-4 my-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-evenly">
              <div className="search-input">
                <input
                  type="search"
                  className="bg-[#64748B] h-full focus:outline-none"
                  placeholder="Search (small letter)"
                  onChange={searchInputHandler}
                  value={searchInput}
                />
                <CiSearch className="icon" />
                <div className="drop-down">
                  <select name="" id="" onChange={searchInputHandler}>
                    <option value="all">All</option>
                    <option value="exam" className="p-2">
                      Exam
                    </option>
                    <option value="test">Test</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="my-quiz-card-container px-0 sm:px-4 my-12 pt-2">
            {quizData?.length ? (
              <>
                {quizData?.map((myQuiz) => {
                  return (
                    <div key={myQuiz._id} className="wrapper">
                      <div
                        className="tooltip flex items-center justify-between relative mt-2 py-4 px-4 cursor-pointer"
                        onClick={() => singleQuizDataHandler(myQuiz._id)}
                      >
                        {/* <h1
                          className={`tooltipText ${
                            myQuiz.isPublished
                              ? "text-[#16A34A]"
                              : "text-[#EF4444]"
                          }`}
                        >
                          {myQuiz.isPublished ? "Published" : "Not Published"}
                        </h1> */}
                        <div>
                          <h1 className="text-lg sm:text-2xl text-[#9c4a45] truncate font-semibold">
                            {myQuiz.name}
                          </h1>
                          <div className="flex truncate text-[#9c4a45]">
                            <p className="text-sm truncate mt-0.5">
                              <span>{myQuiz.category} |</span>
                            </p>
                            <div className="flex items-center italic truncate text-sm ml-2">
                            <BsCalendar2DateFill />
                              <p className="ml-1 mt-0.5">{`${new Date(
                                myQuiz.createdAt
                              ).getDate()}-${
                                month[new Date(myQuiz.createdAt).getMonth()]
                              }-${new Date(
                                myQuiz.createdAt
                              ).getFullYear()}`}</p>
                            </div>
                          </div>
                        </div>
                        <h1 className={`${
                            myQuiz.isPublished
                              ? "text-[#16A34A]"
                              : "text-[#EF4444]"
                          }`}>{myQuiz.isPublished ? "Published" : "Not Published"}</h1>
                        {/* <MdDoubleArrow className="get-icon get-icon-1" />
                        <MdDoubleArrow className="get-icon get-icon-2" /> */}
                        {/* <MdDoubleArrow className="get-icon-2"/> */}
                        {/* <MdDoubleArrow/> */}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex flex-col h-[70vh] items-center mt-20">
                <p className="text-center text-xl">No quiz to show</p>
                <FallingLines
                  color="#4fa94d"
                  width="100"
                  visible={true}
                  // ariaLabel="falling-lines-loading"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyQuizPage;

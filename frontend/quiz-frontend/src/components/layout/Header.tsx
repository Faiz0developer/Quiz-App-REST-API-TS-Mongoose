import React, { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TfiAlignJustify } from "react-icons/tfi";
import { GiCardQueenDiamonds, GiHook } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { MdQuiz } from "react-icons/md";
import { AiOutlineIdcard, AiTwotoneAppstore } from "react-icons/ai";
import axios from "axios";

import logo from "../../assets/Q-removebg-preview.png";
import { RootState } from "../../store/store";
import "../../styles/header.css";
import { getUserData } from "../../store/slices/userSlice";

interface HeaderProps {
  isMobileView: boolean;
  isSideBarVisibe: boolean;
  setIsMobileView: Dispatch<SetStateAction<boolean>>;
  setIsSideBarVisibe: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  isMobileView,
  setIsMobileView,
  isSideBarVisibe,
  setIsSideBarVisibe,
}) => {
  const token = useSelector((state: RootState) => state.token.token);
  const dispatch = useDispatch();

  const getUseerDataHandler = async () => {
    setIsSideBarVisibe(true);
    try {
      const res = await axios.get("http://localhost:3002/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;
      if (data.status === "success") {
        dispatch(getUserData(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyQuizzesHandler = (flag: string) => {
    setIsMobileView(false);
  };

  return (
    <header className="relative  flex justify-between px-6 items-center">
      <div className="header-container ">
        <div className="small-screen">
          <TfiAlignJustify
            className="text-xl cursor-pointer"
            onClick={() => setIsMobileView(!isMobileView)}
          />
          <GiHook className={`${isMobileView ? "hook-1" : "hook"}`} />
          {isMobileView && (
            <div className="mobile-view">
              {isMobileView && <div className="hole"></div>}
              <ul className="relative flex flex-col items-center text-[#fff] gap-6 mt-3">
                <li
                  className="li-1"
                  onClick={() => getMyQuizzesHandler("home")}
                >
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Home
                  </NavLink>{" "}
                </li>
                <li
                  className="li-2"
                  onClick={() => getMyQuizzesHandler("create-quiz")}
                >
                  <NavLink to="/create-quiz-home">Create Quiz</NavLink>{" "}
                </li>
                <li
                  className="li-3"
                  onClick={() => getMyQuizzesHandler("myQuiz")}
                >
                  <NavLink to="/my-quizzes">My Quizzes</NavLink>{" "}
                </li>
                <li
                  onClick={() => getMyQuizzesHandler("AllQuiz")}
                  className="li-4"
                >
                  <NavLink to="/all-published-quiz">All Quizzes</NavLink>{" "}
                </li>
                <li
                  className="li-5"
                  onClick={() => getMyQuizzesHandler("report")}
                >
                  <NavLink to="/report">Report</NavLink>{" "}
                </li>
              </ul>
            </div>
          )}
        </div>
        <img src={logo} alt="" width={100} className="min-[1000px]:ml-20" />
      </div>

      <div className="big-screen ml-10">
        <ul className="flex items-center text-[#0F172A] gap-2 ">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-1" : "")}
            >
              <IoMdHome className="text-xl" /> Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink
              to="/create-quiz-home"
              className={({ isActive }) => (isActive ? "active-1" : "")}
            >
              <MdQuiz className="text-xl" /> Create Quiz
            </NavLink>{" "}
          </li>
          <li onClick={() => getMyQuizzesHandler("myQuiz")}>
            <NavLink
              to="/my-quizzes"
              className={({ isActive }) => (isActive ? "active-1" : "")}
            >
              <GiCardQueenDiamonds className="text-xl" /> My Quizzes
            </NavLink>{" "}
          </li>
          <li onClick={() => getMyQuizzesHandler("AllQuiz")}>
            <NavLink
              to="/all-published-quiz"
              className={({ isActive }) => (isActive ? "active-1" : "")}
            >
              <AiTwotoneAppstore className="text-xl" /> Take the quiz
            </NavLink>{" "}
          </li>
          <li>
            <NavLink
              to="/report"
              className={({ isActive }) => (isActive ? "active-1" : "")}
            >
              <AiOutlineIdcard className="text-xl" /> Report
            </NavLink>{" "}
          </li>
        </ul>
      </div>

      <div
        className={`flex justify-center items-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#94A3B8] cursor-pointer`}
        onClick={getUseerDataHandler}
      >
        <i className="fa-solid fa-user-tie text-xl sm:text-3xl"></i>
      </div>
    </header>
  );
};

export default Header;

import React, { Dispatch, SetStateAction } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/home/HomePage";
import CreateQuizPage from "../pages/create-quiz/CreateQuizPage";
import MyQuizPage from "../pages/my-quiz/MyQuizPage";
import AllQuizzesPage from "../pages/take-quiz/AllQuizzesPage";
import ReportPage from "../pages/report/ReportPage";
import ChangeNamePage from "../pages/sidebar-pages/ChangeNamePage";
import ChangePasswordPage from "../pages/sidebar-pages/change-password/ChangePasswordPage";
import FavoriteQuestionPage from "../pages/sidebar-pages/favorite-questions/FavoriteQuestionPage";
import SingleQuizPage from "../pages/my-quiz/SingleQuizPage";
import StartExamPage from "../pages/start-exam/StartExamPage";

interface AppRoutesProps {
  setPublishing: Dispatch<SetStateAction<boolean>>;
  setIsConnectionError: Dispatch<SetStateAction<boolean>>;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ setPublishing,setIsConnectionError }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-quiz-home" element={<CreateQuizPage setIsConnectionError={setIsConnectionError}/>} />
      <Route path="/my-quizzes" element={<MyQuizPage setIsConnectionError={setIsConnectionError}/>} />
      <Route
        path="/my-quizzes/:quizId"
        element={<SingleQuizPage setPublishing={setPublishing} setIsConnectionError={setIsConnectionError} />}
      />
      <Route path="/all-published-quiz" element={<AllQuizzesPage setIsConnectionError={setIsConnectionError}/>} />
      <Route path="/start-exam" element={<StartExamPage setIsConnectionError={setIsConnectionError}/>} />
      <Route path="/report" element={<ReportPage setIsConnectionError={setIsConnectionError}/>} />
      <Route path="/change-name" element={<ChangeNamePage setIsConnectionError={setIsConnectionError}/>} />
      <Route path="/change-password" element={<ChangePasswordPage setIsConnectionError={setIsConnectionError}/>} />
      <Route path="/favorite-questions" element={<FavoriteQuestionPage setIsConnectionError={setIsConnectionError}/>} />
    </Routes>
  );
};

export default AppRoutes;

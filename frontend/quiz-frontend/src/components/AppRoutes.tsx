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
}

const AppRoutes: React.FC<AppRoutesProps> = ({ setPublishing }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-quiz-home" element={<CreateQuizPage />} />
      <Route path="/my-quizzes" element={<MyQuizPage />} />
      <Route
        path="/my-quizzes/:quizId"
        element={<SingleQuizPage setPublishing={setPublishing} />}
      />
      <Route path="/all-published-quiz" element={<AllQuizzesPage />} />
      <Route path="/start-exam" element={<StartExamPage />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/change-name" element={<ChangeNamePage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/favorite-questions" element={<FavoriteQuestionPage />} />
    </Routes>
  );
};

export default AppRoutes;

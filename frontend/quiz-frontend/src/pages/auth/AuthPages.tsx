import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./auth-pages/LoginPage";
import RegisterPage from "./auth-pages/RegisterPage";
import VerifyOtpPage from "./auth-pages/VerifyOtpPage";
import ForgotPasswordPage from "./auth-pages/ForgotPasswordPage";
import ActivateAccountPage from "./auth-pages/ActivateAccountPage";
import { ConnectionResponse } from "../../utils/interfaces";

const AuthPages: React.FC<ConnectionResponse> = ({
  setIsConnectionError,
}) => {
  return (
    <BrowserRouter>
      <div className="font-[karla]">
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                setIsConnectionError={setIsConnectionError}
              />
            }
          />
          <Route path="/user-register" element={<RegisterPage />} />
          <Route path="/verify-user" element={<VerifyOtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/activate-account" element={<ActivateAccountPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AuthPages;

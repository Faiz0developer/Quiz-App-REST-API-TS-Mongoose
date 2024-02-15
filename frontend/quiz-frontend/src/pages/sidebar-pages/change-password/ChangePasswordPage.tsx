import React, { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

import logo from "../../../assets/Q-removebg-preview.png";
import { RootState } from "../../../store/store";
import ChangePasswordInput from "./components/ChangePasswordInput";
import "../../../styles/passwordChange.css";
import { ConnectionResponse } from "../../../utils/interfaces";

const ChangePasswordPage: React.FC<ConnectionResponse> = ({
  setIsConnectionError
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentPasswordTouched, setIsCurrentPasswordTouched] =
    useState(false);
  const [isNewPasswordTouched, setIsNewPasswordTouched] = useState(false);
  const [isRetypePasswordTouched, setIsRetypePasswordTouched] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token.token);
  const [changePasswordDetails, setChangePasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setChangePasswordDetails({ ...changePasswordDetails, [name]: value });
  };

  const changePasswordHandler = async () => {
    try {
      if (
        changePasswordDetails.currentPassword !== "" &&
        changePasswordDetails.newPassword !== "" &&
        changePasswordDetails.confirmPassword !== ""
      ) {
        setIsLoading(true);
        const res = await axios.put(
          "https://quizzle-app-backend.vercel.app/user/changepassword",
          changePasswordDetails,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLoading(false);
        if (res.data.status === "success") {
          setChangePasswordDetails({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          toast.success(res.data.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } else {
        toast.error("All fields are mandatory!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error: any) {
      const { data } = error.response;
      if (error.response.data.status === "error") {
        if (error.response.status >= 500) {
          setIsLoading(false);
          setIsConnectionError(true);
        } else {
          toast.error(
            `${
              data.data.length ? data.data[0].msg : error.response.data.message
            }`,
            {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="password-container">
      <div className="bg-[#FEF9C3] px-5">
        <img src={logo} alt="" width={80} />
      </div>

      <div className="pass-content">
        <div className="left-container">
          <h1 className="">Change Password</h1>
          <p className="">Password must contain:</p>
          <ul className="text-[#6B7280]">
            <li>At least 8 characters</li>
            <li>At least 1 uppercase letter (A-Z)</li>
            <li>At least 1 lowercase letter (a-z)</li>
            <li>At least 1 number (0-9)</li>
            <li>At least 1 special character (@,#,*,$,&)</li>
          </ul>
        </div>
        <div className="right-container">
          <ChangePasswordInput
            placeholder="Current Password"
            name="currentPassword"
            value={changePasswordDetails.currentPassword}
            onChange={inputHandler}
            onFocus={() => setIsCurrentPasswordTouched(false)}
            onBlur={() => setIsCurrentPasswordTouched(true)}
            passwordTouched={isCurrentPasswordTouched}
          />
          <ChangePasswordInput
            placeholder="New Password"
            name="newPassword"
            value={changePasswordDetails.newPassword}
            onChange={inputHandler}
            onFocus={() => setIsNewPasswordTouched(false)}
            onBlur={() => setIsNewPasswordTouched(true)}
            passwordTouched={isNewPasswordTouched}
          />
          <ChangePasswordInput
            placeholder="Re-type New Password"
            name="confirmPassword"
            value={changePasswordDetails.confirmPassword}
            onChange={inputHandler}
            onFocus={() => setIsRetypePasswordTouched(false)}
            onBlur={() => setIsRetypePasswordTouched(true)}
            passwordTouched={isRetypePasswordTouched}
          />
          <div className="mt-6 relative">
            <button
              className="btn w-full text-[#fff]"
              onClick={changePasswordHandler}
            >
              Save
            </button>
            {isLoading && (
              <div className="loader">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              </div>
            )}
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <h2 className="text-center text-[#475569]">
            <span
              className="cursor-pointer hover:text-[#991B1B]"
              onClick={() => navigate("/")}
            >
              Cancel
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

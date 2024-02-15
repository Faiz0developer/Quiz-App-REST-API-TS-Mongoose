import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";

import logo from "../../../assets/Q-removebg-preview.png";
import EyeButton from "../../../components/EyeButton";
import { userRegister } from "../../../store/slices/userRegisterSlice";

const RegisterPage: React.FC = () => {
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
  const [userFields, setUserFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserFields({ ...userFields, [name]: value });
  };

  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        userFields.name !== "" ||
        userFields.email !== "" ||
        userFields.password !== "" ||
        userFields.confirmPassword !== ""
      ) {
        setIsLoading(true);
        const res = await axios.post(
          "https://quizzle-app-backend.vercel.app/auth/",
          userFields,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = res;
        setIsLoading(false);
        if (data.status === "success") {
          console.log(data);
          let timer = 150;
          const time = setInterval(() => {
            const min = String(Math.trunc(timer / 60)).padStart(2, "0");
            const sec = String(timer % 60).padStart(2, "0");
            const otptext = document.querySelector(".otp-timer");
            if (otptext) {
              otptext.textContent = `${min}:${sec}`;
            }
            const disabledButton = document.querySelector(
              ".resendOtpButton"
            ) as HTMLButtonElement;
            if (disabledButton) {
              disabledButton.disabled = true;
            }
            timer--;
            if (timer === 0) {
              clearInterval(time);
              if (otptext) {
                otptext.textContent = "00:00";
              }
              if (disabledButton) {
                disabledButton.disabled = false;
              }
            }
          }, 1000);
            dispatch(userRegister(data));
            navigate("/verify-user");
        }
      } else {
        toast.error("Provide all fields", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error: any) {
      console.log(error);
      const { data } = error.response.data;
      if (error.response.data.status === "error") {
        toast.error(`${data[0].msg}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-[#FEF9C3] flex justify-center  items-center h-[100vh]">
      <div className=" w-[90%] min-[350px]:w-[80%] min-[500px]:w-[60%] md:w-[40%] lg:w-[30%] py-2 px-4 rounded-md">
        <div className="flex flex-col items-center">
          <img src={logo} alt="" width={200} />
        </div>

        <div className="mb-6">
          <h1 className="text-center text-[#9c4a45] text-xl md:text-2xl font-medium">
            CREATE ACCOUNT
          </h1>
        </div>

        <form onSubmit={signUpHandler}>
          <div className="inputs flex flex-col gap-4 mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="name"
                className={`text-[#fff] ${
                  userFields.name === "" &&
                  userFields.name.length < 4 &&
                  isNameTouched &&
                  "input-error"
                }`}
                onChange={inputHandler}
                value={userFields.name}
                name="name"
                onFocus={() => setIsNameTouched(false)}
                onBlur={() => setIsNameTouched(true)}
              />
              {userFields.name === "" &&
              userFields.name.length < 4 &&
              isNameTouched ? (
                <p className="error ">
                  Name must not be empty and minimum 4 character long!
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="email"
                className={`text-[#fff] ${
                  userFields.email === "" &&
                  !userFields.email.includes("@") &&
                  isEmailTouched &&
                  "input-error"
                }`}
                onChange={inputHandler}
                value={userFields.email}
                name="email"
                onFocus={() => setIsEmailTouched(false)}
                onBlur={() => setIsEmailTouched(true)}
              />
              {userFields.email === "" &&
                !userFields.email.includes("@") &&
                isEmailTouched && (
                  <p className="error ">
                    Email must not be empty and must contain @!
                  </p>
                )}
            </div>

            <div
              className={`relative ${
                userFields.password === "" ||
                userFields.password.length < 8 ||
                (!userFields.password.includes("@") &&
                  !userFields.password.includes("&") &&
                  !userFields.password.includes("#") &&
                  !userFields.password.includes("$") &&
                  !userFields.password.includes("*"))
                  ? "pass-validity"
                  : ""
              }`}
            >
              <EyeButton
                placeholder="Password (8 character long)"
                onChange={inputHandler}
                value={userFields.password}
                name="password"
              />
            </div>
            
            <div className="relative">
              <EyeButton
                placeholder="Confirm Password"
                onChange={inputHandler}
                value={userFields.confirmPassword}
                name="confirmPassword"
                onFocus={() => setIsConfirmPasswordTouched(false)}
                onBlur={() => setIsConfirmPasswordTouched(true)}
              />
              {userFields.confirmPassword === "" &&
                isConfirmPasswordTouched && (
                  <p className="error ">
                    Confirm Password field must not be empty!
                  </p>
                )}
            </div>
          </div>
          
          <div className="mt-8 relative">
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
              <button className="btn w-full text-[#fff]">Create Account</button>
            )}
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
            <h1 className="text-center mt-4 text-[#0F172A]">
              Have already an account?{" "}
              <span
                className="text-[#9c4a45] hover:underline cursor-pointer"
                onClick={() => navigate("/")}
              >
                {" "}
                Login here!
              </span>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

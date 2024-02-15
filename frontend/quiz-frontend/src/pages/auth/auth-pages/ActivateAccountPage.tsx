import axios from "axios";
import React, { useState } from "react";
import { BsShieldLockFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

import EyeButton from "../../../components/EyeButton";
import SuccessModal from "../../../components/modal/SuccessModal";

const ActivateAccountPage: React.FC = () => {
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isKeyTouched, setIsKeyTouched] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [isActivate, setIsActivate] = useState(false);
  const [activationDetails, setActivationDetails] = useState({
    email: "",
    key: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setActivationDetails({ ...activationDetails, [name]: value });
  };

  const activateAccountHandler = async () => {
    try {
      if (activationDetails.email !== "" && activationDetails.key !== "") {
        setIsActivating(true);
        const res = await axios.post(
          "https://quizzle-app-backend.vercel.app/auth/activateaccount",
          activationDetails,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = res;
        setIsActivating(false);
        if (data.status === "success") {
          setIsActivate(true);
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
      const { data } = error.response;
      if (data.status === "error") {
        toast.error(`${data.message}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsActivating(false);
      }
    }
  };

  return (
    <div className="bg-[#FEF9C3] flex justify-center items-center ">
      <div className="px-4 text-[#9c4a45] py-28 w-[90%] min-[350px]:w-[80%] min-[500px]:w-[60%] md:w-[40%] lg:w-[30%]">
        <div className="flex justify-center mb-10">
          <BsShieldLockFill className="text-[100px]" />
        </div>

        <div className="p-2 mt-4">
          <h1 className="text-center text-2xl min-[500px]:text-3xl mb-3">
            Activate Your Account
          </h1>
        </div>

        <div className="inputs flex flex-col gap-6 py-6 ">
          <div className="relative">
            <input
              type="email"
              onChange={inputHandler}
              value={activationDetails.email}
              name="email"
              className={`text-[#fff] ${
                activationDetails.email === "" &&
                isEmailTouched &&
                "input-error"
              }`}
              placeholder="Email"
              onFocus={() => setIsEmailTouched(false)}
              onBlur={() => setIsEmailTouched(true)}
            />
            {activationDetails.email === "" && isEmailTouched && (
              <p className="error ">
                Field must not be empty and must contain @!
              </p>
            )}
          </div>
          <div className="relative">
            <EyeButton
              placeholder="Key"
              onChange={inputHandler}
              value={activationDetails.key}
              name="key"
              onFocus={() => setIsKeyTouched(false)}
              onBlur={() => setIsKeyTouched(true)}
            />
            {activationDetails.key === "" && isKeyTouched && (
              <p className="error ">Field must not be empty!</p>
            )}
          </div>
        </div>

        <div className="relative flex justify-center mt-8">
          <button
            className={`btn w-full text-[#fff]`}
            onClick={activateAccountHandler}
          >
            Activate Account
          </button>
          {isActivating ? (
            <div className="loader">
              <RotatingLines
                strokeColor="#064E3B"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            </div>
          ) : (
            ""
          )}
          <ToastContainer
            position="bottom-left"
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
        </div>
      </div>
      {isActivate && (
        <SuccessModal
          successMessage="Account has been activated."
          subTitle="Now login to your account"
          optionalMessage="Now you have one more try for login. If again failed, account will be blocked for 24 hours"
        />
      )}
    </div>
  );
};

export default ActivateAccountPage;

import axios from "axios";
import React, { useState } from "react";
import { GiThink } from "react-icons/gi";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userEmail = {
    email,
  };

  const forgotPasswrodHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3002/auth/forgotpassword",
        userEmail,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      const { data } = error.response.data;
      if (error.response.data.status === "error") {
        toast.error(
          `${
            Object.keys(data).length === 0
              ? error.response.data.message
              : data[0].msg
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
  };
  
  return (
    <div className="bg-[#FEF9C3] flex justify-center items-center ">
      <div className="px-4 text-[#9c4a45] py-28 w-[90%] min-[350px]:w-[80%] min-[500px]:w-[60%] md:w-[40%] lg:w-[35%]">
        <div className="flex justify-center mb-10">
          <GiThink className="text-[100px]" />
        </div>

        <div className="p-2 mt-4">
          <h1 className="text-center text-2xl min-[500px]:text-3xl mb-3">
            Forgot your password
          </h1>
          <p className="text-center pt-4">
            Please enter email address you'd like your password reset
            information sent to
          </p>
        </div>

        <div className="inputs flex flex-col gap-6 py-6 ">
          <input
            className="text-[#fff]"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="relative flex justify-center mt-8">
          <button
            className={`btn w-full text-[#fff]`}
            onClick={forgotPasswrodHandler}
          >
            Forgot Password
          </button>
          {isLoading ? (
            <div className="loader">
              <RotatingLines
                strokeColor="grey"
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
        </div>

        <h1 className="text-center mt-4 text-[#0F172A]">
          Or
          <span
            className="text-[#9c4a45] ml-1 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            {" "}
            Login here!
          </span>
        </h1>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

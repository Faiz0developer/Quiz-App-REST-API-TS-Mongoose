import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MdKey,
  MdOutlineDoNotDisturbOn,
  MdOutlineFavorite,
  MdOutlinePowerSettingsNew,
  MdOutlineSettings,
} from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "../../../styles/sidebar.css";
import { RootState } from "../../../store/store";
import SidebarMenu from "./SidebarMenu";
import { setToken } from "../../../store/slices/tokenSice";
import logo from "../../../assets/Q-removebg-preview.png";

interface SidebarProps {
  isSideBarVisibe: boolean;
  setIsSideBarVisibe: Dispatch<SetStateAction<boolean>>;
  setLoggingOut: Dispatch<SetStateAction<boolean>>;
  setIsConnectionError: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  setIsSideBarVisibe,
  isSideBarVisibe,
  setLoggingOut,
  setIsConnectionError
}) => {
  const [onLogout, setOnLogout] = useState(false);
  const [onDeactivate, setOnDeactivate] = useState(false);
  const [showDeactivateModel, setShowDeactivateModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpInput, setOtpInput] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.token);
  const user = useSelector((state: RootState) => state.user);

  const clickHandler = (flag: string) => {
    if (flag === "name") {
      navigate("/change-name");
      setIsSideBarVisibe(false);
    } else if (flag === "password") {
      navigate("/change-password");
      setIsSideBarVisibe(false);
    } else if (flag === "logout") {
      setOnLogout(true);
    } else if (flag === "deactivate") {
      setOnDeactivate(true);
    } else if (flag === "favorite") {
      navigate("/favorite-questions");
      setIsSideBarVisibe(false);
    }
  };

  const logoutHandler = async () => {
    setIsSideBarVisibe(false);
    try {
      setLoggingOut(true);
      const res = await axios.post(
        "http://localhost:3002/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoggingOut(false);
      if (res.data.status === "success") {
        dispatch(setToken(""));
        navigate("/");
      }
    } catch (error) {
      setLoggingOut(false);
      setIsConnectionError(true)
    }
  };

  const deactivateHandler = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:3002/user/deactivate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status === "success") {
        setShowDeactivateModel(true);
        setOnDeactivate(false);
      }
    } catch (error) {
      setIsConnectionError(true)
    }
  };

  const deactivateAccountHandler = async () => {
    setIsLoading(true);
    const otpData = {
      otp: otpInput,
    };
    try {
      const res = await axios.post(
        "http://localhost:3002/user/deactivate/verify-deactivate-account-otp",
        otpData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      if (res.data.status === "success") {
        setIsSideBarVisibe(false);
        toast.success("Account Deactivate Successfully", {
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
          dispatch(setToken(""));
        }, 3000);
        console.log(res.data);
      }
    } catch (error) {
      setIsLoading(false);
      setIsConnectionError(true)
    }
  };

  const userEmail = user.email.split("");
  userEmail.splice(3, 15, "*", "*", "*", "*", "*");
  const paddedEmail = userEmail.join("");

  return (
    <div className="sidebar">
      <div className="relative">
        <div className="flex justify-between py-4 items-center border-b-2 border-[#e1e4e7] px-3.5">
          <div className="flex items-center">
            <div
              className={`flex justify-center items-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#94A3B8]`}
            >
              <i className="fa-solid fa-user-tie text-xl sm:text-3xl"></i>
            </div>
          </div>
          <div
            className="h-8 w-8 text-center bg-[#F1F5F9] rounded cursor-pointer hover:bg-[#CBD5E1]"
            onClick={() => setIsSideBarVisibe(false)}
          >
            <h1 className="mt-0.5 text-lg text-[#94A3B8] hover:text-[#0F172A]">
              X
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-10 relative">
          <div className="px-3.5 pb-3">
            <h1 className="text-xl text-[#493143] uppercase">{user.name}</h1>
            <h1 className="text-[#64748B] text-sm sm:text-base">
              {user.email}
            </h1>
          </div>
          <SidebarMenu
            icon=<MdOutlineSettings className="text-[#0F172A]" />
            heading="Change Name"
            subHeading="Manage your name"
            onClickHandler={() => clickHandler("name")}
          />
          <SidebarMenu
            icon=<MdKey className="text-[#0F172A]" />
            heading="Change Password"
            subHeading="Manage your password"
            onClickHandler={() => clickHandler("password")}
          />
          <SidebarMenu
            icon=<MdOutlineFavorite className="text-[#0F172A]" />
            heading="Favourite"
            subHeading="Favorite Questions"
            onClickHandler={() => clickHandler("favorite")}
          />
          <SidebarMenu
            icon=<MdOutlineDoNotDisturbOn className="text-[#0F172A]" />
            heading="Deactivate Account"
            subHeading="Deactivate your account"
            onClickHandler={() => clickHandler("deactivate")}
          />
          {onDeactivate && (
            <div className="absolute ml-2 flex flex-col items-center bottom-[-130px] z-50 w-[95%] bg-[#e1e4e7] rounded-md p-4">
              <h1 className="text-xl">Are you sure?</h1>
              <div className="w-full">
                <p
                  className="text-center rounded cursor-pointer hover:bg-[#DC2626] text-lg mt-1"
                  onClick={deactivateHandler}
                >
                  Yes
                </p>{" "}
                <p
                  className="text-center rounded cursor-pointer hover:bg-[#22C55E] text-lg"
                  onClick={() => setOnDeactivate(false)}
                >
                  No
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col relative items-center py-10 z-20">
          {onLogout ? (
            <div className="absolute flex flex-col items-center w-[95%] bg-[#e1e4e7] rounded-md p-4">
              <h1 className="text-xl">Are you sure?</h1>
              <div className="w-full">
                <p
                  className="text-center rounded cursor-pointer hover:bg-[#DC2626] text-lg mt-1"
                  onClick={logoutHandler}
                >
                  Yes
                </p>{" "}
                <p
                  className="text-center rounded cursor-pointer hover:bg-[#22C55E] text-lg"
                  onClick={() => setOnLogout(false)}
                >
                  No
                </p>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center gap-1 text-red-800 cursor-pointer"
              onClick={() => clickHandler("logout")}
            >
              <MdOutlinePowerSettingsNew />
              <h1 className="text-lg hover:text-red-700">Logout</h1>
            </div>
          )}

          <img src={logo} alt="" width={100} />
        </div>

        {showDeactivateModel && (
          <div className="deactivate-model">
            <h1 className="text-xl">Deactivate your account</h1>
            <h3 className="text-center">
              OTP has been sent to{" "}
              <span className="italics text-[#64748B]">{paddedEmail} </span>{" "}
              please verify!
            </h3>
            <input
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOtpInput(e.target.value)
              }
            />

            <div className="relative">
              {isLoading ? (
                <div className="absolute w-full h-full">
                  <div className="loading-text-deactivate bg-[#DC2626]">
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
                <button
                  className="deactivate-btn h-full"
                  onClick={deactivateAccountHandler}
                >
                  Deactivate Account
                </button>
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
            <button
              onClick={() => setShowDeactivateModel(false)}
              className="hover:text-[#475569]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

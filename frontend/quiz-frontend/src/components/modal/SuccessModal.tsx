import React from "react";
import ReactDOM from "react-dom";
import { AiFillRightCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

interface ModalProp {
  successMessage?: string;
  subTitle?: string;
  optionalMessage?: string;
  isExamSubmitted?: boolean;
}

const BackDrop = () => {
  return <div className="backdrop" />;
};

const ModelOverlay: React.FC<ModalProp> = ({
  successMessage,
  subTitle,
  optionalMessage,
  isExamSubmitted,
}) => {
  const navigate = useNavigate();
  return (
    <div className="modal w-[80%] md:w-[40%] h-[400px] left-[10%] md:left-[25%] top-[20vh] font-[karla]">
      <div className="flex flex-col items-center mt-8">
        <AiOutlineCheckCircle className="bg-[#16A34A] w-12 h-12 p-1.5 rounded-full" />
        <div className="pb-2 pt-4">
          <h1 className="text-center text-xl min-[550px]:text-2xl my-2">
            Successfully
          </h1>
          <p className="text-lg min-[550px]:text-xl text-center">
            {successMessage}
          </p>
          <p className={`text-center ${isExamSubmitted && "text-xl"}`}>
            {optionalMessage}
          </p>
        </div>
        <div className="py-2 px-4 flex flex-col items-center gap-2">
          {isExamSubmitted && (
            <>
              <h1 className="text-base min-[550px]:text-lg text-center">
                Check Result{" "}
                <Link
                  to="/report"
                  className="text-[#64748B] hover:text-[#701A75] underline"
                >
                  here
                </Link>
              </h1>
              <p>or</p>
            </>
          )}
          <h1 className="text-base min-[550px]:text-lg text-center">
            {subTitle}
          </h1>
          <AiFillRightCircle
            className="text-3xl hover:bg-[#4ADE80] rounded-full cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

const SuccessModal: React.FC<ModalProp> = ({
  successMessage,
  subTitle,
  optionalMessage,
  isExamSubmitted,
}) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop_root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModelOverlay
          successMessage={successMessage}
          subTitle={subTitle}
          optionalMessage={optionalMessage}
          isExamSubmitted={isExamSubmitted}
        />,
        document.getElementById("overlay_root") as HTMLElement
      )}
    </React.Fragment>
  );
};

export default SuccessModal;

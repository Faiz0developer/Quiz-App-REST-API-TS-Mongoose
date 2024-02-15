import React from "react";
import ReactDOM from "react-dom";
import { RotatingLines } from "react-loader-spinner";

import "../../styles/modal.css";

interface ModalProps {
  text: string;
}

const BackDrop = () => {
  return <div className="backdrop" />;
};

const ModelOverlay: React.FC<ModalProps> = ({ text }) => {
  return (
    <div className="logout-modal">
      <div className="flex bg-[#fff] p-4 gap-2 items-center">
        <RotatingLines width="25" />
        <h1 className="text-[#083344] text-[3xl] text-center">{text}</h1>
      </div>
    </div>
  );
};

const LoaderModel: React.FC<ModalProps> = ({ text }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop_root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModelOverlay text={text} />,
        document.getElementById("overlay_root") as HTMLElement
      )}
    </React.Fragment>
  );
};

export default LoaderModel;

import React from 'react'
import ReactDOM from "react-dom";
import { FaCheck } from "react-icons/fa";

interface ModalProps {
    text: string;
 }

const BackDrop = () => {
    return <div className="backdrop" />;
  };

  const ModelOverlay: React.FC<ModalProps> = ({ text}) => {
    return (
      <div className="logout-modal">
        <div className="flex bg-[#fff] p-4 gap-2 items-center">
          <h1 className="text-[#083344] text-[3xl] text-center">{text}</h1>
          <FaCheck/>
        </div>
      </div>
    );
  };

const OnSuccessModal: React.FC<ModalProps> = ({text}) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop_root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModelOverlay text={text}/>,
        document.getElementById("overlay_root") as HTMLElement
      )}
    </React.Fragment>
  )
}

export default OnSuccessModal
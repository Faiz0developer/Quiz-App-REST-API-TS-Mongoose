import React from "react";
import ReactDOM from "react-dom";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import {ConnectionResponse} from '../../utils/interfaces'


const BackDrop = () => {
  return <div className="backdrop" />;
};

const ModelOverlay: React.FC<ConnectionResponse> = ({ setIsConnectionError }) => {
  return (
    <div className="logout-modal">
      <div className="flex flex-col bg-[#fff] p-4 gap-2 items-center w-[300px] h-[250px] justify-around">
        <RiSignalWifiErrorFill className="text-7xl" />
        <h1 className="text-2xl text-center">Something went wrong!</h1>
        <h1 className="text-center">Check your connection and try again</h1>
        <button
          className="bg-[#d8d8d8] py-1.5 w-[100px] rounded"
          onClick={() => {
            setIsConnectionError(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ConnectionErrorModal: React.FC<ConnectionResponse> = ({
    setIsConnectionError,
}) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop_root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModelOverlay setIsConnectionError={setIsConnectionError} />,
        document.getElementById("overlay_root") as HTMLElement
      )}
    </React.Fragment>
  );
};

export default ConnectionErrorModal;

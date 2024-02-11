import React from 'react'
import ReactDOM from "react-dom";

const BackDrop = () => {
    return (
      <div className="backdrop">
        <div className="loading-container bg-[#16A34A] z-50">
          <div className="loading-text">
            <span>C</span>
            <span>R</span>
            <span>E</span>
            <span>A</span>
            <span>T</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      </div>
    );
  };

const CreateQuizModal:React.FC = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop_root") as HTMLElement
      )}
    </React.Fragment>
  )
}

export default CreateQuizModal
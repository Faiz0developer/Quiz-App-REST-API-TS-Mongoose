import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="hero h-[55vh] font-[sans-serif]">
      <h1 className="text-5xl lg:text-6xl uppercase pt-2 pb-3 tracking-wider font-semibold text-[#fff] text-center">
        Quiz!
      </h1>
      <h2 className="text-5xl lg:text-6xl py-2 uppercase tracking-wider font-semibold text-[#fff] text-center">
        Take it or Create it
      </h2>
      <p className="py-2 text-xl text-[#D97706] tracking-[4px] font-bold text-center">
        Find your path to wellness
      </p>
    </div>
  );
};

export default Hero;

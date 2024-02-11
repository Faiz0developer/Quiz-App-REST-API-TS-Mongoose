import React from "react";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";

import logo from "../../assets/Q-removebg-preview.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#e7d1b3] pt-3">
      <div className="top-container">
        <img src={logo} alt="" width={100} />
      </div>
      <div className="flex justify-center gap-10 pb-4 px-4 text-3xl">
        <FaTwitterSquare />
        <FaLinkedin />
        <FaFacebook />
        <FaInstagramSquare />
      </div>
      <h1 className="text-center pt-4 bg-[#e7d1b3] pb-2">
        Copyright &copy; 2023 Quizzle. All rights reserved.
      </h1>
    </footer>
  );
};

export default Footer;

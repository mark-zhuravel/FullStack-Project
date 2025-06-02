import React from "react";
import Navbar from "./components/Navbar";
import LogoIcon from "../../assets/icons/LogoIcon.tsx";
import { AuthManager } from '../Auth/AuthManager';

const Header: React.FC = () => {
  return (
    <header className="w-full text-[#F0F0F0] pt-6 pb-12">
      <div className="w-[95.24%] mx-auto flex justify-between items-center">
        <LogoIcon />
        <Navbar />
        <div className="flex items-center space-x-6">
          <p style={{
            fontVariantNumeric: "lining-nums proportional-nums"
          }} className="font-semibold text-sm">8 (800) 333-55-99</p>
          <AuthManager />
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from "react";
import SkypeIconGray from "../../../assets/icons/SkypeIconGray";
import SkypeIconColor from "../../../assets/icons/SkypeIconColor";

const SkypeIcon: React.FC = () => {
  return (
    <div className="group flex items-center justify-center cursor-pointer">
      <SkypeIconGray className="absolute group-hover:hidden" />
      <SkypeIconColor className="absolute top-[-18px] hidden group-hover:block" />
    </div>
  );
};

export default SkypeIcon;
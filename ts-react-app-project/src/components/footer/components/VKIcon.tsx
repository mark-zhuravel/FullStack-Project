import React from "react";
import VKIconGray from "../../../assets/icons/VKIconGray";
import VKIconColor from "../../../assets/icons/VKIconColor";

const VKIcon: React.FC = () => {
  return (
    <div className="group flex items-center justify-center cursor-pointer">
      <VKIconGray className="absolute top-[-18px] group-hover:hidden" />
      <VKIconColor className="absolute top-[-18px] hidden group-hover:block" />
    </div>
  );
};

export default VKIcon;
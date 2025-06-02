import React from "react";
import SkypeIcon from "./components/SkypeIcon";
import VKIcon from "./components/VKIcon";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-10 left-12 flex gap-9">
        <SkypeIcon />
        <VKIcon />
    </footer>
  );
};

export default Footer;
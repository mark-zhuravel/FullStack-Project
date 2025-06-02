import React from 'react';
import CloseIcon from "../../assets/icons/CloseIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#3D3333]/[0.96] flex items-center justify-center z-50">
      <div className="bg-gradient-to-t from-[#141414] to-[#1F1D1D] rounded-[3px] shadow-lg w-[480px] relative text-white">
        <button
          onClick={onClose}
          className="absolute top-10 right-[33px] cursor-pointer transition-transform hover:scale-120"
        >
          <CloseIcon />
        </button>
        <h2 className="text-[32px] font-extrabold mb-8 leading-[120%] mt-8 ml-8">
          {title}
        </h2>
        <div className="px-8 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
}; 
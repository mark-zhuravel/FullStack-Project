import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowDownIcon from '../../assets/icons/ArrowDownIcon';

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOrdersClick = () => {
    setIsOpen(false);
    navigate('/orders');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-semibold hover:text-[#F2890F] transition-colors cursor-pointer flex items-center gap-2"
      >
        <span>{user.name || user.email}</span>
        <ArrowDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1F1D1D] rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
            <p className="font-medium truncate">{user.name || 'Пользователь'}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          
          <button
            onClick={handleOrdersClick}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#F2890F] hover:text-white transition-colors cursor-pointer"
          >
            Мои заказы
          </button>
          
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#F2890F] hover:text-white transition-colors cursor-pointer"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}; 
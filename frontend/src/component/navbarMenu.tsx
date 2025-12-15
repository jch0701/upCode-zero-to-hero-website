import React from "react";
import { X, Menu } from 'lucide-react';

interface MenuIconProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className="flex justify-center items-center w-10 h-10 md:hidden"
      onClick={onClick}
    >
      {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
    </button>
  );
};

export default MenuIcon;
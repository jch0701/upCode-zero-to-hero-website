import React, { useState } from 'react';
import logo from '../assets/UpCode.png';
const Navbar: React.FC = () => {
const navItems: string[] = ['Overview','Roadmaps', 'Projects', 'Careers', 'Profile'];
const [activeItem, setActiveItem] = useState('Overview'); // Default to 'Overview'
const handleItemClick = (item: string) => {
    setActiveItem(item);
};

return (
    <nav className="bg-indigo-950 backdrop-blur-sm p-4 text-white flex justify-between items-center fixed top-0 left-0 right-0 z-10">
    {/* Placeholder for a Logo/Title */}
    <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
        <h1 className="text-xl font-bold cursor-pointer">From Zero to Hero</h1>
    </div>
        
    {/* Navigation Links */}
    <div className="flex space-x-6">
        {navItems.map((item) => (
        <a 
            key={item} 
            href={`/${item}`} 
            onClick={() => handleItemClick(item)}
            className={`py-1 px-3 rounded-md transition duration-200 
                      ${item === activeItem ? 'bg-indigo-600 font-semibold' : 'hover:bg-blue-500'}`}
        >
            {item}
        </a>
        ))}
    </div>
    </nav>
  );
};

export default Navbar;
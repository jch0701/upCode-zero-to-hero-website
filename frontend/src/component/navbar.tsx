import React, { useState } from 'react';
import logo from '../assets/UpCode.png';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from './navbarMenu';

const Navbar: React.FC = () => {
    const navItems: string[] = ['Overview', 'Roadmap', 'Project', 'Career'];
    // const [activeItem, setActiveItem] = useState('Overview'); // Default to 'Overview'
    const location = useLocation();
    const currentPath = location.pathname.replace("/", "").toLowerCase() || 'overview';
    // read 
    const user = useSelector((state: any) => state.profile);
    const isLoggedIn = !!user?.email;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuItemClick = () => setIsMenuOpen(false);

    return (
        <nav className="bg-indigo-950 backdrop-blur-sm text-white flex justify-between items-center fixed top-0 left-0 right-0 z-10 h-16 px-4">
            {/* Placeholder for a Logo/Title */}
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
                <h1 className="text-xl font-bold cursor-pointer">
                    <Link to="/">
                        From Zero to Hero
                    </Link>
                </h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-5">
                {navItems.map((item) => (
                    <Link
                        key={item}
                        to={item === 'Overview' ? '/' : `/${item.toLowerCase()}`}
                        // onClick={() => handleItemClick(item)}
                        className={`py-1 px-3 rounded-md transition duration-200 text-lg
                      ${location.pathname.includes(item.toLowerCase()) ? 'bg-purple-600 font-semibold' : 'hover:bg-blue-500'}`}
                    >
                        {item}
                    </Link>
                ))}
                {/* Profile or Login Button */}
                <Link
                    to={isLoggedIn ? "/profile" : "/login"}
                    className={`py-1 px-3 rounded-md transition duration-200 text-lg
                        ${currentPath === (isLoggedIn ? "profile" : "login")
                        ? 'bg-purple-600 font-semibold'
                        : 'hover:bg-blue-500'}`}
                >
                    {isLoggedIn ? "Profile" : "Login"}
                </Link>
            </div>
            <MenuIcon isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                {isMenuOpen && (
                <div className="absolute top-16 right-0 w-full bg-indigo-950 flex flex-col items-start md:hidden p-4 space-y-2 shadow-lg">
                {navItems.map((item) => (
                    <Link
                    key={item}
                    to={item === "Overview" ? "/" : `/${item.toLowerCase()}`}
                    className={`py-1 px-3 rounded-md w-full text-right ${
                        location.pathname.includes(item.toLowerCase())
                        ? "bg-purple-600 font-semibold"
                        : "hover:bg-blue-500"
                    }`}
                    onClick={handleMenuItemClick}
                    >
                    {item}
                    </Link>
                ))}
                <Link
                    to={isLoggedIn ? "/profile" : "/login"}
                    className={`py-1 px-3 rounded-md w-full text-right ${
                    currentPath === (isLoggedIn ? "profile" : "login")
                        ? "bg-purple-600 font-semibold"
                        : "hover:bg-blue-500"
                    }`}
                    onClick={handleMenuItemClick}
                >
                    {isLoggedIn ? "Profile" : "Login"}
                </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
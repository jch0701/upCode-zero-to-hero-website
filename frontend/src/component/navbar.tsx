import React , { useState, useEffect } from 'react';
import logo from '../assets/UpCode.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navItems: string[] = ['Overview', 'Roadmap', 'Project', 'Career'];
    // const [activeItem, setActiveItem] = useState('Overview'); // Default to 'Overview'
    const location = useLocation();
    const currentPath = location.pathname.replace("/", "").toLowerCase() || 'overview';
    // State to track login
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        setIsLoggedIn(userID && userID !== "0" ? true : false);
    }, [location]); // re-check when route changes

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
            <div className="flex space-x-15 mr-25">
                {navItems.map((item) => (
                    <Link
                        key={item}
                        to={item === 'Overview' ? '/' : `/${item.toLowerCase()}`}
                        // onClick={() => handleItemClick(item)}
                        className={`py-1 px-3 rounded-md transition duration-200 text-lg
                      ${item.toLowerCase() === currentPath ? 'bg-purple-600 font-semibold' : 'hover:bg-blue-500'}`}
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
        </nav>
    );
};

export default Navbar;
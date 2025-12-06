import React from 'react';
import { FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-6 px-8 flex flex-col md:flex-row items-center justify-between rounded-t-lg z-50 fixed bottom-0 w-full h-15">
            {/* Copyright */}
            <span className="text-sm">&copy; 2025 UpCode: Form Zero to Hero, Inc. All rights reserved.</span>

            {/* Social Media Icons */}
            <div className="flex mt-4 md:mt-0 space-x-4">
                <div className="hover:text-white transition-colors" 
                     aria-label="Facebook"
                     onClick={() => window.open("https://www.facebook.com/groups/24977357168561020", "_blank")}>
                    <FaFacebookF size={20} />
                </div>
                <div className="hover:text-white transition-colors" 
                     aria-label="Instagram"
                     onClick={() => window.open("https://www.instagram.com/cs.usm?igsh=MWl5ZmtuazZ6bHBuMg== ", "_blank")}>
                    <FaInstagram size={20} />
                </div>
                <div className="hover:text-white transition-colors" 
                     aria-label="GitHub"
                     onClick={() => window.open("https://github.com/xinsheng04/CAT-304", "_blank")}>
                    <FaGithub size={20} />
                </div>
            </div>
        </footer>
    );

    //https://www.facebook.com/groups/24977357168561020
};

export default Footer;
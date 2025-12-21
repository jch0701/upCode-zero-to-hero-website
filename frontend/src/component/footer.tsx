import React from 'react';
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-0 bg-gray-900 text-gray-400 py-6 px-8 flex flex-col md:flex-row md:items-center justify-between rounded-t-lg z-50 w-full h-10">

            {/* Copyright */}
            <span className="text-sm text-left md:text-left">&copy; 2025 UpCode: Form Zero to Hero, Inc. All rights reserved.</span>

            {/* Social Media Icons */}
            <div className="flex flex-row md:flex-row flex-wrap md:flex-nowrap mt-2 md:mt-0 md:justify-end space-x-4 md:space-x-4 space-y-2 md:space-y-0 self-end md:self-auto">
                <div className="hover:text-white transition-colors cursor-pointer" 
                     aria-label="Facebook"
                     onClick={() => window.open("https://www.facebook.com/groups/24977357168561020", "_blank")}>
                    <FaFacebookF size={20} />
                </div>
                <div className="hover:text-white transition-colors cursor-pointer" 
                     aria-label="Instagram"
                     onClick={() => window.open("https://www.instagram.com/cs.usm?igsh=MWl5ZmtuazZ6bHBuMg== ", "_blank")}>
                    <FaInstagram size={20} />
                </div>
                <div className="hover:text-white transition-colors cursor-pointer" 
                     aria-label="GitHub"
                     onClick={() => window.open("https://github.com/xinsheng04/CAT-304", "_blank")}>
                    <FaGithub size={20} />
                </div>
                <div className="hover:text-white transition-colors cursor-pointer" 
                     aria-label="Whatsapp"
                     onClick={() => window.open("https://www.linkedin.com/in/tan-xin-sheng-216291238?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ", "_blank")}>
                    <FaLinkedin size={20} />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
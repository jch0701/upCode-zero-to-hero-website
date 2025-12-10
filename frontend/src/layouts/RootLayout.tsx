import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/navbar';
import background from "../assets/background.jpg";
import Footer from '@/component/footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
    // Get the current location object from react-router-dom
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls the window to the top (x=0, y=0)
    }, [pathname]);
    return null;
};

const RootLayout: React.FC = () => {
  return (
    <>
    <div className="relative flex flex-col min-h-screen">
      <ScrollToTop />
      <img
        className='fixed top-0 left-0 w-full h-full -z-10 object-cover'
        src={background}
        alt="Background"
      />
      <Navbar />
      <main className="flex-1 py-20 px-4 md:px-8 lg:px-16">
        <Outlet />
      </main>
      <Footer/>
    </div>
    </>
  );
};

export default RootLayout;

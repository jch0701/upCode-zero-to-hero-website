import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/navbar';
import background from "../assets/background.jpg";
import Footer from '@/component/footer';

const RootLayout: React.FC = () => {
  return (
    <>
    <div className="relative flex flex-col min-h-screen">
      <img
        className='fixed top-0 left-0 w-full h-full -z-10 bg-no-repeat bg-center bg-fixed bg-cover'
        src={background}
        alt="Background"
      />
      <Navbar />
      <main className="pt-16 flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
    </>
  );
};

export default RootLayout;

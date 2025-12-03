import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/navbar';
import background from "../assets/background.jpg";

const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Outlet />
        <img
          className='fixed top-0 left-0 w-full h-full -z-10 bg-no-repeat bg-center bg-fixed bg-cover'
          src={background}
          alt="Background"
        />
      </main>
    </>
  );
};

export default RootLayout;

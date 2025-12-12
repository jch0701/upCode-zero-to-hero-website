import React, {useEffect} from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../component/navbar';
import background from "../assets/background.jpg";
import Footer from '@/component/footer';

const ScrollToTop: React.FC = () => {
    // Get the current location object from react-router-dom
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls the window to the top (x=0, y=0)
    }, [pathname]);
    return null;
};

const RootLayout: React.FC = () => {
  useEffect(() => {
    const simulation = () => {
      const activeUser = JSON.parse(localStorage.getItem("activeUser") || "null");
      if (!activeUser) return;

      const key = `last_active_${activeUser.email}`;
      localStorage.setItem(key, Date.now().toString());
    };

    // Track ANY user interaction
    window.addEventListener("mousemove", simulation);
    window.addEventListener("keydown", simulation);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", simulation);
      window.removeEventListener("keydown", simulation);
    };
  }, []);

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
      <main className="flex-1 pt-20 pb-20">
        <Outlet />
      </main>
      <Footer/>
    </div>
    </>
  );
};

export default RootLayout;

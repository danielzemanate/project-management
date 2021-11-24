import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen p-3'>
      <div className='flex flex-col w-full h-full'>
      <Link to="/">
        <i className="fas fa-home text-gray-900 cursor-pointer font-bold text-xl hover:text-red-900" />
      </Link>
        <div className='flex flex-col items-center justify-center w-full h-full overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default AuthLayout;
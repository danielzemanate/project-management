import React from "react";
import { SidebarPrivateLayout } from "components/SidebarPrivateLayout";
import NavbarPrivateLayout from "components/NavbarPrivateLayout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PrivateLayout = ({ children }) => {
  return (
    <div className="flex">
      <SidebarPrivateLayout />
      {/* <SidebarResponsive/> */}
      <div className="content w-100">
        <NavbarPrivateLayout />
        <main>{children}</main>
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default PrivateLayout;

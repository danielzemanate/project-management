import React from "react";
import { Outlet } from "react-router";
import { SidebarPrivateLayout } from "components/SidebarPrivateLayout";
import NavbarPrivateLayout from "components/NavbarPrivateLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarResponsive from "components/SidebarResponsivePl";

const PrivateLayout = () => {
  return (
    <div className="flex">
        <SidebarPrivateLayout />
        <SidebarResponsive />
      <div className="content w-100">
        <NavbarPrivateLayout />
        <div className="w-full h-full usersAdmin">
          <Outlet />
        </div>
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default PrivateLayout;

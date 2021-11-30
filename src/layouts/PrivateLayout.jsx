import React from "react";
import { Outlet } from "react-router";
import { SidebarPrivateLayout } from "components/SidebarPrivateLayout";
import NavbarPrivateLayout from "components/NavbarPrivateLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarResponsive from "components/SidebarResponsivePl";
// import { useMutation } from '@apollo/client';
// import { useAuth } from 'context/authContext';
// import { VALIDATE_TOKEN } from 'graphql/auth/mutations';

const PrivateLayout = () => {

  // const { authToken, setToken, loadingAuth } = useAuth();

  // const [validateToken, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
  //   useMutation(VALIDATE_TOKEN);

  // useEffect(() => {
  //   validateToken();
  // }, [])

  return (
    <div className="flex h-full overflow-hidden">
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

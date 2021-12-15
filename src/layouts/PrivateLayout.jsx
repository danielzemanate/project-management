import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { SidebarPrivateLayout } from "components/SidebarPrivateLayout";
import NavbarPrivateLayout from "components/NavbarPrivateLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarResponsive from "components/SidebarResponsivePl";
import { useMutation } from "@apollo/client";
import { useAuth } from "context/authContext";
import { REFRESH_TOKEN } from "graphql/auth/mutations";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { useUser } from "context/userContext";

const PrivateLayout = () => {
  // DATOS DE USUARIO LOGUEADO
  const { userData } = useUser();
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [
    refreshToken,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  // REFRESCAR TOKEN PARA ACCEDER A RUTAS PRIVADAS, VERIFICAR SI HA CADUCADO
  useEffect(() => {
    // console.log('DATA MUTATION TOKEN', dataMutation)
    if (dataMutation) {
      if (dataMutation.refreshToken.token) {
        setToken(dataMutation.refreshToken.token);
      } else {
        setToken(null);
        navigate("/auth/login");
      }
      setLoadingAuth(false);
    }
  }, [dataMutation, setToken, loadingAuth, navigate]);

  // MANEJO ERRORES
  useEffect(() => {
    if (errorMutation) {
      console.log("error", errorMutation);
    }
  }, [errorMutation]);

  if (loadingMutation || loadingAuth)
    return (
      <ReactLoading
        className=" flex w-50 justify-center text-center"
        type="cylon"
        color="#7d211d"
        height={500}
        width={300}
      />
    );

  return (
    <div className="flex h-full overflow-hidden">
      {(userData.estado === "PENDIENTE") |
      (userData.estado === "NO_AUTORIZADO") ? (
        <></>
      ) : (
        <>
          <SidebarPrivateLayout />
          <SidebarResponsive />
        </>
      )}
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

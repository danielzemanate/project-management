import React, { useState } from "react";
import { NavLink, useMatch,useResolvedPath } from 'react-router-dom'
// import useActiveRoute from "hooks/useActiveRoute";
import logo_evanz from "assets/images/logo_evanz.png";
import iconUser from 'assets/images/iconUser.png'
import iconUserBg from 'assets/images/iconUserBg.png'
import iconProject from 'assets/images/iconProject.png'
import iconProjectBg from 'assets/images/iconProjectBg.png'
import iconInscriptions from 'assets/images/iconInscriptions.png'
import iconInscriptionsBg from 'assets/images/iconInscriptionsBg.png'

const SidebarResponsive = () => {
  // LOGO PARA SIDEBAR
  const Logo = ({ styles }) => {
    return (
      <div className={styles}>
        <img src={logo_evanz} alt="Logo" className="h-24" />
        {/* <span className='my-2 text-xl font-bold text-center'>Título de Mi Aplicación</span> */}
      </div>
    );
  };

   //AGREGAR RUTAS NUEVAS, SU NOMBRE E ICONO PARA EL SIDEBAR
   const routeSidebar = [
    {ruta:"users", nombre:"Usuarios", iconActive:iconUser, iconInactive:iconUserBg},
    {ruta:"projects", nombre:"Proyectos", iconActive:iconProject, iconInactive:iconProjectBg},
    {ruta:"inscriptions", nombre:"Inscripciones", iconActive:iconInscriptions, iconInactive:iconInscriptionsBg},
    ]

  const [showNavigation, setShowNavigation] = useState(false);
  return (
    //   SIDEBAR PARA PANTALLAS PEQUEÑAS-MOVILES
    <div
      className="iconSidebar bg-white shadow-md"
      onClick={() => {
        setShowNavigation(!showNavigation);
      }}
    >
      <i
        className={`fas fa-${
          showNavigation ? "times" : "bars"
        } fa-2x py-3 px-1`}
      />
      {showNavigation && (
        <ul>
          {/* SE RENDERIZA CADA UNO DE LOS COMPONENTES DEL SIDEBAR */}
          {routeSidebar.map((item, index) => (
            <ResponsiveRoute
              key={index}
              ruta={item.ruta}
              nombre={item.nombre}
              icon={item.iconActive}
              iconInactive={item.iconInactive}
            />
          ))}
        </ul>
      )}
      <Logo
        styles={`py-3 w-full ${
          showNavigation ? "flex" : "hidden"
        } flex-col items-center justify-center`}
      />
    </div>
  );
};

const ResponsiveRoute = ({ ruta, nombre, icon, iconInactive }) => {
  // EXTRAER PAGINA ACTIVA PARA CAMBIAR ICONO CON O SIN FONDO
  const resolved = useResolvedPath(ruta);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "sidebar-route sidebarActive text-white text-lg font-medium "
            : "sidebar-route sidebarNoActive text-red-900 text-lg hover:text-white "
        }
        to={ruta}
      >
        {nombre}
        {match ?<img src={icon} alt='Logo' className='h-10 ml-3' />:<img src={iconInactive} alt='Logo' className='h-10 ml-3' />}
      </NavLink>
    </li>
  );
};

export default SidebarResponsive;

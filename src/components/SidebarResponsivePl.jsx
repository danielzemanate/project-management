import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
// import useActiveRoute from "hooks/useActiveRoute";
import logo_evanz from "assets/images/logo_evanz.png";

const SidebarResponsive = () => {
  // LOGO PARA SIDEBAR
  const Logo = ({ styles }) => {
    return (
      <div className={styles}>
        <img src={logo_evanz} alt="Logo" className="h-14" />
        {/* <span className='my-2 text-xl font-bold text-center'>Título de Mi Aplicación</span> */}
      </div>
    );
  };

  //AGREGAR RUTAS NUEVAS, SU NOMBRE E ICONO PARA EL SIDEBAR
  const routeSidebar = [
    { ruta: "/admin/users", nombre: "Usuarios", icon: "fas fa-users" },
    { ruta: "/admin/projects", nombre: "Proyectos", icon: "fas fa-list" },
    {
      ruta: "/admin/inscriptions",
      nombre: "Inscripciones",
      icon: "fas fa-user-plus",
    },
  ];
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
              icon={item.icon}
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

const ResponsiveRoute = ({ ruta, nombre, icon }) => {
  // const isActive = useActiveRoute(ruta);
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "sidebar-route sidebarActive text-white text-lg font-medium "
            : "sidebar-route sidebarNoActive text-gray-900 text-lg hover:text-white "
        }
        to={ruta}
      >
        {nombre}
        <i className={`${icon}`} />
      </NavLink>
    </li>
  );
};

export default SidebarResponsive;

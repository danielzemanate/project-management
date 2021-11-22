import React from 'react'
import { NavLink } from 'react-router-dom'
import logo_evanz from 'assets/images/logo_evanz.png'


export const SidebarPrivateLayout = () => {

    //AGREGAR RUTAS NUEVAS, SU NOMBRE E ICONO PARA EL SIDEBAR
    const routeSidebar = [
    {ruta:"/admin/users", nombre:"Usuarios", icon:"fas fa-users"},
    {ruta:"/admin/projects", nombre:"Proyectos", icon:"fas fa-list"},
    {ruta:"/admin/inscriptions", nombre:"Inscripciones", icon:"fas fa-user-plus"},
    ]
    return (
            <div className='sidebarPl shadow-md'>
                <Logo/>
                <ul>
                    {/* SE RENDERIZA CADA UNO DE LOS COMPONENTES DEL SIDEBAR */}
                        {/* <SidebarRoute  ruta='/users' nombre='Usuarios' icon='fas fa-users'/> */}
                    {routeSidebar.map((item,index) => (
                        <SidebarRoute key={index} ruta={item.ruta} nombre={item.nombre} icon={item.icon}/>
                        )
                    )}
                </ul>
            </div>
    )
}

// LOGO PARA SIDEBAR
const Logo = () => {
  return (
    <div className='py-5 w-full flex flex-col items-center justify-center'>
      <img src={logo_evanz} alt='Logo' className='h-28' />
      {/* <span className='my-2 text-xl font-bold text-center'>Título de Mi Aplicación</span> */}
    </div>
  );
};
// COMPONENTE NAVLINK PARA CADA COMPONENTE DEL SIDEBAR
const SidebarRoute = ({ruta,nombre,icon}) => {
    return(
        <li>
        <NavLink  className={({ isActive }) =>
          isActive
            ? 'sidebar-route sidebarActive text-white text-xl font-medium'
            : 'sidebar-route sidebarNoActive text-gray-900 text-xl hover:text-white '
        }  to={ruta}>{nombre}<i className={`${icon}`}/></NavLink>
    </li> 
    )
}

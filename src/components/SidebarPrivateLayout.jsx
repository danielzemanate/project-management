import React from 'react'
import { NavLink } from 'react-router-dom'
import logo_evanz from 'assets/images/logo_evanz.png'


export const SidebarPrivateLayout = () => {

    //AGREGAR RUTAS NUEVAS, SU NOMBRE E ICONO PARA EL SIDEBAR
    const routeSidebar = [
    {ruta:"/users", nombre:"Usuarios", icon:"fas fa-users"},
    {ruta:"/projects", nombre:"Proyectos", icon:"fas fa-list"},
    {ruta:"/inscriptions", nombre:"Inscripciones", icon:"fas fa-user-plus"},
    ]
    return (

            <div className='sidebarPl bg-light'>
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
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src={logo_evanz} alt='Logo' className='h-16' />
      {/* <span className='my-2 text-xl font-bold text-center'>Título de Mi Aplicación</span> */}
    </div>
  );
};
// COMPONENTE NAVLINK PARA CADA COMPONENTE DEL SIDEBAR
const SidebarRoute = ({ruta,nombre,icon}) => {
    return(
        <li>
        <NavLink exact='true' className='link text-dark w-100 py-3 px-2 rounded d-inline-block'  to={ruta}><i className={`${icon} me-2`}/>{nombre}</NavLink>
    </li> 
    )
}

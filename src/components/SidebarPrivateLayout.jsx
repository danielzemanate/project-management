import React from 'react'
import { NavLink, useMatch,useResolvedPath } from 'react-router-dom'
import logo_evanz from 'assets/images/logo_evanz.png'
import iconUser from 'assets/images/iconUser.png'
import iconUserBg from 'assets/images/iconUserBg.png'
import iconProject from 'assets/images/iconProject.png'
import iconProjectBg from 'assets/images/iconProjectBg.png'
import iconInscriptions from 'assets/images/iconInscriptions.png'
import iconInscriptionsBg from 'assets/images/iconInscriptionsBg.png'
import PrivateComponent from './PrivateComponent'


export const SidebarPrivateLayout = () => {

    //AGREGAR RUTAS NUEVAS, SU NOMBRE E ICONO PARA EL SIDEBAR
    const routeSidebar = [
    // {ruta:"users", nombre:"Usuarios", iconActive:iconUser, iconInactive:iconUserBg},
    {ruta:"cardsprojects", nombre:"Proyectos", iconActive:iconProject, iconInactive:iconProjectBg},
    {ruta:"inscriptions", nombre:"Inscripciones", iconActive:iconInscriptions, iconInactive:iconInscriptionsBg},
    ]
    return (
            <div className='sidebarPl shadow-md'>
                <Logo/>
                <ul>
                    {/* SE RENDERIZA CADA UNO DE LOS COMPONENTES DEL SIDEBAR */}
                    <PrivateComponent roleList={['ADMINISTRADOR']}>
                        <SidebarRoute  ruta='users' nombre='Usuarios' icon={iconUser} iconInactive={iconUserBg}/>
                      </PrivateComponent>
                    {routeSidebar.map((item,index) => (
                        <SidebarRoute key={index} ruta={item.ruta} nombre={item.nombre} icon={item.iconActive} iconInactive={item.iconInactive}/>
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
const SidebarRoute = ({ruta,nombre,icon, iconInactive}) => {

    // EXTRAER PAGINA ACTIVA PARA CAMBIAR ICONO CON O SIN FONDO
    const resolved = useResolvedPath(ruta);
    const match = useMatch({ path: resolved.pathname, end: true });

    // useEffect(() => {
    //    console.log('activo:', match)
    // }, [match])
    return(
        <li>
        <NavLink className={({ isActive }) => 
        
          isActive
            ? 'sidebar-route sidebarActive text-white md:text-lg lg:text-xl font-medium'
            : 'sidebar-route sidebarNoActive text-red-900 md:text-lg lg:text-xl hover:text-white '
        }  to={ruta}
        // isActive={(match,location) => {
        //     if (!match) {
        //         return setTest(true)
        //     }
        // }}
        >{nombre} {match ?<img src={icon} alt='Logo' className='md:h-10 lg:h-16' />:<img src={iconInactive} alt='Logo' className='md:h-10 lg:h-16' />}</NavLink>
    </li> 
    )
}

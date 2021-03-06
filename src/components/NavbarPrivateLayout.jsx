import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth } from "context/authContext";
import { useUser } from "context/userContext";

// import logo from 'assets/images/logo1.png'
import user from "assets/images/user.png";
// import SidebarResponsive from './SidebarResponsivePl';

const NavbarPrivateLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setToken } = useAuth();
  const { userData } = useUser();
  const [username, setUsername] = useState("");

  //CERRAR SESION Y BORRAR TOKEN
  const cerrarSesion = () => {
    // console.log('eliminar token');
    setToken(null);
  };

  useEffect(() => {
    if (userData._id) {
      const firstName = userData.nombre.split(" ");
      setUsername(firstName[0]);
      // console.log(userData)
    } else {
      setUsername("NN");
    }
  }, [userData]);

  // const username= userData.nombre.split(' ')

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {userData.estado === "NO_AUTORIZADO" ? (
        <>
          <Link to="/">
            <button className='bg-red-700 text-white font-bold text-lg py-3 px-6 rounded-xl hover:bg-red-500 shadow-md my-2 mx-2' type='button' onClick={() => cerrarSesion()}>
              Home
            </button>
          </Link>
        </>
      ) : (
        <Navbar light expand="md" className="navbarPl px-4 py-3">
          {/* <SidebarResponsive/> */}
          {/* <NavbarBrand className="navbarBrand" href="/landingAdmin">
        <img width="80" className="px-1" src={logo} alt=""></img>ADMINISTRADOR</NavbarBrand> */}
          <Link to="/admin/landingAdmin">
            <div className="navbar-Brand hidden md:flex lg:flex sm:hidden text-4xl mb-2 font-semibold leading-tight">
              {/* <img width="90" className="px-2 d-inline-block " src={logo} alt=""/> */}
              <h3 className="text-white shadow-md m-4">GESTI??N DE PROYECTOS</h3>
            </div>
          </Link>
          <Link to="/admin/landingAdmin">
            <div className="navbar-Brand flex md:hidden text-2xl mb-2 font-semibold leading-tight">
              {/* <img width="90" className="px-2 d-inline-block " src={logo} alt=""/> */}
              <h1 className="text-white">GESTI??N DE PROYECTOS</h1>
            </div>
          </Link>
          <NavbarToggler onClick={toggle} className="bg-white text-black" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <img
                width="85"
                className="px-1 rounded-circle"
                src={user}
                alt=""
              />
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  className="text-lg font-semibold text-white border-b-2 border-white"
                  nav
                  caret
                >
                  {username}
                  {/* DANIEL */}
                </DropdownToggle>
                <DropdownMenu end>
                  <Link to="/admin/profile">
                    <DropdownItem>Perfil</DropdownItem>
                  </Link>
                  <DropdownItem>Configuraciones</DropdownItem>
                  <DropdownItem divider />
                  <Link to="/">
                    <DropdownItem onClick={() => cerrarSesion()}>
                      Cerrar Sesi??n
                    </DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </div>
  );
};
export default NavbarPrivateLayout;

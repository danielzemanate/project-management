
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { Link } from 'react-router-dom';

// import logo from 'assets/images/logo1.png'
import user from 'assets/images/user.png'


const NavbarPrivateLayout = () => {

  const [isOpen, setIsOpen] = useState(false);


  //CERRAR SESION Y BORRAR TOKEN
  const cerrarSesion = () => {
    console.log('cerrar sesión')
  }

//   useEffect(() => {
//     console.log(user)
// }, [user])

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" className="navbarPl px-4 py-3">
        {/* <NavbarBrand className="navbarBrand" href="/landingAdmin">
        <img width="80" className="px-1" src={logo} alt=""></img>ADMINISTRADOR</NavbarBrand> */}
        <NavbarBrand className="navbar-Brand hidden  md:flex lg:flex sm:hidden text-4xl mb-2 font-semibold leading-tight" href="/">
            {/* <img width="90" className="px-2 d-inline-block " src={logo} alt=""/> */}
            <h3 className='text-white shadow-md m-4'>GESTIÓN DE PROYECTOS</h3>
        </NavbarBrand>
        <NavbarBrand className="navbar-Brand flex md:hidden text-2xl mb-2 font-semibold leading-tight" href="/">
            {/* <img width="90" className="px-2 d-inline-block " src={logo} alt=""/> */}
            <h1 className='text-white'>GESTIÓN DE PROYECTOS</h1>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className= 'bg-white text-black' />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
          <img width="60" className="px-1 rounded-circle" src={user}  alt=""/>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className='text-lg font-semibold text-white' nav caret>
                DANIEL
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Mi Perfil
                </DropdownItem>
                <DropdownItem>
                  Configuraciones
                </DropdownItem>
                <DropdownItem divider />
                <Link to='/'>
                  <DropdownItem onClick={() => cerrarSesion()}>
                    Cerrar Sesión
                  </DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default NavbarPrivateLayout;
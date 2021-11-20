
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
} from 'reactstrap';

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
      <Navbar color="light" light expand="md" className="px-4">
        {/* <NavbarBrand className="navbarBrand" href="/landingAdmin">
        <img width="80" className="px-1" src={logo} alt=""></img>ADMINISTRADOR</NavbarBrand> */}
        <NavbarBrand className="navbar-Brand text-4xl mb-2 font-semibold leading-tight" href="/landingAdmin">
            {/* <img width="90" className="px-2 d-inline-block " src={logo} alt=""/> */}
            <h3 className='text-red-900'>GESTIÓN DE PROYECTOS</h3>
            </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
          <img width="60" className="px-1 rounded-circle" src={user}  alt=""/>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className='text-lg font-semibold' nav caret>
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
                <DropdownItem onClick={() => cerrarSesion()}>
                  Cerrar Sesión
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default NavbarPrivateLayout;
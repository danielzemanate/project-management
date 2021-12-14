import React from "react";
import PrivateComponent from "components/PrivateComponent";
import { useUser } from "context/userContext";
import { Link } from "react-router-dom";
// import iconUser from "assets/images/iconUser.png";
import iconUserBg from "assets/images/iconUserBg.png";
import iconProject from "assets/images/iconProject.png";
import iconProjectBg from "assets/images/iconProjectBg.png";
// import iconInscriptions from "assets/images/iconInscriptions.png";
import iconInscriptionsBg from "assets/images/iconInscriptionsBg.png";
const LandingAdmin = () => {
  // DATOS DE USUARIO LOGUEADO
  const { userData } = useUser();

  //AGREGAR RUTAS NUEVAS, SU NOMBRE E ICONO PARA EL MENU LANDING PAGE ADMIN
  const routeLanding = [
    // {ruta:"users", nombre:"Usuarios", iconActive:iconUser, iconInactive:iconUserBg},
    {
      ruta: "/admin/projects",
      nombre: "Proyectos",
      iconActive: iconProject,
      iconInactive: iconProjectBg,
    },
    // {
    //   ruta: "/admin/inscriptions",
    //   nombre: "Inscripciones",
    //   iconActive: iconInscriptions,
    //   iconInactive: iconInscriptionsBg,
    // },
    {
      ruta: "/admin/avances",
      nombre: "Avances",
      iconActive: iconProject,
      iconInactive: iconProjectBg,
    },
  ];

  //   useEffect(() => {
  //     console.log("datos usuario", userData);
  //   }, [userData]);

  return (
    // <div>landing</div>
    <div className="w-full flex flex-col justify-center items-center text-center pt-5">
      <div className="text-center">
        <h1 className="hidden md:flex text-8xl text-gray-800 py-1 font-semibold">
          BIENVENIDO
        </h1>
        <h1 className="md:hidden text-5xl text-gray-800 py-1 font-semibold">
          BIENVENIDO
        </h1>
      </div>
      <div className="flex flex-col">
        <h1 className="hidden md:flex text-red-900 text-6xl pb-3 pt-3">
          <b>--- {userData.nombre + " " + userData.apellido} ---</b>
        </h1>
        {/* RESPONSIVE */}
        <h1 className="md:hidden text-red-900 text-5xl pb-3 pt-3">
          <b>{userData.nombre}</b>
        </h1>
        {/* <h1 className='text-danger display-1'><b>--- YA NO ESTES BRAVA, PLS ---</b></h1> */}
        <h2 className="text-3xl text-gray-800 font-semibold pb-1">
          {userData.correo}
        </h2>
        <h3 className="text-3xl text-gray-800 font-semibold pb-1">
          Identificación: {userData.identificacion}
        </h3>
        <h3 className="text-3xl text-gray-800 font-semibold pb-1">
          Rol: {userData.rol}
        </h3>
        {/* <h3 className="text-secondary">Estado: {userData.state}</h3> */}
      </div>

      {userData.rol === "INACTIVO" ? (
        <div className="text-center">
          <h3 className="text-blue-900 text-6xl pb-3 pt-3 font-semibold">
            A espera de ser aprobado
          </h3>
        </div>
      ) : (
        <PrivateComponent roleList={["ADMINISTRADOR", "ESTUDIANTE", "LIDER"]}>
          <div className="d-flex flex-row justify-content-center align-items-center">
            {/* RUTA PRIVADA PARA BLOQUEAR LA OPCION DE USUARIOSPARA VENDEDORES */}
            <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
              <div className="p-4 d-flex justify-content-center">
                <div className="card">
                  <Link className="link" to="/admin/users">
                    <div className="card-body">
                      <h2 className="hidden md:flex card-title text-3xl text-gray-900">
                        <b>Usuarios</b>
                      </h2>
                      {/* RESPONSIVE */}
                      <h2 className="md:hidden card-title text-xl text-gray-900">
                        <b>Usuarios</b>
                      </h2>
                      <div className="flex justify-center items-center text-center">
                        <img
                          src={iconInscriptionsBg}
                          alt="Logo"
                          className="sm:h-12 md:h-15 lg:h-20"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="card">
                  <Link className="link" to="/admin/inscriptions">
                    <div className="card-body">
                      <h2 className="hidden md:flex card-title text-3xl text-gray-900">
                        <b>Inscripciones</b>
                      </h2>
                      {/* RESPONSIVE */}
                      <h2 className="md:hidden card-title text-xl text-gray-900">
                        <b>Inscripciones</b>
                      </h2>
                      <div className="flex justify-center items-center text-center">
                        <img
                          src={iconUserBg}
                          alt="Logo"
                          className="sm:h-12 md:h-15 lg:h-20"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </PrivateComponent>
            {/* MAP PARA AGREGAR CARDS ROUTES HACIA LAS DIFERENTES PAGINAS */}
            {routeLanding.map((item, index) => (
              <div className="flex p-4 justify-content-center" key={index}>
                <div className="hidden md:flex card">
                  <Link className="link" to={item.ruta}>
                    <div className="card-body">
                      <h2 className="hidden md:flex card-title text-3xl text-gray-900">
                        <b>{item.nombre}</b>
                      </h2>
                      {/* RESPONSIVE */}
                      <h2 className="md:hidden card-title text-xl text-gray-900">
                        <b>{item.nombre}</b>
                      </h2>
                      <div className="flex justify-center items-center text-center">
                        <img
                          src={item.iconInactive}
                          alt="Logo"
                          className="sm:h-12 md:h-15 lg:h-20"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </PrivateComponent>
      )}
    </div>
  );
};

export default LandingAdmin;

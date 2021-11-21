import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import { useQuery } from "@apollo/client";
import { GET_USUARIOS } from "graphql/users/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"
import { Enum_Rol, Enum_EstadoUsuario } from "utils/enum";

const UsersAdmin = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);

    // useEffect(() => {
    //   console.log("data servidor", data);
    // }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error consultando los usuarios");
    }
  }, [error]);

  //   LOADING PARA CARGAR USUARIOS
  if (loading)
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
    <div className="m-4">
      <div className='flex justify-center'>
        <span className="text-4xl m-3 font-semibold">
          USUARIOS REGISTRADOS
        </span>
      </div>
      <table className="tabla tableResponsive">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Identificación</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Usuarios.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.identificacion}</td>
                  {/* <td>{u.rol}</td>
                  <td>{u.estado}</td> */}
                  <td>{Enum_Rol[u.rol]}</td>
                  <td>{Enum_EstadoUsuario[u.estado]}</td>
                  <td>
                    <Link to={`/admin/users/edit/${u._id}`}>
                      <i className="fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer" />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
              {/* CARDS PARA PANTALLAS MOVILES */}
      <div className='divCardsTable'>
        {data &&
            data.Usuarios.map((u) => {
          return (
            <div className="card mb-3" key={u._id}>
                <div className="card-body">
                    <h4 className="text-3xl font-semibold my-2 text-red-900">{u.nombre} {u.apellido}</h4>
                    <p className="card-text"><b>Identificación:</b> {u.identificacion}</p>
                    <p className="card-text"><b>Email:</b> {u.correo}</p>
                    <p className="card-text"><b>Rol:</b> {u.rol}</p>
                    <p className="card-text"><b>Estado:</b> {u.estado}</p>   
                    <Link className='flex mt-2' to={`/users/edit/${u._id}`}>
                      <button className='bg-red-700 text-white font-bold text-xl py-2 px-1 rounded-xl hover:bg-red-500 shadow-md my-1'>EDITAR</button>
                    </Link> 
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersAdmin;

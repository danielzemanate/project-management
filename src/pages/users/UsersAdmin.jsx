import React, { useEffect } from "react";
import ReactLoading from 'react-loading';
import { useQuery } from "@apollo/client";
import { GET_USUARIOS } from "graphql/users/queries";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const UsersAdmin = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);

//   useEffect(() => {
//     console.log("data servidor", data);
//   }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]);

//   LOADING PARA CARGAR USUARIOS
  if (loading) return <ReactLoading className=' flex w-50 justify-center text-center' type='cylon' color='#7d211d' height={500} width={300} />;

  return (
    <div className="m-4">
      Datos Usuarios:
      <table className="tabla">
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
                  <td>{u.rol}</td>
                  <td>{u.estado}</td>
                  {/* <td>{Enum_Rol[u.rol]}</td>
                  <td>{Enum_EstadoUsuario[u.estado]}</td> */}
                  <td>
                    <Link to={`/users/edit/${u._id}`}>
                      <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAdmin;

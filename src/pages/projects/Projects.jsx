import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROYECTOS } from 'graphql/projects/queries'
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"

const Projects = () => {
    const {data,error,loading} = useQuery(GET_PROYECTOS);

    useEffect(() => {
        console.log("data servidor", data);
        }, [data]);


  useEffect(() => {
    if (error) {
      toast.error("Error consultando los proyectos");
    }
  }, [error]);

//   LOADING PARA CARGAR PROYECTOS
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
<div className="ml-5 mr-7 ">
      <div className='flex justify-center'>
        <span className="text-4xl m-3 mt-5 text-gray-800 font-semibold">
          PROYECTOS REGISTRADOS
        </span>
      </div>
      <table className="tabla tableResponsive">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Presupuesto</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Estado</th>
            <th>Fase</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Proyectos.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.presupuesto}</td>
                  <td>{u.fechaInicio}</td>
                  <td>{u.fechaFin}</td>
                  <td>{u.estado}</td>
                  <td>{u.fase}</td>
                  <td>
                    <Link to={`/admin/projects/editar/${u._id}`}>
                      <i className="fas fa-pen text-red-900 hover:textred-700 cursor-pointer" />
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
            data.Proyectos.map((u) => {
          return (
            <div className="card mb-3" key={u._id}>
                <div className="card-body">
                    <h4 className="text-3xl font-semibold my-2 text-red-900">{u.nombre}</h4>
                    <p className="card-text"><b>Presupuesto:</b> {u.presupuesto}</p>
                    <p className="card-text"><b>Fecha Inicio:</b> {u.fechaInicio}</p>
                    <p className="card-text"><b>Fecha Fin:</b> {u.fechaFin}</p>
                    <p className="card-text"><b>Estado:</b> {u.estado}</p>
                    <p className="card-text"><b>Fase:</b> {u.fase}</p>   
                    <Link className='flex mt-2' to={`/admin/projects/editar/${u._id}`}>
                      <button className='bg-red-700 text-white font-bold text-xl py-2 px-1 rounded-xl hover:bg-red-500 shadow-md my-1'>EDITAR</button>
                    </Link> 
                </div>
            </div>
          );
        })}
      </div>
    </div>
    )
}

export default Projects

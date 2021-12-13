import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import PrivateRoute from "components/PrivateRoute";
import { GET_INSCRIPCIONES } from "graphql/inscripciones/queries";
import {
  APROBAR_INSCRIPCION,
  RECHAZAR_INSCRIPCION,
} from "graphql/inscripciones/mutaciones";
import ButtonLoading from "components/ButtonLoading";
import { toast } from "react-toastify";
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from "components/Accordion";
import ReactLoading from "react-loading";

const Inscriptions = () => {
  const { data, loading, error, refetch } = useQuery(GET_INSCRIPCIONES);

  useEffect(() => {
    // console.log(data);
  }, [data]);

  // MANEJO ERRORES
  useEffect(() => {
    if (error) {
      toast.error("Error editando el avance");
    }
  }, [error]);

  //   LOADING PARA CARGAR PROYECTO
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
    <PrivateRoute roleList={["ADMINISTRADOR", "LIDER"]}>
      <div className="p-10">
        <div>Pagina de inscripciones</div>
        <div className="my-4">
          <AccordionInscripcion
            titulo="Inscripciones aprobadas"
            data={data.Inscripciones.filter((el) => el.estado === "ACEPTADO")}
          />
          <AccordionInscripcion
            titulo="Inscripciones pendientes"
            data={data.Inscripciones.filter((el) => el.estado === "PENDIENTE")}
            refetch={refetch}
          />
          <AccordionInscripcion
            titulo="Inscripciones rechazadas"
            data={data.Inscripciones.filter((el) => el.estado === "RECHAZADO")}
          />
        </div>
      </div>
    </PrivateRoute>
  );
};

const AccordionInscripcion = ({ data, titulo, refetch = () => {} }) => {
  return (
    <AccordionStyled>
      <AccordionSummaryStyled>
        {titulo} ({data.length})
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        <div className="flex">
          {data &&
            data.map((inscripcion, index) => {
              return (
                <Inscripcion key={index} inscripcion={inscripcion} refetch={refetch} />
              );
            })}
        </div>
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
};

const Inscripcion = ({ inscripcion, refetch }) => {
  const [aprobarInscripcion, { data, loading, error }] =
    useMutation(APROBAR_INSCRIPCION);
  const [
    rechazarInscripcion,
    { data_rechazar, loading_rechazar, error_rechazar },
  ] = useMutation(RECHAZAR_INSCRIPCION);

  useEffect(() => {
    if (data) {
      toast.success("Inscripcion aprobada con exito");
      refetch();
    }
  }, [data, refetch]);

  useEffect(() => {
    if (data_rechazar) {
      toast.success("Inscripcion rechazada con exito");
      refetch();
    }
  }, [data_rechazar, refetch]);

  useEffect(() => {
    if (error) {
      toast.error("Error aprobando la inscripcion");
    }
  }, [error]);

  useEffect(() => {
    if (error_rechazar) {
      toast.error("Error rechazando la inscripcion");
    }
  }, [error_rechazar]);

  const cambiarEstadoInscripcion = () => {
    aprobarInscripcion({
      variables: {
        aprobarInscripcionId: inscripcion._id,
      },
    });
  };

  const cambiarEstadoRechazado = () => {
    rechazarInscripcion({
      variables: {
        rechazarInscripcionId: inscripcion._id,
      },
    });
  };

  return (
    <div className="bg-gray-900 text-gray-50 flex flex-col p-6 m-2 rounded-lg shadow-xl">
      <span>Proyecto: {inscripcion.proyecto.nombre}</span>
      <span>Estudiante: {inscripcion.estudiante.nombre}</span>
      <span>Estado: {inscripcion.estado}</span>
      <span>ID Inscripcion: {inscripcion._id}</span>
      <span>ID Proyecto: {inscripcion.proyecto._id}</span>
      <span>ID Estudiante: {inscripcion.estudiante._id}</span>
      <span>Fecha: {inscripcion.fechaIngreso}</span>
      {inscripcion.estado === "PENDIENTE" && (
        <ButtonLoading
          onClick={() => {
            cambiarEstadoInscripcion();
          }}
          text="Aprobar Inscripcion"
          loading={loading}
          disabled={false}
        />
      )}
      {inscripcion.estado === "PENDIENTE" && (
        <ButtonLoading
          onClick={() => {
            cambiarEstadoRechazado();
          }}
          text="Rechazar Inscripcion"
          loading={loading_rechazar}
          disabled={false}
        />
      )}
    </div>
  );
};
export default Inscriptions;

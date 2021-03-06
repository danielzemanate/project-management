import React, { useEffect, useState } from "react";
import { useMutation} from "@apollo/client";
import Input from "components/Input";
import { useParams, Link } from "react-router-dom";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { CREAR_AVANCE } from "graphql/avances/mutation";
import { EDITAR_PROYECTO } from "graphql/projects/mutation";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";

const NuevoAvance = () => {
  const { _id } = useParams();
  const { form, formData, updateFormData } = useFormData();
  const [date, setDate] = useState('')

  const { userData } = useUser();

  //ESTADO VALIDACIONES FORMULARIO
  const [validated, setValidated] = React.useState("");

  //FECHA ACTUAL
  useEffect(() => {
    const today = new Date()
    // SETEAR FECHA ACTUAL
    setDate(today.toISOString().split('T')[0])
  }, [setDate,date])

  const [
    crearAvance,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_AVANCE);

  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);


  const submitForm = (e) => {
    //VALIDACIONES
    const formEvent = e.target;
    if (formEvent.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Ingrese Todos los campos");
    } else {
      e.preventDefault();
      crearAvance({
        variables: {proyecto:_id, creadoPor:userData._id,fecha:date,...formData},
      });
      editarProyecto({
        variables: {
          _id,
          campos: {fase:'DESARROLLO'},
        },
      });
    }
    setValidated("was-validated");
  };

 //USEEFFECT PARA MANEJO DE ERRORES Y SUCCESS
 useEffect(() => {
  if (mutationData) {
    toast.success("Avance agregado correctamente");
  }
}, [mutationData]);

//USEEFECT SUCCES EDIT PROYECTO
useEffect(() => {
  if (dataMutation) {
    toast.success("Proyecto en fase de Desarrollo");
  }
}, [dataMutation])

useEffect(() => {
  if (mutationError) {
    toast.error("Error agregando el avance", mutationError);
  }
  if (error) {
    toast.error("Error editando el proyecto", error);
  }
}, [mutationError, error]);


  return (
    <div className="p-10 flex flex-col items-center">
      <div className="self-start">
        <Link to="/admin/cardsprojects">
          <i className="fas fa-arrow-left" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Avance</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className={`${validated} flex flex-col items-center justify-center needs-validation`}
        noValidate
      >
        <Input
          name="descripcion"
          label="Descripci??n Avance"
          required={true}
          type="text"
        />
        <Input
          name="fecha"
          label="Fecha"
          required={true}
          type="date"
          defaultValue={date}
          disabled={true}
        />
        <ButtonLoading text="Crear Avance" loading={mutationLoading || loading} disabled={false} />
      </form>
    </div>
  );
};

export default NuevoAvance;

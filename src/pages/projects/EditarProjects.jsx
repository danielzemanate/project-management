import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTO } from 'graphql/projects/queries';
import Input from 'components/Input';
import { toast } from "react-toastify";
import ButtonLoading from "components/ButtonLoading";
import DropDown from "components/Dropdown";
import useFormData from "hooks/useFormData";
import ReactLoading from "react-loading";

const EditarProjects = () => {

    const {data,error,loading} = useQuery(GET_PROYECTO);
    const { _id } = useParams();

      //ESTADO VALIDACIONES FORMULARIO
  const [validated, setValidated] = React.useState("");

    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_PROYECTO, {
        variables: { _id },
    });

//       //SUBMIT FORM
//   const submitForm = (e) => {
//     //VALIDACIONES
//     const formEvent = e.target;
//     if (formEvent.checkValidity() === false) {
//       e.preventDefault();
//       e.stopPropagation();
//       toast.error("Ingrese Todos los campos");
//     } else {
//       e.preventDefault();
//       // console.log('fd', formData);
//       delete formData.rol;
//       editarUsuario({
//         variables: { _id, ...formData },
//       });
//     }
//     setValidated("was-validated");
//   };

  // MUTACION PARA EDITAR USUARIO
//   const [
//     EditarProjects,
//     { data: mutationData, loading: mutationLoading, error: mutationError },
//   ] = useMutation(EDITAR_PROYECTO);

  //USEEFFECT PARA MANEJO DE ERRORES Y SUCCESS
//   useEffect(() => {
//     if (mutationData) {
//       toast.success("Usuario modificado correctamente");
//     }
//   }, [mutationData]);

//   useEffect(() => {
//     if (mutationError) {
//       toast.error("Error modificando el usuario");
//     }

//     if (queryError) {
//       toast.error("Error consultando el usuario");
//     }
//   }, [queryError, mutationError]);

  //   LOADING PARA CARGAR PROYECTO
  if (queryLoading)
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
    <div className="flew flex-col w-full h-full items-center justify-center p-10">
      <Link to="/admin/projects">
        <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
      </Link>
      <h1 className="m-4 text-4xl text-gray-800 font-bold text-center">
        Editar Proyecto
      </h1>
      {/* <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className={`${validated} flex flex-col items-center justify-center needs-validation`}
        noValidate
      > */}
        <Input
          label="Nombre:"
          type="text"
          name="nombre"
          defaultValue={queryData.Proyecto.nombre}
          required={true}
        />
        <Input
          label="Presupuesto:"
          type="text"
          name="apellido"
          defaultValue={queryData.Proyecto.presupuesto}
          required={true}
        />
        <Input
          label="Fecha de inicio:"
          type="email"
          name="correo"
          defaultValue={queryData.Proyecto.fechaInicio}
          required={true}
        />
        <Input
          label="Fecha fin:"
          type="text"
          name="identificacion"
          defaultValue={queryData.Proyecto.fechaFin}
          required={true}
        />
        {/* <DropDown
          label="Estado de la persona:"
          name="estado"
          defaultValue={queryData.Proyecto.estado}
          required={true}
          options={Enum_EstadoUsuario}
        /> */}
        <span className="mb-2 text-xl font-semibold">
          Fase: {queryData.Proyecto.fase}
        </span>
        {/* <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Confirmar"
        />
      </form> */}
        </div>
    )
}

export default EditarProjects

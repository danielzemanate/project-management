import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import { toast } from "react-toastify";
import DropDown from "components/Dropdown";
import useFormData from "hooks/useFormData";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USUARIO } from "graphql/users/queries";
import { EDITAR_USUARIO } from "graphql/users/mutations";
import ReactLoading from "react-loading";
import { Enum_EstadoUsuario } from "utils/enum";

const EditUsers = () => {
  // ESTADO PARA CAPTURAR DATOS DEL FORMULARIO
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  //ESTADO VALIDACIONES FORMULARIO
  const [validated, setValidated] = React.useState("");

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });

  // useEffect(() => {
  //   console.log('validaciones', validated)
  // }, [setValidated, validated])
  // console.log(queryData);

  //SUBMIT FORM
  const submitForm = (e) => {
    //VALIDACIONES
    const formEvent = e.target;
    if (formEvent.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Ingrese Todos los campos");
    } else {
      e.preventDefault();
      // console.log('fd', formData);
      delete formData.rol;
      editarUsuario({
        variables: { _id, ...formData },
      });
    }
    setValidated("was-validated");
  };

  // MUTACION PARA EDITAR USUARIO
  const [
    editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_USUARIO);

  //USEEFFECT PARA MANEJO DE ERRORES Y SUCCESS
  useEffect(() => {
    if (mutationData) {
      toast.success("Usuario modificado correctamente");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el usuario");
    }

    if (queryError) {
      toast.error("Error consultando el usuario");
    }
  }, [queryError, mutationError]);

  //   LOADING PARA CARGAR USUARIO
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
    <div className="flew flex-col items-center justify-center p-3">
      <Link to="/admin/users">
        <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
      </Link>
      <h1 className="m-4 text-4xl text-gray-800 font-bold text-center">
        Editar Usuario
      </h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className={`${validated} flex flex-col items-center justify-center needs-validation`}
        noValidate
      >
        <Input
          label="Nombre:"
          type="text"
          name="nombre"
          defaultValue={queryData.Usuario.nombre}
          required={true}
        />
        <Input
          label="Apellido:"
          type="text"
          name="apellido"
          defaultValue={queryData.Usuario.apellido}
          required={true}
        />
        <Input
          label="Correo:"
          type="email"
          name="correo"
          defaultValue={queryData.Usuario.correo}
          required={true}
        />
        <Input
          label="Identificaci??n:"
          type="text"
          name="identificacion"
          defaultValue={queryData.Usuario.identificacion}
          required={true}
        />
        <DropDown
          label="Estado de la persona:"
          name="estado"
          defaultValue={queryData.Usuario.estado}
          required={true}
          options={Enum_EstadoUsuario}
        />
        <span className="mb-2 text-xl font-semibold">
          Rol: {queryData.Usuario.rol}
        </span>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Confirmar"
        />
      </form>
    </div>
  );
};

export default EditUsers;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import { toast } from "react-toastify";
import useFormData from "hooks/useFormData";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USUARIO } from "graphql/users/queries";
import { EDITAR_USUARIO } from "graphql/users/mutations";
import { useUser } from "context/userContext";
import ReactLoading from "react-loading";

export const Profile = () => {
  const { userData } = useUser();
  const [dataUser, setDataUser] = useState("");
  // CONSULTA USUARIO POR ID
  
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id: userData._id },
  });


  useEffect(() => {
    if (queryData) {
      setDataUser(queryData.Usuario);
      //   console.log("datos usuario", queryData.Usuario.nombre);
    }
  }, [queryData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando el usuario");
    }
  }, [queryError]);

  // LOADING PARA CARGAR USUARIO
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
    //   <div>hola</div>
    <div className="flew flex-col items-center justify-center p-3">
      <Link to="/admin/users">
        <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
      </Link>
      <h1 className="m-4 text-4xl text-gray-800 font-bold text-center" data-testid='perfil'>
        DATOS PERSONALES
      </h1>
      <FormUpdateProfile dataUser={dataUser} />
    </div>
  );
};

const FormUpdateProfile = ({ dataUser }) => {
  // ESTADO PARA CAPTURAR DATOS DEL FORMULARIO
  const { form, formData, updateFormData } = useFormData(null);
  //ESTADO VALIDACIONES FORMULARIO
  const [validated, setValidated] = React.useState("");

  // MUTACION PARA EDITAR USUARIO
  const [
    editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_USUARIO);

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
        variables: { _id: dataUser._id, estado: dataUser.estado, ...formData },
        // variables: { ...formData },
      });
    }
    setValidated("was-validated");
  };

  //USEEFFECT PARA MANEJO DE ERRORES Y SUCCESS
  useEffect(() => {
    if (mutationData) {
      toast.success("Usuario modificado correctamente");
      //   console.log(mutationData)
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el usuario");
    }
  }, [mutationError]);

  return (
    <div>
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
          defaultValue={dataUser.nombre}
          required={true}
          data-testid='name-input'
        />
        <Input
          label="Apellido:"
          type="text"
          name="apellido"
          defaultValue={dataUser.apellido}
          required={true}
        />
        <Input
          label="Correo:"
          type="email"
          name="correo"
          defaultValue={dataUser.correo}
          required={true}
        />
        <Input
          label="Identificación:"
          type="text"
          name="identificacion"
          defaultValue={dataUser.identificacion}
          required={true}
        />
        <span className="mb-2 text-xl font-semibold">Rol: {dataUser.rol}</span>
        <ButtonLoading
          data-testid='buttonLoading'
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Confirmar"
        />
      </form>
    </div>
  );
};

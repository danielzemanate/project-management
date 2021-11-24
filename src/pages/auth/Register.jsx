import React, { useEffect } from "react";
import Input from "components/Input";
import { Enum_Rol } from "utils/enum";
import DropDown from "components/Dropdown";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { REGISTRO } from "graphql/auth/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

const Register = () => {
  //NAVEGACION ROUTER
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  //ESTADO VALIDACIONES FORMULARIO
  const [validated, setValidated] = React.useState("");

  //MUTACION GRAPHQL PARA REGISTRO DE USUARIOS
  const [
    registro,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(REGISTRO);

  //DATOS TRAIDOS DEL FORMULARIO Y SUBMIT ENVIO DATOS
  const submitForm = (e) => {
    //VALIDACIONES
    const formEvent = e.target;
    if (formEvent.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Ingrese Todos los campos");
    } else {
      e.preventDefault();
      console.log("enviar datos al backend", formData);
      toast.success("Registro completo");
      navigate("/admin/landingAdmin");
      // registro({ variables: formData });
    }
    setValidated("was-validated");
  };

  useEffect(() => {
    console.log("data mutation", dataMutation);
    if (dataMutation) {
      if (dataMutation.registro.token) {
        localStorage.setItem("token", dataMutation.registro.token);
        navigate("/admin/landingAdmin");
      }
    }
  }, [dataMutation, navigate]);

  // MANEJO ERRORES
  useEffect(() => {
    if (errorMutation) {
      toast.error("Error registrando el usuario");
    }
  }, [errorMutation]);

  return (
    <div className="flex flex-col max-w-md w-full items-center justify-center pt-5">
      <h1 className="text-5xl text-red-900 font-bold my-4">Regístrate</h1>
      <form 
        className={`${validated} flex flex-col`}
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form} 
        noValidate
      >
        <div className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-1 sm:flex sm:flex-col">
          <Input label="Nombre:" name="nombre" type="text" required={true}/>
          <Input label="Apellido:" name="apellido" type="text" required />
          <Input
            label="Documento:"
            name="identificacion"
            type="text"
            required
          />
          <DropDown
            label="Rol deseado:"
            name="rol"
            required={true}
            options={Enum_Rol}
          />
          <Input label="Correo:" name="correo" type="email" required />
          <Input label="Contraseña:" name="password" type="password" required />
        </div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={loadingMutation}
          text="Registrarme"
        />
      </form>
      <span>¿Ya tienes una cuenta?</span>
      <Link to="/auth/login">
        <span className="text-red-900">Inicia sesión</span>
      </Link>
    </div>
  );
};

export default Register;

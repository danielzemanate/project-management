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
import { useAuth } from "context/authContext";

const Register = () => {
  //NAVEGACION ROUTER
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  //ESTADO VALIDACIONES FORMULARIO
  const [validated, setValidated] = React.useState("");

  // TOKEN CONTEXT
  const { setToken } = useAuth();

  //MUTACION GRAPHQL PARA REGISTRO DE USUARIOS
  const [
    registro,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(REGISTRO);

  //DATOS TRAIDOS DEL FORMULARIO Y SUBMIT ENVIO DATOS
  const submitForm = async (e) => {
    //VALIDACIONES
    const formEvent = e.target;
    if (formEvent.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Ingrese Todos los campos");
    } else {
      e.preventDefault();
      await registro({ variables: formData })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    setValidated("was-validated");
  };

  useEffect(() => {
    // console.log("data mutation", dataMutation);
    if (dataMutation) {
      if (dataMutation.registro) {
        const token = dataMutation.registro.token;
        if (token) {
          // localStorage.setItem("token", dataMutation.registro.token);
          setToken(dataMutation.registro.token);
          navigate("/admin/landingAdmin");
        } else {
          toast.error("Error al registrarse");
        }
      } else {
        toast.error("Error al registrarse");
      }
    }
  }, [dataMutation, navigate, setToken]);

  // MANEJO ERRORES
  useEffect(() => {
    if (errorMutation) {
      toast.error("Error registrando el usuario");
    }
  }, [errorMutation]);

  return (
    <div className="flex flex-col max-w-md w-full items-center justify-center pt-5">
      <h1 className="text-5xl text-red-900 font-bold my-4">Reg??strate</h1>
      <form
        className={`${validated} flex flex-col`}
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        noValidate
      >
        <div className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-1 sm:flex sm:flex-col">
          <Input label="Nombre:" name="nombre" type="text" required={true} />
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
          <Input label="Contrase??a:" name="password" type="password" required />
        </div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={loadingMutation}
          text="Registrarme"
        />
      </form>
      <span>??Ya tienes una cuenta?</span>
      <Link to="/auth/login">
        <span className="text-red-900">Inicia sesi??n</span>
      </Link>
    </div>
  );
};

export default Register;

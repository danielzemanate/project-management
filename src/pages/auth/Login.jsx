import React, { useEffect } from "react";
import Google from "assets/images/google_logo.png";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ButtonLoading from "components/ButtonLoading";
import Input from "components/Input";
import { useMutation } from "@apollo/client";
import { LOGIN } from "graphql/auth/mutations";
import { useNavigate } from "react-router";
import { useAuth } from "context/authContext";

const Login = () => {
  // FORMDATA HOOK
  const { form, formData, updateFormData } = useFormData();

  //NAVEGACION ROUTER
  const navigate = useNavigate();

  //TOKEN
  const { setToken } = useAuth();

  //ESTADO VALIDACIONES FORMULARIO
  const [validated, setValidated] = React.useState("");

  // MUTACION GRAPHQL LOGIN
  const [
    login,
    { data: dataMutation, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN);

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
      // console.log("enviar datos al backend", formData);
      login({
        variables: formData,
      });
    }
    setValidated("was-validated");
  };

  // GUARDAR TOKEN LOCALSTORAGE
  useEffect(() => {
    // console.log("data mutation", dataMutation);
    if (dataMutation) {
      // console.log("data mutation", dataMutation);
      if (dataMutation.login) {
        const token = dataMutation.login.token;
        if (token) {
          setToken(dataMutation.login.token);
          navigate("/admin/landingAdmin");
        } else {
          toast.error("Error al iniciar sesión");
        }
      } else {
        toast.error("Error al iniciar sesión");
      }
    }
  }, [dataMutation, setToken, navigate]);

  // // MANEJO ERRORES
  useEffect(() => {
    if (mutationError) {
      toast.error("Error al iniciar sesión");
    }
  }, [mutationError]);

  return (
    <>
      <div className="max-w-md w-full space-y-8 pt-5" data-testid='login-page'>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900" >
          Inicia sesión en tu cuenta
        </h2>
        <form
          className={`${validated} mt-8 space-y-6`}
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
          noValidate
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Input
                label="Email:"
                name="correo"
                type="email"
                required={true}
              />
            </div>
            <div>
              <Input
                label="Contraseña:"
                name="password"
                type="password"
                required={true}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Recuérdame
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/"
                className="font-medium text-red-800 hover:text-red-600"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <div className='w-100 flex justify-center'>
            <ButtonLoading
              disabled={Object.keys(formData).length === 0}
              loading={mutationLoading}
              text="Login"
            />
          </div>
          <div className="flex items-center justify-between">
            <span>¿No tienes cuenta?</span>
            <Link to="/auth/register">
              <span className="font-medium text-red-800 hover:text-red-600">
                Regístrate
              </span>
            </Link>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <span className="mx-4">------------------------</span>
        <h2 className="my-4 text-center text-sm font-extrabold text-gray-900">
          O
        </h2>
        <span className="mx-4">------------------------</span>
      </div>
      <div className="max-w-md w-full">
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <div className="flex items-center justify-start">
              <img src={Google} alt="Logo Google" className="h-6 w-6" />
              <span className="mx-4">Continúa con Google</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

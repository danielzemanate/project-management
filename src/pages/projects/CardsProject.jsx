import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROYECTOS } from "graphql/projects/queries";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutaciones";
import DropDown from "components/Dropdown";
import { Dialog } from "@mui/material";
import { Enum_EstadoProyecto } from "utils/enum";
import { Enum_FaseProyecto } from "utils/enum";
import { Enum_TipoObjetivo } from "utils/enum";
import ButtonLoading from "components/ButtonLoading";
import {
  EDITAR_PROYECTO,
  ELIMINAR_OBJETIVO,
  EDITAR_OBJETIVO,
} from "graphql/projects/mutation";
import useFormData from "hooks/useFormData";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
import PrivateComponent from "components/PrivateComponent";
import { GET_USUARIO } from "graphql/users/queries";
import Input from "components/Input";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";

const AccordionStyled = styled((props) => <Accordion {...props} />)(
  ({ theme }) => ({
    backgroundColor: "#919191",
  })
);
const AccordionSummaryStyled = styled((props) => (
  <AccordionSummary {...props} />
))(({ theme }) => ({
  backgroundColor: "#919191",
}));
const AccordionDetailsStyled = styled((props) => (
  <AccordionDetails {...props} />
))(({ theme }) => ({
  backgroundColor: "#ccc",
}));

const CardsProject = () => {
  const { userData } = useUser();
  const [dataUser, setDataUser] = useState("");
  const { data: queryData, loading, error } = useQuery(GET_PROYECTOS);

  const {
    data: queryDataUser,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id: userData._id },
  });

  useEffect(() => {
    if (queryDataUser) {
      setDataUser(queryDataUser.Usuario.proyectosLiderados);
      // console.log("proyectos", queryDataUser.Usuario.proyectosLiderados);
      // console.log(userData._id)
    }
  }, [queryDataUser, userData._id]);

  useEffect(() => {
    if (error) {
      console.log("Error", error);
    }
    if (queryError) {
      console.log("Error", queryError);
    }
  }, [error, queryError]);

  //   LOADING PARA CARGAR PROYECTO
  if (loading )
    return (
      <ReactLoading
        className=" flex w-50 justify-center text-center"
        type="cylon"
        color="#7d211d"
        height={500}
        width={300}
      />
    );

  if (queryData.Proyectos || dataUser) {
    return (
      <div className="p-10 flex flex-col">
        <div className="flex w-full items-center justify-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            LISTA DE PROYECTOS
          </h1>
        </div>
        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
          <div className="my-2 self-end">
            <button className="bg-red-700 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-red-500">
              <Link
                className="text-white font-medium"
                to="/admin/cardsprojects/nuevo"
              >
                Crear nuevo proyecto
              </Link>
            </button>
          </div>
        </PrivateComponent>
        {userData.rol === "LIDER" ? (
          <>
            {queryDataUser.Usuario.proyectosLiderados.map((proyecto, index) => {
              return <AccordionProyecto key={index} proyecto={proyecto} />;
            })}
          </>
        ) : (
          <>
            {queryData.Proyectos.map((proyecto, index) => {
              return <AccordionProyecto key={index} proyecto={proyecto} />;
            })}
          </>
        )}
        {/* {queryDataUser.Usuario.proyectosLiderados.map((proyecto, index) => {
          return <AccordionProyecto key={index} proyecto={proyecto} />;
        })} */}
      </div>
    );
  }

  return <></>;
};

const AccordionProyecto = ({ proyecto }) => {
  const { userData } = useUser();
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogFase, setShowDialogFase] = useState(false);
  const [showDialogInfo, setShowDialogInfo] = useState(false);
  const [stateInscription, setStateInscription] = useState("");

  const handleClose = () => {
    setShowDialogInfo(false);
  };

  return (
    <>
      <AccordionStyled>
        <AccordionSummaryStyled
          expandIcon={<i className="fas fa-chevron-down" />}
        >
          <div className="flex w-full justify-between">
            <div className="uppercase font-bold text-gray-100 ">
              {proyecto.nombre} - {proyecto.estado}
            </div>
          </div>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
            {proyecto.fase === "TERMINADO" ? (
              <></>
            ) : (
              <button
                className="bg-red-700 text-white font-bold text-lg py-3 px-6 rounded-xl hover:bg-red-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700 mr-4"
                onClick={() => {
                  setShowDialog(true);
                }}
              >
                Estado
              </button>
            )}
            <button
              className="bg-red-700 text-white font-bold text-lg py-3 px-6 rounded-xl hover:bg-red-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700 mr-4"
              onClick={() => {
                setShowDialogFase(true);
              }}
            >
              Fase
            </button>
            <button
              className="bg-red-700 text-white font-bold text-lg py-3 px-6 rounded-xl hover:bg-red-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
              onClick={() => {
                setShowDialogInfo(true);
              }}
            >
              Info
            </button>
            {/* <i
              className="mx-4 fas fa-pen text-red-600 hover:text-red-400"
              onClick={() => {
                setShowDialog(true);
              }}
            /> */}
          </PrivateComponent>
          <PrivateComponent roleList={["ESTUDIANTE"]}>
            {proyecto.fase === "TERMINADO" ? (
              <></>
            ) : (
              <div className="flex">
                {stateInscription === "ACEPTADO" ? (
                  <Link
                    to={`/admin/avances/nuevo/${proyecto._id}`}
                    className="mr-5"
                  >
                    <ButtonLoading disabled={false} text="CREAR AVANCE" />
                  </Link>
                ) : (
                  <></>
                )}
                <InscripcionProyecto
                  idProyecto={proyecto._id}
                  estado={proyecto.estado}
                  inscripciones={proyecto.inscripciones}
                  setStateInscription={setStateInscription}
                />
              </div>
            )}
          </PrivateComponent>
          {userData.rol === "LIDER" ? (
            <>
              <div>Presupuesto: {proyecto.presupuesto}</div>
            </>
          ) : (
            <>
              <div>
                Liderado Por: {proyecto.lider.nombre} - {proyecto.lider.correo}
              </div>
              <div>Presupuesto: {proyecto.presupuesto}</div>
            </>
          )}
          {/* <div>Liderado Por: {proyecto.lider.correo}</div> */}
          <div className="flex">
            {proyecto.objetivos.map((objetivo, index) => {
              return (
                <Objetivo
                  index={index}
                  _id={objetivo._id}
                  idProyecto={proyecto._id}
                  tipo={objetivo.tipo}
                  descripcion={objetivo.descripcion}
                />
              );
            })}
          </div>
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditProyecto _id={proyecto._id} />
      </Dialog>
      <Dialog
        open={showDialogFase}
        onClose={() => {
          setShowDialogFase(false);
        }}
      >
        <FormEditFaseProyecto _id={proyecto._id} />
      </Dialog>
      <div className="flex w-full h-full">
        <Dialog
          open={showDialogInfo}
          onClose={() => {
            setShowDialog(false);
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            EDITAR INFO PROYECTO
            {handleClose ? (
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
          <DialogContent dividers>
            <FormEditInfo
              setShowDialogEdit={setShowDialogInfo}
              proyecto={proyecto}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

//EDITAR INFO PROYECTO NOMBRE PRESUPUESTO

const FormEditInfo = ({ proyecto, setShowDialogEdit }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);

  //ESTADO VALIDACIONES FORMULARIO
  const [validated, setValidated] = React.useState("");

  const submitForm = (e) => {
    //VALIDACIONES
    const formEvent = e.target;
    if (formEvent.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Ingrese Todos los campos");
    } else {
      e.preventDefault();

      // PASAR PRESUPUESTO A FLOTANTE
      const presupuesto = parseFloat(formData.presupuesto);
      const nombre = formData.nombre;

      editarProyecto({
        variables: {
          _id: proyecto._id,
          campos: {
            nombre,
            presupuesto,
          },
        },
      })
        .then((data) => {
          setShowDialogEdit(false);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
    setValidated("was-validated");
  };

  // EDICION PROYECTO CORRECTA
  useEffect(() => {
    if (dataMutation) {
      toast.success("Proyecto editado con éxito");
    }
  }, [dataMutation]);

  useEffect(() => {
    if (error) {
      console.log("Error", error);
    }
  }, [error]);

  return (
    <div className="p-4">
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className={`${validated} flex flex-col items-center justify-center needs-validation`}
        noValidate
      >
        <Input
          label="Nombre:"
          type="text"
          name="nombre"
          defaultValue={proyecto.nombre}
          required={true}
        />
        <Input
          label="Presupuesto:"
          type="number"
          name="presupuesto"
          defaultValue={proyecto.presupuesto}
          required={true}
        />
        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
      </form>
    </div>
  );
};

// EDITA FASE PROYECTO
const FormEditFaseProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    if (formData.fase === "TERMINADO") {
      editarProyecto({
        variables: {
          _id,
          campos: { estado: "INACTIVO", ...formData },
        },
      });
    } else {
      editarProyecto({
        variables: {
          _id,
          campos: { estado: "ACTIVO", ...formData },
        },
      });
    }
  };

  // EDICION PROYECTO CORRECTA
  useEffect(() => {
    if (dataMutation) {
      toast.success("Fase Proyecto editado con éxito");
    }
  }, [dataMutation]);

  useEffect(() => {
    if (error) {
      console.log("Error", error);
    }
  }, [error]);

  return (
    <div className="p-4">
      <h1 className="font-bold">Modificar Fase del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <DropDown
          label="Fase del Proyecto"
          name="fase"
          options={Enum_FaseProyecto}
        />
        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
      </form>
    </div>
  );
};

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  // EDICION PROYECTO CORRECTA
  useEffect(() => {
    if (dataMutation) {
      toast.success("Proyecto agregado con éxito");
    }
  }, [dataMutation]);

  useEffect(() => {
    if (error) {
      console.log("Error", error);
    }
  }, [error]);

  return (
    <div className="p-4">
      <h1 className="font-bold">Modificar Estado del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <DropDown
          label="Estado del Proyecto"
          name="estado"
          options={Enum_EstadoProyecto}
        />
        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
      </form>
    </div>
  );
};

//OBJETIVOS

const Objetivo = ({ index, _id, idProyecto, tipo, descripcion }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [
    eliminarObjetivo,
    { data: dataMutationEliminar, loading: eliminarLoading },
  ] = useMutation(ELIMINAR_OBJETIVO, {
    refetchQueries: [{ query: GET_PROYECTOS }],
  });

  useEffect(() => {
    if (dataMutationEliminar) {
      toast.success("objetivo eliminado satisfactoriamente");
    }
  }, [dataMutationEliminar]);

  const ejecutarEliminacion = () => {
    eliminarObjetivo({ variables: { idProyecto, idObjetivo: _id } });
  };

  if (eliminarLoading)
    return (
      <ReactLoading
        data-testid="loading-in-button"
        type="spin"
        height={100}
        width={100}
      />
    );
  return (
    <div className="mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl">
      <div className="text-lg font-bold">{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
        <div className="flex my-2">
          <i
            onClick={() => setShowEditDialog(true)}
            className="fas fa-pen mx-2 text-yellow-500 hover:text-yellow-200 cursor-pointer"
          />
          <i
            onClick={ejecutarEliminacion}
            className="fas fa-trash mx-2 text-red-500 hover:text-red-200 cursor-pointer"
          />
        </div>
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
          <EditarObjetivo
            descripcion={descripcion}
            tipo={tipo}
            index={index}
            idProyecto={idProyecto}
            setShowEditDialog={setShowEditDialog}
          />
        </Dialog>
      </PrivateComponent>
    </div>
  );
};

//EDITAR OBJETIVOS

const EditarObjetivo = ({
  descripcion,
  tipo,
  index,
  idProyecto,
  setShowEditDialog,
}) => {
  const { form, formData, updateFormData } = useFormData();

  const [editarObjetivo, { data: dataMutation, loading }] = useMutation(
    EDITAR_OBJETIVO,
    {
      refetchQueries: [{ query: GET_PROYECTOS }],
    }
  );

  useEffect(() => {
    if (dataMutation) {
      toast.success("Objetivo editado con exito");
      setShowEditDialog(false);
    }
  }, [dataMutation, setShowEditDialog]);

  const submitForm = (e) => {
    e.preventDefault();
    editarObjetivo({
      variables: {
        idProyecto,
        indexObjetivo: index,
        campos: formData,
      },
    }).catch((e) => {
      console.log(e);
      toast.error("Error editando el objetivo");
    });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900">Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label="Tipo de Objetivo"
          name="tipo"
          required={true}
          options={Enum_TipoObjetivo}
          defaultValue={tipo}
        />
        <Input
          label="Descripcion del objetivo"
          name="descripcion"
          required={true}
          defaultValue={descripcion}
        />
        <ButtonLoading
          text="Confirmar"
          disabled={Object.keys(formData).length === 0}
          loading={loading}
        />
      </form>
    </div>
  );
};

const InscripcionProyecto = ({
  idProyecto,
  estado,
  inscripciones,
  setStateInscription,
}) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState("");
  const [crearInscripcion, { data, loading, error }] =
    useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter(
        (el) => el.estudiante._id === userData._id
      );
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
        setStateInscription(flt[0].estado);
      }
    }
  }, [userData, inscripciones, setStateInscription]);

  useEffect(() => {
    if (data) {
      // console.log(data);
      toast.success("inscripcion creada con exito");
      setEstadoInscripcion("PENDIENTE");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log("Error", error);
    }
  }, [error]);

  const confirmarInscripcion = () => {
    crearInscripcion({
      variables: { proyecto: idProyecto, estudiante: userData._id },
    });
  };

  return (
    <>
      {estadoInscripcion === "PENDIENTE" ? (
        <span>
          Ya estas inscrito en este proyecto y el estado es {estadoInscripcion}
        </span>
      ) : (
        <></>
      )}
      {estadoInscripcion === "" ? (
        <ButtonLoading
          onClick={() => confirmarInscripcion()}
          disabled={estado === "INACTIVO"}
          loading={loading}
          text="Inscribirme en este proyecto"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CardsProject;

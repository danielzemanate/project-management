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
import { EDITAR_PROYECTO, ELIMINAR_OBJETIVO, EDITAR_OBJETIVO } from "graphql/projects/mutation";
import useFormData from "hooks/useFormData";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
import PrivateComponent from "components/PrivateComponent";
import { GET_USUARIO } from "graphql/users/queries";
import Input from 'components/Input';

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
  const { data: queryData, loading, error} = useQuery(GET_PROYECTOS);

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
  if (loading || queryLoading)
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
          <h1 className="text-2xl font-bold text-gray-900">
            Lista de Proyectos
          </h1>
        </div>
        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
          <div className="my-2 self-end">
            <button className="bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400">
              <Link to="/admin/cardsprojects/nuevo">Crear nuevo proyecto</Link>
            </button>
          </div>
        </PrivateComponent>
        {userData.rol === "LIDER" ? (
          <>
            {queryDataUser.Usuario.proyectosLiderados.map((proyecto, index) => {
              return <AccordionProyecto key={index} proyecto={proyecto}/>;
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
              className="bg-red-700 text-white font-bold text-lg py-3 px-6 rounded-xl hover:bg-red-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
              onClick={() => {
                setShowDialogFase(true);
              }}
            >
              Fase
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
                <Link
                  to={`/admin/avances/nuevo/${proyecto._id}`}
                  className="mr-5"
                >
                  <ButtonLoading disabled={false} text="CREAR AVANCE" />
                </Link>
                <InscripcionProyecto
                  idProyecto={proyecto._id}
                  estado={proyecto.estado}
                  inscripciones={proyecto.inscripciones}
                />
              </div>
            )}
          </PrivateComponent>
          {userData.rol === "LIDER" ? (
            <></>
          ) : (
            <div>Liderado Por: {proyecto.lider.correo}</div>
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
    </>
  );
};

// EDITA FASE PROYECTO
const FormEditFaseProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    if (formData.fase === 'TERMINADO') {
      editarProyecto({
        variables: {
          _id,
          campos: {estado:'INACTIVO', ...formData},
        },
      });
    } else {
      editarProyecto({
        variables: {
          _id,
          campos: {estado:'ACTIVO', ...formData},
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
  const [eliminarObjetivo, { data: dataMutationEliminar, loading: eliminarLoading }] = useMutation(
    ELIMINAR_OBJETIVO,
    {
      refetchQueries: [{ query: GET_PROYECTOS }],
    }
  );

  useEffect(() => {
    console.log('eliminar objetivo:', dataMutationEliminar);
    if (dataMutationEliminar) {
      toast.success('objetivo eliminado satisfactoriamente');
    }
  }, [dataMutationEliminar]);

  const ejecutarEliminacion = () => {
    eliminarObjetivo({ variables: { idProyecto, idObjetivo: _id } });
  };

  if (eliminarLoading)
    return <ReactLoading data-testid='loading-in-button' type='spin' height={100} width={100} />;
  return (
    <div className='mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
      <div className='text-lg font-bold'>{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <div className='flex my-2'>
          <i
            onClick={() => setShowEditDialog(true)}
            className='fas fa-pen mx-2 text-yellow-500 hover:text-yellow-200 cursor-pointer'
          />
          <i
            onClick={ejecutarEliminacion}
            className='fas fa-trash mx-2 text-red-500 hover:text-red-200 cursor-pointer'
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

const EditarObjetivo = ({ descripcion, tipo, index, idProyecto, setShowEditDialog }) => {
  const { form, formData, updateFormData } = useFormData();

  const [editarObjetivo, { data: dataMutation, loading }] = useMutation(EDITAR_OBJETIVO, {
    refetchQueries: [{ query: GET_PROYECTOS }],
  });

  useEffect(() => {
    if (dataMutation) {
      toast.success('Objetivo editado con exito');
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
      toast.error('Error editando el objetivo');
    });
  };
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-gray-900'>Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label='Tipo de Objetivo'
          name='tipo'
          required={true}
          options={Enum_TipoObjetivo}
          defaultValue={tipo}
        />
        <Input
          label='Descripcion del objetivo'
          name='descripcion'
          required={true}
          defaultValue={descripcion}
        />
        <ButtonLoading
          text='Confirmar'
          disabled={Object.keys(formData).length === 0}
          loading={loading}
        />
      </form>
    </div>
  );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
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
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      // console.log(data);
      toast.success("inscripcion creada con exito");
      setEstadoInscripcion("INSCRITO")
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
      {estadoInscripcion !== "" ? (
        <span>
          Ya estas inscrito en este proyecto y el estado es {estadoInscripcion}
        </span>
      ) : (
        <ButtonLoading
          onClick={() => confirmarInscripcion()}
          disabled={estado === "INACTIVO"}
          loading={loading}
          text="Inscribirme en este proyecto"
        />
      )}
    </>
  );
};

export default CardsProject;

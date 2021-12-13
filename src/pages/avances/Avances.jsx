import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AVANCE } from "graphql/avances/queries";
import { Dialog } from "@mui/material";
import ButtonLoading from "components/ButtonLoading";
import { EDITAR_AVANCE } from "graphql/avances/mutation";
import useFormData from "hooks/useFormData";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import PrivateComponent from "components/PrivateComponent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from '@mui/material/DialogContent';

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

const Avances = () => {
  const { data: queryData, loading, error } = useQuery(GET_AVANCE);

  // MANEJO ERRORES
  useEffect(() => {
    if (error) {
      toast.error("Error consultando avances");
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

  if (queryData.Avances) {
    return (
      <div className="p-10 flex flex-col">
        <div className="flex w-full items-center justify-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Lista de Avances</h1>
        </div>
        {queryData.Avances.map((avance,index) => {
          return <AccordionAvance key={index} avance={avance} />;
        })}
      </div>
    );
  }

  return <></>;
};

const AccordionAvance = ({ avance }) => {
  const [showDialog, setShowDialog] = useState(false);
  const handleClose = () => {
    setShowDialog(false);
  };
  return (
    <>
      <AccordionStyled>
        <AccordionSummaryStyled
          expandIcon={<i className="fas fa-chevron-down" />}
        >
          <div className="flex w-full justify-between">
            <div className="uppercase font-bold text-gray-100 ">
              {avance._id} - {avance.proyecto.nombre}
            </div>
          </div>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
            <button
              className="bg-red-700 text-white font-bold text-lg py-3 px-6 rounded-xl hover:bg-red-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
              onClick={() => {
                setShowDialog(true);
              }}
            >
              AGREGAR OBSERVACION
            </button>
          </PrivateComponent>
          <div className="flex">
            <ul>
              <li>fecha: {avance.fecha.split("T")[0]} </li>
              <li>descripcion: {avance.descripcion}</li>
              <li>Creador por: {avance.creadoPor.nombre}</li>
              <li>Nombre de proyecto: {avance.proyecto.nombre}</li>
              {/* <li>observaciones: {avance.observaciones}</li> */}
              <li>
                <h1 className="text-gray-900 text-3xl font-semibold pt-3">
                  OBSERVACIONES:
                </h1>
                <div className="flex">
                  {avance.observaciones.map((item,index) => {
                    return <CardsObservaciones key={index} observaciones={item} />;
                  })}
                </div>
              </li>
            </ul>
          </div>
        </AccordionDetailsStyled>
      </AccordionStyled>
      <div className="flex w-full h-full">
        <Dialog
          open={showDialog}
          onClose={() => {
            setShowDialog(false);
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            AGREGAR OBSERVACION
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
            <FormEditAvance avance={avance} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

const FormEditAvance = ({ avance }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarAvance, { data: dataMutationEdit, loading, error }] =
    useMutation(EDITAR_AVANCE);

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

      // AÑADIR NUEVA OBSERVACION A EL AVANCE
      const observaciones = [formData.observacion];
      const observacionesAvance = avance.observaciones;

      observacionesAvance.forEach((item) => {
        observaciones.push(item);
      });

      // MUTACION EDITAR AVANCE CONLA NUEVA OSERVACION
      if (avance._id) {
        editarAvance({
          variables: {
            _id: avance._id,
            observaciones: observaciones,
          },
        });
      }
    }
    setValidated("was-validated");
  };

  // EDICION OBSERVACIONES CORRECTA
  useEffect(() => {
    if (dataMutationEdit) {
      toast.success("Observación agregada con éxito");
    }
  }, [dataMutationEdit]);

  // MANEJO ERRORES
  useEffect(() => {
    if (error) {
      toast.error("Error editando el avance");
    }
  }, [error]);

  return (
    <div className="flex flex-col h-full w-full p-4">
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className={`${validated} flex flex-col items-center justify-center needs-validation`}
        noValidate
      >
        <label htmlFor="observacion" className="flex flex-col my-3 form-label">
          <span className="mb-2 text-xl font-semibold">Observación Avance</span>
          <textarea
            className="p-2 border border-red-900 focus:outline-none focus:border-red-800 rounded-md shadow-sm form-control px-3"
            name="observacion"
            id="observacion"
            cols="30"
            rows="7"
            required
          />
          <div className="valid-feedback">Correcto!</div>
          <div className="invalid-feedback">
            Introduzca una observación valida.
          </div>
        </label>
        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
      </form>
    </div>
  );
};

// COMPONENTE CARD PARA MOSTRAR LAS OBSERVACIONES DEL AVANCE

const CardsObservaciones = ({ observaciones }) => {
  return (
    <div className="mx-5 my-4 bg-gray-50 p-8 rounded-lg  flex flex-col items-center justify-center shadow-xl">
      <div className="text-xl font-semibold">{observaciones}</div>
    </div>
  );
};

export default Avances;

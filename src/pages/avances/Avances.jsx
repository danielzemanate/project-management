import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import { useMutation, useQuery } from '@apollo/client';
import { GET_AVANCE } from 'graphql/avances/queries'
import DropDown from 'components/Dropdown';
import { Dialog } from '@mui/material';
import { Enum_EstadoProyecto } from 'utils/enum';
import ButtonLoading from 'components/ButtonLoading';
import { EDITAR_AVANCE } from 'graphql/avances/mutation';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import ReactLoading from "react-loading";
import { toast } from 'react-toastify';
import { useUser } from 'context/userContext';
import PrivateComponent from 'components/PrivateComponent';
import { CREAR_AVANCE } from 'graphql/avances/mutation';

const AccordionStyled = styled((props) => <Accordion {...props} />)(({ theme }) => ({
    backgroundColor: '#919191',
  }));
  const AccordionSummaryStyled = styled((props) => <AccordionSummary {...props} />)(({ theme }) => ({
    backgroundColor: '#919191',
  }));
  const AccordionDetailsStyled = styled((props) => <AccordionDetails {...props} />)(({ theme }) => ({
    backgroundColor: '#ccc',
  }));
  
  const Avances = () => {
    const { data: queryData, loading, error } = useQuery(GET_AVANCE);
  
    useEffect(() => {
      console.log('datos avance', queryData);
    }, [queryData]);
  
    if (loading) return <div>Cargando...</div>;
  
    if (queryData.Avances) {
      return (
        <div className='p-10 flex flex-col'>
          <div className='flex w-full items-center justify-center'>
            <h1 className='text-2xl font-bold text-gray-900'>Lista de Avances</h1>
          </div>
          <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
            <div className='my-2 self-end'>
              <button className='bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400'>
                <Link to='/admin/avances/nuevo'>Crear nuevo avance</Link>
              </button>
            </div>
          </PrivateComponent>
          {queryData.Avances.map((avance) => {
            return <AccordionAvance avance={avance} />;
          })}
        </div>
      );
    }
  
    return <></>;
  };
  
  const AccordionAvance = ({ avance }) => {
    const [showDialog, setShowDialog] = useState(false);
    return (
      <>
        <AccordionStyled>
          <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
            <div className='flex w-full justify-between'>
              <div className='uppercase font-bold text-gray-100 '>
                {avance._id} - {avance.proyecto.nombre}
              </div>
            </div>
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
              <i
                className='mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400'
                onClick={() => {
                  setShowDialog(true);
                }}
              />
            </PrivateComponent>
            <PrivateComponent roleList={['ESTUDIANTE']}>
              <InscripcionAvance
                idAvance={avance._id}
                estado={avance.estado}
                inscripciones={avance.inscripciones}
              />
            </PrivateComponent>
            <div className='flex'>
                <ul>
                <li>fecha: {avance.fecha} </li>
                <li>descripcion: {avance.descripcion}</li>
                <li>observaciones: {avance.observaciones}</li>
                <li>Creador por: {avance.creadoPor.nombre}</li>
                <li>Nombre de proyecto: {avance.proyecto.nombre}</li>
                </ul>
            </div>
          </AccordionDetailsStyled>
        </AccordionStyled>
        <Dialog
          open={showDialog}
          onClose={() => {
            setShowDialog(false);
          }}
        >
          <FormEditAvance _id={avance._id} />
        </Dialog>
      </>
    );
  };
  
  const FormEditAvance = ({ _id }) => {
    const { form, formData, updateFormData } = useFormData();
    const [editarAvance, { data: dataMutation, loading, error }] = useMutation(EDITAR_AVANCE);
  
    const submitForm = (e) => {
      e.preventDefault();
      editarAvance({
        variables: {
          _id,
          campos: formData,
        },
      });
    };
  
    useEffect(() => {
      console.log('data mutation', dataMutation);
    }, [dataMutation]);
  
    return (
      <div className='p-4'>
        <h1 className='font-bold'>Modificar Estado del Avance</h1>
        <form
          ref={form}
          onChange={updateFormData}
          onSubmit={submitForm}
          className='flex flex-col items-center'
        >
          <DropDown label='Estado del Proyecto' name='estado' options={Enum_EstadoProyecto} />
          <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
        </form>
      </div>
    );
  };
  
  const Objetivo = ({ tipo, descripcion }) => {
    return (
      <div className='mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
        <div className='text-lg font-bold'>{tipo}</div>
        <div>{descripcion}</div>
          <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
            <div>Editar</div>
            <Link to='/admin/cardsprojects/nuevo'>Crear nuevo avance</Link>
          </PrivateComponent>
      </div>
    );
  };

  const InscripcionAvance = ({ idProyecto, estado, avances }) => {
    const [estadoAvance, setEstadoAvance] = useState('');
    const [crearAvance, { data, loading, error }] = useMutation(CREAR_AVANCE);
    const { userData } = useUser();
  
    useEffect(() => {
      if (userData && avances) {
        const flt = avances.filter((el) => el.estudiante._id === userData._id);
        if (flt.length > 0) {
          setEstadoAvance(flt[0].estado);
        }
      }
    }, [userData, avances]);
  
    useEffect(() => {
      if (data) {
        console.log(data);
        toast.success('Avance creado con exito');
      }
    }, [data]);
  
    const confirmarAvance = () => {
      crearAvance({ variables: { proyecto: idProyecto, estudiante: userData._id } });
    };
  
    return (
      <>
        {estadoAvance !== '' ? (
          <span>Ya estas inscrito en este proyecto y el estado es {estadoAvance}</span>
        ) : (
          <ButtonLoading
            onClick={() => confirmarAvance()}
            disabled={estado === 'INACTIVO'}
            loading={loading}
            text='Inscribirme en este proyecto'
          />
        )}
      </>
    );
  };
  
  export default Avances;

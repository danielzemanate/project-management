import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from 'components/Input';
import { GET_USUARIOS } from 'graphql/users/queries';
import { Link } from 'react-router-dom';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Enum_TipoObjetivo } from 'utils/enum';
import { nanoid } from 'nanoid';
import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';
import { CREAR_AVANCE } from 'graphql/avances/mutation';
import { GET_AVANCE } from 'graphql/avances/queries';

const NuevoAvance = () => {
  const { form, formData, updateFormData } = useFormData();
  const [listaUsuarios, setListaUsuarios] = useState({});
  const [listaAvance, setListaAvance] = useState({});
  const { dataAvance, loadingAvance, errorAvance } = useQuery(GET_AVANCE);
  const { data, loading, error } = useQuery(GET_USUARIOS, {
    variables: {
      filtro: { rol: 'ESTUDIANTE', estado: 'AUTORIZADO' },
    },
  });

  const [crearAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_AVANCE);

  useEffect(() => {
    console.log(data);
    if (data) {
      const lu = {};
      data.Usuarios.forEach((elemento) => {
        lu[elemento._id] = elemento.correo;
      });

      setListaUsuarios(lu);
    }
  }, [data]);

  useEffect(() => {
    console.log('data mutation', mutationData);
  });

  useEffect(() => {
    console.log(dataAvance);
    if (dataAvance) {
      const la = {};
      dataAvance.Avances.forEach((elemento) => {
        la[elemento._id] = elemento._id;
      });

      setListaAvance(la);
    }
  }, [dataAvance]);

  const submitForm = (e) => {
    e.preventDefault();

    formData.objetivos = Object.values(formData.avances);
    formData.presupuesto = parseFloat(formData.presupuesto);

    crearAvance({
      variables: formData,
    });
  };

  if (loading) return <div>...Loading</div>;

  return (
    <div className='p-10 flex flex-col items-center'>
      <div className='self-start'>
        <Link to='/admin/cardsprojects'>
          <i className='fas fa-arrow-left' />
        </Link>
      </div>
      <h1 className='text-2xl font-bold text-gray-900'>Crear Nuevo Avance</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
      <DropDown label='Avance' options={listaAvance} name='Avance' required={true} />
        <Input name='nombre' label='Identificador único avance' required={true} type='text' />
        <Input name='presupuesto' label='Identificador único proyecto' required={true} type='number' />
        <Input name='fechaInicio' label='Fecha de Inicio' required={true} type='date' />
        <Input name='fechaFin' label='Fecha de Fin' required={true} type='date' />
        <DropDown label='Estudiante' options={listaUsuarios} name='Estudiante' required={true} />
        <Objetivos />
        <ButtonLoading text='Crear Avance' loading={false} disabled={false} />
      </form>
    </div>
  );
};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  useEffect(() => {
    if (listaObjetivos.length > 4) {
      setMaxObjetivos(true);
    } else {
      setMaxObjetivos(false);
    }
  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div>
        <span>Objetivos del Avance</span>
        {!maxObjetivos && (
          <i
            onClick={() => setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])}
            className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
          />
        )}
        {listaObjetivos.map((objetivo) => {
          return objetivo;
        })}
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();
  return (
    <div className='flex items-center'>
      <Input
        name={`nested||objetivos||${id}||descripcion`}
        label='Descripción'
        type='text'
        required={true}
      />
      <DropDown
        name={`nested||objetivos||${id}||tipo`}
        options={Enum_TipoObjetivo}
        label='Tipo de Objetivo'
        required={true}
      />
      <i
        onClick={() => eliminarObjetivo(id)}
        className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6'
      />
    </div>
  );
};

export default NuevoAvance;

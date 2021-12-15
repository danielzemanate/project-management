import { useUser } from 'context/userContext';
import { Link } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ roleList, children }) => {
  const { userData } = useUser();

  if (roleList.includes(userData.rol)) {
    return children;
  }

     return (
        <div className="w-100 flex flex-col justify-center items-center">
            <div className='text-center pt-5'>
                <h1 className='text-6xl text-red-900 font-bold' data-testid='not-authorized'>SIN ACCESO A ESTE SITIO</h1>
            </div>
            <div className="d-flex flex-column align-items-center pt-5">
                <h3 className='text-3xl font-semibold'>Volver al Perfil!</h3>
             <Link className='pt-3' to='/admin/landingAdmin'><button className='btn btn-primary'>Perfil</button></Link>
            </div>
        </div>
        );
};

export default PrivateRoute;
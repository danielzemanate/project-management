import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className='bg-indigo-300'>
            ESTE ES EL HOME
            <Link to="/users"><i className='fas fa-users' /></Link>
        </div>
    )
}

export default Home

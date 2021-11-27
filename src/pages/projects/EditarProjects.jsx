import React from 'react'
import { useParams, Link } from "react-router-dom";

const EditarProjects = () => {
    
    const { _id } = useParams();

    return (
        <div>
            Editar Proyectos {_id}
        </div>
    )
}

export default EditarProjects

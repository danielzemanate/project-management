import {gql} from "@apollo/client";

const GET_PROYECTOS = gql`
query Proyectos {
    Proyectos {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      _id   
    }
    objetivos {
      _id
    }
    avances {
      _id
      creadoPor {
        _id
      }
    }
    inscripciones {
      _id
      estudiante {
        _id
      }
    }  
    }
  }
`;

export {GET_PROYECTOS};
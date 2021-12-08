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
      correo   
    }
    objetivos {
      _id
      descripcion
      tipo
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

const GET_PROYECTO = gql` 
query Usuario($_id: String!) {
  Proyecto(_id: $_id) {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      _id
      correo   
    }
    objetivos {
      _id
      descripcion
      tipo
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



export {GET_PROYECTOS, GET_PROYECTO};
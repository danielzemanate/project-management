import { gql } from "@apollo/client";

const GET_USUARIOS = gql`
  query Usuarios {
    Usuarios {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
      proyectosLiderados {
        _id
        nombre
        estado
        fase
        fechaInicio
        fechaFin
        presupuesto
        objetivos {
          tipo
          descripcion
        }
      }
      avancesCreados {
        _id
        descripcion
        fecha
        observaciones
        proyecto {
          nombre
        }
      }
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };

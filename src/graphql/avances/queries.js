import {gql} from "@apollo/client";

const GET_AVANCE = gql`
query Avances {
    Avances {
      _id
      fecha
      descripcion
      observaciones
      proyecto {
        _id
        nombre
      }
      creadoPor {
        _id
        nombre
      }
    }
  }
`;

export {GET_AVANCE};
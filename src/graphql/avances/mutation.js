import { gql } from "@apollo/client";

const EDITAR_AVANCE = gql`
  mutation EditarAvance(
    $_id: String!
    $observaciones: [String]
    $descripcion: String
  ) {
    editarAvance(
      _id: $_id
      observaciones: $observaciones
      descripcion: $descripcion
    ) {
      _id
      fecha
      descripcion
      observaciones
      proyecto {
        _id
      }
      creadoPor {
        _id
      }
    }
  }
`;

const CREAR_AVANCE = gql`
  mutation CrearAvance(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      _id
    }
  }
`;

export { EDITAR_AVANCE, CREAR_AVANCE };

import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
mutation EditarProyecto($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      _id
      nombre
      estado
      presupuesto
      objetivos {
        _id
      }
    }
  }
`;

const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $lider: String!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      lider: $lider
      objetivos: $objetivos
    ) {
      _id
    }
  }
`;

export {EDITAR_PROYECTO, CREAR_PROYECTO}
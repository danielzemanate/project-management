import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
mutation EditarProyecto($id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $id, campos: $campos) {
      _id
      nombre
      presupuesto
      objetivos {
        _id
      }
    }
  }
`;

export {EDITAR_PROYECTO}
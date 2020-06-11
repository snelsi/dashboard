import { useMutation, gql } from "@apollo/client";
import { GET_DESKS } from "apollo";

export interface DELETE_DESK_VALUE {
  delete_desk: {
    id: number;
  };
}
export interface DELETE_DESK_PROPS {
  id: number;
}
export const DELETE_DESK = gql`
  mutation deleteDesk($id: Int!) {
    delete_desk(id: $id) {
      id
    }
  }
`;

/**
 * Returns function that deletes Desk with given id
 */
export const useDeleteDesk = (id: number) =>
  useMutation<DELETE_DESK_VALUE, DELETE_DESK_PROPS>(DELETE_DESK, {
    variables: {
      id,
    },
    update(cache, { data: { delete_desk } }) {
      const { desks } = cache.readQuery({ query: GET_DESKS });
      cache.writeQuery({
        query: GET_DESKS,
        data: { desks: desks.filter(({ id }) => id !== delete_desk.id) },
      });
    },
  });

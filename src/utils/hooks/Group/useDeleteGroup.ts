import { useMutation, gql } from "@apollo/client";
import { GET_DESK } from "apollo";

export interface DELETE_GROUP_VALUE {
  delete_group: {
    __typename: "groups";
    id: number;
    desk_id: number;
  };
}
export interface DELETE_GROUP_PROPS {
  id: number;
}

export const DELETE_GROUP = gql`
  mutation deleteGroup($id: Int!) {
    delete_group(id: $id) {
      id
      desk_id
    }
  }
`;

/**
 * Returns function that deletes group with given id
 */
export const useDeleteGroup = (id: number) =>
  useMutation<DELETE_GROUP_VALUE, DELETE_GROUP_PROPS>(DELETE_GROUP, {
    variables: {
      id,
    },
    update(cache, { data: { delete_group } }) {
      const { desk } = cache.readQuery({
        query: GET_DESK,
        variables: { id: String(delete_group.desk_id) },
      });

      const groups = desk.groups.filter(
        (group) => group.id !== delete_group.id
      );

      cache.writeQuery({
        query: GET_DESK,
        variables: { id: String(delete_group.desk_id) },
        data: { desk: { ...desk, groups } },
      });
    },
  });

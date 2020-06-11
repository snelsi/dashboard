import { useMutation, gql } from "@apollo/client";

interface Input {
  id: number;
  name: string;
}

export interface CHANGE_GROUP_NAME_VALUE {
  update_group: {
    id: number;
    name: string;
  };
}
export interface CHANGE_GROUP_NAME_PROPS {
  id: number;
  name: string;
}
export const CHANGE_GROUP_NAME = gql`
  mutation updateGroupName($id: Int!, $name: String!) {
    update_group(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
    }
  }
`;

/**
 * Returns function that changes name of group with given id
 */
export const useGroupName = ({ name, id }: Input) =>
  useMutation<CHANGE_GROUP_NAME_VALUE, CHANGE_GROUP_NAME_PROPS>(
    CHANGE_GROUP_NAME,
    {
      variables: {
        name,
        id,
      },
      optimisticResponse: {
        update_group: {
          id,
          name,
        },
      },
    }
  );

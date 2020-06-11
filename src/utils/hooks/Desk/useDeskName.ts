import { useMutation, gql } from "@apollo/client";

interface Input {
  id: number;
  name: string;
}

export interface CHANGE_DESK_NAME_VALUE {
  update_group: {
    id: number;
    name: string;
  };
}
export interface CHANGE_DESK_NAME_PROPS {
  id: number;
  name: string;
}
export const CHANGE_DESK_NAME = gql`
  mutation updateDeskName($id: Int!, $name: String!) {
    update_desk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
    }
  }
`;

/**
 * Returns mutation that changes name of desk with given id
 */
export const useDeskName = ({ name, id }: Input) =>
  useMutation<CHANGE_DESK_NAME_VALUE, CHANGE_DESK_NAME_PROPS>(
    CHANGE_DESK_NAME,
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

import { useMutation, gql } from "@apollo/client";
import { GET_DESKS } from "apollo";

interface Input {
  name: string;
  index: number;
}
export interface CREATE_DESK_VALUE {
  create_desk: {
    id: number;
    name: string;
    index: number;
    created_at: Date;
    updated_at: Date;
  };
}
export interface CREATE_DESK_PROPS {
  desk: {
    name: string;
    index: number;
  };
}
export const CREATE_DESK = gql`
  mutation createDesk($desk: desks_insert_input!) {
    create_desk(object: $desk) {
      id
      name
      index
      created_at
      updated_at
    }
  }
`;

/**
 * Returns function that creates Desk with given name and index
 */
export const useCreateDesk = ({ name, index }: Input) =>
  useMutation<CREATE_DESK_VALUE, CREATE_DESK_PROPS>(CREATE_DESK, {
    variables: {
      desk: {
        name,
        index,
      },
    },
    update(cache, { data: { create_desk } }) {
      const { desks } = cache.readQuery({ query: GET_DESKS });
      cache.writeQuery({
        query: GET_DESKS,
        data: { desks: desks.concat([create_desk]) },
      });
    },
  });

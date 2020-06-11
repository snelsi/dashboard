import { useMutation, gql } from "@apollo/client";

export interface CHANGE_DESK_INDEX_VALUE {
  update_desk: {
    id: number;
    index: number;
  };
}
export interface CHANGE_DESK_INDEX_PROPS {
  id: number;
  index: number;
}
export const CHANGE_DESK_INDEX = gql`
  mutation updateDeskIndex($id: Int!, $index: Int!) {
    update_desk(pk_columns: { id: $id }, _set: { index: $index }) {
      id
      index
    }
  }
`;

/**
 * Returns mutation, that changes index of desk with given id
 */
export const useDeskIndex = () =>
  useMutation<CHANGE_DESK_INDEX_VALUE, CHANGE_DESK_INDEX_PROPS>(
    CHANGE_DESK_INDEX,
    {
      update(cache, { data: { update_desk } }) {
        cache.modify({
          id: cache.identify({
            __typename: "desks",
            id: update_desk.id,
          }),
          fields: {
            index: () => update_desk.index,
          },
        });
      },
    }
  );

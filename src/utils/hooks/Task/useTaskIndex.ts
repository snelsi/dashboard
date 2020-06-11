import { useMutation, gql } from "@apollo/client";

export interface CHANGE_TASK_INDEX_VALUE {
  update_task: {
    id: number;
    index: number;
  };
}
export interface CHANGE_TASK_INDEX_PROPS {
  id: number;
  index: number;
}
export const CHANGE_TASK_INDEX = gql`
  mutation updateTaskIndex($id: Int!, $index: Int!) {
    update_task(pk_columns: { id: $id }, _set: { index: $index }) {
      id
      index
    }
  }
`;

/**
 * Returns mutation, that changes index of task with given id
 */
export const useTaskIndex = () =>
  useMutation<CHANGE_TASK_INDEX_VALUE, CHANGE_TASK_INDEX_PROPS>(
    CHANGE_TASK_INDEX,
    {
      update(cache, { data: { update_task } }) {
        cache.modify({
          id: cache.identify({
            __typename: "tasks",
            id: update_task.id,
          }),
          fields: {
            index: () => update_task.index,
          },
        });
      },
    }
  );

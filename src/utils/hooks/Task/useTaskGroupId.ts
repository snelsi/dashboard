import { useMutation, gql } from "@apollo/client";

export interface CHANGE_TASK_GROUP_ID_VALUE {
  update_task: {
    id: number;
    group_id: number;
  };
}
export interface CHANGE_TASK_GROUP_ID_PROPS {
  id: number;
  group_id: number;
}
export const CHANGE_TASK_GROUP_ID = gql`
  mutation updateTaskGroupId($id: Int!, $group_id: Int!) {
    update_task(pk_columns: { id: $id }, _set: { group_id: $group_id }) {
      id
      group_id
    }
  }
`;

/**
 * Returns mutation, that changes index of task with given id
 */
export const useTaskGroupId = () =>
  useMutation<CHANGE_TASK_GROUP_ID_VALUE, CHANGE_TASK_GROUP_ID_PROPS>(
    CHANGE_TASK_GROUP_ID,
    {
      update(cache, { data: { update_task } }) {
        cache.modify({
          id: cache.identify({
            __typename: "tasks",
            id: update_task.id,
          }),
          fields: {
            group_id: () => update_task.group_id,
          },
        });
      },
    }
  );

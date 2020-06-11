import { useMutation, gql, MutationResult } from "@apollo/client";

interface Input {
  id: number;
  group_id: number;
  old_group_id: number;
}
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
export const useTaskGroupId = (): [
  (props: Input) => void,
  MutationResult<CHANGE_TASK_GROUP_ID_VALUE>
] => {
  const [mutation, props] = useMutation<
    CHANGE_TASK_GROUP_ID_VALUE,
    CHANGE_TASK_GROUP_ID_PROPS
  >(CHANGE_TASK_GROUP_ID);

  const update = ({ id, group_id, old_group_id }: Input) => {
    mutation({
      variables: {
        id,
        group_id,
      },
      optimisticResponse: {
        update_task: {
          id,
          group_id,
        },
      },
      update(cache, { data: { update_task } }) {
        // Update task group_id
        cache.modify({
          id: cache.identify({
            __typename: "tasks",
            id: update_task.id,
          }),
          fields: {
            group_id: () => update_task.group_id,
          },
        });

        // Remove task from old group
        cache.modify({
          id: cache.identify({
            __typename: "groups",
            id: String(old_group_id),
          }),
          fields: {
            tasks: (tasks) =>
              tasks.filter((task) => task.__ref.split(":")[1] !== String(id)),
          },
        });

        // Add task to new group
        cache.modify({
          id: cache.identify({
            __typename: "groups",
            id: update_task.group_id,
          }),
          fields: {
            tasks: (tasks) =>
              tasks.concat({ __ref: `tasks:${update_task.id}` }),
          },
        });
      },
    });
  };

  return [update, props];
};

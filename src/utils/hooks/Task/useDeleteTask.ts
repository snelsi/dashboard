import { useMutation, gql } from "@apollo/client";

export interface DELETE_TASK_VALUE {
  delete_task: {
    id: number;
    group: {
      id: number;
      desk_id: number;
    };
  };
}
export interface DELETE_TASK_PROPS {
  id: number;
}

export const DELETE_TASK = gql`
  mutation deleteTask($id: Int!) {
    delete_task(id: $id) {
      id
      group {
        desk_id
        id
      }
    }
  }
`;

/**
 * Return function that deletes task with given id
 */
export const useDeleteTask = (id: number) =>
  useMutation<DELETE_TASK_VALUE, DELETE_TASK_PROPS>(DELETE_TASK, {
    variables: {
      id,
    },
    update(
      cache,
      {
        data: {
          delete_task: { id, group },
        },
      }
    ) {
      cache.modify({
        id: cache.identify({
          __typename: "groups",
          id: String(group.id),
        }),
        fields: {
          tasks: (tasks) =>
            tasks.filter((task) => task.__ref.split(":")[1] !== String(id)),
        },
      });
    },
  });

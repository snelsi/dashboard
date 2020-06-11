import { useMutation, gql } from "@apollo/client";
import { GET_DESK } from "apollo";
import type { Status } from "interfaces";

interface Input {
  description: string;
  status: Status;
  group_id: number;
  index: number;
}

export interface CREATE_TASK_VALUE {
  create_task: {
    id: number;
    description: string;
    index: number;
    group: {
      id: number;
      desk_id: number;
    };
    created_at: Date;
    updated_at: Date;
  };
}
export interface CREATE_TASK_PROPS {
  task: {
    description: string;
    status: Status;
    group_id: number;
    index: number;
  };
}
export const CREATE_TASK = gql`
  mutation createTask($task: tasks_insert_input!) {
    create_task(object: $task) {
      id
      description
      index
      group {
        id
        desk_id
      }
      created_at
      updated_at
    }
  }
`;

/**
 * Return function that creates task with given description, status, group_id and index
 */
export const useCreateTask = ({
  description,
  status,
  group_id,
  index,
}: Input) =>
  useMutation<CREATE_TASK_VALUE, CREATE_TASK_PROPS>(CREATE_TASK, {
    variables: {
      task: {
        description,
        status,
        group_id,
        index,
      },
    },
    update(cache, { data: { create_task } }) {
      const { desk } = cache.readQuery({
        query: GET_DESK,
        variables: { id: String(create_task.group.desk_id) },
      });

      const groups = desk.groups.map((group) => {
        if (group.id === create_task.group.id) {
          return [...group.tasks, { ...create_task }];
        }
        return group;
      });

      cache.writeQuery({
        query: GET_DESK,
        variables: { id: String(create_task.group.desk_id) },
        data: { desk: { ...desk, groups } },
      });
    },
  });

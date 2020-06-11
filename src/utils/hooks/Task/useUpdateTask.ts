import { useMutation, gql } from "@apollo/client";
import type { Status } from "interfaces";

interface Input {
  id: number;
  description: string;
  status: Status;
}

export interface UPDATE_TASK_PROPS {
  id: number;
  description: string;
  status: Status;
  updated_at: Date;
}
export const UPDATE_TASK = gql`
  mutation updateTask($id: Int!, $description: String!, $status: String!) {
    update_task(
      pk_columns: { id: $id }
      _set: { description: $description, status: $status }
    ) {
      id
      description
      status
      updated_at
    }
  }
`;

/**
 * Return function that updates description and status of task with given id
 */
export const useUpdateTask = ({ id, description, status }: Input) =>
  useMutation<UPDATE_TASK_PROPS>(UPDATE_TASK, {
    variables: {
      id,
      description,
      status,
    },
    optimisticResponse: {
      id,
      description,
      status,
      updated_at: new Date(),
    },
  });

import { useQuery } from "@apollo/client";
import { GET_DESK, GET_DESK_VALUES, GET_DESK_PROPS } from "apollo";

/**
 * Returns desk with given id and linked groups and tasks
 */
export const useDesk = (id: number) =>
  useQuery<GET_DESK_VALUES, GET_DESK_PROPS>(GET_DESK, {
    variables: {
      id,
    },
  });

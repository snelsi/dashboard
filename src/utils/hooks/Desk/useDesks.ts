import { useQuery } from "@apollo/client";
import { GET_DESKS, GET_DESKS_VALUE } from "apollo";

/**
 * Returns list of desks without their content
 */
export const useDesks = () =>
  useQuery<GET_DESKS_VALUE>(GET_DESKS, { pollInterval: 2000 });

import { useMutation, gql } from "@apollo/client";
import { GET_DESK } from "apollo";

interface Input {
  name: string;
  index: number;
  desk_id: number;
}
export interface CREATE_GROUP_VALUE {
  create_group: {
    __typename: "groups";
    id: number;
    name: string;
    index: number;
    created_at: Date;
    updated_at: Date;
    desk_id: number;
  };
}
export interface CREATE_GROUP_PROPS {
  group: Input;
}
export const CREATE_GROUP = gql`
  mutation createGroup($group: groups_insert_input!) {
    create_group(object: $group) {
      id
      name
      index
      desk_id
    }
  }
`;

/**
 * Return mutation that creates group with given name, index and desk_id
 */
export const useCreateGroup = ({ name, desk_id, index }: Input) =>
  useMutation<CREATE_GROUP_VALUE, CREATE_GROUP_PROPS>(CREATE_GROUP, {
    variables: {
      group: {
        name,
        desk_id,
        index,
      },
    },
    update(cache, { data: { create_group } }) {
      const { desk } = cache.readQuery({
        query: GET_DESK,
        variables: { id: String(create_group.desk_id) },
      });

      const groups = desk.groups.concat({ ...create_group, tasks: [] });

      cache.writeQuery({
        query: GET_DESK,
        variables: { id: String(create_group.desk_id) },
        data: { desk: { ...desk, groups } },
      });
    },
  });

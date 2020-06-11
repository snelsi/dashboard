import { gql } from "@apollo/client";
import type { IGroup } from "interfaces";

export interface GET_DESKS_VALUE {
  desks: {
    id: number;
    name: string;
    index: number;
    created_at: Date;
    updated_at: Date;
  }[];
}

export const GET_DESKS = gql`
  query getDesks {
    desks(order_by: { index: asc }) {
      id
      name
      index
      created_at
      updated_at
    }
  }
`;

export interface GET_DESK_PROPS {
  id: number;
}
export interface GET_DESK_VALUES {
  desk: {
    id: number;
    name: string;
    groups: IGroup[];
  };
}
export const GET_DESK = gql`
  query getDesk($id: Int!) {
    desk(id: $id) {
      id
      name
      groups(order_by: { index: asc }) {
        id
        name
        index
        tasks(order_by: { index: asc }) {
          id
          description
          status
          index
        }
      }
    }
  }
`;

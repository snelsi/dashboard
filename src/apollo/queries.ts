import { gql } from "@apollo/client";

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

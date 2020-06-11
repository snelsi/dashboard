import * as React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Desks } from "pages";
import { GET_DESKS } from "apollo";

const mocks = [
  {
    request: {
      query: GET_DESKS,
    },
    result: {
      data: {
        desks: [
          {
            id: 1,
            name: "Next release",
            index: 1,
            __typename: "desks",
          },
          {
            id: 7,
            name: "3.0",
            index: 2,
            __typename: "desks",
          },
          {
            id: 5,
            name: "2.0",
            index: 3,
            __typename: "desks",
          },
        ],
      },
    },
  },
];

it("renders without error", () => {
  render(
    <MockedProvider mocks={mocks}>
      <Desks />
    </MockedProvider>
  );
});

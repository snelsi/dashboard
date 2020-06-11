import * as React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { CreateDesk } from "components/Desks/CreateDesk";
import { CREATE_DESK } from "utils";

const mocks = [
  {
    request: {
      query: CREATE_DESK,
    },
    result: {
      data: {
        create_desk: {
          id: 1,
          name: "Next release",
          index: 1,
          __typename: "desks",
        },
      },
    },
  },
];

it("renders without error", () => {
  render(
    <MockedProvider mocks={mocks}>
      <CreateDesk index={1} />
    </MockedProvider>
  );
});

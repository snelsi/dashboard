import * as React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import { DeleteDeskButton } from "components/Desks/DeleteDeskButton";
import { DELETE_DESK } from "utils";

const mocks = [
  {
    request: {
      query: DELETE_DESK,
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
      <Router>
        <DeleteDeskButton id={1} />
      </Router>
    </MockedProvider>
  );
});

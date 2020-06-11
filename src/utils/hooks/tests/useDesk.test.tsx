import * as React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { DeskOverview } from "pages";
import { GET_DESK } from "apollo";

const mocks = [
  {
    request: {
      query: GET_DESK,
    },
    result: {
      data: {
        desk: {
          id: 1,
          name: "Next release",
          __typename: "desks",
          groups: [
            {
              id: 1,
              name: "Planned",
              index: 1,
              __typename: "groups",
              tasks: [
                {
                  id: 18,
                  description: "Create sometjing",
                  status: "In Progress",
                  index: 1,
                  __typename: "tasks",
                },
              ],
            },
            {
              id: 1,
              name: "Done",
              index: 2,
              __typename: "groups",
              tasks: [],
            },
          ],
        },
      },
    },
  },
];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1",
  }),
}));

it("renders without error", () => {
  render(
    <MockedProvider mocks={mocks}>
      <Router>
        <DeskOverview />
      </Router>
    </MockedProvider>
  );
});

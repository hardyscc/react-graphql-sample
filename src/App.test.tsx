import { MockedProvider } from "@apollo/react-testing";
import { render } from "@testing-library/react";
import React from "react";
import App from "./App";
import { UsersDocument } from "./generated/graphql";

const mocks = [
  {
    request: {
      query: UsersDocument,
    },
    result: {
      data: {
        users: [{ __typename: "User", id: "1", name: "John", nickName: null }],
      },
    },
  },
];

test("renders UserList", async () => {
  const { findByText } = render(
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>
  );

  expect(await findByText("John")).toBeInTheDocument();
});

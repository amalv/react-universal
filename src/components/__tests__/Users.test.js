import React from "react";
import { render, waitForElement } from "react-testing-library";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Users from "../Users";

const renderWithRouter = (
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

const renderComponent = () => renderWithRouter(<Users />);

describe("Test Users", () => {
  test("it renders Users text", async () => {
    const { getByText } = renderComponent();
    await waitForElement(() => getByText(/Users/i));
  });
});

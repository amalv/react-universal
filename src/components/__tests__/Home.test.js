import React from "react";
import { render, waitForElement } from "react-testing-library";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Home from "../Home";

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

const renderComponent = () => renderWithRouter(<Home />);

describe("Test Home", () => {
  test("it renders Home text", async () => {
    const { getByText } = renderComponent();
    await waitForElement(() => getByText(/Home/i));
  });
});

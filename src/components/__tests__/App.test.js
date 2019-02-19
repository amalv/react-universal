import React from "react";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { render, waitForElement } from "react-testing-library";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import App from "../App";

let props;
let store;
let history;

beforeEach(() => {
  // Reset history
  history = createMemoryHistory();

  // Mock props
  props = {
    action: "POP",
    location: {
      pathname: "/path/to/somewhere",
    },
    history,
  };

  // Mock store
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  store = mockStore({
    router: {
      action: "POP",
      location: props.history.location,
    },
    authentication: {
      isAuthenticated: false,
    },
  });
});

const renderWithRouter = ui => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

describe("Test App", () => {
  test("it renders text intro", async () => {
    const { getByText } = renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await waitForElement(() => getByText(/Home/i));
  });
});

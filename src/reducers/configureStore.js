import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createBrowserHistory, createMemoryHistory } from "history";
import createRootReducer from "./reducers";

export const isServer = !(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export default (url = "/") => {
  // Create a history depending on the environment
  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url],
      })
    : createBrowserHistory();

  const middleware = [thunk, routerMiddleware(history)];
  const composeEnhancers =
    (typeof window === "object" &&
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const composedEnhancers = composeEnhancers(applyMiddleware(...middleware));

  // eslint-disable-next-line no-underscore-dangle
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};

  if (!isServer) {
    // eslint-disable-next-line no-underscore-dangle
    delete window.__PRELOADED_STATE__;
  }

  // Create the store
  const store = createStore(
    createRootReducer(history),
    initialState,
    composedEnhancers
  );

  return {
    store,
    history,
  };
};

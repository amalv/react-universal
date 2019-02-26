import { push } from "connected-react-router";
import Cookies from "js-cookie";
import { loginUser, logoutUser } from "../services";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  error,
});

export const establishCurrentUser = () => dispatch => {
  const userFromCookie = Cookies.getJSON("react-universal");

  if (userFromCookie) {
    Cookies.set("react-universal", userFromCookie);
    dispatch(loginSuccess(userFromCookie));
  }
};

export const socialLoginSuccess = username => dispatch => {
  Cookies.set("react-universal", { username });
  dispatch(loginSuccess({ username }));
  dispatch(push("/"));
};

export const login = (username, password) => dispatch => {
  dispatch(loginRequest());

  loginUser(username, password).then(
    () => {
      Cookies.set("react-universal", { username });
      dispatch(loginSuccess({ username }));
      dispatch(push("/"));
    },
    error => {
      dispatch(loginFailure(error));
    }
  );
};

export const logout = () => dispatch => {
  dispatch(logoutRequest());

  logoutUser().then(
    () => {
      Cookies.remove("react-universal");
      dispatch(logoutSuccess());
    },
    error => {
      dispatch(logoutFailure(error));
    }
  );
};

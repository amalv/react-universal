import { loginUser } from "../services";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const request = () => ({
  type: LOGIN_REQUEST,
});

const success = user => ({
  type: LOGIN_SUCCESS,
  user,
});

const failure = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const login = (username, password) => {
  return dispatch => {
    dispatch(request());

    loginUser(username, password).then(
      loggedUser => {
        dispatch(success(loggedUser));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
};

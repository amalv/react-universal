import { push } from "connected-react-router";
import { registerUser } from "../services";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

const request = user => ({
  type: USER_REGISTER_REQUEST,
  user,
});

const success = user => ({
  type: USER_REGISTER_SUCCESS,
  user,
});

const failure = error => ({
  type: USER_REGISTER_FAILURE,
  error,
});

export const register = user => {
  return dispatch => {
    dispatch(request(user));

    registerUser(user).then(
      registeredUser => {
        dispatch(success(registeredUser));
        dispatch(push("/signin"));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
};

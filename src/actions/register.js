import Cookies from "js-cookie";
import { registerUser } from "../services";
import { loginSuccess } from "./authentication";

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
    const { username } = user;

    registerUser(user).then(
      registeredUser => {
        Cookies.set("react-universal", { username });
        dispatch(success(registeredUser));
        dispatch(loginSuccess({ username }));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
};

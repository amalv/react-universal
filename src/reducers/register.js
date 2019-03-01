import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from "../actions";

const initialState = {
  loginFailure: false,
  registerFailure: false,
  isAuthenticated: false,
  user: {},
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loginFailure: false,
        isAuthenticated: true,
        user: action.user,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        loginFailure: true,
      };
    default:
      return state;
  }
};

export default authentication;

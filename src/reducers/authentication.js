import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from "../actions";

const initialState = { isAuthenticated: false, user: {} };

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {};
    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};

export default authentication;

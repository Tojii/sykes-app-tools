import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  RESET_PASSWORD,
  LOGIN_DATA
} from "../actions/LoginActions";

const initialState = {
  success: false,
  loading: false,
  token: null,
  error: {
    username: null,
    password: null
  }
};

const LoginReducer = function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false
      };
    }
    case LOGIN_DATA: {
      return {
        ...state,
        token: action.data
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        success: true,
        loading: false
      };
    }
    case LOGIN_ERROR: {
      return {
        success: false,
        loading: false,
        error: action.data
      };
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;

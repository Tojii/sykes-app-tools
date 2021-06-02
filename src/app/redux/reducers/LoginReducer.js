import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR_SESSION_ACTIVE,
  LOGIN_CLEAR,
  LOGIN_ERROR,
  CA_SET_ERROR
} from "../actions/LoginActions";

const initialState = {
  success: false,
  loading: false,
  token: null,
  token_type: null,
  refreshtoken: null,
  error: null,
  force: false,
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
        loading: false,
        token: action.data.token,
        refreshtoken: action.data.refreshtoken,
        token_type: action.data.token_type,
        error: null
      };
    }
    case LOGIN_CLEAR: {
      return initialState;
    }
    case LOGIN_ERROR: {
      return {
        success: false,
        loading: false,
        error: action.data
      };
    }
    case LOGIN_ERROR_SESSION_ACTIVE: {
      return {
        success: false,
        loading: false,
        force: true,
        error: action.data
      };
    }
    case CA_SET_ERROR: {
      return {
        success: false,
        loading: false,
        error: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;

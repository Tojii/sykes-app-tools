import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
  USER_LOGGED_OUT,
  GET_ACCOUNT,
  GET_SUPERVISOR_ACCOUNT,
  SUBMIT_DATA
} from "../actions/UserActions";
import localStorageService from "../../services/localStorageService";

const initialState = {
  user: {},
  accounts: [],
  supervisor_accounts: []
};

const userReducer = function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA: {
      //console.log("reducer", [...action.data]);
      localStorageService.setItem("user", action.data.fullname); 
      return {
        ...state,
        ...action.data
      };
    }
    case REMOVE_USER_DATA: {
      return {
        ...state
      };
    }
    case GET_ACCOUNT: {
      return {
        ...state,
        accounts: [...action.data]
      };
    }
    case GET_SUPERVISOR_ACCOUNT: {
      return {
        ...state,
        supervisor_accounts: [...action.data]
      };
    }
    case SUBMIT_DATA: {
      return {
        ...state,  
      };
    }
    case USER_LOGGED_OUT: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;

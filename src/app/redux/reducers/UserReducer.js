import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
  USER_LOGGED_OUT
} from "../actions/UserActions";

const initialState = {
  user: { }
};

const userReducer = function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA: {
      // console.log("reducer". action.data);
      return {
        ...state,
        ...action.data,
        // user:action.data
      };
    }
    case REMOVE_USER_DATA: {
      return {
        ...state
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

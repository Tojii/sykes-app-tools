import {
    GET_ACCOUNT,
    GET_SUPERVISOR_ACCOUNT,
    SUBMIT_DATA,
    GET_VALIDATE,
    GET_JEFE_DIRECTO,
    LSS_LOADING
  } from "../actions/LSSActions";
  
  const initialState = {
    user: {},
    accounts: [],
    supervisor_accounts: [],
    jefes: [],
    hasAnswered: false,
    loading: false
  };
  
  const LSSReducer = function(state = initialState, action) {
    switch (action.type) {
      case LSS_LOADING: {
        return {
          ...state,
          loading: true
        };
      }
      case GET_ACCOUNT: {
        return {
          ...state,
          accounts: [...action.data],
          loading: false
        };
      }
      case GET_JEFE_DIRECTO: {
        return {
          ...state,
          jefes: [...action.data],
          loading: false
        };
      }
      case GET_SUPERVISOR_ACCOUNT: {
        return {
          ...state,
          supervisor_accounts: [...action.data],
          loading: false
        };
      }
      case SUBMIT_DATA: {
        return {
          ...state,
          loading: false  
        };
      }
      case GET_VALIDATE: {
        return {
          ...state,
          hasAnswered: action.data,
          loading: false
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default LSSReducer;
  
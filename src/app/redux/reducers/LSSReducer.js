import {
    GET_ACCOUNT,
    GET_SUPERVISOR_ACCOUNT,
    SUBMIT_DATA
  } from "../actions/LSSActions";
  import localStorageService from "../../services/localStorageService";
  
  const initialState = {
    user: {},
    accounts: [],
    supervisor_accounts: []
  };
  
  const LSSReducer = function(state = initialState, action) {
    switch (action.type) {
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
      default: {
        return state;
      }
    }
  };
  
  export default LSSReducer;
  
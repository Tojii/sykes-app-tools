import {
    GET_ACCOUNT,
    GET_SUPERVISOR_ACCOUNT,
    SUBMIT_DATA,
    GET_VALIDATE
  } from "../actions/LSSActions";
  import localStorageService from "../../services/localStorageService";
  
  const initialState = {
    user: {},
    accounts: [],
    supervisor_accounts: [],
    hasAnswered: false,
    loading: false
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
      case GET_VALIDATE: {
        console.log("reducer", action.data);
        return {
          ...state,
          hasAnswered: action.data
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default LSSReducer;
  
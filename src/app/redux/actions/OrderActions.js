import api, { globalErrorHandler } from "../Api";
import { logoutUser } from '../actions/UserActions';
import history from "history.js";
import { format } from 'date-fns';
import { setError } from "./LoginActions"

export const GET_ORDER = "GET_ORDER";
export const ADD_ORDER = "ADD_ORDER";
export const GET_ALL_ORDER = "GET_ALL_ORDER";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";
export const OR_LOADING = "OR_LOADING";
export const OR_ERROR = "OR_ERROR";
export const GET_USER_PURCHASED = "GET_USER_PURCHASED";
export const OR_CLEAN = "OR_CLEAN";
export const GET_ALL_ORDER_ITEMS = "GET_ALL_ORDER_ITEMS";
export const OR_LOADING_ITEMS = "OR_LOADING_ITEMS";

  export const CleanPurchase = () => { 
    return async dispatch => {
      dispatch({
        type: OR_CLEAN
      });
    };
  };

  export const GetOrder = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: OR_LOADING
      });

      await api.get(`/Order/User`,config).then(res => {
        dispatch({
          type: GET_ORDER,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch(globalErrorHandler);
    };
  };

  export const GetAllOrder = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: OR_LOADING
      });

      await api.get(`/Order`,config).then(res => {
        dispatch({
          type: GET_ALL_ORDER,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch(globalErrorHandler);
    };
  }; 

  export const GetAllOrderItems = (id) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: OR_LOADING_ITEMS
      });

      await api.get(`/Order/Campaign/${id}/Items`,config).then(res => {
        dispatch({
          type: GET_ALL_ORDER_ITEMS,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch(globalErrorHandler);
    };
  }; 

  export const GetOrderById = (id) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: OR_LOADING
      });
      
      await api.get(`/Order/${id}`,config).then(res => {
        dispatch({
          type: GET_ORDER_BY_ID,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch(globalErrorHandler);
    };
  };

  export const GetUserPurchased = (id) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: OR_LOADING
      });
      
      await api.get(`/Order/User/Campaign/${id}`,config).then(res => {
        dispatch({
          type: GET_USER_PURCHASED,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch(globalErrorHandler);
    };
  };

  export const AddOrder = (payload) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    //console.log("addorder", payload)

    return async dispatch => {
        dispatch({
            type: OR_LOADING
        });
        
        api.post(`/Order`, payload, config).then(res => {
            dispatch({
                type: ADD_ORDER,
                payload: res.data
            });
            console.log(res.data)
        })
        .catch(globalErrorHandler);
    };
};


  
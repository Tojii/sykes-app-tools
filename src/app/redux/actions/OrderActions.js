import axios from "axios";
import apiAuthService from "../../services/apiAuthService";
import history from "history.js";
import { format } from 'date-fns';

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

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
        apiAuthService.logout(); 
        history.state = history.location.pathname != "/session/signin" ? history.location.pathname : history.state;
        history.push({
          pathname: "/session/signin"
        });
    } 
    return Promise.reject(error);
  }
)

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
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Order/User`,config).then(res => {
        dispatch({
          type: GET_ORDER,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        // Error
        if (error.response) {
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
      }); 
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
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Order`,config).then(res => {
        dispatch({
          type: GET_ALL_ORDER,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        if (error.response) {
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
      }); 
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
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Order/Campaign/${id}/Items`,config).then(res => {
        dispatch({
          type: GET_ALL_ORDER_ITEMS,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        if (error.response) {
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
      }); 
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
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Order/${id}`,config).then(res => {
        dispatch({
          type: GET_ORDER_BY_ID,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        if (error.response) {
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
      }); 
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
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Order/User/Campaign/${id}`,config).then(res => {
        dispatch({
          type: GET_USER_PURCHASED,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        if (error.response) {
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
      }); 
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
        axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
        axiosInstance.post(`${process.env.REACT_APP_API_URL}/Order`, payload, config).then(res => {
            dispatch({
                type: ADD_ORDER,
                payload: res.data
            });
            console.log(res.data)
        })
        .catch((error) => {
            dispatch({
              type: OR_ERROR
            });
            if (error.response) {
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        }); 
    };
};


  
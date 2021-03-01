import api from "../Api";

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

const config = {
  headers: {
      'content-type': 'application/json',
  }
};

export const CleanPurchase = () => { 
  return async dispatch => {
    dispatch({
      type: OR_CLEAN
    });
  };
};

  export const GetOrder = () => {
    return async dispatch => {
      dispatch({
        type: OR_LOADING
      });
      await api.get(`${process.env.REACT_APP_API_URL}/Order/User`,config).then(res => 
        dispatch({
          type: GET_ORDER,
          data: res.data
          })
      ); 
    };
  };

  export const GetAllOrder = () => {
    return async dispatch => {
      dispatch({
        type: OR_LOADING
      });

      await api.get(`${process.env.REACT_APP_API_URL}/Order`,config).then(res => 
        dispatch({
          type: GET_ALL_ORDER,
          data: res.data
          })
      );
    };
  }; 

  export const GetAllOrderItems = (id) => {
    return async dispatch => {
      dispatch({
        type: OR_LOADING_ITEMS
      });

      await api.get(`${process.env.REACT_APP_API_URL}/Order/Campaign/${id}/Items`,config).then(res => 
        dispatch({
          type: GET_ALL_ORDER_ITEMS,
          data: res.data
          })
      ); 
    };
  }; 

  export const GetOrderById = (id) => {
    return async dispatch => {
      dispatch({
        type: OR_LOADING
      });

      await api.get(`${process.env.REACT_APP_API_URL}/Order/${id}`,config).then(res => 
        dispatch({
          type: GET_ORDER_BY_ID,
          data: res.data
          })
      ); 
    };
  };

  export const GetUserPurchased = (id) => {
    return async dispatch => {
      dispatch({
        type: OR_LOADING
      });

      await api.get(`/Order/User/Campaign/${id}`,config).then(res => 
        dispatch({
          type: GET_USER_PURCHASED,
          data: res.data
          })
      ); 
    };
  };

  export const AddOrder = (payload) => {
    return async dispatch => {
        dispatch({
            type: OR_LOADING
        });
        api.post(`/Order`, payload, config).then(res => 
            dispatch({
                type: ADD_ORDER,
                payload: res.data
            })
        );
    };
};
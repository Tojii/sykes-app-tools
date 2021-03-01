import axios from "axios";
import apiAuthService from "../../services/apiAuthService";
import history from "history.js";
import moment from "moment"
import { format } from 'date-fns';

export const GET_CAMPAIGNS = "GET_CAMPAIGNS";
export const GET_CAMPAIGNS_ITEMS = "GET_CAMPAIGNS_ITEMS";
export const GET_CAMPAIGNS_ACTIVE = "GET_CAMPAIGNS_ACTIVE";
export const GET_CAMPAIGNSBYID = "GET_CAMPAIGNSBYID";
export const ADD_CAMPAIGN = "ADD_CAMPAIGN";
export const ADD_CAMPAIGN_ITEMS = "ADD_CAMPAIGN_ITEMS";
export const UPDATE_CAMPAIGN = "UPDATE_CAMPAIGN";
export const UPDATE_CAMPAIGN_ITEMS = "UPDATE_CAMPAIGN_ITEMS";
export const DELETE_CAMPAIGN = "DELETE_CAMPAIGN";
export const DELETE_CAMPAIGN_ITEM = "DELETE_CAMPAIGN_ITEM";
export const GET_CAMPAIGNITEMSBYID = "GET_CAMPAIGNITEMSBYID"
export const CA_LOADING = "CA_LOADING";
export const CA_ERROR = "CA_ERROR";

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

export const GetCampaignsActive = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: CA_LOADING
      });
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Campaign/Active`,config).then(res => {
        dispatch({
          type: GET_CAMPAIGNS_ACTIVE,
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

  export const GetCampaigns = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: CA_LOADING
      });
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Campaign`,config).then(res => {
        dispatch({
          type: GET_CAMPAIGNS,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        // Error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
      }); 
    };
  };

  export const GetCampaignsItems = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: CA_LOADING
      });
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Campaign/Items`,config).then(res => {
        dispatch({
          type: GET_CAMPAIGNS_ITEMS,
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

  export const GetCampaignsById = (id) => {
    return async dispatch => {
      dispatch({
        type: CA_LOADING
      });
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Campaign/${id}`).then(res => {
        dispatch({
          type: GET_CAMPAIGNSBYID,
          data: res.data
          });

        //console.log("imagenesby",res.data)
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

  export const GetCampaignItemsById = (id) => {
    return async dispatch => {
      dispatch({
        type: CA_LOADING
      });
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Campaign/Items/${id}`).then(res => {
        dispatch({
          type: GET_CAMPAIGNITEMSBYID,
          data: res.data
          });

        //console.log("imagenesby",res.data)
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

  export const AddCampaign = (payload) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
    }  
    //console.log("add campaña", payload)
    return async dispatch => {
        dispatch({
            type: CA_LOADING
        });
        axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
        axiosInstance.post(`${process.env.REACT_APP_API_URL}/Campaign`, 
        { "name": payload.name, "description": payload.description, "startDate": moment(payload.startDate).format('YYYY-MM-DD HH:mm:ss'), "endDate": moment(payload.endDate).format('YYYY-MM-DD HH:mm:ss'), "maxLimitPerPerson": parseInt(payload.maxLimitPerPerson, 10)
        }, config).then(res => {
            dispatch({
                type: ADD_CAMPAIGN,
                payload: res.data
            });
            console.log(res.data)
        })
        .catch((error) => {
            dispatch({
              type: CA_ERROR
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

export const AddCampaignItems = (id, payload, files) => {
  //console.log("addver", payload, files)
  var formData = new FormData();
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('quantity', parseInt(payload.quantity, 10));
    formData.append('stockQuantity', parseInt(payload.stockQuantity, 10));
    formData.append('unitPrice', payload.unitPrice.replace(".", ","));
    formData.append('maxLimitPerPerson', parseInt(payload.maxLimitPerPerson, 10));
    formData.append('files', files);
    console.log("add", payload.unitPrice.replace(".", ","))
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
  return async dispatch => {
      dispatch({
          type: CA_LOADING
      });
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
      axiosInstance.post(`${process.env.REACT_APP_API_URL}/Campaign/${id}/Items`, 
      formData, config).then(res => {
          dispatch({
              type: ADD_CAMPAIGN_ITEMS,
              payload: res.data
          });
          console.log(res.data)
      })
      .catch((error) => {
          dispatch({
            type: CA_ERROR
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

  export const UpdateCampaign = (id, payload) => dispatch => {
    dispatch({
        type: CA_LOADING
    });
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axiosInstance.put(`${process.env.REACT_APP_API_URL}/Campaign/${id}`, { "name": payload.name, "description": payload.description, "startDate": moment(payload.startDate).format('YYYY-MM-DD HH:mm:ss'), "endDate": moment(payload.endDate).format('YYYY-MM-DD HH:mm:ss'), "maxLimitPerPerson": parseInt(payload.maxLimitPerPerson, 10)
    }).then(res => {
        dispatch({
            type: UPDATE_CAMPAIGN,
            payload: res.data
        });
    })
    .catch((error) => {
        dispatch({
          type: CA_ERROR
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

export const UpdateCampaignItems = (id, payload, files) => dispatch => {
  const config = {
    headers: {
        'content-type': 'multipart/form-data',
    }
  }  
  //console.log("updatever", files)
  var formData = new FormData();
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('quantity', payload.quantity);
    formData.append('stockQuantity', parseInt(payload.stockQuantity, 10));
    formData.append('unitPrice', payload.unitPrice.replace(".", ","));
    formData.append('maxLimitPerPerson', payload.maxLimitPerPerson);
    if (files != null) {formData.append('files', files);}
  dispatch({
      type: CA_LOADING
  });
  axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
  axiosInstance.put(`${process.env.REACT_APP_API_URL}/Campaign/Items/${id}`, 
  formData, config).then(res => {
      dispatch({
          type: UPDATE_CAMPAIGN_ITEMS,
          payload: res.data
      });
  })
  .catch((error) => {
      dispatch({
        type: CA_ERROR
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

export const DeleteCampaign = (id) => dispatch => {
    dispatch({
        type: CA_LOADING
    });
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axiosInstance.delete(`${process.env.REACT_APP_API_URL}/Campaign/${id}`).then(res => {
        dispatch({
            type: DELETE_CAMPAIGN,
            payload: res.data
        });
    })
    .catch((error) => {
        dispatch({
          type: CA_ERROR
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

export const DeleteCampaignItem = (id) => dispatch => {
  dispatch({
      type: CA_LOADING
  });
  axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
  axiosInstance.delete(`${process.env.REACT_APP_API_URL}/Campaign/Items/${id}`).then(res => {
      dispatch({
          type: DELETE_CAMPAIGN_ITEM,
          payload: res.data
      });
      
  })
  .catch((error) => {
      dispatch({
        type: CA_ERROR
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


  
import api, { globalErrorHandler } from "../Api";
import { logoutUser } from '../actions/UserActions';
import { setError } from "./LoginActions"
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
      await api.get(`/Campaign/Active`,config).then(res => {
        dispatch({
          type: GET_CAMPAIGNS_ACTIVE,
          data: res.data
          });
        //console.log("imagenes",res.data)
      })
      .catch(globalErrorHandler);
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
      await api.get(`/Campaign`,config).then(res => {
        dispatch({
          type: GET_CAMPAIGNS,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch(globalErrorHandler);
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

      await api.get(`/Campaign/Items`,config).then(res => {
        dispatch({
          type: GET_CAMPAIGNS_ITEMS,
          data: res.data
          });
        //console.log("imagenes",res.data)
      })
      .catch(globalErrorHandler);
    };
  };

  export const GetCampaignsById = (id) => {
    return async dispatch => {
      dispatch({
        type: CA_LOADING
      });
      
      await api.get(`${process.env.REACT_APP_API_URL}/Campaign/${id}`).then(res => {
        dispatch({
          type: GET_CAMPAIGNSBYID,
          data: res.data
          });

        //console.log("imagenesby",res.data)
      })
      .catch(globalErrorHandler);
    };
  };

  export const GetCampaignItemsById = (id) => {
    return async dispatch => {
      dispatch({
        type: CA_LOADING
      });

      await api.get(`/Campaign/Items/${id}`).then(res => {
        dispatch({
          type: GET_CAMPAIGNITEMSBYID,
          data: res.data
          });

        //console.log("imagenesby",res.data)
      })
      .catch(globalErrorHandler);
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

        api.post(`/Campaign`, 
        { "name": payload.name, "description": payload.description, "startDate": moment(payload.startDate).format('YYYY-MM-DD HH:mm:ss'), "endDate": moment(payload.endDate).format('YYYY-MM-DD HH:mm:ss'), "maxLimitPerPerson": parseInt(payload.maxLimitPerPerson, 10),
          "pickUpInBuilding": payload.activeEdificio, "sentToHome": payload.activeEnvioCasa, "message": payload.message, "shippingMessage": payload.shippingMessage,
          "buildings": payload.edificiosCampaign.map(item => {
            return {
              "building": {
                "id": item.idBuilding,
                "name": item.nameBuilding,
                "active": item.activeBuilding,
              },
              "active": item.active,
            }
          })
        }, config).then(res => {
            dispatch({
                type: ADD_CAMPAIGN,
                payload: res.data
            });
            console.log(res.data)
        })
        .catch((error) => {
          globalErrorHandler(error);
          dispatch({
            type: CA_ERROR
          })
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
    formData.append('EstimatedPrice', payload.shippingPrice.replace(".", ","));
    formData.append('files', files);
    //console.log("add", payload.unitPrice.replace(".", ","))
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
  return async dispatch => {
      dispatch({
          type: CA_LOADING
      });

      api.post(`/Campaign/${id}/Items`, 
      formData, config).then(res => {
          dispatch({
              type: ADD_CAMPAIGN_ITEMS,
              payload: res.data
          });
          console.log(res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: CA_ERROR
        })
      });
  };
};

  export const UpdateCampaign = (id, payload) => dispatch => {
    dispatch({
        type: CA_LOADING
    });
    
    api.put(`/Campaign/${id}`, { "name": payload.name, "description": payload.description, "startDate": moment(payload.startDate).format('YYYY-MM-DD HH:mm:ss'), "endDate": moment(payload.endDate).format('YYYY-MM-DD HH:mm:ss'), "maxLimitPerPerson": parseInt(payload.maxLimitPerPerson, 10),
    "pickUpInBuilding": payload.activeEdificio, "sentToHome": payload.activeEnvioCasa, "message": payload.message, "shippingMessage": payload.shippingMessage,
    "buildings": payload.edificiosCampaign.map(item => {
      return {
          "building": {
            "id": item.idBuilding,
            "name": item.nameBuilding,
            "active": item.activeBuilding,
          },
          "active": item.active,
          "id": item.id
      }
    })
    }).then(res => {
        dispatch({
            type: UPDATE_CAMPAIGN,
            payload: res.data
        });
    })
    .catch((error) => {
      globalErrorHandler(error);
      dispatch({
        type: CA_ERROR
      })
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
    formData.append('EstimatedPrice', payload.shippingPrice.replace(".", ","));
    if (files != null) {formData.append('files', files);}
  dispatch({
      type: CA_LOADING
  });

  api.put(`/Campaign/Items/${id}`, 
  formData, config).then(res => {
      dispatch({
          type: UPDATE_CAMPAIGN_ITEMS,
          payload: res.data
      });
  })
  .catch((error) => {
    globalErrorHandler(error);
    dispatch({
      type: CA_ERROR
    })
  });
};

export const DeleteCampaign = (id) => dispatch => {
    dispatch({
        type: CA_LOADING
    });
    
    api.delete(`${process.env.REACT_APP_API_URL}/Campaign/${id}`).then(res => {
        dispatch({
            type: DELETE_CAMPAIGN,
            payload: res.data
        });
    })
    .catch((error) => {
      globalErrorHandler(error);
      dispatch({
        type: CA_ERROR
      })
    });
};

export const DeleteCampaignItem = (id) => dispatch => {
  dispatch({
      type: CA_LOADING
  });
  
  api.delete(`/Campaign/Items/${id}`).then(res => {
      dispatch({
          type: DELETE_CAMPAIGN_ITEM,
          payload: res.data
      });
      
  })
  .catch((error) => {
    globalErrorHandler(error);
    dispatch({
      type: CA_ERROR
    })
  });
};


  
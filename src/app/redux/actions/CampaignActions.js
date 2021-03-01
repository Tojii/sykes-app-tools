import api from "../Api";
import moment from "moment"

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

const config = {
  headers: {
      'content-type': 'application/json',
  }
}  

export const GetCampaignsActive = () => {
    
    return async dispatch => {
      dispatch({
        type: CA_LOADING
      });
      await api.get(`/Campaign/Active`,config).then(res => 
        dispatch({
          type: GET_CAMPAIGNS_ACTIVE,
          data: res.data
          })
      ); 
    };
};

export const GetCampaigns = () => {
  return async dispatch => {
    dispatch({
      type: CA_LOADING
    });
    await api.get(`/Campaign`,config).then(res => 
      dispatch({
        type: GET_CAMPAIGNS,
        data: res.data
        })
    ); 
  };
};

export const GetCampaignsItems = () => {
  return async dispatch => {
    dispatch({
      type: CA_LOADING
    });
    await api.get(`/Campaign/Items`,config).then(res => 
      dispatch({
        type: GET_CAMPAIGNS_ITEMS,
        data: res.data
        })
    );
  };
};

export const GetCampaignsById = (id) => {
  return async dispatch => {
    dispatch({
      type: CA_LOADING
    });
    await api.get(`/Campaign/${id}`).then(res => 
      dispatch({
        type: GET_CAMPAIGNSBYID,
        data: res.data
        })
    ); 
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
    });
  }
};

export const AddCampaign = (payload) => {
  return async dispatch => {
      dispatch({
          type: CA_LOADING
      });

      api.post(`/Campaign`, 
      { "name": payload.name, "description": payload.description, "startDate": moment(payload.startDate).format('YYYY-MM-DD HH:mm:ss'), "endDate": moment(payload.endDate).format('YYYY-MM-DD HH:mm:ss'), "maxLimitPerPerson": parseInt(payload.maxLimitPerPerson, 10)
      }, config).then(res =>
          dispatch({
              type: ADD_CAMPAIGN,
              payload: res.data
          })
      ); 
  };
};

export const AddCampaignItems = (id, payload, files) => {
  var formData = new FormData();
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('quantity', parseInt(payload.quantity, 10));
    formData.append('stockQuantity', parseInt(payload.stockQuantity, 10));
    formData.append('unitPrice', parseInt(payload.unitPrice, 10));
    formData.append('maxLimitPerPerson', parseInt(payload.maxLimitPerPerson, 10));
    formData.append('files', files);

  return async dispatch => {
      dispatch({
          type: CA_LOADING
      });

      api.post(`/Campaign/${id}/Items`, 
      formData, config).then(res =>
          dispatch({
              type: ADD_CAMPAIGN_ITEMS,
              payload: res.data
          })
      ); 
  };
};

export const UpdateCampaign = (id, payload) => dispatch => {
  dispatch({
      type: CA_LOADING
  });
  api.put(`/Campaign/${id}`, { "name": payload.name, "description": payload.description, "startDate": moment(payload.startDate).format('YYYY-MM-DD HH:mm:ss'), "endDate": moment(payload.endDate).format('YYYY-MM-DD HH:mm:ss'), "maxLimitPerPerson": parseInt(payload.maxLimitPerPerson, 10)
  }).then(res => 
      dispatch({
          type: UPDATE_CAMPAIGN,
          payload: res.data
      })
  ); 
};

export const UpdateCampaignItems = (id, payload, files) => dispatch => {
  var formData = new FormData();
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('quantity', payload.quantity);
    formData.append('stockQuantity', parseInt(payload.stockQuantity, 10));
    formData.append('unitPrice', payload.unitPrice);
    formData.append('maxLimitPerPerson', payload.maxLimitPerPerson);
    if (files != null) {formData.append('files', files);}
  dispatch({
      type: CA_LOADING
  });
  api.put(`/Campaign/Items/${id}`, 
  formData, config).then(res => 
      dispatch({
          type: UPDATE_CAMPAIGN_ITEMS,
          payload: res.data
      })
  ); 
};

export const DeleteCampaign = (id) => dispatch => {
    dispatch({
        type: CA_LOADING
    });
    api.delete(`/Campaign/${id}`).then(res => 
        dispatch({
            type: DELETE_CAMPAIGN,
            payload: res.data
        })
    ); 
};

export const DeleteCampaignItem = (id) => dispatch => {
  dispatch({
      type: CA_LOADING
  });

  api.delete(`/Campaign/Items/${id}`).then(res => 
      dispatch({
          type: DELETE_CAMPAIGN_ITEM,
          payload: res.data
      })
  ); 
};
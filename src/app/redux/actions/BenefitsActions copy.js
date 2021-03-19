import api, { globalErrorHandler } from "../Api";
import { logoutUser } from './UserActions';
import { setError } from "./LoginActions"
import history from "history.js";
import moment from "moment"
import { format } from 'date-fns';

export const GET_BENEFITS = "GET_BENEFITS";
export const GET_BENEFITS_ACTIVE = "GET_BENEFITS_ACTIVE";
export const GET_BENEFITSBYID = "GET_BENEFITSBYID";
export const ADD_BENEFIT = "ADD_BENEFIT";
export const UPDATE_BENEFIT = "UPDATE_BENEFIT";
export const DELETE_BENEFIT = "DELETE_BENEFIT";
export const BE_LOADING = "BE_LOADING";
export const BE_ERROR = "BE_ERROR";

export const GetBenefitsActive = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING
      });
      await api.get(`/Benefits/Active`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_ACTIVE,
          data: res.data
          });
        //console.log("imagenes",res.data)
      })
      .catch(globalErrorHandler);
    };
  };

  export const GetBenefits = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING
      });
      await api.get(`/Benefits`,config).then(res => {
        dispatch({
          type: GET_BENEFITS,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch(globalErrorHandler);
    };
  };

  export const GetBenefitsById = (id) => {
    return async dispatch => {
      dispatch({
        type: BE_LOADING
      });
      
      await api.get(`/Benefits/${id}`).then(res => {
        dispatch({
          type: GET_BENEFITSBYID,
          data: res.data
          });
      })
      .catch(globalErrorHandler);
    };
  };

export const AddBenefit = (payload, Logo) => {
  //console.log("addver", payload, files)
  var formData = new FormData();
    formData.append('idCategory', payload.idCategory);
    formData.append('Name', payload.name);
    formData.append('Detail', payload.detail);
    formData.append('Description', payload.description);
    formData.append('BenefitInfo', payload.benefitInfo);
    formData.append('Link', payload.link);
    formData.append('Facebook', payload.facebook);
    formData.append('Instagram', payload.instagram);
    formData.append('Email', payload.email);
    formData.append('Active', payload.active);
    formData.append('Logo', Logo);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
  return async dispatch => {
      dispatch({
          type: BE_LOADING
      });

      api.post(`/Benefits`, 
      formData, config).then(res => {
          dispatch({
              type: ADD_BENEFIT,
              payload: res.data
          });
      })
      .catch(globalErrorHandler);
  };
};

 

export const UpdateBenefit = (id, payload) => dispatch => {
  var formData = new FormData();
  formData.append('idCategory', payload.idCategory);
  formData.append('Name', payload.name);
  formData.append('Detail', payload.detail);
  formData.append('Description', payload.description);
  formData.append('BenefitInfo', payload.benefitInfo);
  formData.append('Link', payload.link);
  formData.append('Facebook', payload.facebook);
  formData.append('Instagram', payload.instagram);
  formData.append('Email', payload.email);
  formData.append('Active', payload.active);
  formData.append('Logo', payload.logo);
  const config = {
      headers: {
          'content-type': 'multipart/form-data',
      }
  }
  dispatch({
      type: BE_LOADING
  });

  api.put(`/Benefits/${id}`, 
  formData, config).then(res => {
      dispatch({
          type: UPDATE_BENEFIT,
          payload: res.data
      });
  })
  .catch(globalErrorHandler);
};

export const DeleteBenefit = (id) => dispatch => {
    dispatch({
        type: BE_LOADING
    });
    
    api.delete(`/Benefits/${id}`).then(res => {
        dispatch({
            type: DELETE_BENEFIT,
            payload: res.data
        });
    })
    .catch(globalErrorHandler);
};


  
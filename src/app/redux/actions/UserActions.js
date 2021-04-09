import history from "history.js";
import api from "../Api";
import { LOGIN_CLEAR, LOGIN_ERROR } from "./LoginActions";

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const setUserData = user => dispatch => {
  dispatch({
    type: SET_USER_DATA,
    data: user
  });
};

export function logoutUser(error) {
  history.push("/session/signin");

  return dispatch => {
    api.delete(`/Authenticate`).then(res => {
      dispatch({
        type: USER_LOGGED_OUT
      });
      if (error)
        dispatch({
          type: LOGIN_ERROR,
          data: error
        });
      else 
        dispatch({
          type: LOGIN_CLEAR
        });
    });
  };
}

export const updateUserData = (payload) => dispatch => {
  //console.log("entré",payload)
  var formData = new FormData();
  formData.append('badge', payload.badge);
  formData.append('email', payload.email);
  formData.append('phone', payload.phone);

  const config = {
    headers: {
        'content-type': 'multipart/form-data',
    }
  }
  //console.log("formdata", formData)
  api.post(`/GrowthOpportunityUser/UpdatePersonalInformation`, formData, config).then(res => {
    setUserData(res.data);
  }); 
}

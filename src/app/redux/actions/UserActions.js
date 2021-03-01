import history from "history.js";
import api from "../Api"

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const setUserData = user => dispatch => {
  dispatch({
    type: SET_USER_DATA,
    data: user
  });
};

export function logoutUser() {
  return dispatch => {
    history.push("/session/signin");
    
    dispatch({
      type: USER_LOGGED_OUT
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
  api.post(`/api/GrowthOpportunity/UpdatePersonalInformation`, formData, config).then(res => {
    setUserData(res.data);
  }); 
}

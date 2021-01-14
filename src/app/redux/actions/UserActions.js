import axios from "axios";
import history from "history.js";
import apiAuthService from "../../services/apiAuthService";

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const setUserData = user => dispatch => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
  axios.post(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/UpdatePersonalInformation`, user).then(res => {
    dispatch({
      type: SET_USER_DATA,
      data: user
    });
  });
};

export function logoutUser() {
  return dispatch => {
    apiAuthService.logout();

    history.push({
      pathname: "/session/signin"
    });

    dispatch({
      type: USER_LOGGED_OUT
    });
  };
}

export const updateUserData = (payload) => dispatch => {
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
  axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
  axios.post(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/UpdatePersonalInformation`, formData, config).then(res => {
    dispatch({
      type: UPDATE_USER_DATA,
      data: res.data
    });
  });
}

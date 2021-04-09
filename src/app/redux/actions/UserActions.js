import history from "history.js";
import api from "../Api";
import { clearLogin } from "./LoginActions";
import jwtDecode from 'jwt-decode';

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const setUserData = user => dispatch => {
  //console.log("entré",user)
  axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
  axiosInstance.post(`${process.env.REACT_APP_API_URL}/GrowthOpportunityUser/UpdatePersonalInformation`, user).then(res => {
    dispatch({
      type: SET_USER_DATA,
      data: user
    });
  });
};

export function logoutUser() {
  history.push("/session/signin");

  return dispatch => {
    api.delete(`/Authenticate`).then(res => {
      dispatch({
        type: USER_LOGGED_OUT
      });
      clearLogin();
      
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
  axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
  axiosInstance.post(`${process.env.REACT_APP_API_URL}/GrowthOpportunityUser/UpdatePersonalInformation`, formData, config).then(res => {
    dispatch({
      type: UPDATE_USER_DATA,
      data: res.data
    });
  });
}

// export const setUserDataV2 = (username, personalEmail, personalPhone) => dispatch => {
//   console.log("Values", username, personalEmail, personalPhone);
//   const parameters = {
//     personalEmail: personalEmail,
//     personalPhone: personalPhone
//   }
//   return api.put(`/user/${username}`, parameters).then(response => {
//     console.log("Response", response);
//     //Set user
//     setUserData(jwtDecode(response.data.token));
//   });
// }
import history from "history.js";
<<<<<<< HEAD
import apiAuthService from "../../services/apiAuthService";
import { setError } from "./LoginActions"
import api from "../Api";
import jwtDecode from 'jwt-decode';
=======
import api from "../Api"
>>>>>>> 725ec2712e5dec45d875f68fc1f787d1d0bbfb1f

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
  history.push("/session/signin");

  return dispatch => {
    api.delete(`/Authenticate`).then(res => {
      dispatch({
        type: USER_LOGGED_OUT
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
  api.post(`/GrowthOpportunity/UpdatePersonalInformation`, formData, config).then(res => {
    setUserData(res.data);
  }); 
}

export const updateUserDataV2 = ({username, email, phone}) => {
  const parameters = {
    username: username,
    email: email,
    phone: phone
  }
  
}

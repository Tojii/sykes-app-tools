import axios from "axios";
import history from "history.js";
import apiAuthService from "../../services/apiAuthService";

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    //if (error.response.status === 401) {
        apiAuthService.logout(); 
        history.state = history.location.pathname;
        history.push({
          pathname: "/session/signin"
        });
    //}

    return Promise.reject(error);
  }
)

export const setUserData = user => dispatch => {
  //console.log("entré",user)
  axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
  axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/UpdatePersonalInformation`, user).then(res => {
    dispatch({
      type: SET_USER_DATA,
      data: user
    });
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
  axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/UpdatePersonalInformation`, formData, config).then(res => {
    dispatch({
      type: UPDATE_USER_DATA,
      data: res.data
    });
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
}

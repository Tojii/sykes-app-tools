import axios from "axios";
import history from "history.js";
import apiAuthService from "../../services/apiAuthService";

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const UPDATER_USER_DATA = "UPDATER_USER_DATA";

export function setUserData(user) {
  return dispatch => {
    dispatch({
      type: SET_USER_DATA,
      data: user
    });
  };
}

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
  axios.defaults.headers.common["x-api-key"] = `7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH-F013C`;
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = 'http://localhost:3000';
  axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE3NzE3IiwidXNlcm5hbWUiOiJIRVJOQU5BTEUiLCJmdWxsbmFtZSI6IkhFUk5BTkRFWiBWQVJHQVMgQUxWQVJPIEVOUklRVUUiLCJiYWRnZSI6IjUzNjYyIiwiZW1haWwiOiJ0ZXN0OUBnbWFpbC5jb20iLCJwaG9uZSI6Ijg4ODg4ODgwIiwiZXhwIjoxNjA2NzQ5NTM2LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJ0b2ppaS5jb20ifQ.YdhTul8XEoRf7ejbz4Az2sPQX_CYy5dYEV-bzB62RZw`
  axios.post(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/UpdatePersonalInformation`, payload).then(res => {
    dispatch({
      type: UPDATER_USER_DATA,
      payload: res.data
    });
  });
}

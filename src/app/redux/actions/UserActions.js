import axios from "axios";
import history from "history.js";
import apiAuthService from "../../services/apiAuthService";
import localStorageService from "../../services/localStorageService";

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const UPDATER_USER_DATA = "UPDATER_USER_DATA";

const config = {
  headers: {
      "x-api-key": '7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH-F013C',
      "Access-Control-Allow-Origin": 'http://localhost:3000',
      "Authorization": `Bearer ${ localStorageService.getItem('auth_user').token }`
  }
}

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
  axios.post(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/UpdatePersonalInformation`, payload, config).then(res => {
    dispatch({
      type: UPDATER_USER_DATA,
      payload: res.data
    });
  });
}

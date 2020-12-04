import axios from "axios";
import history from "history.js";
import apiAuthService from "../../services/apiAuthService";

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

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
  axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
  axios.post(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/UpdatePersonalInformation`, payload).then(res => {
    history.push({
      pathname: "/"
    });
  });
}

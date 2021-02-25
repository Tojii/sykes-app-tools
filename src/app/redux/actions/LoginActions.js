import { setUserData, logoutUser } from "./UserActions";
import history from "history.js";
import api from "../Api"
import jwtDecode from 'jwt-decode';

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_DATA = "LOGIN_DATA";
export const LOGIN_LOGGED_OUT = "LOGIN_LOGGED_OUT";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function login({ email, password }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    const parameters = {
      username: email,
      password: password,
      force: true
    }
    return api.post(`/authenticate`, parameters).then(response => {
      // Save token
      dispatch({
        type: LOGIN_DATA,
        data: response.data
      });
      
      // Set user
      dispatch(setUserData(jwtDecode(response.data.token)));

      if (history.location.prev) {
        history.push({
          pathname: history.location.pathname != history.location.prev ? history.location.prev : "/"
        });
      } else {
        history.push({
          pathname: (history.state && history.state != "/session/signin") ? history.state :  "/"
        });
      }

      return dispatch({
        type: LOGIN_SUCCESS
      });
    })
    .catch(error => {
      return dispatch({
        type: LOGIN_ERROR,
        payload: error
      });
    });
  };
}

export const logout = () => {
  console.log("something is bad");
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    dispatch(logoutUser());

    dispatch({
      type: LOGIN_LOGGED_OUT
    });
    
    history.state = history.location.pathname;
    history.push({
       pathname: "/session/signin"
    });
  };
};

export const refreshtoken = (refreshtoken) => {
  return async dispatch => {
    const response = await api.post(`/Authenticate/Refresh`, `"${refreshtoken}"`);
    dispatch({
      type: LOGIN_DATA,
      data: response.data
    });
    dispatch(setUserData(jwtDecode(response.data.token)));
    return response.data.token;
  };
};
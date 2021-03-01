import { setUserData, logoutUser } from "./UserActions";
import history from "history.js";
import api from "../Api";
import jwtDecode from 'jwt-decode';

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_ERROR_SESSION_ACTIVE = "LOGIN_ERROR_SESSION_ACTIVE";

export function login({ email, password, force }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    const parameters = {
      username: email,
      password: password,
      force: force
    }
    return api.post(`/authenticate`, parameters).then(response => {
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
        type: LOGIN_SUCCESS,
        data: response.data
      });
    })
    .catch(error => {
      if (error.response.status === 409)
        return dispatch({
          type: LOGIN_ERROR_SESSION_ACTIVE,
          data: `${error.response.data}. If you want to continue and close the active session click Sign in again.`
        });
      else 
        return dispatch({
          type: LOGIN_ERROR,
          data: error.response.data
        });
    });
  };
}

export const refreshtoken = (refreshtoken) => {
  return async dispatch => {
    const response = await api.post(`/Authenticate/Refresh`, `"${refreshtoken}"`);
    dispatch({
      type: LOGIN_SUCCESS,
      data: response.data
    });
    dispatch(setUserData(jwtDecode(response.data.token)));
    return response.data.token;
  };
};
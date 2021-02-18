import apiAuthService from "../../services/apiAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";
import configureStore from "../Store";
import axios from "axios";
import jwtDecode from 'jwt-decode';

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

const { Store, Persistor } = configureStore();

export function loginWithEmailAndPassword({ email, password }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    const parameters = {
      username: email,
      password: password,
      force: true
    }
    axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
    return axios.post(`${process.env.REACT_APP_API_URL}/authenticate`, parameters).then(response => {
      // Login successful
      // Save token
      //console.log("Login", response);
      apiAuthService.setSession(response.data.token);
      // Set user
      apiAuthService.setUser(response.data.token);
      dispatch(setUserData(jwtDecode(response.data.token)));
      //console.log("history",history)
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
      //return jwtDecode(response.data.token);
    })
    .catch(error => {
      return dispatch({
        type: LOGIN_ERROR,
        payload: error
      });
    });
  };
}

export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD
    });
  };
}
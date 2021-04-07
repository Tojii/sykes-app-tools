import axios from "axios";
import { Store } from "./Store";
import { refreshtoken } from './actions/LoginActions';
import { logoutUser } from './actions/UserActions';
import { setError } from "./actions/LoginActions"
import history from "history.js";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Add a request interceptor to add a default authorization header.
instance.interceptors.request.use(
    config => {
        const token = Store.getState().login.token;
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        instance.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
        return config;
    },
    error => Promise.reject(error)
  );

  // Response interceptor for API calls
  instance.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await Store.dispatch(refreshtoken(Store.getState().login.refreshtoken));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return instance(originalRequest);
    }
    // else 
    //   Store.dispatch(logoutUser()); 
    
    return Promise.reject(error);
  });

export default instance;

export const HeaderContentTypeJson = () => {
    return {
        headers: {
            'content-type': 'application/json',
        }
    }
};

export const globalErrorHandler = async (error) => {
    console.log("something went wrong");
    if (error.response && (error.response.status === 401 || error.response.status === 403 || error.response.status === 415)) {
      Store.dispatch(logoutUser("Your session has expired."));
      Store.dispatch(setError("Your session has expired."));
    }
    // else
    //   Store.dispatch(logoutUser());
};
import axios from "axios";
import { Store } from "./Store";
import { refreshtoken, logout } from './actions/LoginActions'

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

    Store.dispatch(logout());
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
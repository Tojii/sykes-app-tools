import axios from "axios";
import apiAuthService from "../../services/apiAuthService";
import history from "history.js";
import { format } from 'date-fns';

export const GET_PROVINCE = "GET_PROVINCE";
export const GET_CANTONS = "GET_CANTONS";
export const GET_DISTRICTS = "GET_DISTRICTS";
export const LO_LOADING = "LO_LOADING";

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

  export const GetProvince = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: LO_LOADING
      });
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Provinces`,config).then(res => {
        dispatch({
          type: GET_PROVINCE,
          data: res.data
          });

        //console.log("imagenes",res.data)
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
  };

  export const GetCantons = (id) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: LO_LOADING
      });
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Provinces/${id}/Cantons`,config).then(res => {
        dispatch({
          type: GET_CANTONS,
          data: res.data
        });
        //console.log("imagenes",res.data)
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
  };

  export const GetDistricts = (provinceId, cantonId) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: LO_LOADING
      });
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/Provinces/${provinceId}/Cantons/${cantonId}/Districts`,config).then(res => {
        dispatch({
          type: GET_DISTRICTS,
          data: res.data
        });
        //console.log("imagenes",res.data)
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
  };

  
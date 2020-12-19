import axios from "axios";
import apiAuthService from "../../services/apiAuthService";
import history from "history.js";

export const GET_IMAGES = "GET_IMAGES";
export const RE_LOADING = "RE_LOADING";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    //if (error.response.status === 401) {
        apiAuthService.logout(); 
        history.push({
          pathname: "/session/signin"
        });
    //}

    return Promise.reject(error);
  }
)

export const GetImages = () => {
    return async dispatch => {
      dispatch({
        type: RE_LOADING
      });
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/Common/GetImages`).then(res => {
        dispatch({
          type: GET_IMAGES,
          data: res.data
          });
        console.log("imagenes",res.data)
      })
    };
  };


  
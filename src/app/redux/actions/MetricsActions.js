import axios from "axios";
import apiAuthService from "../../services/apiAuthService";
import history from "history.js";

export const GET_METRICS = "GET_METRICS";

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

export const getMetrics = (badge) => dispatch => {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/GetMetrics?badgeId=${badge}`).then(res => {
      dispatch({
        type: GET_METRICS,
        payload: res.data
      });
      console.log(res.data)
    });
};


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
        history.state = history.location.pathname;
        history.push({
          pathname: "/session/signin"
        });
    //}

    return Promise.reject(error);
  }
)

export const getMetrics = (badge) => dispatch => {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axiosInstance.get(`${process.env.REACT_APP_API_URL}/GrowthOpportunityMetric`).then(res => {
      dispatch({
        type: GET_METRICS,
        payload: res.data
      });
      //console.log(res.data) 
    })
    .catch((error) => {
      // Error
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
      } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the 
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      console.log(error.config);
    });
};
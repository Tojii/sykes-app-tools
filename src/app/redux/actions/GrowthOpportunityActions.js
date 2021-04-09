import axios from "axios";
import localStorageService from "../../services/localStorageService";
import apiAuthService from "../../services/apiAuthService";
import history from "history.js";

export const GET_GROWTH_OPPORTUNITIES = "GET_GROWTH_OPPORTUNITIES";
export const SET_GROWTH_OPPORTUNITY = "SET_GROWTH_OPPORTUNITY";
export const GET_JOBS_APPLIED = "GET_JOBS_APPLIED";
export const GET_GROWTH_OPPORTUNITY = "GET_GROWTH_OPPORTUNITY";

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

export const getGrowthOpportunities = () => dispatch => {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axiosInstance.get(`${process.env.REACT_APP_API_URL}/GrowthOpportunityOpenings`).then(res => {
        dispatch({
            type: GET_GROWTH_OPPORTUNITIES,
            payload: res.data
        });
        //console.log("action job opening", res.data)
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

export const getJobsApplied = (badge) => dispatch => {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axiosInstance.get(`${process.env.REACT_APP_API_URL}/GrowthOpportunityApplication`).then(res => {
      dispatch({
        type: GET_JOBS_APPLIED,
        payload: res.data
      });
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

export const setGrowthOpportunity = (payload) => dispatch => {
    localStorageService.setItem('growth_detail', payload);
    dispatch({
        type: SET_GROWTH_OPPORTUNITY,
        payload: payload,
    })
};

export const getGrowthOpportunity = () => dispatch => {
    const payload = localStorageService.getItem('growth_detail');
    dispatch({
        type: GET_GROWTH_OPPORTUNITY,
        payload: payload,
    })
};
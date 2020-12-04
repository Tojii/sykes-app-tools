import axios from "axios";
import localStorageService from "../../services/localStorageService";

export const GET_GROWTH_OPPORTUNITIES = "GET_GROWTH_OPPORTUNITIES";
export const SET_GROWTH_OPPORTUNITY = "SET_GROWTH_OPPORTUNITY";
export const GET_JOBS_APPLIED = "GET_JOBS_APPLIED";
export const GET_GROWTH_OPPORTUNITY = "GET_GROWTH_OPPORTUNITY";

export const getGrowthOpportunities = () => dispatch => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axios.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/GetJobOpenings`).then(res => {
        dispatch({
            type: GET_GROWTH_OPPORTUNITIES,
            payload: res.data
        });
    });
};

export const getJobsApplied = (badge) => dispatch => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axios.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/GetJobsApplied?badge=${badge}`).then(res => {
      dispatch({
        type: GET_JOBS_APPLIED,
        payload: res.data
      });
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

import axios from "axios";
import localStorageService from "../../services/localStorageService";

export const GET_GROWTH_OPPORTUNITIES = "GET_GROWTH_OPPORTUNITIES";
export const SET_GROWTH_OPPORTUNITY = "SET_GROWTH_OPPORTUNITY";
export const GET_JOBS_APPLIED = "GET_JOBS_APPLIED";

const config = {
    headers: {
        "x-api-key": '7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH-F013C',
        // "Access-Control-Allow-Origin": 'http://localhost:3000',
        "Authorization": `Bearer ${ localStorageService.getItem('jwt_token') }`
    }
}

export const getGrowthOpportunities = () => dispatch => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/GetJobOpenings`, config).then(res => {
        dispatch({
            type: GET_GROWTH_OPPORTUNITIES,
            payload: res.data
        });
    });
};

export const getJobsApplied = () => dispatch => {
    const auth_user = localStorageService.getItem('auth_user');
    axios.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/GetJobsApplied?badge=${auth_user.badgeId}`, config).then(res => {
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

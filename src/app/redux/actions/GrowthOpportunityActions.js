import axios from "axios";
import localStorageService from "../../services/localStorageService";

export const GET_GROWTH_OPPORTUNITIES = "GET_GROWTH_OPPORTUNITIES";
export const SET_GROWTH_OPPORTUNITY = "SET_GROWTH_OPPORTUNITY";
export const GET_JOBS_APPLIED = "GET_JOBS_APPLIED";

const config = {
    // Add headers
}

export const getGrowthOpportunities = () => dispatch => {
    axios.defaults.headers.common["x-api-key"] = `7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH-F013C`;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = 'http://localhost:3000';
    // axios.defaults.headers.common["Authorization"] = `Bearer ${localStorageService.getItem('jwt_token')}`;
    axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE3NzE3IiwidXNlcm5hbWUiOiJIRVJOQU5BTEUiLCJmdWxsbmFtZSI6IkhFUk5BTkRFWiBWQVJHQVMgQUxWQVJPIEVOUklRVUUiLCJiYWRnZSI6IjUzNjYyIiwiZW1haWwiOiJ0ZXN0OUBnbWFpbC5jb20iLCJwaG9uZSI6Ijg4ODg4ODgwIiwiZXhwIjoxNjA2NzQ5NTM2LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJ0b2ppaS5jb20ifQ.YdhTul8XEoRf7ejbz4Az2sPQX_CYy5dYEV-bzB62RZw`
    axios.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/GetJobOpenings`).then(res => {
        dispatch({
            type: GET_GROWTH_OPPORTUNITIES,
            payload: res.data
        });
    });
};

export const getJobsApplied = () => dispatch => {
    axios.defaults.headers.common["x-api-key"] = `7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH-F013C`;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = 'http://localhost:3000';
    axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE3NzE3IiwidXNlcm5hbWUiOiJIRVJOQU5BTEUiLCJmdWxsbmFtZSI6IkhFUk5BTkRFWiBWQVJHQVMgQUxWQVJPIEVOUklRVUUiLCJiYWRnZSI6IjUzNjYyIiwiZW1haWwiOiJ0ZXN0OUBnbWFpbC5jb20iLCJwaG9uZSI6Ijg4ODg4ODgwIiwiZXhwIjoxNjA2NzQ5NTM2LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJ0b2ppaS5jb20ifQ.YdhTul8XEoRf7ejbz4Az2sPQX_CYy5dYEV-bzB62RZw`
    const auth_user = localStorageService.getItem('auth_user');
    axios.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/GetJobsApplied?badge=${auth_user.badgeId}`).then(res => {
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

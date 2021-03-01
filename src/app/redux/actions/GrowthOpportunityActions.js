import localStorageService from "../../services/localStorageService";
import  api, { globalErrorHandler } from "../Api"

export const GET_GROWTH_OPPORTUNITIES = "GET_GROWTH_OPPORTUNITIES";
export const SET_GROWTH_OPPORTUNITY = "SET_GROWTH_OPPORTUNITY";
export const GET_JOBS_APPLIED = "GET_JOBS_APPLIED";
export const GET_GROWTH_OPPORTUNITY = "GET_GROWTH_OPPORTUNITY";

export const getGrowthOpportunities = () => dispatch => {
    api.get(`/api/GrowthOpportunity/GetJobOpenings`).then(res => 
        dispatch({
            type: GET_GROWTH_OPPORTUNITIES,
            payload: res.data
        })
    ).catch(globalErrorHandler);
};

export const getJobsApplied = (badge) => dispatch => {
    api.get(`/api/GrowthOpportunity/GetJobsApplied?badge=${badge}`).then(res => 
      dispatch({
        type: GET_JOBS_APPLIED,
        payload: res.data
      })
    ).catch(globalErrorHandler);
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
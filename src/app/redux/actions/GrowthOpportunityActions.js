import  api, { globalErrorHandler } from "../Api"

export const GET_GROWTH_OPPORTUNITIES = "GET_GROWTH_OPPORTUNITIES";
export const SET_GROWTH_OPPORTUNITY = "SET_GROWTH_OPPORTUNITY";
export const GET_JOBS_APPLIED = "GET_JOBS_APPLIED";
export const GET_GROWTH_OPPORTUNITY = "GET_GROWTH_OPPORTUNITY";

export const getGrowthOpportunities = () => dispatch => {
    api.get(`/GrowthOpportunity`).then(res => 
        dispatch({
            type: GET_GROWTH_OPPORTUNITIES,
            payload: res.data
        })
    ).catch(globalErrorHandler);
};

export const getJobsApplied = (badge) => dispatch => {
    api.get(`/GrowthOpportunity/GetJobsApplied?badge=${badge}`).then(res => 
      dispatch({
        type: GET_JOBS_APPLIED,
        payload: res.data
      })
    ).catch(globalErrorHandler);
};

export const setGrowthOpportunity = (payload) => dispatch => {
    dispatch({
        type: SET_GROWTH_OPPORTUNITY,
        payload: payload,
    })
};

export const getGrowthOpportunity = (id) => dispatch => {
    dispatch({
        type: GET_GROWTH_OPPORTUNITY,
        payload: null
    });

    api.get(`/GrowthOpportunity/${id}`).then(res => 
        dispatch({
            type: GET_GROWTH_OPPORTUNITY,
            payload: res.data
        })
    ).catch(globalErrorHandler);
};
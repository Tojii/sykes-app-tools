import axios from "axios";
import localStorageService from "../../services/localStorageService";

export const SET_APPLY_DATA = "SET_APPLY_DATA";
export const SAVE_JOB_APPLICATION = "SAVE_JOB_APPLICATION";
export const SET_VALIDATIONS = "SET_VALIDATIONS";

const config = {
    // Add headers
}

export const setApplyData = (payload) => dispatch => {
    dispatch({
        type: SET_APPLY_DATA,
        payload: payload,
    })
};


export const saveJobApplication = (payload) => dispatch => {
    axios.defaults.headers.common["x-api-key"] = `7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH-F013C`;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = 'http://localhost:3000';
    axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE3NzE3IiwidXNlcm5hbWUiOiJIRVJOQU5BTEUiLCJmdWxsbmFtZSI6IkhFUk5BTkRFWiBWQVJHQVMgQUxWQVJPIEVOUklRVUUiLCJiYWRnZSI6IjUzNjYyIiwiZW1haWwiOiJ0ZXN0OUBnbWFpbC5jb20iLCJwaG9uZSI6Ijg4ODg4ODgwIiwiZXhwIjoxNjA2NzQ5NTM2LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJ0b2ppaS5jb20ifQ.YdhTul8XEoRf7ejbz4Az2sPQX_CYy5dYEV-bzB62RZw`

    axios.post(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/SaveJobApplication`, payload).then(res => {
        console.log("RES: ", res);
      dispatch({
        type: SAVE_JOB_APPLICATION,
        payload: res.data
      });
    });
};

export const setValidations = (badgeId, jobId) => dispatch => {
    axios.defaults.headers.common["x-api-key"] = `7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH-F013C`;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = 'http://localhost:3000';
    axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE3NzE3IiwidXNlcm5hbWUiOiJIRVJOQU5BTEUiLCJmdWxsbmFtZSI6IkhFUk5BTkRFWiBWQVJHQVMgQUxWQVJPIEVOUklRVUUiLCJiYWRnZSI6IjUzNjYyIiwiZW1haWwiOiJ0ZXN0OUBnbWFpbC5jb20iLCJwaG9uZSI6Ijg4ODg4ODgwIiwiZXhwIjoxNjA2NzQ5NTM2LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJ0b2ppaS5jb20ifQ.YdhTul8XEoRf7ejbz4Az2sPQX_CYy5dYEV-bzB62RZw`

    axios.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/CallValidations?badgeId=${badgeId}&jobId=${jobId}`).then(res => {
        dispatch({
            type: SET_VALIDATIONS,
            payload: res.data
        });
    });
};
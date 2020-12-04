import axios from "axios";
import localStorageService from "../../services/localStorageService";

export const SET_APPLY_DATA = "SET_APPLY_DATA";
export const SAVE_JOB_APPLICATION = "SAVE_JOB_APPLICATION";
export const SET_VALIDATIONS = "SET_VALIDATIONS";

export const setApplyData = (payload) => dispatch => {
    dispatch({
        type: SET_APPLY_DATA,
        payload: payload,
    })
};


export const saveJobApplication = (payload) => dispatch => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axios.post(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/SaveJobApplication`, payload).then(res => {
        console.log("RES: ", res);
        dispatch({
            type: SAVE_JOB_APPLICATION,
        });
    });
};

export const setValidations = (badge, jobId) => dispatch => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axios.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/CallValidations?badgeId=${badge}&jobId=${jobId}`).then(res => {
        dispatch({
            type: SET_VALIDATIONS,
            payload: res.data
        });
    });
};
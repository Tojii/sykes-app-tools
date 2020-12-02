import axios from "axios";
import localStorageService from "../../services/localStorageService";

export const SET_APPLY_DATA = "SET_APPLY_DATA";
export const SAVE_JOB_APPLICATION = "SAVE_JOB_APPLICATION";
export const SET_VALIDATIONS = "SET_VALIDATIONS";

const config = {
    headers: {
        "x-api-key": '7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH-F013C',
        // "Access-Control-Allow-Origin": 'http://localhost:3000',
        "Authorization": `Bearer ${ localStorageService.getItem('jwt_token') }`
    }
}

export const setApplyData = (payload) => dispatch => {
    dispatch({
        type: SET_APPLY_DATA,
        payload: payload,
    })
};


export const saveJobApplication = (payload) => dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/SaveJobApplication`, payload, config).then(res => {
        console.log("RES: ", res);
        dispatch({
            type: SAVE_JOB_APPLICATION,
        });
    });
};

export const setValidations = (badgeId, jobId) => dispatch => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/CallValidations?badgeId=${badgeId}&jobId=${jobId}`, config).then(res => {
        dispatch({
            type: SET_VALIDATIONS,
            payload: res.data
        });
    });
};
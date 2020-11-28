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
    // axios.post(`${process.env.REACT_APP_API_URL}/GrowthOpportunity/SaveJobApplication`, payload, config).then(res => {
        // console.log("RES: ", res);
    //   dispatch({
    //     type: SAVE_JOB_APPLICATION,
    //     payload: res.data
    //   });
    // });
    dispatch({
        type: SAVE_JOB_APPLICATION,
        payload: payload,
    })
};

export const setValidations = (badgeId, jobId) => dispatch => {
    // axios.post(`${process.env.REACT_APP_API_URL}/GrowthOpportunity/CallValidations?badgeId=${}&jobId=${jobId}`, payload, config).then(res => {
        // console.log("RES: ", res);
    //   dispatch({
    //     type: SET_VALIDATIONS,
    //     payload: res.data
    //   });
    // });
    dispatch({
        type: SET_VALIDATIONS,
        payload: { badgeId: badgeId, jobId: jobId },
        // payload: res.data,
    })
};
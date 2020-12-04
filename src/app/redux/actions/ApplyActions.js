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
    var formData = new FormData();
    formData.append('email', payload.email);
    formData.append('phone', payload.phone);
    formData.append('resume', payload.resume);
    formData.append('id', parseInt(payload.id, 10));
    formData.append('created', payload.created);
    formData.append('openingId', payload.openingId);
    formData.append('job', payload.job);
    formData.append('badge', payload.badge);
    formData.append('fullName', payload.fullName);
    formData.append('workSchedule', payload.workSchedule);
    formData.append('startTime', payload.startTime);
    formData.append('endTime', payload.endTime);
    formData.append('PACurrent', payload.paCurrent);
    formData.append('PAMinimun', payload.paMinimun);
    formData.append('PAApproved', payload.paApproved);
    formData.append('TenureCurrent', payload.tenureCurrent);
    formData.append('TenureApproved', payload.tenureApproved);
    formData.append('TenureMinimum', payload.tenureMinimum);
    formData.append('WarningCurrent', payload.warningCurrent || "");
    formData.append('WarningMinimum', payload.warningMinimum);
    formData.append('EnglishApproved', payload.englishApproved);
    formData.append('EnglishScoreMinimum', payload.englishScoreMinimum);
    formData.append('EnglishScoreCurrent', payload.englishScoreCurrent);
    formData.append('EnglishScoreCurrentDate', payload.englishScoreCurrentDate);
    formData.append('EnglishListening', payload.englishListening);
    formData.append('EnglishGrammar', payload.englishGrammar);
    formData.append('EnglishOral', payload.englishOral);
    formData.append('EnglishReading_and_Writing', payload.englishReading_and_Writing);
    formData.append('WarningCurrentDate', payload.warningCurrentDate);
    formData.append('WarningCurrentType', payload.warningCurrentType);
    formData.append('DA_Category', payload.dA_Category);
    formData.append('WarningApproved', payload.warningApproved);
    formData.append('WarningRequired', payload.warningRequired);
    formData.append('Message', payload.message);
    formData.append('PARequired', payload.paRequired);
    formData.append('TenureRequired', payload.tenureRequired);
    formData.append('EnglishRequired', payload.englishRequired);
    formData.append('ApprovedFinal', payload.approvedFinal);

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }

    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axios.post(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/SaveJobApplication`, formData, config).then(res => {
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
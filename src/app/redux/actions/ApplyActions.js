import  api, { globalErrorHandler } from "../Api"
import history from "history.js";

export const SET_APPLY_DATA = "SET_APPLY_DATA";
export const SAVE_JOB_APPLICATION = "SAVE_JOB_APPLICATION";
export const SET_VALIDATIONS = "SET_VALIDATIONS";
export const RE_LOADING = "RE_LOADING";
export const SET_LOADING = "SET_ERROR";

export const setApplyData = (payload) => dispatch => {
    dispatch({
        type: SET_APPLY_DATA,
        payload: payload,
    })
};

export const setLoading = () => dispatch => {
    //console.log("error")
    dispatch({
        type: SET_LOADING,
    })
};

export const saveJobApplication = (payload) => dispatch => {
    //console.log("save Jobs", payload);
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

    formData.append('EnglishScoreCurrentDate', payload.englishScoreCurrentDate ? payload.englishScoreCurrentDate : '');
    formData.append('EnglishListening', payload.englishListening);
    formData.append('EnglishGrammar', payload.englishGrammar);
    formData.append('EnglishOral', payload.englishOral);
    formData.append('EnglishReading_and_Writing', payload.englishReading_and_Writing);
    formData.append('WarningCurrentDate', payload.warningCurrentDate ? payload.warningCurrentDate : "");
    formData.append('WarningCurrentType', payload.warningCurrentType);
    formData.append('DA_Category', payload.dA_Category);
    formData.append('WarningApproved', payload.warningApproved);
    formData.append('WarningRequired', payload.warningRequired);
    formData.append('Message', payload.message);
    formData.append('PARequired', payload.paRequired);
    formData.append('TenureRequired', payload.tenureRequired);
    formData.append('EnglishRequired', payload.englishRequired);
    formData.append('ApprovedFinal', payload.approvedFinal);
    formData.append('ApprovedFinal', false);

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
    dispatch({
        type: RE_LOADING
    });
    api.post(`/GrowthOpportunityApplication`, formData, config).then(res => {
        dispatch({
            type: SAVE_JOB_APPLICATION,
            payload: res.data
        });
        if (payload.refresh) {
            history.push({
                pathname: "/"
            });
            history.replace({ pathname: "/growth-opportunities" });
        }
    }).catch(globalErrorHandler);
};

export const setValidations = (badge, jobId) => dispatch => {
    api.get(`/GrowthOpportunityMetric/Validate?jobId=${jobId}`).then(res => {
        dispatch({
            type: SET_VALIDATIONS,
            payload: res.data
        });
        //console.log("validacion", res.data)
    }).catch(globalErrorHandler); 
};
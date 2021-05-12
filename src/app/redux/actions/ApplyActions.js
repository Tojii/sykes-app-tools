import axios from "axios";
import localStorageService from "../../services/localStorageService";
import apiAuthService from "../../services/apiAuthService";
import history from "history.js";

export const SET_APPLY_DATA = "SET_APPLY_DATA";
export const SAVE_JOB_APPLICATION = "SAVE_JOB_APPLICATION";
export const SET_VALIDATIONS = "SET_VALIDATIONS";
export const RE_LOADING = "RE_LOADING";
export const SET_LOADING = "SET_ERROR";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    //if (error.response.status === 401) {
        setLoading();
        apiAuthService.logout(); 
        history.state = history.location.pathname;
        history.push({
          pathname: "/session/signin"
        });
    //}

    return Promise.reject(error);
  }
)

export const setApplyData = (payload) => dispatch => {
    dispatch({
        type: SET_APPLY_DATA,
        payload: payload,
    })
};

export const setLoading = () => dispatch => {
    dispatch({
        type: SET_LOADING,
    })
};

export const saveJobApplication = (payload) => dispatch => {
    
    var formData = new FormData();
    formData.append('email', payload.email);
    formData.append('phone', payload.phone);
    formData.append('resume', payload.resume);
    formData.append('openingId', payload.openingId);
    formData.append('job', payload.job);
    formData.append('workSchedule', payload.workSchedule);
    formData.append('startTime', payload.startTime);
    formData.append('endTime', payload.endTime);

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
    dispatch({
        type: RE_LOADING
    });
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");

    axiosInstance.post(`${process.env.REACT_APP_API_URL}/GrowthOpportunityApplication`, formData, config).then(res => {
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
    })
    .catch((error) => {
        // Error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }); 
};

export const setValidations = (jobId, jobName) => dispatch => {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axiosInstance.post(`${process.env.REACT_APP_API_URL}/GrowthOpportunityApplication/Validate`, {
        jobId: jobId, 
        jobName: jobName 
    }).then(res => {
    dispatch({
        type: SET_VALIDATIONS,
        payload: res.data
    });
    })
    .catch((error) => {
        // Error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }); 
};
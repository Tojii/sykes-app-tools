export const SET_APPLY_DATA = "SET_APPLY_DATA";
export const SAVE_JOB_APPLICATION = "SAVE_JOB_APPLICATION";

export const setApplyData = (payload) => dispatch => {
    dispatch({
        type: SET_APPLY_DATA,
        payload: payload,
    })
};

export const saveJobApplication = (payload) => dispatch => {
    // axios.post(`${process.env.REACT_APP_API_URL}/GrowthOpportunity/GetJobOpenings`, payload, config).then(res => {
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
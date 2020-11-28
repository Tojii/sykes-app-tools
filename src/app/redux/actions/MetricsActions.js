import axios from "axios";
export const GET_METRICS = "GET_METRICS";

const config = {
    // Add headers
}

export const getMetrics = () => dispatch => {
    // const auth_user = localStorageService.getItem('user');
    // axios.get(`${process.env.REACT_APP_API_URL}/GrowthOpportunity/GetMetrics?badgeId=${auth_user.badgeId}`, config).then(res => {
    //   console.log("RES: ", res);
    //   dispatch({
    //     type: GET_METRICS,
    //     payload: res.data
    //   });
    // });
    const payload = {
        "badge": "53662",
        "lastPA": "0.00000000",
        "lastPAYear": "",
        "lastPAMonth": "",
        "paCurrent": "0.00",
        "paMinimum": "",
        "paApproved": true,
        "tenureCurrent": "",
        "tenureMinimum": "",
        "tenureApproved": true,
        "englishOral": "0.00",
        "englishGrammar": "0.00",
        "englishReading_and_Writing": "0.00",
        "englishListening": "0.00",
        "englishScoreCurrentDate": "",
        "englishScoreCurrent": "0.00",
        "englishScoreMinimum": "",
        "englishApproved": true,
        "warningCurrentType": null,
        "warningCurrentDate": "",
        "warningMinimum": "",
        "warningApproved": true,
        "warningRequired": false,
        "paRequired": false,
        "tenureRequired": false,
        "englishRequired": false,
        "approvedFinal": true,
        "message": "Dear candidate, \n \n Thank you for desiring to grow within our organization, we will get in touch with you soon.",
        "dA_Category": null
    }
    console.log("actions: ", payload);
    dispatch({
        type: GET_METRICS,
        payload: payload,
    })
};


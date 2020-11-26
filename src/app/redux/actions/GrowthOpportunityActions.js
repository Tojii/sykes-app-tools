import axios from "axios";
import localStorageService from "../../services/localStorageService";

export const GET_GROWTH_OPPORTUNITIES = "GET_GROWTH_OPPORTUNITIES";
export const SET_GROWTH_OPPORTUNITY = "SET_GROWTH_OPPORTUNITY";
export const GET_JOBS_APPLIED = "GET_JOBS_APPLIED";

const config = {
    // Add headers
}

export const getGrowthOpportunities = () => dispatch => {
    // axios.get(`${process.env.REACT_APP_API_URL}/GrowthOpportunity/GetJobOpenings`, config).then(res => {
        // console.log("RES: ", res);
    //   dispatch({
    //     type: GET_PRODUCT_LIST,
    //     payload: res.data
    //   });
    // });
    const payload = [
        {
            id: "1431",
            openingId: "JO101361",
            title: "Trilingual Technical Support Agent II for its Intel account",
            area: "Intel",
            startDate: "10/26/2020 9:00:00 PM",
            expirationDate: "11/30/2020 11:00:00 PM",
            description: "Description from api request"
        },
        {
            id: "1498",
            openingId: "JO101425",
            title: "Wide Area Network (WAN) Engineer L2 for the Unitas Global account",
            area: "Unitas Global",
            startDate: "9/21/2020 6:00:00 PM",
            expirationDate: "11/27/2020 11:00:00 PM",
            description: "Description from api request"
        }
    ]
    dispatch({
        type: GET_GROWTH_OPPORTUNITIES,
        payload: payload,
    })
};

export const getJobsApplied = (badgeId) => dispatch => {
    // axios.get(`${process.env.REACT_APP_API_URL}/GrowthOpportunity/GetJobsApplied?badge=${badgeId}`, config).then(res => {
        // console.log("RES: ", res);
    //   dispatch({
    //     type: GET_PRODUCT_LIST,
    //     payload: res.data
    //   });
    // });
    const payload = [
        {
            "id": 224,
            "created": "8/7/2020 9:32:16 PM",
            "openingId": "JO101374",
            "job": "Temporary Customer Advocacy Coaches for Capital One Retail Bank.",
            "badge": "53662",
            "fullName": "",
            "workSchedule": "Monday, Tuesday, Wednesday, Thursday, Friday",
            "startTime": "8/7/2020 2:00:00 PM",
            "endTime": "8/7/2020 11:00:00 PM",
            "status": "Approved"
        },
        {
            "id": 225,
            "created": "8/7/2020 11:55:07 PM",
            "openingId": "JO101371",
            "job": "L2 Network Security Engineer for OKTA",
            "badge": "53662",
            "fullName": "",
            "workSchedule": "Monday, Tuesday, Wednesday, Thursday, Friday",
            "startTime": "8/7/2020 2:00:00 PM",
            "endTime": "8/7/2020 11:00:00 PM",
            "status": "Approved"
        },
        {
            "id": 230,
            "created": "8/8/2020 1:56:49 AM",
            "openingId": "JO101378",
            "job": "CRT (Customer Resolution Team) Associates for Capital One",
            "badge": "53662",
            "fullName": "HERNANDEZ VARGAS ALVARO ENRIQUE",
            "workSchedule": "Monday, Tuesday, Wednesday, Thursday, Friday",
            "startTime": "8/7/2020 12:00:00 PM",
            "endTime": "8/7/2020 10:00:00 PM",
            "status": "Approved"
        }
    ]
    dispatch({
        type: GET_JOBS_APPLIED,
        payload: payload,
    })
};

export const setGrowthOpportunity = (payload) => dispatch => {
    localStorageService.setItem('growth_detail', payload);
    dispatch({
        type: SET_GROWTH_OPPORTUNITY,
        payload: payload,
    })
};

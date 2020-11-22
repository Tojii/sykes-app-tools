import axios from "axios";
import localStorageService from "../../services/localStorageService";

export const GET_GROWTH_OPPORTUNITIES = "GET_GROWTH_OPPORTUNITIES";
export const SET_GROWTH_OPPORTUNITY = "SET_GROWTH_OPPORTUNITY";
export const POST_APPLY = "POST_APPLY";

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

export const setGrowthOpportunity = (payload) => dispatch => {
    localStorageService.setItem('growth_detail', payload);
    dispatch({
        type: SET_GROWTH_OPPORTUNITY,
        payload: payload,
    })
};

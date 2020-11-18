import axios from "axios";

export const GET_GROWTH_OPPORTUNITIES = "GET_GROWTH_OPPORTUNITIES";
export const POST_APPLY = "POST_APPLY";

export const getGrowthOpportunities = () => dispatch => {
    // axios.get("/api/ecommerce/get-product-list").then(res => {
    //   dispatch({
    //     type: GET_PRODUCT_LIST,
    //     payload: res.data
    //   });
    // });
    const payload = [
        {
            id: 1,
            name: "Trilingual Technical Support Agent II for its Intel account",
            area: "Intel",
            status: "pending",
            date: "21/12/2020 5:00:00 PM"
        },
        {
            id: 2,
            name: "Network Engineer II for the Sungard account",
            area: "Sungard",
            status: "denied",
            date: "12/11/2020 5:00:00 PM"
        },
        {
            id: 3,
            name: "L2 Network Security Engineer for the OKTA account",
            area: "OKTA",
            status: "approved",
            date: "12/11/2020 5:00:00 PM"
        }
    ]
    dispatch({
        type: GET_GROWTH_OPPORTUNITIES,
        payload: payload,
    })
};

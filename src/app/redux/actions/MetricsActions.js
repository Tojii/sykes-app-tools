import axios from "axios";
export const GET_METRICS = "GET_METRICS";

export const getMetrics = () => dispatch => {
    // axios.get(`${process.env.REACT_APP_API_URL}/GrowthOpportunity/GetJobOpenings`, config).then(res => {
    //   console.log("RES: ", res);
    //   dispatch({
    //     type: GET_PRODUCT_LIST,
    //     payload: res.data
    //   });
    // });
    const payload = {
        tenure: '5 months',
        warnings: [
            {
                type: 'leve',
                category: 'A',
                date: '01/11/2020',
            },
            {
                type: 'grave',
                category: 'C',
                date: '05/11/2020',
            }
        ]
    }
    console.log("actions: ", payload);
    dispatch({
        type: GET_METRICS,
        payload: payload,
    })
};


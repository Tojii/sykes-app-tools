import axios from "axios";
export const GET_METRICS = "GET_METRICS";

export const getMetrics = (badge) => dispatch => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axios.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/GetMetrics?badgeId=${badge}`).then(res => {
      dispatch({
        type: GET_METRICS,
        payload: res.data
      });
      console.log(res.data)
    });
};


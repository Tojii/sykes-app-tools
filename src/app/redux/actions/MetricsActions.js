import api from "../Api";

export const GET_METRICS = "GET_METRICS";

export const getMetrics = (badge) => dispatch => {
    api.get(`/GrowthOpportunity/GetMetrics?badgeId=${badge}`).then(res => 
      dispatch({
        type: GET_METRICS,
        payload: res.data
      })
    );
};
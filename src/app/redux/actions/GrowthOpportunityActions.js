import api, {
    globalErrorHandler
} from "../Api"

export const GET_GROWTH_OPPORTUNITIES = "GET_GROWTH_OPPORTUNITIES";
export const SET_GROWTH_OPPORTUNITY = "SET_GROWTH_OPPORTUNITY";
export const GET_JOBS_APPLIED = "GET_JOBS_APPLIED";
export const GET_GROWTH_OPPORTUNITY = "GET_GROWTH_OPPORTUNITY";
export const GET_GROWTH_OPPORTUNITY_METRICS = "GET_GROWTH_OPPORTUNITY_METRICS";

export const getGrowthOpportunities = () => dispatch => {

    api.get(`/GrowthOpportunityOpenings`).then(res => {
            dispatch({
                type: GET_GROWTH_OPPORTUNITIES,
                payload: res.data
            });
            //console.log("action job opening", res.data)
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

export const getJobsApplied = (badge) => dispatch => {
    api.get(`/GrowthOpportunityApplication`).then(res => {
            dispatch({
                type: GET_JOBS_APPLIED,
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


export const setGrowthOpportunity = (payload) => dispatch => {
    dispatch({
        type: SET_GROWTH_OPPORTUNITY,
        payload: payload,
    })
};

export const getGrowthOpportunity = (id) => dispatch => {
    dispatch({
        type: GET_GROWTH_OPPORTUNITY,
        payload: null
    });

    api.get(`/GrowthOpportunityOpenings/${id}`).then(res => 
        dispatch({
            type: GET_GROWTH_OPPORTUNITY,
            payload: res.data
        })
    ).catch(globalErrorHandler);
};


export const getGrowthOpportunityMetrics = (badge) => dispatch => {
    api.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    api.get(`${process.env.REACT_APP_API_URL}/GrowthOpportunityApplication/Metrics`).then(res => {
      dispatch({
        type: GET_GROWTH_OPPORTUNITY_METRICS,
        payload: res.data
      });
      //console.log(res.data) 
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
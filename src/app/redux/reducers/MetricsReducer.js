import { 
    GET_METRICS,
} from "../actions/MetricsActions";

const initialState = {
    metrics: null,
};

const GrowthReducer = function(state = initialState, action){
    switch (action.type) {
        case GET_METRICS:
            return { ...state, metrics: action.payload };
        default:
            return { ...state };
     }
};

export default GrowthReducer

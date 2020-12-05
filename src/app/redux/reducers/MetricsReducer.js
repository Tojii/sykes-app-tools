import { 
    GET_METRICS,
} from "../actions/MetricsActions";

const INIT_STATE = {
    metrics: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_METRICS:
            console.log("payload",action.payload)
            return { ...state, metrics: action.payload };
        default:
            return { ...state };
     }
};

import { 
    GET_GROWTH_OPPORTUNITIES,
    SET_GROWTH_OPPORTUNITY,
    GET_JOBS_APPLIED,
    GET_GROWTH_OPPORTUNITY,
    GET_GROWTH_OPPORTUNITY_METRICS
} from "../actions/GrowthOpportunityActions";

const initialState = {
    growth_opportunities: null,
    growth_opportunity: null,
    jobs_applied: null,
    metrics: null
};

const GrowthReducer = function(state = initialState, action){
    switch (action.type) {
        case GET_GROWTH_OPPORTUNITIES:
            return { ...state, growth_opportunities: action.payload };
        case GET_JOBS_APPLIED:
            return { ...state, jobs_applied: action.payload };
        case SET_GROWTH_OPPORTUNITY:
            return { ...state, growth_opportunity: action.payload };
        case GET_GROWTH_OPPORTUNITY:
            return { ...state, growth_opportunity: action.payload };
        case GET_GROWTH_OPPORTUNITY_METRICS:
            return { ...state, metrics: action.payload };
        default:
            return { ...state };
     }
};

export default GrowthReducer;
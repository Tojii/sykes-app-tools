import { 
    GET_GROWTH_OPPORTUNITIES,
    SET_GROWTH_OPPORTUNITY,
    GET_JOBS_APPLIED,
} from "../actions/GrowthOpportunityActions";
import localStorageService from "../../services/localStorageService"

const INIT_STATE = {
    growth_opportunities: null,
    growth_opportunity: localStorageService.getItem('growth_detail') || {},
    jobs_applied: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_GROWTH_OPPORTUNITIES:
            return { ...state, growth_opportunities: action.payload };
        case GET_JOBS_APPLIED:
            return { ...state, jobs_applied: action.payload };
        case SET_GROWTH_OPPORTUNITY:
            return { ...state, growth_opportunity: action.payload };
        default:
            return { ...state };
     }
};
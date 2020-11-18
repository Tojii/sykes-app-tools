import { 
    GET_GROWTH_OPPORTUNITIES,
} from "../actions/GrowthOpportunityActions";
  
const INIT_STATE = {
    growth_opportunities: [],
};
  
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_GROWTH_OPPORTUNITIES:
            return { ...state, growth_opportunities: action.payload };
        default:
            return { ...state };
     }
};
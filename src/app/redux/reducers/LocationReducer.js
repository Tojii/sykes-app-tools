import {
    GET_PROVINCE,
    GET_CANTONS,
    GET_DISTRICTS,
    LO_LOADING,
} from "../actions/LocationActions"

const initialState = {
    provinces: [],
    cantons: [],
    districts: [],
    loading: true,
};

const CampaignReducer = function(state = initialState, action){
    switch (action.type) {
        case LO_LOADING: {
            return {
              ...state,
              loading: true
            }
        }
        case GET_PROVINCE: {
            return {
                ...state,
                provinces: [...action.data],
                loading: false
            }
        }
        case GET_CANTONS: {
            return {
                ...state,
                cantons: [...action.data],
                loading: false
            }
        }
        case GET_DISTRICTS: {
            return {
                ...state,
                districts: [...action.data],
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}

export default CampaignReducer;
  


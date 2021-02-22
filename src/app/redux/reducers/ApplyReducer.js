import { 
    SET_APPLY_DATA,
    SAVE_JOB_APPLICATION,
    SET_VALIDATIONS,
    RE_LOADING,
    SET_LOADING,
} from "../actions/ApplyActions";

const initialState = {
    apply: {},
    validations: null,
    saveApplication: null,
    loading: false
};

const ApplyReducer = function(state = initialState, action){
    switch (action.type) {
        case RE_LOADING: 
            return {...state, loading: true };
        case SET_LOADING: 
            return {...state, loading: false, validations: null };
        case SET_APPLY_DATA:
            return { ...state, apply: action.payload, loading: false };
        case SAVE_JOB_APPLICATION:
            return { ...state, saveApplication: action.payload, loading: false };
        case SET_VALIDATIONS:
            return { ...state, validations: action.payload, loading: false };  
        default:
            return { ...state, loading: false };
     }
};

export default ApplyReducer;
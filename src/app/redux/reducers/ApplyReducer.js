import { 
    SET_APPLY_DATA,
    SAVE_JOB_APPLICATION,
    SET_VALIDATIONS,
    RE_LOADING,
    SET_LOADING,
} from "../actions/ApplyActions";

const INIT_STATE = {
    apply: {},
    validations: null,
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case RE_LOADING: 
            return {...state, loading: true };
        case SET_LOADING: 
            return {...state, loading: false, validations: null };
        case SET_APPLY_DATA:
            return { ...state, apply: action.payload, loading: false };
        case SAVE_JOB_APPLICATION:
            return { ...state, loading: false };
        case SET_VALIDATIONS:
            return { ...state, validations: action.payload, loading: false };  
        default:
            return { ...state, loading: false };
     }
};
import { 
    SET_APPLY_DATA,
    SAVE_JOB_APPLICATION,
    SET_VALIDATIONS,
} from "../actions/ApplyActions";
import localStorageService from "../../services/localStorageService"

const INIT_STATE = {
    apply: {},
    user: localStorageService.getItem('auth_user') || {},
    growth_detail: localStorageService.getItem('growth_detail') || {},
    validations: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_APPLY_DATA:
            return { ...state, apply: action.payload };
        case SAVE_JOB_APPLICATION:
            return { ...state, apply: action.payload };
        case SET_VALIDATIONS:
            return { ...state, validations: action.payload };  
        default:
            return { ...state };
     }
};
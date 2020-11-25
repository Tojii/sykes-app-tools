import { 
    SET_APPLY_DATA,
} from "../actions/ApplyActions";
import localStorageService from "../../services/localStorageService"

const INIT_STATE = {
    apply: {},
    user: localStorageService.getItem('auth_user') || {},
    growth_detail: localStorageService.getItem('growth_detail') || {},
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_APPLY_DATA:
            return { ...state, apply: action.payload };
        default:
            return { ...state };
     }
};
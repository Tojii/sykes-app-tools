import { 
    SET_APPLY_DATA,
} from "../actions/ApplyActions";

const INIT_STATE = {
    apply: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_APPLY_DATA:
            return { ...state, apply: action.payload };
        default:
            return { ...state };
     }
};
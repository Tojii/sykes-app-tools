import {
    GET_IMAGES,
    RE_LOADING,
} from "../actions/CommonActions"

const initialState = {
    images: [],
    loading: false
};

const CommonReducer = function(state = initialState, action){
    switch (action.type) {
        case RE_LOADING: {
            return {
              ...state,
              loading: true
            }
        }
        case GET_IMAGES: {
            return {
                ...state,
                images: [...action.data],
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}

export default CommonReducer;
  


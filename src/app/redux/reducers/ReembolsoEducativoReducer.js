import {
    GET_REEMBOLSOS_EDUCATIVOS,
    SUBMIT_DATA,
    RE_LOADING,
} from "../actions/ReembolsoEducativoActions";


const initialState = {
    rembolsos: [],
    loading: false
  };

const ReembolsosEducativosReducer = function(state = initialState, action) {
    switch (action.type) {
        case RE_LOADING: {
          return {
            ...state,
            loading: true
          };
        }
        case GET_REEMBOLSOS_EDUCATIVOS: {
            return{
                ...state,
                rembolsos : [...action.data],
                loading: false
            }
        }
        default: {
            return state;
          }
        }
}

export default ReembolsosEducativosReducer;
  
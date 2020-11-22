import {
    GET_REEMBOLSOS_EDUCATIVOS,
    SUBMIT_DATA,
    RE_LOADING,
    GET_CATEGORIA_DE_ESTUDIO
} from "../actions/ReembolsoEducativoActions";


const initialState = {
    rembolsos: [],
    categoriasDeEstudio: [],
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
        case GET_CATEGORIA_DE_ESTUDIO: {
            return{
              ...state,
              categoriasDeEstudio: [...action.data],
              loading: false
            }
        }
        default: {
            return state;
          }
        }
}

export default ReembolsosEducativosReducer;
  
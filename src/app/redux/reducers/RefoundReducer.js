import {
    GET_REFOUND_LIST_BY_USER,
    SAVE_REFOUND,
    RE_LOADING,
    GET_INFORMATION_LISTS,
    GET_STUDIES_CATEGORY
} from "../actions/RefoundActions";


const initialState = {
    summary: [],
    employeeRefunds: [],
    iformationLists: [],
    studiesCatergory: [],
    universityInstitutes: [],
    ciscoAcademies: [],
    studiesCenters: [],
    languageAcademies: [],
    certifications: [],
    techStudiesCenter: [],
    saveRefound: null,
    loading: true
  };

const RefoundsReducer = function(state = initialState, action) {
    switch (action.type) {
        case RE_LOADING: {
          return {
            ...state,
            loading: true
          }
        }
        case SAVE_REFOUND: {
          return {
              ...state,
              saveRefound : action.data,
              loading: false
          }
      }
        case GET_REFOUND_LIST_BY_USER: {
            return {
                ...state,
                summary : [...action.data.summary],
                employeeRefunds: [...action.data.employeeRefunds],
                loading: false
            }
        }
        case GET_INFORMATION_LISTS: {
          return {
            ...state,
            universityInstitutes: [...action.data.universityInstitutes],
            ciscoAcademies: [...action.data.ciscoAcademies],
            languageAcademies: [...action.data.languageAcademies],
            certifications: [...action.data.certifications],
            techStudiesCenter: [...action.data.techStudiesCenter],
            loading: false
          }
        }
      case GET_STUDIES_CATEGORY: {
        return {
          ...state,
          studiesCatergory: [...action.data],
          //loading: false
        }
      }
        default: {
            return state;
          }
        }
}

export default RefoundsReducer;
  
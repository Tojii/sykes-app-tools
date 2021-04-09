import {
    GET_REIMBURSEMENT_LIST_BY_USER,
    SAVE_REIMBURSEMENT,
    RE_LOADING,
    GET_INFORMATION_LISTS,
    GET_STUDIES_CATEGORY
} from "../actions/EducationalReimbursementActions";


const initialState = {
    summary: [],
    employeeReimbursements: [],
    iformationLists: [],
    studiesCatergory: [],
    universityInstitutes: [],
    ciscoAcademies: [],
    studiesCenters: [],
    languageAcademies: [],
    certifications: [],
    techStudiesCenter: [],
    saveReimbursement: null,
    loading: true
  };

const EducationalReimbursementReducer = function(state = initialState, action) {
    switch (action.type) {
        case RE_LOADING: {
          return {
            ...state,
            loading: true
          }
        }
        case SAVE_REIMBURSEMENT: {
          return {
              ...state,
              saveReimbursement : action.data,
              loading: false
          }
      }
        case GET_REIMBURSEMENT_LIST_BY_USER: {
            return {
                ...state,
                summary : [...action.data.summary],
                employeeReimbursements: [...action.data.employeeReimbursements],
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

export default EducationalReimbursementReducer;
  
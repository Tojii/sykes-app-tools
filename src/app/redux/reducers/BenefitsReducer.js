import {
    GET_BENEFITS,
    GET_BENEFITS_CATEGORY,
    GET_BENEFITS_LOCATIONS,
    GET_BENEFITS_ACTIVE,
    GET_BENEFITSBYID,
    GET_BENEFITS_LOCATIONSBYID,
    ADD_BENEFIT,
    ADD_BENEFIT_LOCATION,
    UPDATE_BENEFIT,
    DELETE_BENEFIT,
    BE_LOADING,
    BE_ERROR,
} from "../actions/BenefitsActions"

const initialState = {
    benefits: [],
    benefitscategories: [],
    benefitslocations: [],
    benefitsActive: [],
    loading: false,
    benefit: [],
    location: [],
    addBenefit: null,
    addBenefitLocation: null,
    success: true,
};

const BenefitReducer = function(state = initialState, action){
    switch (action.type) {
        case BE_LOADING: {
            return {
              ...state,
              loading: true
            }
        }
        case BE_ERROR: {
            return {
              ...state,
              success: false,
              loading: false
            }
        }
        case GET_BENEFITS: {
            return {
                ...state,
                benefits: [...action.data],
                loading: false
            }
        }
        case GET_BENEFITS_CATEGORY: {
            return {
                ...state,
                benefitscategories: [...action.data],
                loading: false
            }
        }
        case GET_BENEFITS_LOCATIONS: {
            return {
                ...state,
                benefitslocations: [...action.data],
                loading: false
            }
        }
        case GET_BENEFITS_ACTIVE: {
            return {
                ...state,
                benefitsActive: [...action.data],
                loading: false
            }
        }
        case GET_BENEFITSBYID: {
            return {
                ...state,
                benefit: [action.data],
                loading: false
            }
        }
        case GET_BENEFITS_LOCATIONSBYID: {
            return {
                ...state,
                location: action.data,
                loading: false
            }
        }
        case ADD_BENEFIT: {
            return {
                ...state,
                addBenefit : action.data,
                success: true,
                loading: false
            }
        }
        case ADD_BENEFIT_LOCATION: {
            return {
                ...state,
                addBenefitLocation : action.data,
                success: true,
                loading: false
            }
        }
        case UPDATE_BENEFIT: {
            return {
                ...state,
                addBenefit : action.data,
                success: true,
                loading: false
            }
        }
        case DELETE_BENEFIT: {
            return {
                ...state,
                success: true,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}

export default BenefitReducer;
  


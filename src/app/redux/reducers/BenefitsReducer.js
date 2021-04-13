import {
    GET_BENEFITS,
    GET_BENEFITS_CATEGORY,
    GET_BENEFITS_LOCATIONS,
    GET_BENEFITS_ACTIVE,
    GET_BENEFITSBYID,
    GET_BENEFITS_LOCATIONSBYID,
    GET_BENEFITS_LOCATIONSBYPROVINCE,
    GET_BENEFITS_LOCATIONSBYPROVINCECANTON,
    ADD_BENEFIT,
    ADD_BENEFIT_LOCATION,
    UPDATE_BENEFIT,
    UPDATE_BENEFIT_LOCATION,
    DELETE_BENEFIT,
    DELETE_BENEFIT_LOCATION,
    BE_LOADING,
    BE_LOADING_LOCATION,
    BE_ERROR,
    GET_BENEFITS_CATEGORYBYID,
} from "../actions/BenefitsActions"

const initialState = {
    benefits: [],
    benefitscategories: [],
    benefitscategory: [],
    benefitslocations: [],
    benefitslocationsCanton: [],
    benefitsActive: [],
    loading: false,
    loadingLocation: false,
    benefit: [],
    benefitlocation: [],
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
        case BE_LOADING_LOCATION: {
            return {
              ...state,
              loadingLocation: true
            }
        }
        case BE_ERROR: {
            return {
              ...state,
              success: false,
              loading: false,
              loadingLocation: false,
            }
        }
        case GET_BENEFITS: {
            return {
                ...state,
                benefits: [...action.data],
                loading: false,
                success: true,
            }
        }
        case GET_BENEFITS_CATEGORY: {
            return {
                ...state,
                benefitscategories: [...action.data],
                loading: false,
                success: true,
            }
        }
        case GET_BENEFITS_LOCATIONS: {
            return {
                ...state,
                benefitslocations: [...action.data],
                benefitslocationsCanton: [...action.data],
                loadingLocation: false,
                success: true,
            }
        }
        case GET_BENEFITS_ACTIVE: {
            return {
                ...state,
                benefitsActive: [...action.data],
                loading: false,
                success: true,
            }
        }
        case GET_BENEFITSBYID: {
            return {
                ...state,
                benefit: [action.data],
                loading: false,
                success: true,
            }
        }
        case GET_BENEFITS_CATEGORYBYID: {
            return {
                ...state,
                benefitscategory: [action.data],
                loading: false,
                success: true,
            }
        }
        case GET_BENEFITS_LOCATIONSBYID: {
            return {
                ...state,
                benefitlocation: [action.data],
                loadingLocation: false,
                success: true,
            }
        }
        case GET_BENEFITS_LOCATIONSBYPROVINCE: {
            return {
                ...state,
                benefitslocations: [...action.data],
                benefitslocationsCanton: [...action.data],
                loadingLocation: false,
                success: true,
            }
        }
        case GET_BENEFITS_LOCATIONSBYPROVINCECANTON: {
            return {
                ...state,
                benefitslocationsCanton: [...action.data],
                loadingLocation: false,
                success: true,
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
                loadingLocation: false
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
        case UPDATE_BENEFIT_LOCATION: {
            return {
                ...state,
                addBenefitLocation : action.data,
                success: true,
                loadingLocation: false
            }
        }
        case DELETE_BENEFIT: {
            return {
                ...state,
                success: true,
                loading: false
            }
        }
        case DELETE_BENEFIT_LOCATION: {
            return {
                ...state,
                success: true,
                loadingLocation: false
            }
        }
        default: {
            return state;
        }
    }
}

export default BenefitReducer;
  


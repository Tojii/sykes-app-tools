import {
    GET_BENEFITS_CATEGORIES,
    GET_BENEFITS_CATEGORY_BYID,
    ADD_BENEFIT_CATEGORY,
    UPDATE_BENEFIT_CATEGORY,
    DELETE_BENEFIT_CATEGORY,
    BE_LOADING_CATEGORY,
    BE_CATEGORY_ERROR,
} from "../actions/BenefitsCategoryActions"

const initialState = {
    benefitscategories: [],
    category: [],
    loading: false,
    benefit: [],
    addBenefitCategory: null,
    success: true,
};

const BenefitCategoryReducer = function(state = initialState, action){
    switch (action.type) {
        case BE_LOADING_CATEGORY: {
            return {
              ...state,
              loading: true
            }
        }
        case BE_CATEGORY_ERROR: {
            return {
              ...state,
              success: false,
              loading: false,
            }
        }
        case GET_BENEFITS_CATEGORIES: {
            return {
                ...state,
                benefitscategories: [...action.data],
                loading: false,
                success: true,
            }
        }
        case GET_BENEFITS_CATEGORY_BYID: {
            return {
                ...state,
                category: [action.data],
                loading: false,
                success: true,
            }
        }
        case ADD_BENEFIT_CATEGORY: {
            return {
                ...state,
                addBenefitCategory : action.data,
                success: true,
                loading: false
            }
        }
        case UPDATE_BENEFIT_CATEGORY: {
            return {
                ...state,
                addBenefitCategory : action.data,
                success: true,
                loading: false
            }
        }
        case DELETE_BENEFIT_CATEGORY: {
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

export default BenefitCategoryReducer;
  


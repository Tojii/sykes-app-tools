import {
    GET_BENEFITS_DISCOUNTS,
    GET_BENEFITS_DISCOUNT_BYID,
    ADD_BENEFIT_DISCOUNT,
    UPDATE_BENEFIT_DISCOUNT,
    DELETE_BENEFIT_DISCOUNT,
    BE_LOADING_DISCOUNT,
    BE_DISCOUNT_ERROR,
} from "../actions/BenefitsDiscountActions"

const initialState = {
    benefitsdiscounts: [],
    discount: [],
    loading: false,
    benefit: [],
    addBenefitDiscount: null,
    success: true,
};

const BenefitDiscountReducer = function(state = initialState, action){
    switch (action.type) {
        case BE_LOADING_DISCOUNT: {
            return {
              ...state,
              loading: true
            }
        }
        case BE_DISCOUNT_ERROR: {
            return {
              ...state,
              success: false,
              loading: false,
            }
        }
        case GET_BENEFITS_DISCOUNTS: {
            return {
                ...state,
                benefitsdiscounts: [...action.data],
                loading: false,
                success: true,
            }
        }
        case GET_BENEFITS_DISCOUNT_BYID: {
            return {
                ...state,
                discount: [action.data],
                loading: false,
                success: true,
            }
        }
        case ADD_BENEFIT_DISCOUNT: {
            return {
                ...state,
                addBenefitDiscount : action.data,
                success: true,
                loading: false
            }
        }
        case UPDATE_BENEFIT_DISCOUNT: {
            return {
                ...state,
                addBenefitDiscount : action.data,
                success: true,
                loading: false
            }
        }
        case DELETE_BENEFIT_DISCOUNT: {
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

export default BenefitDiscountReducer;
  


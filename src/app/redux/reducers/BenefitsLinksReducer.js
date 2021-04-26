import {
    GET_BENEFITS_LINKS,
    GET_BENEFITS_LINK_BYID,
    ADD_BENEFIT_LINK,
    UPDATE_BENEFIT_LINK,
    DELETE_BENEFIT_LINK,
    BE_LOADING_LINKS,
    BE_LINKS_ERROR,
} from "../actions/BenefitsLinksActions"

const initialState = {
    benefitslinks: [],
    link: [],
    loading: false,
    benefit: [],
    addBenefitLink: null,
    success: true,
};

const BenefitLinkReducer = function(state = initialState, action){
    switch (action.type) {
        case BE_LOADING_LINKS: {
            return {
              ...state,
              loading: true
            }
        }
        case BE_LINKS_ERROR: {
            return {
              ...state,
              success: false,
              loading: false,
            }
        }
        case GET_BENEFITS_LINKS: {
            return {
                ...state,
                benefitslinks: [...action.data],
                loading: false,
                success: true,
            }
        }
        case GET_BENEFITS_LINK_BYID: {
            return {
                ...state,
                link: [action.data],
                loading: false,
                success: true,
            }
        }
        case ADD_BENEFIT_LINK: {
            return {
                ...state,
                addBenefitLink: action.data,
                success: true,
                loading: false
            }
        }
        case UPDATE_BENEFIT_LINK: {
            return {
                ...state,
                addBenefitLink: action.data,
                success: true,
                loading: false
            }
        }
        case DELETE_BENEFIT_LINK: {
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

export default BenefitLinkReducer;
  


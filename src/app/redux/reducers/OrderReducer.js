import {
    GET_ORDER,
    GET_ALL_ORDER,
    ADD_ORDER,
    GET_ORDER_BY_ID,
    OR_LOADING,
    OR_ERROR,
    GET_USER_PURCHASED,
    OR_CLEAN,
    GET_ALL_ORDER_ITEMS,
    OR_LOADING_ITEMS
} from "../actions/OrderActions"

const initialState = {
    orders: [],
    order: [],
    ordersitems: [],
    loading: false,
    loadingitems: false,
    addOrder: null,
    success: true,
    purchases: []
};

const CampaignReducer = function(state = initialState, action){
    switch (action.type) {
        case OR_LOADING: {
            return {
              ...state,
              loading: true
            }
        }
        case OR_LOADING_ITEMS: {
            return {
              ...state,
              loadingitems: true
            }
        }
        case OR_ERROR: {
            return {
              ...state,
              success: false,
              loading: false
            }
        }
        case GET_ORDER: {
            return {
                ...state,
                orders: [...action.data],
                loading: false
            }
        }
        case GET_USER_PURCHASED: {
            return {
                ...state,
                purchases: [action.data],
                loading: false
            }
        }
        case OR_CLEAN: {
            return {
                ...state,
                purchases: [],
                loading: false
            }
        }
        case GET_ORDER_BY_ID: {
            return {
                ...state,
                order: [action.data],
                loading: false
            }
        }
        case GET_ALL_ORDER: {
            return {
                ...state,
                orders: [...action.data],
                loading: false
            }
        }
        case GET_ALL_ORDER_ITEMS: {
            return {
                ...state,
                ordersitems: [...action.data],
                loadingitems: false
            }
        }
        case ADD_ORDER: {
            return {
                ...state,
                addOrder : action.data,
                success: true,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}

export default CampaignReducer;
  


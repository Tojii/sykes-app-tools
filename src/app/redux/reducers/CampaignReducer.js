import {
    GET_CAMPAIGNS,
    GET_CAMPAIGNS_ACTIVE,
    GET_CAMPAIGNS_ITEMS,
    GET_CAMPAIGNSBYID,
    ADD_CAMPAIGN,
    ADD_CAMPAIGN_ITEMS,
    UPDATE_CAMPAIGN,
    UPDATE_CAMPAIGN_ITEMS,
    DELETE_CAMPAIGN,
    DELETE_CAMPAIGN_ITEM,
    CA_LOADING,
    GET_CAMPAIGNITEMSBYID,
    CA_ERROR,
} from "../actions/CampaignActions"

const initialState = {
    campaigns: [],
    campaignsActive: [],
    loading: false,
    campaign: [],
    campaignitem: [],
    campaignitems: [],
    addCampaign: null,
    addCampaignItems: null,
    success: true,
    errorMessage: ""
};

const CampaignReducer = function(state = initialState, action){
    switch (action.type) {
        case CA_LOADING: {
            return {
              ...state,
              loading: true
            }
        }
        case CA_ERROR: {
            return {
              ...state,
              success: false,
              loading: false,
              errorMessage: action.data
            }
        }
        case GET_CAMPAIGNS: {
            return {
                ...state,
                campaigns: [...action.data],
                loading: false
            }
        }
        case GET_CAMPAIGNS_ACTIVE: {
            return {
                ...state,
                campaignsActive: [...action.data],
                loading: false
            }
        }
        case GET_CAMPAIGNS_ITEMS: {
            return {
                ...state,
                campaignitems: [...action.data],
                loading: false
            }
        }
        case GET_CAMPAIGNSBYID: {
            return {
                ...state,
                campaign: [action.data],
                loading: false
            }
        }
        case GET_CAMPAIGNITEMSBYID: {
            return {
                ...state,
                campaignitem: [action.data],
                loading: false
            }
        }
        case ADD_CAMPAIGN: {
            return {
                ...state,
                addCampaign : action.data,
                success: true,
                loading: false
            }
        }
        case ADD_CAMPAIGN_ITEMS: {
            return {
                ...state,
                addCampaignItems : action.data,
                success: true,
                loading: false
            }
        }
        case UPDATE_CAMPAIGN: {
            return {
                ...state,
                addCampaign : action.data,
                success: true,
                loading: false
            }
        }
        case UPDATE_CAMPAIGN_ITEMS: {
            return {
                ...state,
                addCampaignItems : action.data,
                success: true,
                loading: false
            }
        }
        case DELETE_CAMPAIGN: {
            return {
                ...state,
                success: true,
                loading: false
            }
        }
        case DELETE_CAMPAIGN_ITEM: {
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

export default CampaignReducer;
  


import {
    GET_BUILDINGS,
    GET_BUILDINGS_ACTIVE,
    GET_BUILDINGSBYID,
    ADD_BUILDING,
    UPDATE_BUILDING,
    DELETE_BUILDING,
    BU_LOADING,
    BU_ERROR,
} from "../actions/BuildingActions"

const initialState = {
    buildings: [],
    buildingsActive: [],
    loading: false,
    building: [],
    addBuilding: null,
    success: true,
};

const BuildingReducer = function(state = initialState, action){
    switch (action.type) {
        case BU_LOADING: {
            return {
              ...state,
              loading: true
            }
        }
        case BU_ERROR: {
            return {
              ...state,
              success: false,
              loading: false
            }
        }
        case GET_BUILDINGS: {
            return {
                ...state,
                buildings: [...action.data],
                loading: false
            }
        }
        case GET_BUILDINGS_ACTIVE: {
            return {
                ...state,
                buildingsActive: [...action.data],
                loading: false
            }
        }
        case GET_BUILDINGSBYID: {
            return {
                ...state,
                building: [action.data],
                loading: false
            }
        }
        case ADD_BUILDING: {
            return {
                ...state,
                addBuilding : action.data,
                success: true,
                loading: false
            }
        }
        case UPDATE_BUILDING: {
            return {
                ...state,
                addBuilding : action.data,
                success: true,
                loading: false
            }
        }
        case DELETE_BUILDING: {
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

export default BuildingReducer;
  


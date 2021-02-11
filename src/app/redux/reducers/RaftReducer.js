import {
  GET_RAFT_BY_BADGE,
  GET_RAFT_BY_RAFID,
  GET_ACADEMIC_GRADES,
  GET_ENGLISH_LEVEL,
  GET_PAYMENT_METHOD,
  GET_POSITIONS,
  RE_LOADING,
  ADD_RAFT
} from "../actions/RaftActions";


const initialState = {
  raftlist: [],
  academicgrades: [],
  englishlevel: [],
  paymentmethods: [],
  positions: {},
  raftbyraftid: [],
  loading: false
};

const RaftReducer = function(state = initialState, action) {
  switch (action.type) {
      case RE_LOADING: {
        return {
          ...state,
          loading: true
        };
      }
      case GET_RAFT_BY_BADGE: {
          return{
              ...state,
              raftlist : [...action.data],
              loading: false
          }
      }
      case GET_ACADEMIC_GRADES: {
        return{
            ...state,
            academicgrades : [...action.data],
            loading: false
        }
      }
      case GET_PAYMENT_METHOD: {
        return{
            ...state,
            paymentmethods : [...action.data],
            loading: false
        }
      }
      case GET_POSITIONS: {
        return{
            ...state,
            positions : action.data,
            loading: false,
        }
      }
      case GET_ENGLISH_LEVEL: {
        return{
            ...state,
            englishlevel : [...action.data],
            loading: false
        }
      }
      case GET_RAFT_BY_RAFID: {
          return{
            ...state,
            raftbyraftid: [...action.data],
            loading: false
          }
      }
      case ADD_RAFT: {
        return {
          ...state,
          loading: false  
        };
      }
      default: {
          return state;
        }
      }
}

export default RaftReducer;

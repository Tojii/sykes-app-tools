import {
    GET_RAFT_BY_BADGE,
    GET_RAFT_BY_RAFID,
    RE_LOADING,
    ADD_RAFT
} from "../actions/RaftActions";


const initialState = {
    raftlist: [],
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
  
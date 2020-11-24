export const SET_APPLY_DATA = "SET_APPLY_DATA";

export const setApplyData = (payload) => dispatch => {
    dispatch({
        type: SET_APPLY_DATA,
        payload: payload,
    })
};
import api from "../Api"

export const GET_IMAGES = "GET_IMAGES";
export const RE_LOADING = "RE_LOADING";

export const GetImages = () => {
  return async dispatch => {
    dispatch({
      type: RE_LOADING
    });
    await api.get(`/api/Common/GetImages`).then(res => 
      dispatch({
        type: GET_IMAGES,
        data: res.data
        })
    ); 
  };
};
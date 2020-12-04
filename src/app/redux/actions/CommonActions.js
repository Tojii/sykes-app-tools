import axios from "axios";

export const GET_IMAGES = "GET_IMAGES";
export const RE_LOADING = "RE_LOADING";

export const GetImages = () => {
    return async dispatch => {
      dispatch({
        type: RE_LOADING
      });
      axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
      await axios.get(`${process.env.REACT_APP_API_URL}/api/Common/GetImages`).then(res => {
        dispatch({
          type: GET_IMAGES,
          data: res.data
          });
      })
    };
  };


  
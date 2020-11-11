import axios from "axios";

export const GET_REEMBOLSOS_EDUCATIVOS = "GET_REEMBOLSOS_EDUCATIVOS";
export const SUBMIT_DATA = "SUBMIT_DATA";
export const RE_LOADING = "RE_LOADING";

export const getAllReembolsosEducativos = () => {
  return async dispatch =>{
    axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axios.get("/api/reembolsoEducativo").then((res => {
        console.log("Resp", res);
        dispatch({
            type: GET_REEMBOLSOS_EDUCATIVOS,
            data: res.data
            });
      }));
  } 
};

export const addReembolosoEducativo = re =>{
     return async dispatch => {
        dispatch({
            type: RE_LOADING
          });
        axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
        await axios.post("/api/rembolsoEducativo/delete", re).then((res => {
            dispatch({
                type: SUBMIT_DATA,
                data: res.data
            });
        }));
    }
}

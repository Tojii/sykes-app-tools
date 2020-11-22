import axios from "axios";

export const GET_REEMBOLSOS_EDUCATIVOS = "GET_REEMBOLSOS_EDUCATIVOS";
export const SUBMIT_DATA = "SUBMIT_DATA";
export const RE_LOADING = "RE_LOADING";
export const GET_CATEGORIA_DE_ESTUDIO = "GET_CATEGORIA_DE_ESTUDIO";

export const getAllReembolsosEducativos = () => {
  return async dispatch =>{
    axios.defaults.headers.common["Authorization"] = "Bearer " +  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE3NzE3IiwidXNlcm5hbWUiOiJIRVJOQU5BTEUiLCJmdWxsbmFtZSI6IkhFUk5BTkRFWiBWQVJHQVMgQUxWQVJPIEVOUklRVUUiLCJiYWRnZSI6IjUzNjYyIiwiZW1haWwiOiJ0ZXN0NkB0ZXN0LmNvbSIsInBob25lIjoiMjIyMjIyMjUiLCJleHAiOjE2MDYwNzI1MDUsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6InRvamlpLmNvbSJ9.qo1QkWh3BuZ7nYLO5seB3GaDpotS3Vx7iU4lP45_OiA";
    axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
    // axios.defaults.headers.common["Access-Control-Allow-Origin"] = 'http://localhost:3000';
    // axios.defaults.headers.common["Content-Type"] = "application/json";
    // axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      await axios.get(`${process.env.REACT_APP_API_URL}/api/Refund/GetListByUser?badgeId=42553`).then((res => {
        console.log("Resp", res);
        dispatch({
            type: GET_REEMBOLSOS_EDUCATIVOS,
            data: res.data
            });
      })).catch(function(error){
        console.log("Error", error);
      });
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

export const getCategoriaEstudio = () => {
  return async dispatch => {
    dispatch({
        type: RE_LOADING
      });
    axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
    await axios.get("/api/CategoriaDeEstudio").then((res => {
      dispatch({
            type: GET_CATEGORIA_DE_ESTUDIO,
            data: res.data
        });
    }));
}
}

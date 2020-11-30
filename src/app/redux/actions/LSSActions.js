import axios from "axios";
import history from "history.js";
import jwtAuthService from "../../services/apiAuthService";

export const GET_ACCOUNT = "GET_ACCOUNT";
export const GET_SUPERVISOR_ACCOUNT = "GET_SUPERVISOR_ACCOUNT";
export const GET_JEFE_DIRECTO = "GET_JEFE_DIRECTO"
export const SUBMIT_DATA = "SUBMIT_DATA";
export const GET_VALIDATE = "GET_VALIDATE";
export const LSS_LOADING = "LSS_LOADING";

export const getAccount = () => {
  return async dispatch => {
    axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
    axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
    await axios.get(`${process.env.REACT_APP_API_URL}/account`).then(res => {
        dispatch({
        type: GET_ACCOUNT,
        data: res.data
        });
    })
  };
};

export const getSupervisorAccount = account => {
  return async dispatch => { 
    axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
    axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
    await axios.get(`${process.env.REACT_APP_API_URL}/supervisor?account=${account}`).then(res => {
        dispatch({
        type: GET_SUPERVISOR_ACCOUNT,
        data: res.data
        });
    })
  };
};

export const submitData = Data => {
  // console.log("data", { "CuentaArea": Data.cuenta_area, "JefeDirecto": Data.supervisor_directo,
  // "JefeDirectoPersona": Data.username, "Posicion": Data.positions, "reunionesultimomes": Data.retroalimentacion_1, "OneOnOneUltimas2semanas": Data.retroalimentacion_2,
  // "AyudaMano": Data.retroalimentacion_3, "EventosVoluntariado": Data.retroalimentacion_4, "CimaDeConfianza": Data.CimaDeConfianza,
  // "SituacionesAdversas": Data.SituacionesAdversas, "Escuchar": Data.Escuchar, "Cooperacion": Data.Cooperacion,
  // "SituacionesConflictivas": Data.SituacionesConflictivas, "RelacionesInterpersonales": Data.RelacionesInterpersonales, "Guiar": Data.Guiar,
  // "Recursos": Data.Recursos, "Planes": Data.Planes, "Objetivos": Data.Objetivos, "Monitorea": Data.Monitorea,
  // "Responsabiliza": Data.Responsabiliza, "TomaEnCuentaOpinion": Data.TomaEnCuentaOpinion, "retroalimentacion": Data.retroalimentacion,
  // "conversaciones": Data.conversaciones, "estrategias": Data.estrategias, "balance": Data.balance,
  // "entendimiento": Data.entendimiento, "barreras": Data.barreras, "seguimiento": Data.seguimiento,
  // "perseverante": Data.perseverante, "general": Data.general, "Sugerencias": Data.sugerencia});
  return async dispatch => {
    console.log("datos lss action",Data);
    dispatch({
      type: LSS_LOADING
    });
    axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
    axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
    await axios.post(`${process.env.REACT_APP_API_URL}/Survey`, 
    {
      "cuentaArea": Data.CuentaArea, 
      "jefeDirecto": Data.JefeDirecto,
      "jefeDirectoPersona": Data.username, 
      "posicion": Data.Posicion, 
      "reunionesultimomes": Data.reunionesultimomes, 
      "oneOnOneUltimas2semanas": Data.OneOnOneUltimas2semanas,
      "ayudaMano": Data.AyudaMano, 
      "eventosVoluntariado": Data.EventosVoluntariado, 
      "cimaDeConfianza": Data.CimaDeConfianza,
      "situacionesAdversas": Data.SituacionesAdversas, 
      "escuchar": Data.Escuchar, 
      "cooperacion": Data.Cooperacion,
      "situacionesConflictivas": Data.SituacionesConflictivas, 
      "relacionesInterpersonales": Data.RelacionesInterpersonales, 
      "guiar": Data.Guiar,
      "recursos": Data.Recursos, 
      "planes": Data.Planes, 
      "objetivos": Data.Objetivos, 
      "monitorea": Data.Monitorea,
      "responsabiliza": Data.Responsabiliza, 
      "tomaEnCuentaOpinion": Data.TomaEnCuentaOpinion, "retroalimentacion": Data.retroalimentacion,
    "conversaciones": Data.conversaciones, "estrategias": Data.estrategias, "balance": Data.balance,
    "entendimiento": Data.entendimiento, "barreras": Data.barreras, "seguimiento": Data.seguimiento,
    "perseverante": Data.perseverante, "general": Data.general, "sugerencias": Data.Sugerencias}
    ).then(res => {
        dispatch({
        type: SUBMIT_DATA
        });
        console.log(res.data)
    })
  };
};

export const getValidation = username => {
  return async dispatch => {
    dispatch({
      type: LSS_LOADING
    });
    axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
    axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
    await axios.get(`${process.env.REACT_APP_API_URL}/Survey?username=${username}`).then(res => {
        dispatch({
        type: GET_VALIDATE,
        data: res.data
        });
    })
  };
};

export const getJefeDirecto = criteria => {
  return async dispatch => {
    axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
    axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
    await axios.get(`${process.env.REACT_APP_API_URL}/user?criteria=` + criteria).then(res => {
        dispatch({
        type: GET_JEFE_DIRECTO,
        data: res.data
        });
    })
  };
};
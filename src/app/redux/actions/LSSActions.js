import axios from "axios";
import history from "history.js";
import jwtAuthService from "../../services/jwtAuthService";

export const GET_ACCOUNT = "GET_ACCOUNT";
export const GET_SUPERVISOR_ACCOUNT = "GET_SUPERVISOR_ACCOUNT";
export const SUBMIT_DATA = "SUBMIT_DATA";

export const getAccount = () => {
  return async dispatch => {
    console.log("token", localStorage.getItem("jwt_token"))
      axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axios.get("https://sykescr.dev/sykessurvey/account").then(res => {
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
      await axios.get("https://sykescr.dev/sykessurvey/supervisor?account=" + account).then(res => {
          dispatch({
          type: GET_SUPERVISOR_ACCOUNT,
          data: res.data
          });
      })
  };
};

export const submitData = Data => {
  console.log("data", {"Title": Data.title, "CuentaArea": Data.cuenta_area, "JefeDirecto": Data.supervisor_directo,
  "JefeDirectoPersona": Data.username, "Posicion": Data.positions, "reunionesultimomes": Data.retroalimentacion_1, "OneOnOneUltimas2semanas": Data.retroalimentacion_2,
  "AyudaMano": Data.retroalimentacion_3, "EventosVoluntariado": Data.retroalimentacion_4, "CimaDeConfianza": Data.CimaDeConfianza,
  "SituacionesAdversas": Data.SituacionesAdversas, "Escuchar": Data.Escuchar, "Cooperacion": Data.Cooperacion,
  "SituacionesConflictivas": Data.SituacionesConflictivas, "RelacionesInterpersonales": Data.RelacionesInterpersonales, "Guiar": Data.Guiar,
  "Recursos": Data.Recursos, "Planes": Data.Planes, "Objetivos": Data.Objetivos, "Monitorea": Data.Monitorea,
  "Responsabiliza": Data.Responsabiliza, "TomaEnCuentaOpinion": Data.TomaEnCuentaOpinion, "retroalimentacion": Data.retroalimentacion,
  "conversaciones": Data.conversaciones, "estrategias": Data.estrategias, "balance": Data.balance,
  "entendimiento": Data.entendimiento, "barreras": Data.barreras, "seguimiento": Data.seguimiento,
  "perseverante": Data.perseverante, "general": Data.general, "Sugerencias": Data.sugerencia});
  return async dispatch => {
      axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axios.post("https://sykescr.dev/sykessurvey/survey", {"Title": Data.title, "CuentaArea": Data.cuenta_area, "JefeDirecto": Data.supervisor_directo,
      "JefeDirectoPersona": Data.username, "Posicion": Data.positions, "reunionesultimomes": Data.retroalimentacion_1, "OneOnOneUltimas2semanas": Data.retroalimentacion_2,
      "AyudaMano": Data.retroalimentacion_3, "EventosVoluntariado": Data.retroalimentacion_4, "CimaDeConfianza": Data.CimaDeConfianza,
      "SituacionesAdversas": Data.SituacionesAdversas, "Escuchar": Data.Escuchar, "Cooperacion": Data.Cooperacion,
      "SituacionesConflictivas": Data.SituacionesConflictivas, "RelacionesInterpersonales": Data.RelacionesInterpersonales, "Guiar": Data.Guiar,
      "Recursos": Data.Recursos, "Planes": Data.Planes, "Objetivos": Data.Objetivos, "Monitorea": Data.Monitorea,
      "Responsabiliza": Data.Responsabiliza, "TomaEnCuentaOpinion": Data.TomaEnCuentaOpinion, "retroalimentacion": Data.retroalimentacion,
      "conversaciones": Data.conversaciones, "estrategias": Data.estrategias, "balance": Data.balance,
      "entendimiento": Data.entendimiento, "barreras": Data.barreras, "seguimiento": Data.seguimiento,
      "perseverante": Data.perseverante, "general": Data.general, "Sugerencias": Data.sugerencia}).then(res => {
          dispatch({
          type: SUBMIT_DATA
          });
      })
  };
};
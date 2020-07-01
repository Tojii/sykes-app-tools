import axios from "axios";
import history from "history.js";
import jwtAuthService from "../../services/jwtAuthService";

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const GET_ACCOUNT = "GET_ACCOUNT";
export const GET_SUPERVISOR_ACCOUNT = "GET_SUPERVISOR_ACCOUNT";
export const SUBMIT_DATA = "SUBMIT_DATA";

export function setUserData(user) {
  return dispatch => {
    dispatch({
      type: SET_USER_DATA,
      data: user
    });
  };
}

export function logoutUser() {
  return dispatch => {
    jwtAuthService.logout();

    history.push({
      pathname: "/session/signin"
    });

    dispatch({
      type: USER_LOGGED_OUT
    });
  };
}

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
  console.log("data", Data);
  return async dispatch => {
      axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axios.post("https://sykescr.dev/sykessurvey/survey", {Title: Data.title, CuentaArea: Data.cuenta_area, JefeDirecto: Data.supervisor_directo,
      JefeDirectoPersona: Data.username, Posicion: Data.positions, reunionesultimomes: Data.retroalimentacion_1, OneOnOneUltimas2semanas: Data.retroalimentacion_2,
      AyudaMano: Data.retroalimentacion_3, EventosVoluntariado: Data.retroalimentacion_4, CimaDeConfianza: Data.relacion_equipo_rating1,
      SituacionesAdversas: Data.relacion_equipo_rating2, Escuchar: Data.relacion_equipo_rating3, Cooperacion: Data.colaboracion_equipo_rating1,
      SituacionesConflictivas: Data.colaboracion_equipo_rating2, RelacionesInterpersonales: Data.colaboracion_equipo_rating3, Guiar: Data.planeamiento_rating1,
      Recursos: Data.planeamiento_rating2, Planes: Data.planeamiento_rating3, Objetivos: Data.ejecucion_rating1, Monitorea: Data.ejecucion_rating2,
      Responsabiliza: Data.ejecucion_rating3, TomaEnCuentaOpinion: Data.trato_colaboradores_rating1, retroalimentacion: Data.trato_colaboradores_rating2,
      conversaciones: Data.trato_colaboradores_rating3, estrategias: Data.pensamiento_estrategico_rating1, balance: Data.pensamiento_estrategico_rating2,
      entendimiento: Data.pensamiento_estrategico_rating3, barreras: Data.enfoque_resultados_rating1, seguimiento: Data.enfoque_resultados_rating2,
      perseverante: Data.enfoque_resultados_rating3, general: Data.satisfaccion_general_rating1, Sugerencias: Data.sugerencia}).then(res => {
          dispatch({
          type: SUBMIT_DATA
          });
      })
  };
};
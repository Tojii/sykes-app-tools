import api, { globalErrorHandler } from "../Api";

export const GET_ACCOUNT = "GET_ACCOUNT";
export const GET_SUPERVISOR_ACCOUNT = "GET_SUPERVISOR_ACCOUNT";
export const GET_JEFE_DIRECTO = "GET_JEFE_DIRECTO"
export const SUBMIT_DATA = "SUBMIT_DATA";
export const GET_VALIDATE = "GET_VALIDATE";
export const LSS_LOADING = "LSS_LOADING";

export const getAccount = () => {
  return async dispatch => {
    await api.get(`${process.env.REACT_APP_API_URL}/account`).then(res => 
      dispatch({
      type: GET_ACCOUNT,
      data: res.data
      })
    ).catch(globalErrorHandler);
  };
};

export const getSupervisorAccount = account => {
  return async dispatch => { 
    await api.get(`/supervisor?account=${account}`).then(res => {
      dispatch({
      type: GET_SUPERVISOR_ACCOUNT,
      data: res.data
      });
    }).catch(globalErrorHandler);
  };
};

export const submitData = Data => {
  return async dispatch => {
    dispatch({
      type: LSS_LOADING
    });

    await api.post(`${process.env.REACT_APP_API_URL}/LSS`, 
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
      "perseverante": Data.perseverante, "general": Data.general, "sugerencias": Data.Sugerencias
    }
    ).then(res => {
      dispatch({
      type: SUBMIT_DATA
      });
    }).catch(globalErrorHandler);
  };
};

export const getValidation = username => {
  return async dispatch => {
    dispatch({
      type: LSS_LOADING
    });

    await api.get(`${process.env.REACT_APP_API_URL}/LSS?username=${username}`).then(res => 
      dispatch({
      type: GET_VALIDATE,
      data: res.data
      })
    ).catch(globalErrorHandler);
  };
};

export const getJefeDirecto = criteria => {
    return async dispatch => {
      await api.get(`${process.env.REACT_APP_API_URL}/user?criteria=` + criteria).then(res => {
        dispatch({
        type: GET_JEFE_DIRECTO,
        data: res.data != [] ? res.data : ""
        });
      }).catch(function(error){
        console.log("Error", error);
        dispatch({
          type: GET_JEFE_DIRECTO,
          data: ""
        });
      });
    };
};
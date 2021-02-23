import axios from "axios";

export const GET_RAFT_BY_BADGE = "GET_RAFT_BY_BADGE";
export const GET_RAFT_BY_RAFID = "GET_RAFT_BY_RAFID";
export const GET_ACADEMIC_GRADES = "GET_ACADEMIC_GRADES";
export const GET_ENGLISH_LEVEL = "GET_ENGLISH_LEVEL";
export const GET_PAYMENT_METHOD = "GET_PAYMENT_METHOD";
export const GET_POSITIONS = "GET_POSITIONS"
export const RE_LOADING = "RE_LOADING";
export const ADD_RAFT = "ADD_RAFT";

export const getAllRaft = (user) => {
  return async dispatch =>{
    axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axios.get(`${process.env.REACT_APP_API_URL}/api/Raft/GetListByBadgeId?badgeId=${user}`).then((res => {
        console.log("Resp", res);
        dispatch({
            type: GET_RAFT_BY_BADGE,
            data: res.data
            });
      })).catch(function(error){
        console.log("Error", error);
      });
  } 
};

export const getAcademicGrades = () => {
  return async dispatch => {
     dispatch({
         type: RE_LOADING
       });
     axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
     await axios.get(`${process.env.REACT_APP_API_URL}/api/Raft/GetAcademicGrades`).then((res => {
         dispatch({
             type: GET_ACADEMIC_GRADES,
             data: res.data
         });
     }));
 }
}

export const getPaymentMethod = () => {
  return async dispatch => {
     dispatch({
         type: RE_LOADING
       });
     axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
     await axios.get(`${process.env.REACT_APP_API_URL}/api/Raft/GetPaymentMethods`).then((res => {
         dispatch({
             type: GET_PAYMENT_METHOD,
             data: res.data
         });
     }));
 }
}

export const getPositions = () => {
  return async dispatch => {
     dispatch({
         type: RE_LOADING
       });
     axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
     await axios.get(`${process.env.REACT_APP_API_URL}/api/Raft/GetPositions`).then((res => {
          let nuevoObjeto = {}
          //Recorremos el arreglo 
          res.data.forEach( x => {
          //Si la ciudad no existe en nuevoObjeto entonces
          //la creamos e inicializamos el arreglo de profesionales. 
          if( !nuevoObjeto.hasOwnProperty(x.catetegory)){
              nuevoObjeto[x.catetegory] = {
              posiciones: []
              }
          }
          
          //Agregamos los datos de profesionales. 
              nuevoObjeto[x.catetegory].posiciones.push({
              title: x.title,
              locationPreference: x.locationPreference
              })
          
          })
         dispatch({
             type: GET_POSITIONS,
             data: nuevoObjeto
         });
         console.log("positions", nuevoObjeto)
     }));
 }
}


export const getEnglishLevel = () => {
  return async dispatch => {
     dispatch({
         type: RE_LOADING
       });
     axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
     await axios.get(`${process.env.REACT_APP_API_URL}/api/Raft/GetEnglishLevels`).then((res => {
         dispatch({
             type: GET_ENGLISH_LEVEL,
             data: res.data
         });
     }));
 }
}

export const getByIdRaft = rafid =>{
     return async dispatch => {
        dispatch({
            type: RE_LOADING
          });
        axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
        axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
        await axios.get(`${process.env.REACT_APP_API_URL}/api/Raft/GetbyIdRaft?idRaft=${rafid}`).then((res => {
            dispatch({
                type: GET_RAFT_BY_RAFID,
                data: res.data
            });
        }));
    }
}

export const addRaft = data =>{
     return async dispatch => {
        dispatch({
            type: RE_LOADING
          });
        console.log(data)
        const formData = new FormData();
        formData.append('badge', data.badge)
        formData.append('identificationNumber', data.identificationNumber)
        formData.append('firstName', data.firstName)
        formData.append('secondName', data.secondName)
        formData.append('lastName', data.lastName)
        formData.append('secondLastName', data.secondLastName)
        formData.append('phone', data.phone)
        formData.append('personalPhone', data.personalPhone)
        formData.append('candidateEmail', data.candidateEmail)
        formData.append('personalEmail', data.personalEmail)
        formData.append('candidateProfile', data.candidateProfile)
        formData.append('englishLevel', data.englishLevel)
        formData.append('isExternalreference', data.isExternalreference)
        formData.append('academicGrade', data.academicGrade)
        formData.append('othersDetails', data.othersDetails)
        formData.append('paymentMethod', data.paymentMethod)
        formData.append('isResumeActive', data.isResumeActive)
        formData.append('isResumeRequired', data.isResumeRequired)
        formData.append('workType', data.workType)
        formData.append('resumeUrl', data.resumeUrl)
        const config = {
          headers: {
              'content-type': 'multipart/form-data',
          }
       }
        axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
        axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
        await axios.post(`${process.env.REACT_APP_API_URL}/api/Raft/SaveRaft`,
        formData, config
        ).then((res => {
            dispatch({
                type: ADD_RAFT,
                data: res.data
                
            });
            console.log(res.data)
        })).catch(function(error){
          console.log("Error", error);
        });
    }
}

// export const getCategoriaEstudio = () => {
//   return async dispatch => {
//     dispatch({
//         type: RE_LOADING
//       });
//     axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
//     await axios.get("/api/CategoriaDeEstudio").then((res => {
//       dispatch({
//             type: GET_CATEGORIA_DE_ESTUDIO,
//             data: res.data
//         });
//     }));
// }
// }

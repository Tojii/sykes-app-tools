import axios from "axios";
import { format } from 'date-fns';
import apiAuthService from "../../services/apiAuthService";
import history from "history.js";

export const GET_REIMBURSEMENT_LIST_BY_USER = "GET_REIMBURSEMENT_LIST_BY_USER";
export const SAVE_REIMBURSEMENT = "SAVE_REIMBURSEMENT";
export const RE_LOADING = "RE_LOADING";
export const GET_INFORMATION_LISTS = "GET_INFORMATION_LISTS";
export const GET_STUDIES_CATEGORY = "GET_STUDIES_CATEGORY";
export const CLEAN_SAVEREIMBURSEMENT =  "CLEAN_SAVEREIMBURSEMENT";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    //if (error.response.status === 401) {
        apiAuthService.logout(); 
        //apiAuthService.removeUser();
        history.state = history.location.pathname;
        history.push({
          pathname: "/session/signin"
        });
    //}

    return Promise.reject(error);
  }
)

export const GetReimbursementListByUser = (badgeId) => {
  return async dispatch =>{
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
      await axiosInstance.get(`${process.env.REACT_APP_API_URL}/EducationalReimbursement`).then((res => {
        dispatch({
            type: GET_REIMBURSEMENT_LIST_BY_USER,
            data: res.data
            });
            //console.log(res.data)
      })).catch(function(error){
        console.log("Error", error);
      });
  } 
};

export const SaveReimbursement = (Data, Files, badge, fullname) =>{
  
  var formData = new FormData();
  formData.append('exchangeRate', Data.exchangeRate);
  formData.append('studiesCategory', Data.studiesCategory);
  formData.append('course', Data.course);
  formData.append('invoiceNumber', Data.invoiceNumber);
  formData.append('techincalStudiesCenter', Data.techStudiesCenter);
  formData.append('languajeCenter', Data.languajeCenter);
  formData.append('ciscoAcademy', Data.ciscoAcademy);
  formData.append('universityInstitute', Data.universityInstitute);
  formData.append('certification', Data.certification);
  formData.append('others', Data.others);
  formData.append('email', Data.email);
  
  if(Data.startDate)
    formData.append('startDate', Data.startDate.toJSON());

  if(Data.endDate)
    formData.append('endDate', Data.endDate.toJSON());
  
  if(Data.certificationDate)
    formData.append('certificationDate', Data.certificationDate.toJSON());
  
  if(Files.length > 0){
    Files.forEach(item => {
      formData.append('files', item.file);
    })
  }
 
  const config = {
    // headers: {
    //     'content-type': 'multipart/form-data',
    // }
  }  

  return async dispatch => {
        dispatch({
          type: CLEAN_SAVEREIMBURSEMENT
        });    
        dispatch({
            type: RE_LOADING
          });
        axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
        await axiosInstance.post(`${process.env.REACT_APP_API_URL}/EducationalReimbursement`,formData, config 
          ).then((res => {
          dispatch({
                type: SAVE_REIMBURSEMENT,
                data: res.data,
          });
          //console.log(res.data)
        }))
        .catch((error) => {
          // Error
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
          } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the 
              // browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
          }
          console.log(error.config);
        }); 
        
    }
}

export const GetInformationLists = () => {
  return async dispatch => {
    dispatch({
        type: RE_LOADING
      });
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
    await axiosInstance.get(`${process.env.REACT_APP_API_URL}/EducationalReimbursement/GetInformationLists`).then((res => {
      dispatch({
            type: GET_INFORMATION_LISTS,
            data: res.data
        });
    }))
    .catch((error) => {
      // Error
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
      } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the 
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      console.log(error.config);
    }); 
}
}

export const getStudiesCatergory = () => {
  return async dispatch => {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    await axiosInstance.get(`${process.env.REACT_APP_API_URL}/EducationalReimbursement/GetStudiesCategory`).then((res => {
      dispatch({
        type: GET_STUDIES_CATEGORY,
        data: res.data
      });
    }))
    .catch((error) => {
      // Error
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
      } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the 
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      console.log(error.config);
    }); 
  }
}


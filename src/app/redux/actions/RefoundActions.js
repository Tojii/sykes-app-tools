import axios from "axios";
import { format } from 'date-fns';

export const GET_REFOUND_LIST_BY_USER = "GET_REFOUND_LIST_BY_USER";
export const SAVE_REFOUND = "SAVE_REFOUND";
export const RE_LOADING = "RE_LOADING";
export const GET_INFORMATION_LISTS = "GET_INFORMATION_LISTS";
export const GET_STUDIES_CATEGORY = "GET_STUDIES_CATEGORY";

export const GetRefoundListByUser = (badgeId) => {
  return async dispatch =>{
    dispatch({
      type: RE_LOADING
    });
    axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
    axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
      await axios.get(`${process.env.REACT_APP_API_URL}/api/Refund/GetListByUser?badgeId=${badgeId}`).then((res => {
        dispatch({
            type: GET_REFOUND_LIST_BY_USER,
            data: res.data
            });
      })).catch(function(error){
        console.log("Error", error);
      });
  } 
};

export const SaveRefund = (Data, Files) =>{
  
  var formData = new FormData();
  formData.append('badge', Data.badge);
  formData.append('name', Data.name);
  formData.append('exchangeRate', Data.name);
  formData.append('studiesCategory', Data.studiesCategory);
  formData.append('course', Data.course);
  formData.append('invoiceNumber', Data.invoiceNumber);
  formData.append('techincalStudiesCenter', Data.techincalStudiesCenter);
  formData.append('languajeCenter', Data.languajeCenter);
  formData.append('ciscoAcademy', Data.ciscoAcademy);
  formData.append('universityInstitute', Data.universityInstitute);
  formData.append('certification', Data.certification);
  formData.append('others', Data.others);
  formData.append('email', Data.email);
  formData.append('startDate', format(Data.startDate, 'dd/MM/yyyy kk:mm:ss'));
  formData.append('endDate', format(Data.endDate, 'dd/MM/yyyy kk:mm:ss'));
  formData.append('certificationDate', format(Data.certificationDate, 'dd/MM/yyyy kk:mm:ss'));

  if(Files.length > 0){
    Files.forEach(item => {
      formData.append('files', item.file);
    })
  }
 
  const config = {
    headers: {
        'content-type': 'multipart/form-data',
    }
  }  

  return async dispatch => {
        dispatch({
            type: RE_LOADING
          });
        axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
        axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
        await axios.post(`${process.env.REACT_APP_API_URL}/api/Refund/SaveRefund`,formData, config 
          ).then((res => {
          //console.log("Params", params);
          console.log("Submit form", res.data);
          dispatch({
                type: SAVE_REFOUND,
                data: res.data,
          });
        }));
        
    }
}

export const GetIformationLists = () => {
  return async dispatch => {
    dispatch({
        type: RE_LOADING
      });
    axios.defaults.headers.common["Authorization"] = "Bearer " +  localStorage.getItem("jwt_token");
    axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
    await axios.get(`${process.env.REACT_APP_API_URL}/api/Refund/GetInformationLists`).then((res => {
      dispatch({
            type: GET_INFORMATION_LISTS,
            data: res.data
        });
    }));
}
}

export const getStudiesCatergory = () => {
  return async dispatch => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt_token");
    axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
    await axios.get(`${process.env.REACT_APP_API_URL}/api/Refund/GetStudiesCategory`).then((res => {
      dispatch({
        type: GET_STUDIES_CATEGORY,
        data: res.data
      });
    }));
  }
}


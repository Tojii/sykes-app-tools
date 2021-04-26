import api, { globalErrorHandler } from "../Api";
import history from "history.js";

export const GET_BENEFITS_LINKS = "GET_BENEFITS_LINKS";
export const GET_BENEFITS_LINK_BYID = "GET_BENEFITS_LINK_BYID";
export const ADD_BENEFIT_LINK = "ADD_BENEFIT_LINK";
export const UPDATE_BENEFIT_LINK = "UPDATE_BENEFIT_LINK";
export const DELETE_BENEFIT_LINK = "DELETE_BENEFIT_LINK";
export const BE_LOADING_LINKS = "BE_LOADING_LINKS";
export const BE_LINKS_ERROR = "BE_LINKS_ERROR";

  export const GetSocialLinks = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING_LINKS
      });
      await api.get(`/BenefitLink`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_LINKS,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_LINKS_ERROR 
        })
      });
    };
  };

  export const GetBenefitsLinksById = (id) => {
    //console.log("categoriesaction",id)
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING_LINKS
      });
      await api.get(`/BenefitLink/${id}`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_LINK_BYID,
          data: res.data
        });

        //console.log("categoriesaction", res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_LINKS_ERROR 
        })
      });
    };
  };

export const AddBenefitLinks = (payload, Icon) => {
  //console.log("addver", payload, files)
  var formData = new FormData();
    formData.append('idBenefit', payload.idBenefit);
    formData.append('Name', payload.name);
    formData.append('Link', payload.link);
    formData.append('Active', payload.active);
    formData.append('files', Icon);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
  return async dispatch => {
      dispatch({
          type: BE_LOADING_LINKS
      });

      api.post(`/BenefitLink`, formData, config).then(res => {
          dispatch({
              type: ADD_BENEFIT_LINK,
              payload: res.data
          });
          //console.log(res.data)
          //history.push(`/Benefits/FormAdminBenefits/${res.data}`);
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_LINKS_ERROR 
        })
      });
  };
};

export const UpdateBenefitLink = (id, payload, Icon) => dispatch => {
  var formData = new FormData();
  formData.append('idBenefit', payload.idBenefit);
  formData.append('Name', payload.name);
  formData.append('Link', payload.link);
  formData.append('Active', payload.active);
  formData.append('files', Icon);
  const config = {
      headers: {
          'content-type': 'multipart/form-data',
      }
  }
  dispatch({
      type: BE_LOADING_LINKS
  });

  api.put(`/BenefitLink/${id}`, formData, config).then(res => {
      dispatch({
          type: UPDATE_BENEFIT_LINK,
          payload: res.data
      });
  })
  .catch((error) => {
    globalErrorHandler(error);
    dispatch({
      type: BE_LINKS_ERROR
    })
  });
};

export const DeleteBenefitLink = (id) => dispatch => {
    dispatch({
        type: BE_LOADING_LINKS
    });
    
    api.delete(`/BenefitLink/${id}`).then(res => {
        dispatch({
            type: DELETE_BENEFIT_LINK,
            payload: res.data
        });
    })
    .catch((error) => {
      globalErrorHandler(error);
      dispatch({
        type: BE_LINKS_ERROR
      })
    });
};



  
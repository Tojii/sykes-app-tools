import api, { globalErrorHandler } from "../Api";
import history from "history.js";

export const GET_BENEFITS_CATEGORIES = "GET_BENEFITS_CATEGORIES";
export const GET_BENEFITS_CATEGORY_BYID = "GET_BENEFITS_CATEGORY_BYID";
export const ADD_BENEFIT_CATEGORY = "ADD_BENEFIT_CATEGORY";
export const UPDATE_BENEFIT_CATEGORY = "UPDATE_BENEFIT_CATEGORY";
export const DELETE_BENEFIT_CATEGORY = "DELETE_BENEFIT_CATEGORY";
export const BE_LOADING_CATEGORY = "BE_LOADING_CATEGORY";
export const BE_CATEGORY_ERROR = "BE_CATEGORY_ERROR";

  export const GetCategories = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING_CATEGORY
      });
      await api.get(`/BenefitsCategory`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_CATEGORIES,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_CATEGORY_ERROR 
        })
      });
    };
  };

  export const GetBenefitsCategoryById = (id) => {
    //console.log("categoriesaction",id)
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING_CATEGORY
      });
      await api.get(`/BenefitsCategory/${id}`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_CATEGORY_BYID,
          data: res.data
        });

        //console.log("categoriesaction", res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_CATEGORY_ERROR 
        })
      });
    };
  };

export const AddCategory = (payload, Image) => {
  //console.log("addver", payload, files)
  var formData = new FormData();
    formData.append('Name', payload.name);
    formData.append('files', Image);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
  return async dispatch => {
      dispatch({
          type: BE_LOADING_CATEGORY
      });

      api.post(`/BenefitsCategory`, formData, config).then(res => {
          dispatch({
              type: ADD_BENEFIT_CATEGORY,
              payload: res.data
          });
          //console.log(res.data)
          //history.push(`/Benefits/FormAdminBenefits/${res.data}`);
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_CATEGORY_ERROR 
        })
      });
  };
};

export const UpdateCategory = (id, payload, Image) => dispatch => {
  var formData = new FormData();
    formData.append('Name', payload.name);
    formData.append('files', Image);
  const config = {
      headers: {
          'content-type': 'multipart/form-data',
      }
  }
  dispatch({
      type: BE_LOADING_CATEGORY
  });

  api.put(`/BenefitsCategory/${id}`, formData, config).then(res => {
      dispatch({
          type: UPDATE_BENEFIT_CATEGORY,
          payload: res.data
      });
  })
  .catch((error) => {
    globalErrorHandler(error);
    dispatch({
      type: BE_CATEGORY_ERROR
    })
  });
};

export const DeleteBenefitCategory = (id) => dispatch => {
    dispatch({
        type: BE_LOADING_CATEGORY
    });
    
    api.delete(`/BenefitsCategory/${id}`).then(res => {
        dispatch({
            type: DELETE_BENEFIT_CATEGORY,
            payload: res.data
        });
    })
    .catch((error) => {
      globalErrorHandler(error);
      dispatch({
        type: BE_CATEGORY_ERROR
      })
    });
};



  
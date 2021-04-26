import api, { globalErrorHandler } from "../Api";
import history from "history.js";

export const GET_BENEFITS_DISCOUNTS = "GET_BENEFITS_DISCOUNTS";
export const GET_BENEFITS_DISCOUNT_BYID = "GET_BENEFITS_DISCOUNT_BYID";
export const ADD_BENEFIT_DISCOUNT = "ADD_BENEFIT_DISCOUNT";
export const UPDATE_BENEFIT_DISCOUNT = "UPDATE_BENEFIT_DISCOUNT";
export const DELETE_BENEFIT_DISCOUNT = "DELETE_BENEFIT_DISCOUNT";
export const BE_LOADING_DISCOUNT = "BE_LOADING_DISCOUNT";
export const BE_DISCOUNT_ERROR = "BE_DISCOUNT_ERROR";

  export const GetDiscounts = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING_DISCOUNT
      });
      await api.get(`/BenefitsDiscount`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_DISCOUNTS,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_DISCOUNT_ERROR 
        })
      });
    };
  };

  export const GetBenefitsDiscountById = (id) => {
    //console.log("categoriesaction",id)
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING_DISCOUNT
      });
      await api.get(`/BenefitsDiscount/${id}`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_DISCOUNT_BYID,
          data: res.data
        });

        //console.log("categoriesaction", res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_DISCOUNT_ERROR 
        })
      });
    };
  };

export const AddDiscount = (payload, Icon) => {
  //console.log("addver", payload, files)
  var formData = new FormData();
    formData.append('idBenefit', payload.idBenefit);
    formData.append('idLocation', payload.idLocation);
    formData.append('DiscountName', payload.DiscountName);
    formData.append('Link', payload.Link);
    formData.append('StartDate', payload.StartDate);
    formData.append('EndDate', payload.EndDate);
    formData.append('files', Icon);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
  return async dispatch => {
      dispatch({
          type: BE_LOADING_DISCOUNT
      });

      api.post(`/BenefitsDiscount`, formData, config).then(res => {
          dispatch({
              type: ADD_BENEFIT_DISCOUNT,
              payload: res.data
          });
          //console.log(res.data)
          //history.push(`/Benefits/FormAdminBenefits/${res.data}`);
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_DISCOUNT_ERROR 
        })
      });
  };
};

export const UpdateDiscount = (id, payload, Icon) => dispatch => {
  var formData = new FormData();
    formData.append('idBenefit', payload.idBenefit);
    formData.append('idLocation', payload.idLocation);
    formData.append('DiscountName', payload.DiscountName);
    formData.append('Link', payload.Link);
    formData.append('StartDate', payload.StartDate);
    formData.append('EndDate', payload.EndDate);
    formData.append('files', Icon);
  const config = {
      headers: {
          'content-type': 'multipart/form-data',
      }
  }
  dispatch({
      type: BE_LOADING_DISCOUNT
  });

  api.put(`/BenefitsDiscount/${id}`, formData, config).then(res => {
      dispatch({
          type: UPDATE_BENEFIT_DISCOUNT,
          payload: res.data
      });
  })
  .catch((error) => {
    globalErrorHandler(error);
    dispatch({
      type: BE_DISCOUNT_ERROR
    })
  });
};

export const DeleteBenefitDiscount = (id) => dispatch => {
    dispatch({
        type: BE_LOADING_DISCOUNT
    });
    
    api.delete(`/BenefitsDiscount/${id}`).then(res => {
        dispatch({
            type: DELETE_BENEFIT_DISCOUNT,
            payload: res.data
        });
    })
    .catch((error) => {
      globalErrorHandler(error);
      dispatch({
        type: BE_DISCOUNT_ERROR
      })
    });
};



  
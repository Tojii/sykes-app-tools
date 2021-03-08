import  api, { globalErrorHandler } from "../Api"

export const GET_PROVINCE = "GET_PROVINCE";
export const GET_CANTONS = "GET_CANTONS";
export const GET_DISTRICTS = "GET_DISTRICTS";
export const LO_LOADING = "LO_LOADING";

const config = {
  headers: {
      'content-type': 'application/json',
  }
};

export const GetProvince = () => {
  
  return async dispatch => {
    dispatch({
      type: LO_LOADING
    });
    await api.get(`/Provinces`,config).then(res => 
      dispatch({
        type: GET_PROVINCE,
        data: res.data
        })
      ).catch(globalErrorHandler); 
  };
};

export const GetCantons = (id) => {
  return async dispatch => {
    dispatch({
      type: LO_LOADING
    });

    await api.get(`/Provinces/${id}/Cantons`,config).then(res => 
      dispatch({
        type: GET_CANTONS,
        data: res.data
      })
    ).catch(globalErrorHandler);
  };
};

export const GetDistricts = (provinceId, cantonId) => {
  return async dispatch => {
    dispatch({
      type: LO_LOADING
    });
    await api.get(`/Provinces/${provinceId}/Cantons/${cantonId}/Districts`,config).then(res =>
      dispatch({
        type: GET_DISTRICTS,
        data: res.data
      })
    ).catch(globalErrorHandler);
  };
};
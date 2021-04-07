import api, { globalErrorHandler } from "../Api";
import moment from "moment"

export const GET_BUILDINGS = "GET_BUILDINGS";
export const GET_BUILDINGS_ACTIVE = "GET_BUILDINGS_ACTIVE";
export const GET_BUILDINGSBYID = "GET_BUILDINGSBYID";
export const ADD_BUILDING = "ADD_BUILDING";
export const UPDATE_BUILDING = "UPDATE_BUILDING";
export const DELETE_BUILDING = "DELETE_BUILDING";
export const BU_LOADING = "BU_LOADING";
export const BU_ERROR = "BU_ERROR";

export const GetBuildingsActive = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BU_LOADING
      });
      await api.get(`/Building/Active`,config).then(res => {
        dispatch({
          type: GET_BUILDINGS_ACTIVE,
          data: res.data
          });
      })
      .catch(globalErrorHandler);
    };
  };

  export const GetBuildings = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BU_LOADING
      });
      await api.get(`/Building`,config).then(res => {
        dispatch({
          type: GET_BUILDINGS,
          data: res.data
          });
      })
      .catch(globalErrorHandler);
    };
  };

  export const GetBuildingsById = (id) => {
    return async dispatch => {
      dispatch({
        type: BU_LOADING
      });
      
      await api.get(`/Building/${id}`).then(res => {
        dispatch({
          type: GET_BUILDINGSBYID,
          data: res.data
          });
      })
      .catch(globalErrorHandler);
    };
  };

export const AddBuilding = (payload) => {
  var formData = new FormData();
    formData.append('Name', payload.name);
    formData.append('Active', payload.active);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
  return async dispatch => {
      dispatch({
          type: BU_LOADING
      });

      api.post(`/Building`, 
      formData, config).then(res => {
          dispatch({
              type: ADD_BUILDING,
              payload: res.data
          });
          //console.log(res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BU_ERROR
        })
      });
  };
};

export const UpdateBuilding = (id, payload) => dispatch => {
  const config = {
    headers: {
        'content-type': 'multipart/form-data',
    }
  }  
  //console.log("updatever", files)
  var formData = new FormData();
    formData.append('Name', payload.name);
    formData.append('Active', payload.active);
  dispatch({
      type: BU_LOADING
  });

  api.put(`/Building/${id}`, 
  formData, config).then(res => {
      dispatch({
          type: UPDATE_BUILDING,
          payload: res.data
      });
  })
  .catch((error) => {
    globalErrorHandler(error);
    dispatch({
      type: BU_ERROR
    })
  });
};

export const DeleteBuilding = (id) => dispatch => {
    dispatch({
        type: BU_LOADING
    });
    
    api.delete(`/Building/${id}`).then(res => {
        dispatch({
            type: DELETE_BUILDING,
            payload: res.data
        });
    })
    .catch((error) => {
      globalErrorHandler(error);
      dispatch({
        type: BU_ERROR
      })
    });
};

  
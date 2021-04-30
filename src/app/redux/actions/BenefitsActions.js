import api, { globalErrorHandler } from "../Api";
import { logoutUser } from './UserActions';
import { setError } from "./LoginActions"
import history from "history.js";
import moment from "moment"
import { format } from 'date-fns';

export const GET_BENEFITS = "GET_BENEFITS";
export const GET_BENEFITS_CATEGORY = "GET_BENEFITS_CATEGORY";
export const GET_BENEFITS_LOCATIONS = "GET_BENEFITS_LOCATIONS";
export const GET_PAGE_SETTINGS = "GET_PAGE_SETTINGS";
export const GET_BENEFITS_ACTIVE = "GET_BENEFITS_ACTIVE";
export const GET_BENEFITSBYID = "GET_BENEFITSBYID";
export const GET_BENEFITS_CATEGORYBYID = "GET_BENEFITS_CATEGORYBYID";
export const GET_BENEFITS_LOCATIONSBYID = "GET_BENEFITS_LOCATIONSBYID";
export const GET_BENEFITS_LOCATIONSBYPROVINCE = "GET_BENEFITS_LOCATIONSBYPROVINCE";
export const GET_BENEFITS_LOCATIONSBYPROVINCECANTON = "GET_BENEFITS_LOCATIONSBYPROVINCECANTON";
export const ADD_BENEFIT = "ADD_BENEFIT";
export const ADD_PAGE_SETTINGS = "ADD_PAGE_SETTINGS";
export const ADD_BENEFIT_LOCATION = "ADD_BENEFIT_LOCATION";
export const UPDATE_BENEFIT = "UPDATE_BENEFIT";
export const UPDATE_PAGE_SETTINGS = "UPDATE_PAGE_SETTINGS";
export const UPDATE_BENEFIT_LOCATION = "UPDATE_BENEFIT_LOCATION";
export const DELETE_BENEFIT = "DELETE_BENEFIT";
export const DELETE_BENEFIT_LOCATION = "DELETE_BENEFIT_LOCATION";
export const BE_LOADING = "BE_LOADING";
export const BE_LOADING_SETTINGS = "BE_LOADING_SETTINGS";
export const BE_LOADING_LOCATION = "BE_LOADING_LOCATION";
export const BE_ERROR = "BE_ERROR";

export const GetBenefitsActive = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING
      });
      await api.get(`/Benefits/Active`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_ACTIVE,
          data: res.data
          });
        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR 
        })
      });
    };
  };

  export const GetBenefits = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING
      });
      await api.get(`/Benefits`,config).then(res => {
        dispatch({
          type: GET_BENEFITS,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR 
        })
      });
    };
  };

  export const GetBenefitsCategory = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING
      });
      await api.get(`/BenefitsCategory`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_CATEGORY,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR 
        })
      });
    };
  };

  export const GetBenefitsLocations = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING_LOCATION
      });
      await api.get(`/BenefitsLocation`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_LOCATIONS,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR 
        })
      });
    };
  };

  export const GetPageSettings = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING_SETTINGS
      });
      await api.get(`/PageSettings`,config).then(res => {
        dispatch({
          type: GET_PAGE_SETTINGS,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR 
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
        type: BE_LOADING
      });
      await api.get(`/BenefitsCategory/${id}`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_CATEGORYBYID,
          data: res.data
        });

        //console.log("categoriesaction", res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR 
        })
      });
    };
  };

  export const GetBenefitsLocationsById = (id) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING_LOCATION
      });
      await api.get(`/BenefitsLocation/${id}`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_LOCATIONSBYID,
          data: res.data
          });

        //console.log("imagenes",res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR 
        })
      });
    };
  };

  export const GetBenefitsLocationsByProvincia = (province) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING_LOCATION
      });
      await api.get(`/BenefitsLocation/FindByProvincia?provincia=${province}`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_LOCATIONSBYPROVINCE,
          data: res.data
          });

        //console.log("provincias",res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR 
        })
      });
    };
  };

  export const GetBenefitsLocationsByProvinciaCanton = (province, canton) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        }
      }  
    return async dispatch => {
      dispatch({
        type: BE_LOADING_LOCATION
      });
      await api.get(`/BenefitsLocation/FindByProvinciaCanton?canton=${canton}&provincia=${province}`,config).then(res => {
        dispatch({
          type: GET_BENEFITS_LOCATIONSBYPROVINCECANTON,
          data: res.data
          });

        //console.log("cantons",res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR 
        })
      });
    };
  };

  export const GetBenefitsById = (id) => {
    return async dispatch => {
      dispatch({
        type: BE_LOADING
      });
      
      await api.get(`/Benefits/${id}`).then(res => {
        dispatch({
          type: GET_BENEFITSBYID,
          data: res.data
          });
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR 
        })
      });
    };
  };

export const AddBenefit = (payload, Logo) => {
  //console.log("addver", payload, files)
  var formData = new FormData();
    formData.append('idCategory', payload.idCategory);
    formData.append('Name', payload.name);
    formData.append('Detail', payload.detail);
    formData.append('Description', payload.description);
    formData.append('BenefitInfo', payload.benefitInfo);
    formData.append('Link', payload.link);
    formData.append('Facebook', payload.facebook);
    formData.append('Instagram', payload.instagram);
    formData.append('Email', payload.email);
    formData.append('Active', payload.active);
    formData.append('BenefitLinks', payload.benefitLinks);
    formData.append('files', Logo);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
  return async dispatch => {
      dispatch({
          type: BE_LOADING
      });

      api.post(`/Benefits`, 
      formData, config).then(res => {
          dispatch({
              type: ADD_BENEFIT,
              payload: res.data
          });
          //console.log(res.data)
          history.push(`/Benefits/FormAdminBenefits/${res.data}`);
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR 
        })
      });
  };
};

export const AddPageSettings = (payload, Logo, Footer, Badge) => {
  //console.log("addver", payload, files)
  var formData = new FormData();
    formData.append('Title', "settings");
    formData.append('Header', payload.header);
    formData.append('Reminder', payload.reminder);
    formData.append('LogoFiles', Logo);
    formData.append('footerFiles', Footer);
    formData.append('badgeFiles', Badge);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
  return async dispatch => {
      dispatch({
          type: BE_LOADING_SETTINGS
      });

      api.post(`/PageSettings`, 
      formData, config).then(res => {
          dispatch({
              type: ADD_PAGE_SETTINGS,
              payload: res.data
          });
          //console.log(res.data)
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR
        })
      });
  };
};

export const AddBenefitLocation = (payload, payloadMap) => {
  //console.log("addver", payload, files)
  var formData = new FormData();
    formData.append('idBenefits', payload.idBenefit);
    formData.append('Provincia', payload.province);
    formData.append('Canton', payload.canton);
    formData.append('Distrito', payload.district);
    formData.append('codProvincia', payload.provinceCode);
    formData.append('codCanton', payload.cantonCode);
    formData.append('codDistrito', payload.districtCode);
    formData.append('Address', payload.address);
    formData.append('Latitude', payloadMap.latitude.toString().replace(".", ","));
    formData.append('Longitude', payloadMap.longitude.toString().replace(".", ","));
    formData.append('Phone', payload.phone);
    formData.append('WhatsApp', payload.whatsapp);
    formData.append('Active', payload.active);
    formData.append('PrincipalLocation', payload.principalLocation);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
  return async dispatch => {
      dispatch({
          type: BE_LOADING_LOCATION
      });

      api.post(`/BenefitsLocation`, 
      formData, config).then(res => {
          dispatch({
              type: ADD_BENEFIT_LOCATION,
              payload: res.data
          });
          //console.log(res.data)
          //history.push(`/Benefits/FormAdminBenefits/${id}`);
      })
      .catch((error) => {
        globalErrorHandler(error);
        dispatch({
          type: BE_ERROR
        })
      });
  };
}; 

export const UpdateBenefit = (id, payload, files) => dispatch => {
  var formData = new FormData();
  formData.append('idCategory', payload.idCategory);
  formData.append('Name', payload.name);
  formData.append('Detail', payload.detail);
  formData.append('Description', payload.description);
  formData.append('BenefitInfo', payload.benefitInfo);
  formData.append('Link', payload.link);
  formData.append('Facebook', payload.facebook);
  formData.append('Instagram', payload.instagram);
  formData.append('Email', payload.email);
  formData.append('Active', payload.active);
  formData.append('Logo', payload.logo);
  formData.append('files', files);
  const config = {
      headers: {
          'content-type': 'multipart/form-data',
      }
  }
  dispatch({
      type: BE_LOADING
  });

  api.put(`/Benefits/${id}`, 
  formData, config).then(res => {
      dispatch({
          type: UPDATE_BENEFIT,
          payload: res.data
      });
  })
  .catch((error) => {
    globalErrorHandler(error);
    dispatch({
      type: BE_ERROR
    })
  });
};

export const UpdatePageSettings = (id, payload, Logo, Footer, Badge) => dispatch => {
  var formData = new FormData();
  formData.append('Title', "settings");
  formData.append('id', id);
  formData.append('Header', payload.header);
  formData.append('Reminder', payload.reminder);
  formData.append('Logo', payload.logo);
  formData.append('footer', payload.footer);
  formData.append('badge', payload.badge);
  formData.append('LogoFiles', Logo);
  formData.append('footerFiles', Footer);
  formData.append('badgeFiles', Badge);
  const config = {
      headers: {
          'content-type': 'multipart/form-data',
      }
  }
  dispatch({
      type: BE_LOADING_SETTINGS
  });

  api.put(`/PageSettings/${id}`, 
  formData, config).then(res => {
      dispatch({
          type: UPDATE_PAGE_SETTINGS,
          payload: res.data
      });
  })
  .catch((error) => {
    globalErrorHandler(error);
    dispatch({
      type: BE_ERROR
    })
  });
};

export const UpdateBenefitLocation = (id, payload, payloadMap) => dispatch => {
  console.log("update",payload, payloadMap)
  var formData = new FormData();
    formData.append('idBenefits', payload.idBenefit);
    formData.append('Provincia', payload.province);
    formData.append('Canton', payload.canton);
    formData.append('Distrito', payload.district);
    formData.append('codProvincia', payload.provinceCode);
    formData.append('codCanton', payload.cantonCode);
    formData.append('codDistrito', payload.districtCode);
    formData.append('Address', payload.address);
    formData.append('Latitude', payloadMap.latitude.toString().replace(".", ","));
    formData.append('Longitude', payloadMap.longitude.toString().replace(".", ","));
    formData.append('Phone', payload.phone);
    formData.append('WhatsApp', payload.whatsapp);
    formData.append('Active', payload.active);
    formData.append('PrincipalLocation', payload.principalLocation);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
  dispatch({
      type: BE_LOADING_LOCATION
  });

  api.put(`/BenefitsLocation/${id}`, 
  formData, config).then(res => {
      dispatch({
          type: UPDATE_BENEFIT_LOCATION,
          payload: res.data
      });
  })
  .catch((error) => {
    globalErrorHandler(error);
    dispatch({
      type: BE_ERROR
    })
  });
};

export const DeleteBenefit = (id) => dispatch => {
    dispatch({
        type: BE_LOADING
    });
    
    api.delete(`/Benefits/${id}`).then(res => {
        dispatch({
            type: DELETE_BENEFIT,
            payload: res.data
        });
    })
    .catch((error) => {
      globalErrorHandler(error);
      dispatch({
        type: BE_ERROR
      })
    });
};

export const DeleteBenefitLocation = (id) => dispatch => {
  dispatch({
      type: BE_LOADING_LOCATION
  });
  
  api.delete(`/BenefitsLocation/${id}`).then(res => {
      dispatch({
          type: DELETE_BENEFIT_LOCATION,
          payload: res.data
      });
  })
  .catch((error) => {
    globalErrorHandler(error);
    dispatch({
      type: BE_ERROR
    })
  });
};


  
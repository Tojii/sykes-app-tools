import axios from "axios";

export const GET_ALL_CUENTA = "GET_ALL_CUENTA";
export const GET_CUENTA_BY_PROJECT = "GET_CUENTA_BY_PROJECT";
export const UPDATE_CUENTA = "UPDATE_CUENTA";
export const ADD_CUENTA = "ADD_CUENTA";
export const DELETE_CUENTA = "DELETE_CUENTA";

export const GET_ALL_DOMICILIO = "GET_ALL_DOMICILIO";
export const GET_DOMICILIO_BY_PROJECT = "GET_DOMICILIO_BY_PROJECT";
export const UPDATE_DOMICILIO = "UPDATE_DOMICILIO";
export const ADD_DOMICILIO = "ADD_DOMICILIO";
export const DELETE_DOMICILIO = "DELETE_DOMICILIO";

export const GET_ALL_INQUILINO = "GET_ALL_INQUILINO";
export const GET_INQUILINO_BY_PROJECT = "GET_INQUILINO_BY_PROJECT";
export const UPDATE_INQUILINO = "UPDATE_INQUILINO";
export const ADD_INQUILINO = "ADD_INQUILINO";
export const DELETE_INQUILINO = "DELETE_INQUILINO";

export const GET_ALL_GASTO = "GET_ALL_GASTO";
export const UPDATE_GASTO = "UPDATE_GASTO";
export const ADD_GASTO = "ADD_GASTO";
export const DELETE_GASTO = "DELETE_GASTO";

export const GET_ALL_PREVISION = "GET_ALL_PREVISION";
export const UPDATE_PREVISION = "UPDATE_PREVISION";
export const ADD_PREVISION = "ADD_PREVISION";
export const DELETE_PREVISION = "DELETE_PREVISION";

export const GET_ALL_PROPIETARIO = "GET_ALL_PROPIETARIO";
export const GET_PROPIETARIO_BY_PROJECT = "GET_PROPIETARIO_BY_PROJECT";
export const UPDATE_PROPIETARIO = "UPDATE_PROPIETARIO";
export const ADD_PROPIETARIO = "ADD_PROPIETARIO";
export const DELETE_PROPIETARIO = "DELETE_PROPIETARIO";

export const GET_ALL_PROVEEDOR = "GET_ALL_PROVEEDOR";
export const UPDATE_PROVEEDOR = "UPDATE_PROVEEDOR";
export const ADD_PROVEEDOR = "ADD_PROVEEDOR";
export const DELETE_PROVEEDOR = "DELETE_PROVEEDOR";

export const GET_ALL_PROYECTO = "GET_ALL_PROYECTO";
export const UPDATE_PROYECTO = "UPDATE_PROYECTO";
export const ADD_PROYECTO = "ADD_PROYECTO";
export const DELETE_PROYECTO = "DELETE_PROYECTO";

export const SELECT_PROJECT = "SELECT_PROJECT";

export const selectProject = id => {
    return async dispatch => {
        await dispatch({
          type: SELECT_PROJECT,
          payload: id
        });
    }
}

export const getAllCuenta = () => {
    return async dispatch => {
        await axios.get("https://localhost:44365/api/CuentaBancaria/GetAll").then(res => {
            dispatch({
            type: GET_ALL_CUENTA,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_ALL_CUENTA,
                        payload: []
                        });
                }
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
    };
};

export const getCuentaByProject = id => {
    return async dispatch => {
        await axios.get("https://localhost:44365/api/CuentaBancaria/GetByProject?IDProyecto="+ id).then(res => {
            dispatch({
            type: GET_CUENTA_BY_PROJECT,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_CUENTA_BY_PROJECT,
                        payload: []
                        });
                }
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
    };
};

export const deleteCuenta = Cuenta => {
    return async dispatch => {
        await axios.delete("https://localhost:44365/api/CuentaBancaria?IDProyecto="+ Cuenta.idProyecto +"&IDBanco="+ Cuenta.idBanco +"&NumeroCuenta="+ Cuenta.numeroCuenta).then(res => {
            dispatch({
            type: DELETE_CUENTA
            });
            getAllCuenta();
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const addNewCuenta = Cuenta => {
    return async dispatch => {
        await axios.post("https://localhost:44365/api/CuentaBancaria", {idProyecto:parseInt(Cuenta.idProyecto,10),idBanco:parseInt(Cuenta.idBanco,10),  
        numeroCuenta:Cuenta.numeroCuenta, cuentaIBAN:Cuenta.cuentaIBAN, cuentaCliente:Cuenta.cuentaCliente,
        moneda:Cuenta.moneda, debe:Cuenta.debe, haber:Cuenta.haber}).then(res => {
            dispatch({
            type: ADD_CUENTA
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const updateCuenta = Cuenta => {
    return async dispatch => {
        await axios.put("https://localhost:44365/api/CuentaBancaria", {idProyecto:parseInt(Cuenta.idProyecto,10),idBanco:parseInt(Cuenta.idBanco,10),  
        numeroCuenta:Cuenta.numeroCuenta, cuentaIBAN:Cuenta.cuentaIBAN, cuentaCliente:Cuenta.cuentaCliente,
        moneda:Cuenta.moneda, debe:Cuenta.debe, haber:Cuenta.haber}).then(res => {
            dispatch({
            type: UPDATE_CUENTA
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const getAllProyecto = () => {
    return async dispatch => {
        await axios.get(("https://localhost:44365/api/Proyecto/GetAll")).then(res => {
            dispatch({
            type: GET_ALL_PROYECTO,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_ALL_PROYECTO,
                        payload: []
                        });
                }
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
    };
};

export const deleteProyecto = Proyecto => {
    return async dispatch => {
        await axios.delete("https://localhost:44365/api/Proyecto?IDProyecto="+ Proyecto.idProyecto).then(res => {
            dispatch({
            type: DELETE_PROYECTO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const addNewProyecto = Proyecto => {
    return async dispatch => {
        await axios.post("https://localhost:44365/api/Proyecto", {idProyecto:parseInt(Proyecto.idProyecto,10),descripcionProyecto:Proyecto.descripcionProyecto,  
        cedulaJuricica:Proyecto.cedulaJuricica, pais:parseInt(Proyecto.pais,10), provincia:parseInt(Proyecto.provincia,10),
        canton:parseInt(Proyecto.canton,10), distrito:parseInt(Proyecto.distrito,10), direccion:Proyecto.direccion,
        telefonoPrincipal:Proyecto.telefonoPrincipal, telefonoSecundario:Proyecto.telefonoSecundario, telefonoSeguridad:Proyecto.telefonoSeguridad, correoElectronico:Proyecto.correoElectronico,
        cantidadDomicilios:parseInt(Proyecto.cantidadDomicilios,10), textoRecibos:Proyecto.textoRecibos, textoEstadoCuenta: Proyecto.textoEstadoCuenta, 
        comentario:Proyecto.comentario, iva:parseInt(Proyecto.iva,10)}).then(res => {
            dispatch({
            type: ADD_PROYECTO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const updateProyecto = Proyecto => {
    return async dispatch => {
        await axios.put("https://localhost:44365/api/Proyecto", {idProyecto:parseInt(Proyecto.idProyecto,10),descripcionProyecto:Proyecto.descripcionProyecto,  
        cedulaJuricica:Proyecto.cedulaJuricica, pais:parseInt(Proyecto.pais,10), provincia:parseInt(Proyecto.provincia,10),
        canton:parseInt(Proyecto.canton,10), distrito:parseInt(Proyecto.distrito,10), direccion:Proyecto.direccion,
        telefonoPrincipal:Proyecto.telefonoPrincipal, telefonoSecundario:Proyecto.telefonoSecundario, telefonoSeguridad:Proyecto.telefonoSeguridad, correoElectronico:Proyecto.correoElectronico,
        cantidadDomicilios:parseInt(Proyecto.cantidadDomicilios,10), textoRecibos:Proyecto.textoRecibos, textoEstadoCuenta: Proyecto.textoEstadoCuenta, 
        comentario:Proyecto.comentario, iva:parseInt(Proyecto.iva,10)}).then(res => {
            dispatch({
            type: UPDATE_PROYECTO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const getAllDomicilio = () => {
    return async dispatch => {
        await axios.get("https://localhost:44365/api/Domicilio/GetAll").then(res => {
            dispatch({
            type: GET_ALL_DOMICILIO,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_ALL_DOMICILIO,
                        payload: []
                        });
                }
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
    };
};

export const getDomicilioByProject = id => {
    return async dispatch => {
        await axios.get("https://localhost:44365/api/Domicilio/GetByProject?IDProyecto="+ id).then(res => {
            dispatch({
            type: GET_DOMICILIO_BY_PROJECT,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_DOMICILIO_BY_PROJECT,
                        payload: []
                        });
                }
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
    };
};

export const deleteDomicilio = Domicilio => {
    return async dispatch => {
        await axios.delete("https://localhost:44365/api/Domicilio?IDProyecto="+ Domicilio.idProyecto +"&CodigoDomicilio="+ Domicilio.codigoDomicilio).then(res => {
            dispatch({
            type: DELETE_DOMICILIO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const addNewDomicilio = Domicilio => {
    return async dispatch => {
        await axios.post("https://localhost:44365/api/Domicilio", {idProyecto:parseInt(Domicilio.idProyecto,10),codigoDomicilio:Domicilio.codigoDomicilio,  
        estatusPropiaAlquiler:parseInt(Domicilio.estatusPropiaAlquiler,10), alicuota:parseInt(Domicilio.alicuota,10), nota:Domicilio.nota}).then(res => {
            dispatch({
            type: ADD_DOMICILIO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const updateDomicilio = Domicilio => {
    return async dispatch => {
        await axios.put("https://localhost:44365/api/Domicilio", {idProyecto:parseInt(Domicilio.idProyecto,10),codigoDomicilio:Domicilio.codigoDomicilio,  
        estatusPropiaAlquiler:parseInt(Domicilio.estatusPropiaAlquiler,10), alicuota:parseInt(Domicilio.alicuota,10), nota:Domicilio.nota}).then(res => {
            dispatch({
            type: UPDATE_DOMICILIO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const getAllInquilino = () => {
    return async dispatch => {
        await axios.get("https://localhost:44365/api/Inquilino/GetAll").then(res => {
            dispatch({
            type: GET_ALL_INQUILINO,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_ALL_INQUILINO,
                        payload: []
                        });
                }
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
    };
};

export const getInquilinoByProject = id => {
    return async dispatch => {
        await axios.get("https://localhost:44365/api/Inquilino/GetByProject?IDProyecto="+ id).then(res => {
            dispatch({
            type: GET_INQUILINO_BY_PROJECT,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_INQUILINO_BY_PROJECT,
                        payload: []
                        });
                }
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
    };
};

export const deleteInquilino = Inquilino => {
    return async dispatch => {
        await axios.delete("https://localhost:44365/api/Inquilino?IDProyecto="+ Inquilino.idProyecto +"&CodigoDomicilio="+ Inquilino.codigoDomicilio +"&InquilinoCedula="+ Inquilino.inquilinoCedula).then(res => {
            dispatch({
            type: DELETE_INQUILINO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const addNewInquilino = Inquilino => {
    return async dispatch => {
        await axios.post("https://localhost:44365/api/Inquilino", {idProyecto:parseInt(Inquilino.idProyecto,10),codigoDomicilio:Inquilino.codigoDomicilio,  
        inquilinoCedula:Inquilino.inquilinoCedula, inquilinoApellido1:Inquilino.inquilinoApellido1, inquilinoApellido2:Inquilino.inquilinoApellido2,
        inquilinoNombre:Inquilino.inquilinoNombre, celular:Inquilino.celular, otroTelefono:Inquilino.otroTelefono,
        correoElectronico:Inquilino.correoElectronico, fechaInicioAlquiler:Inquilino.fechaInicioAlquiler, fechaFinAlquiler:Inquilino.fechaFinAlquiler,
        bloquear:Inquilino.bloquear}).then(res => {
            dispatch({
            type: ADD_INQUILINO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const updateInquilino = Inquilino => {
    return async dispatch => {
        await axios.put("https://localhost:44365/api/Inquilino", {idProyecto:parseInt(Inquilino.idProyecto,10),codigoDomicilio:Inquilino.codigoDomicilio,  
        inquilinoCedula:Inquilino.inquilinoCedula, inquilinoApellido1:Inquilino.inquilinoApellido1, inquilinoApellido2:Inquilino.inquilinoApellido2,
        inquilinoNombre:Inquilino.inquilinoNombre, celular:Inquilino.celular, otroTelefono:Inquilino.otroTelefono,
        correoElectronico:Inquilino.correoElectronico, fechaInicioAlquiler:Inquilino.fechaInicioAlquiler, fechaFinAlquiler:Inquilino.fechaFinAlquiler,
        bloquear:Inquilino.bloquear}).then(res => {
            dispatch({
            type: UPDATE_INQUILINO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const getAllGasto = () => {
    return async dispatch => {
        await axios.get("https://localhost:44365/api/Gasto/GetAll").then(res => {
            dispatch({
            type: GET_ALL_GASTO,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_ALL_GASTO,
                        payload: []
                        });
                }
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
    };
};

export const deleteGasto = Gasto => {
    return async dispatch => {
        await axios.delete("https://localhost:44365/api/Gasto?IDGasto="+ Gasto.idGasto).then(res => {
            dispatch({
            type: DELETE_GASTO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const addNewGasto = Gasto => {
    return async dispatch => {
        await axios.post("https://localhost:44365/api/Gasto", {idGasto:parseInt(Gasto.idGasto,10),  
        nombreGasto:Gasto.nombreGasto, debe:Gasto.debe, haber:Gasto.haber}).then(res => {
            dispatch({
            type: ADD_GASTO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const updateGasto = Gasto => {
    return async dispatch => {
        await axios.put("https://localhost:44365/api/Gasto", {idGasto:parseInt(Gasto.idGasto,10),  
        nombreGasto:Gasto.nombreGasto, debe:Gasto.debe, haber:Gasto.haber}).then(res => {
            dispatch({
            type: UPDATE_GASTO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const getAllPrevision = () => {
    return async dispatch => {
        await axios.get("https://localhost:44365/api/Prevision/GetAll").then(res => {
            dispatch({
            type: GET_ALL_PREVISION,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_ALL_PREVISION,
                        payload: []
                        });
                }
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
    };
};

export const deletePrevision = Prevision => {
    return async dispatch => {
        await axios.delete("https://localhost:44365/api/Prevision?IDPrevision="+ Prevision.idPrevision).then(res => {
            dispatch({
            type: DELETE_PREVISION
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const addNewPrevision = Prevision => {
    return async dispatch => {
        await axios.post("https://localhost:44365/api/Prevision", {idPrevision:parseInt(Prevision.idPrevision,10),  
        nombrePrevision:Prevision.nombrePrevision, debe:Prevision.debe, haber:Prevision.haber}).then(res => {
            dispatch({
            type: ADD_PREVISION
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const updatePrevision = Prevision => {
    return async dispatch => {
        await axios.put("https://localhost:44365/api/Prevision", {idPrevision:parseInt(Prevision.idPrevision,10),  
        nombrePrevision:Prevision.nombrePrevision, debe:Prevision.debe, haber:Prevision.haber}).then(res => {
            dispatch({
            type: UPDATE_PREVISION
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const getAllProveedor = () => {
    return async dispatch => {
        await axios.get("https://localhost:44365/api/Proveedor/GetAll").then(res => {
            dispatch({
            type: GET_ALL_PROVEEDOR,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_ALL_PROVEEDOR,
                        payload: []
                        });
                }
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
    };
};

export const deleteProveedor = Proveedor => {
    return async dispatch => {
        await axios.delete("https://localhost:44365/api/Proveedor?IDProveedor="+ Proveedor.idProveedor).then(res => {
            dispatch({
            type: DELETE_PROVEEDOR
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const addNewProveedor = Proveedor => {
    return async dispatch => {
        await axios.post("https://localhost:44365/api/Proveedor", {idProveedor:parseInt(Proveedor.idProveedor,10),descripcionProveedor:Proveedor.descripcionProveedor,  
        cedulaJuricica:Proveedor.cedulaJuricica, pais:parseInt(Proveedor.pais,10), provincia:parseInt(Proveedor.provincia,10),
        canton:parseInt(Proveedor.canton,10), distrito:parseInt(Proveedor.distrito,10), direccion:Proveedor.direccion,
        telefonoPrincipal:Proveedor.telefonoPrincipal, telefonoSecundario:Proveedor.telefonoSecundario, correoElectronico:Proveedor.correoElectronico,
        idBanco:parseInt(Proveedor.idBanco,10), numeroCuenta:Proveedor.numeroCuenta, moneda: Proveedor.moneda, contacto:Proveedor.contacto,
        activo:Proveedor.activo}).then(res => {
            dispatch({
            type: ADD_PROVEEDOR
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const updateProveedor = Proveedor => {
    return async dispatch => {
        await axios.put("https://localhost:44365/api/Proveedor", {idProveedor:parseInt(Proveedor.idProveedor,10),descripcionProveedor:Proveedor.descripcionProveedor,  
        cedulaJuricica:Proveedor.cedulaJuricica, pais:parseInt(Proveedor.pais,10), provincia:parseInt(Proveedor.provincia,10),
        canton:parseInt(Proveedor.canton,10), distrito:parseInt(Proveedor.distrito,10), direccion:Proveedor.direccion,
        telefonoPrincipal:Proveedor.telefonoPrincipal, telefonoSecundario:Proveedor.telefonoSecundario, correoElectronico:Proveedor.correoElectronico,
        idBanco:parseInt(Proveedor.idBanco,10), numeroCuenta:Proveedor.numeroCuenta, moneda: Proveedor.moneda, contacto:Proveedor.contacto,
        activo:Proveedor.activo}).then(res => {
            dispatch({
            type: UPDATE_PROVEEDOR
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const getAllPropietario = () => {
    return async dispatch => {
        await axios.get("https://localhost:44365/api/Propietario/GetAll").then(res => {
            dispatch({
            type: GET_ALL_PROPIETARIO,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_ALL_PROPIETARIO,
                        payload: []
                        });
                }
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
    };
};

export const getPropietarioByProject = id => {
    return async dispatch => {
        await axios.get("https://localhost:44365/api/Propietario/GetByProject?IDProyecto="+ id).then(res => {
            dispatch({
            type: GET_PROPIETARIO_BY_PROJECT,
            payload: res.data
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                if (error.response.data === "No se encontraron datos.") {
                    dispatch({
                        type: GET_PROPIETARIO_BY_PROJECT,
                        payload: []
                        });
                }
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
    };
};

export const deletePropietario = Propietario => {
    return async dispatch => {
        await axios.delete("https://localhost:44365/api/Propietario?IDProyecto="+ Propietario.idProyecto +"&CodigoDomicilio="+ Propietario.codigoDomicilio +"&PropietarioCedula="+ Propietario.propietarioCedula).then(res => {
            dispatch({
            type: DELETE_PROPIETARIO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const addNewPropietario = Propietario => {
    return async dispatch => {
        await axios.post("https://localhost:44365/api/Propietario", {idProyecto:parseInt(Propietario.idProyecto,10),codigoDomicilio:Propietario.codigoDomicilio,  
        propietarioCedula:Propietario.propietarioCedula, propietarioApellido1:Propietario.propietarioApellido1, propietarioApellido2:Propietario.propietarioApellido2,
        propietarioNombre:Propietario.propietarioNombre, celular:Propietario.celular, otroTelefono:Propietario.otroTelefono,
        correoElectronico:Propietario.correoElectronico, fechaAdquisicion:Propietario.fechaAdquisicion, bloquear:Propietario.bloquear}).then(res => {
            dispatch({
            type: ADD_PROPIETARIO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};

export const updatePropietario = Propietario => {
    return async dispatch => {
        await axios.put("https://localhost:44365/api/Propietario", {idProyecto:parseInt(Propietario.idProyecto,10),codigoDomicilio:Propietario.codigoDomicilio,  
        propietarioCedula:Propietario.propietarioCedula, propietarioApellido1:Propietario.propietarioApellido1, propietarioApellido2:Propietario.propietarioApellido2,
        propietarioNombre:Propietario.propietarioNombre, celular:Propietario.celular, otroTelefono:Propietario.otroTelefono,
        correoElectronico:Propietario.correoElectronico, fechaAdquisicion:Propietario.fechaAdquisicion, bloquear:Propietario.bloquear}).then(res => {
            dispatch({
            type: UPDATE_PROPIETARIO
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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
    };
};



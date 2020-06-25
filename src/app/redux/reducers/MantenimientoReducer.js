import {
    GET_ALL_CUENTA,
    GET_CUENTA_BY_PROJECT,
    ADD_CUENTA,
    UPDATE_CUENTA,
    DELETE_CUENTA,
    GET_ALL_DOMICILIO,
    GET_DOMICILIO_BY_PROJECT,
    ADD_DOMICILIO,
    UPDATE_DOMICILIO,
    DELETE_DOMICILIO,
    GET_ALL_INQUILINO,
    GET_INQUILINO_BY_PROJECT,
    ADD_INQUILINO,
    UPDATE_INQUILINO,
    DELETE_INQUILINO,
    GET_ALL_GASTO,
    ADD_GASTO,
    UPDATE_GASTO,
    DELETE_GASTO,
    GET_ALL_PREVISION,
    ADD_PREVISION,
    UPDATE_PREVISION,
    DELETE_PREVISION,
    GET_ALL_PROPIETARIO,
    GET_PROPIETARIO_BY_PROJECT,
    ADD_PROPIETARIO,
    UPDATE_PROPIETARIO,
    DELETE_PROPIETARIO,
    GET_ALL_PROVEEDOR,
    ADD_PROVEEDOR,
    UPDATE_PROVEEDOR,
    DELETE_PROVEEDOR,
    GET_ALL_PROYECTO,
    ADD_PROYECTO,
    UPDATE_PROYECTO,
    DELETE_PROYECTO,
    SELECT_PROJECT
} from "../actions/MantenimientoActions";

const initialState = {
  cuentas: [],
  proyectos: [],
  domicilios: [],
  inquilinos: [],
  gastos: [],
  previsiones: [],
  propietarios: [],
  proveedores: [],
  proyecto: "General"
};

const MantenimientoReducer = function(state = initialState, action) {
    switch (action.type) {
      case SELECT_PROJECT: {
        return {
          ...state,
          proyecto: action.payload
        };
      }
      case GET_ALL_CUENTA: {
        return {
          ...state,
          cuentas: [...action.payload]
        };
      }
      case GET_CUENTA_BY_PROJECT: {
        return {
          ...state,
          cuentas: [...action.payload]
        };
      }
      case ADD_CUENTA: {
        return {
          ...state,
          cuentas: [...action.payload]
        };
      }
      case DELETE_CUENTA: {
        return {
          ...state,
          cuentas: [...action.payload]
        };
      }
      case UPDATE_CUENTA: {
        return {
          ...state,
          cuentas: [...action.payload]
        };
      }
      case GET_ALL_PROYECTO: {
        return {
          ...state,
          proyectos: [...action.payload]
        };
      }
      case ADD_PROYECTO: {
        return {
          ...state,
          proyectos: [...action.payload]
        };
      }
      case DELETE_PROYECTO: {
        return {
          ...state,
          proyectos: [...action.payload]
        };
      }
      case UPDATE_PROYECTO: {
        return {
          ...state,
          proyectos: [...action.payload]
        };
      }
      case GET_ALL_DOMICILIO: {
        return {
          ...state,
          domicilios: [...action.payload]
        };
      }
      case GET_DOMICILIO_BY_PROJECT: {
        return {
          ...state,
          domicilios: [...action.payload]
        };
      }
      case ADD_DOMICILIO: {
        return {
          ...state,
          domicilios: [...action.payload]
        };
      }
      case DELETE_DOMICILIO: {
        return {
          ...state,
          domicilios: [...action.payload]
        };
      }
      case UPDATE_DOMICILIO: {
        return {
          ...state,
          domicilios: [...action.payload]
        };
      }
      case GET_ALL_INQUILINO: {
        return {
          ...state,
          inquilinos: [...action.payload]
        };
      }
      case GET_INQUILINO_BY_PROJECT: {
        return {
          ...state,
          inquilinos: [...action.payload]
        };
      }
      case ADD_INQUILINO: {
        return {
          ...state,
          inquilinos: [...action.payload]
        };
      }
      case DELETE_INQUILINO: {
        return {
          ...state,
          inquilinos: [...action.payload]
        };
      }
      case UPDATE_INQUILINO: {
        return {
          ...state,
          inquilinos: [...action.payload]
        };
      }
      case GET_ALL_GASTO: {
        return {
          ...state,
          gastos: [...action.payload]
        };
      }
      case ADD_GASTO: {
        return {
          ...state,
          gastos: [...action.payload]
        };
      }
      case DELETE_GASTO: {
        return {
          ...state,
          gastos: [...action.payload]
        };
      }
      case UPDATE_GASTO: {
        return {
          ...state,
          gastos: [...action.payload]
        };
      }
      case GET_ALL_PREVISION: {
        return {
          ...state,
          previsiones: [...action.payload]
        };
      }
      case ADD_PREVISION: {
        return {
          ...state,
          previsiones: [...action.payload]
        };
      }
      case DELETE_PREVISION: {
        return {
          ...state,
          previsiones: [...action.payload]
        };
      }
      case UPDATE_PREVISION: {
        return {
          ...state,
          previsiones: [...action.payload]
        };
      }
      case GET_ALL_PROPIETARIO: {
        return {
          ...state,
          propietarios: [...action.payload]
        };
      }
      case GET_PROPIETARIO_BY_PROJECT: {
        return {
          ...state,
          propietarios: [...action.payload]
        };
      }
      case ADD_PROPIETARIO: {
        return {
          ...state,
          propietarios: [...action.payload]
        };
      }
      case DELETE_PROPIETARIO: {
        return {
          ...state,
          propietarios: [...action.payload]
        };
      }
      case UPDATE_PROPIETARIO: {
        return {
          ...state,
          propietarios: [...action.payload]
        };
      }
      case GET_ALL_PROVEEDOR: {
        return {
          ...state,
          proveedores: [...action.payload]
        };
      }
      case ADD_PROVEEDOR: {
        return {
          ...state,
          proveedores: [...action.payload]
        };
      }
      case DELETE_PROVEEDOR: {
        return {
          ...state,
          proveedores: [...action.payload]
        };
      }
      case UPDATE_PROVEEDOR: {
        return {
          ...state,
          proveedores: [...action.payload]
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default MantenimientoReducer;
  
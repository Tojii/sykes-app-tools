import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import RootReducer from "./reducers/RootReducer";
import { middleware } from './middlewares/catchError';

const initialState = {};

const middlewares = [thunk, middleware];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'user']
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

const Store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const Persistor = persistStore(Store)
export { Store, Persistor }
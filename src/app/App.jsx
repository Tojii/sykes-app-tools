import "../fake-db";
import "../styles/_app.scss";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import AppContext from "./appContext";
import history from "history.js";

import routes from "./RootRoutes";
import configureStore from "./redux/Store";
import Auth from "./auth/Auth";
import MatxLayout from "./MatxLayout/MatxLayout";
import AuthGuard from "./auth/AuthGuard";

const { Store, Persistor } = configureStore();

const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <MatxTheme>
          <Auth>
            <Router history={history}>
              <AuthGuard>
                <MatxLayout />
              </AuthGuard>
            </Router>
          </Auth>
        </MatxTheme>
        </PersistGate>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;

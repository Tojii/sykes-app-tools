import "../fake-db";
import "../styles/_app.scss";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import AppContext from "./appContext";
import history from "history.js";
import Loading from "../matx/components/MatxLoadable/Loading";

import routes from "./RootRoutes";
import configureStore from "./redux/Store";
import Auth from "./auth/Auth";
import MatxLayout from "./MatxLayout/MatxLayout";
import AuthGuard from "./auth/AuthGuard";
import { createBrowserHistory } from 'history';

const { Store, Persistor } = configureStore();

// const App = () => {
//   return (
//     <AppContext.Provider value={{ routes }}>
//       <Provider store={Store}>
//       <PersistGate loading={<Loading />} persistor={Persistor}>
//         <MatxTheme>
//           <Auth>
//             <Router history={history}>
//               <AuthGuard>
//                 <MatxLayout />
//               </AuthGuard>
//             </Router>
//           </Auth>
//         </MatxTheme>
//         </PersistGate>
//       </Provider>
//     </AppContext.Provider>
//   );
// };


const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <PersistGate loading={<Loading />} persistor={Persistor}>
          <MatxTheme>
            <Router history={history}>
              <MatxLayout />
            </Router>
          </MatxTheme>
        </PersistGate>
      </Provider>
    </AppContext.Provider>
  );
};


export default App;

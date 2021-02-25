import React from "react";
import { Redirect } from "react-router-dom";

import lssRoutes from './views/lss/LssRoutes';
import raftRoutes from './views/raft/RaftRoutes';
import ventasRoutes from './views/venta-activos/VentasRoutes';
import refoundRoutes from './views/refound/refoundRoutes';
import sykesHomeRoutes from './views/sykesHome/sykesHomeRoutes';

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

import materialRoutes from "./views/material-kit/MaterialRoutes";
import chartsRoute from "./views/charts/ChartsRoute";
import dragAndDropRoute from "./views/Drag&Drop/DragAndDropRoute";
import invoiceRoutes from "./views/invoice/InvoioceRoutes";
import calendarRoutes from "./views/calendar/CalendarRoutes";
import crudRoute from "./views/CRUD/CrudRoutes";
import cuentaRoute from "./views/mantenimientos/cuentas/CuentasRoutes";
import domicilioRoute from "./views/mantenimientos/domicilios/DomiciliosRoutes";
import inquilinoRoute from "./views/mantenimientos/inquilinos/InquilinosRoutes";
//import maestroFondosRoute from "./views/mantenimientos/maestrofondos/MaestroFondosRoutes";
import maestroGastosRoute from "./views/mantenimientos/maestrogastos/MaestroGastosRoutes";
import previsionRoute from "./views/mantenimientos/previsiones/PrevisionesRoutes";
import propietarioRoute from "./views/mantenimientos/propietarios/PropietariosRoutes";
import proveedorRoute from "./views/mantenimientos/proveedores/ProveedoresRoutes";
import proyectoRoute from "./views/mantenimientos/proyectos/ProyectosRoutes";
import inboxRoute from "./views/inbox/InboxRoutes";
import hrRoutes from "./views/humanresources/hrRoutes";
import mapRoutes from "./views/map/MapRoutes";
import chatRoutes from "./views/chat-box/ChatRoutes";
import todoRoutes from "./views/todo/TodoRoutes";
import pageLayoutRoutes from "./views/page-layouts/PageLayoutRoutees";
import ListRoute from "./views/list/ListRoute";
import growthOpportunitiesRoutes from "./views/growth-opportunities/GrowthOpportunitiesRoutes";
import userRoutes from "./views/user/UserRoutes";

/*
  Required if you are going to use Evelynn Landing page
  https://themeforest.net/item/react-landing-material-ui-react-saasproduct-landing-page/23847400
*/
import homeRoutes from "./views/home/HomeRoutes";

import otherRoutes from "./views/others/OtherRoutes";
import scrumBoardRoutes from "./views/scrum-board/ScrumBoardRoutes";
import ecommerceRoutes from "./views/ecommerce/EcommerceRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/Inicio" />
    // component: () => <Redirect to="/dashboard/analytics" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...sessionRoutes,
  ...refoundRoutes,
  ...sykesHomeRoutes,
  ...growthOpportunitiesRoutes,
  ...userRoutes,
  ...ventasRoutes,
  //...lssRoutes,
  ...raftRoutes,
  // ...homeRoutes,
  // ...dashboardRoutes,
  // ...materialRoutes,
  // ...utilitiesRoutes,
  // ...chartsRoute,
  // ...dragAndDropRoute,
  // ...calendarRoutes,
  // ...invoiceRoutes,
  // ...crudRoute,
  // ...cuentaRoute,
  // ...domicilioRoute,
  // ...inquilinoRoute,
  // ...maestroFondosRoute,
  // ...maestroGastosRoute,
  // ...previsionRoute,
  // ...propietarioRoute,
  // ...proveedorRoute,
  // ...proyectoRoute,
  // ...inboxRoute,
  // ...hrRoutes,
  // ...mapRoutes,
  // ...chatRoutes,
  // ...todoRoutes,
  // ...scrumBoardRoutes,
  // ...ecommerceRoutes,
  // ...pageLayoutRoutes,
  // ...otherRoutes,
  // ...ListRoute,
  ...redirectRoute,
  ...errorRoute
];

export default routes;

import React from "react";
import { Redirect } from "react-router-dom";
import lssRoutes from './views/lss/LssRoutes';
import raftRoutes from './views/raft/RaftRoutes';
import ventasRoutes from './views/venta-activos/VentasRoutes';
import educationalReimbursementRoutes from './views/educational-reimbursement/educationalReimbursementRoutes';
import sykesHomeRoutes from './views/sykesHome/sykesHomeRoutes';
import sessionRoutes from "./views/sessions/SessionRoutes";
import growthOpportunitiesRoutes from "./views/growth-opportunities/GrowthOpportunitiesRoutes";
import userRoutes from "./views/user/UserRoutes";
import benefitsRoutes from "./views/benefits/BenefitsRoutes";
 
/*
  Required if you are going to use Evelynn Landing page
  https://themeforest.net/item/react-landing-material-ui-react-saasproduct-landing-page/23847400
*/


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
  ...educationalReimbursementRoutes,
  ...sykesHomeRoutes,
  ...growthOpportunitiesRoutes,
  ...userRoutes,
  ...ventasRoutes,
  ...benefitsRoutes,
  //...lssRoutes,
  ...raftRoutes,
  ...redirectRoute,
  ...errorRoute
];

export default routes;

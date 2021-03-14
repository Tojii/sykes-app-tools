import { MatxLoadable } from "matx";
import jwtDecode from 'jwt-decode';
import { isMdScreen, getQueryParam } from "utils";

const Home = MatxLoadable({
  loader: () => import("./HomeBenefits")
});

const DetallesBenefits = MatxLoadable({
  loader: () => import("./detalleLinks")
});

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: true
    },
    leftSidebar: {
      show: true,
      mode: isMdScreen() ? "close" : "full"
    }
  },
  likeDislikeButtons: { show: true }
};

const benefitsRoutes = [
  {
    path: "/Benefits/Home",
    component: Home,
    settings
  },
  {
    path: "/Benefits/Detalle",
    component: DetallesBenefits,
    settings
  },
  // {
  //   path: "/Benefits/AdminForm",
  //   component: DetallesBenefits,
  //   settings
  // },
  
  
];

export default benefitsRoutes;

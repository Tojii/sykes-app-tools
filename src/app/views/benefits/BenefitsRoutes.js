import { MatxLoadable } from "matx";
import jwtDecode from 'jwt-decode';
import { isMdScreen, getQueryParam } from "utils";

const Home = MatxLoadable({
  loader: () => import("./HomeBenefits")
});

const DetallesBenefits = MatxLoadable({
  loader: () => import("./detalleLinks")
});

const AdminBenefits = MatxLoadable({
  loader: () => import("./adminBenefitsLinks")
});

const AdminBenefitsDetails = MatxLoadable({
  loader: () => import("./adminBenefitsDetails")
});

const FormAdminBenefits = MatxLoadable({
  loader: () => import("./FormAdminBenefit")
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
  {
    path: "/Benefits/AdminFormBenefits",
    component: AdminBenefits,
    settings
  },
  {
    path: "/Benefits/AdminFormBenefitsDetails/:id",
    component: AdminBenefitsDetails,
    settings
  },
  {
    path: "/Benefits/FormAdminBenefits/:id",
    component: FormAdminBenefits,
    settings
  },
  {
    path: "/Benefits/FormAdminBenefits",
    component: FormAdminBenefits,
    settings
  },
  
  
];

export default benefitsRoutes;

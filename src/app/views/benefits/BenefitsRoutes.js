import { MatxLoadable } from "matx";
import { isMdScreen } from "utils";

const Home = MatxLoadable({
  loader: () => import("./HomeBenefits")
});

const Configuration = MatxLoadable({
  loader: () => import("./configuracioBenefits")
});

const CategoryBenefits = MatxLoadable({
  loader: () => import("./categoryBenefits")
});

const CategoriesBenefits = MatxLoadable({
  loader: () => import("./categoriesBenefits")
});

const DetallesBenefits = MatxLoadable({
  loader: () => import("./detalleBenefits")
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
    path: "/Benefits/Configuration",
    component: Configuration,
    settings
  },
  {
    path: "/Benefits/Category/:id",
    component: CategoryBenefits,
    settings
  },
  {
    path: "/Benefits/Category",
    component: CategoriesBenefits,
    settings
  },
  {
    path: "/Benefits/Detalle/:id",
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
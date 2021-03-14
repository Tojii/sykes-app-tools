import { MatxLoadable } from "matx";
import { isMdScreen, getQueryParam } from "utils";

const Home = MatxLoadable({
  loader: () => import("./Home")
});

const Form = MatxLoadable({
  loader: () => import("./Form")
});

const RefoundDetails = MatxLoadable({
  loader: () => import("./RefoundDetails")
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

  const refoundRoutes = [
    {
      path: "/ReembolsoEducativo/Nuevo",
      component: Form,
      settings
    },
    {
      path: "/ReembolsoEducativo/ListaReembolsos",
      component: Home,
      settings
    },
    {
      path:"/ReembolsoEducativo/Detalle",
      component: RefoundDetails,
      settings
    }
  ];
  
  export default refoundRoutes;
  
import { MatxLoadable } from "matx";

const Home = MatxLoadable({
  loader: () => import("./Home")
});

const Form = MatxLoadable({
  loader: () => import("./Form")
});

const EducationalReimbursementDetails = MatxLoadable({
  loader: () => import("./EducationalReimbursementDetails")
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

  const educationalReimbursementRoutes = [
    {
      path: "/ReembolsoEducativo/Nuevo",
      component: Form
    },
    {
      path: "/ReembolsoEducativo/ListaReembolsos",
      component: Home
    },
    {
      path:"/ReembolsoEducativo/Detalle",
      component: EducationalReimbursementDetails,
      settings
    }
  ];
  
  export default educationalReimbursementRoutes;
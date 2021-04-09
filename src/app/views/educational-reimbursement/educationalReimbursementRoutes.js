import { MatxLoadable } from "matx";
import { isMdScreen, getQueryParam } from "utils";

const Home = MatxLoadable({
  loader: () => import("./Home")
});

const Form = MatxLoadable({
  loader: () => import("./Form")
});

const EducationalReimbursementDetails = MatxLoadable({
  loader: () => import("./EducationalReimbursementDetails")
});

  const educationalReimbursementRoutes = [
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
      component: EducationalReimbursementDetails
    }
  ];
  
  export default educationalReimbursementRoutes;
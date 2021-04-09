  
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
      component: EducationalReimbursementDetails
    }
  ];
  
  export default educationalReimbursementRoutes;
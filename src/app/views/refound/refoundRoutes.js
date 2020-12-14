import { MatxLoadable } from "matx";

const Home = MatxLoadable({
  loader: () => import("./Home")
});

const Form = MatxLoadable({
  loader: () => import("./Form")
});

const RefoundDetails = MatxLoadable({
  loader: () => import("./RefoundDetails")
});

  const refoundRoutes = [
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
      component: RefoundDetails
    }
  ];
  
  export default refoundRoutes;
import { MatxLoadable } from "matx";

const Home = MatxLoadable({
    loader: () => import("./Home")
  });

// const Form = MatxLoadable({
//     loader: () => import("./Form")
//   });

  const reembolsoEducaitvoRoutes = [
    // {
    //   path: "/RembolsoEducativo/form",
    //   component: Form
    // },
    {
      path: "/RembolsoEducativo",
      component: Home
    }
  ];
  
  export default reembolsoEducaitvoRoutes;
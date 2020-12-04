import { MatxLoadable } from "matx";

const Home = MatxLoadable({
    loader: () => import("./Home")
  });

const Form = MatxLoadable({
    loader: () => import("./Form")
  });

  const raftRoutes = [
    {
      path: "/Raft/form",
      component: Form
    },
    {
      path: "/Raft",
      component: Home
    }
  ];
  
  export default raftRoutes;
import { MatxLoadable } from "matx";

const Home = MatxLoadable({
    loader: () => import("./Home")
  });

const MakeReferral = MatxLoadable({
  loader: () => import("./MakeReferral")
});

const Form = MatxLoadable({
    loader: () => import("./Form")
  });

  const raftRoutes = [
    {
      path: "/Raft/MakeReferral",
      component: MakeReferral
    },
    {
      path: "/Raft/FormRefer/:id",
      component: Form
    },
    {
      path: "/Raft/Home",
      component: Home
    },
  ];
  
  export default raftRoutes;
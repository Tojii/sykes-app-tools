import { MatxLoadable } from "matx";

const Home = MatxLoadable({
  loader: () => import("./Home")
});

const Form = MatxLoadable({
  loader: () => import("./Form")
});

const lssRoutes = [
  {
    path: "/lss/form",
    component: Form
  },
  {
    path: "/lss",
    component: Home
  }
];

export default lssRoutes;

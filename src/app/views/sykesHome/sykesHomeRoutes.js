import { MatxLoadable } from "matx";

const Home = MatxLoadable({
    loader: () => import("./Home")
  });

const sykesHomeRoutes = [
    {
        path: "/Inicio",
        component: Home
    },
];

export default sykesHomeRoutes

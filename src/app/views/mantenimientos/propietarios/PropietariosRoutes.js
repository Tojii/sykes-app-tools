import { MatxLoadable } from "matx";

const PropietariosTable = MatxLoadable({
  loader: () => import("./PropietariosTable")
});

const propietarioRoute = [
  {
    path: "/propietarios",
    exact: true,
    component: PropietariosTable
  }
];

export default propietarioRoute;

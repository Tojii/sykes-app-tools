import { MatxLoadable } from "matx";

const PrevisionesTable = MatxLoadable({
  loader: () => import("./PrevisionesTable")
});

const previsionRoute = [
  {
    path: "/previsiones",
    exact: true,
    component: PrevisionesTable
  }
];

export default previsionRoute;

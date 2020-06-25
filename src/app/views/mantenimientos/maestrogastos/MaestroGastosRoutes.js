import { MatxLoadable } from "matx";

const MaestroGastosTable = MatxLoadable({
  loader: () => import("./MaestroGastosTable")
});

const maestroGastosRoute = [
  {
    path: "/maestro_gastos",
    exact: true,
    component: MaestroGastosTable
  }
];

export default maestroGastosRoute;

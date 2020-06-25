import { MatxLoadable } from "matx";

const CuentasTable = MatxLoadable({
  loader: () => import("./CuentasTable")
});

const cuentaRoute = [
  {
    path: "/cuentas",
    exact: true,
    component: CuentasTable
  }
];

export default cuentaRoute;

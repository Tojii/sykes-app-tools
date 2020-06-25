import { MatxLoadable } from "matx";

const ProveedoresTable = MatxLoadable({
  loader: () => import("./ProveedoresTable")
});

const proveedorRoute = [
  {
    path: "/proveedores",
    exact: true,
    component: ProveedoresTable
  }
];

export default proveedorRoute;

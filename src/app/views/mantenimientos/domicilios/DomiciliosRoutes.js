import { MatxLoadable } from "matx";

const DomiciliosTable = MatxLoadable({
  loader: () => import("./DomiciliosTable")
});

const domicilioRoute = [
  {
    path: "/domicilios",
    exact: true,
    component: DomiciliosTable
  }
];

export default domicilioRoute;

import { MatxLoadable } from "matx";

const InquilinosTable = MatxLoadable({
  loader: () => import("./InquilinosTable")
});

const inquilinoRoute = [
  {
    path: "/inquilinos",
    exact: true,
    component: InquilinosTable
  }
];

export default inquilinoRoute;

import { MatxLoadable } from "matx";

const CrudTable = MatxLoadable({
  loader: () => import("./CrudTable")
});

const crudRoute = [
  {
    path: "/crud-table",
    exact: true,
    component: CrudTable
  }
];

export default crudRoute;

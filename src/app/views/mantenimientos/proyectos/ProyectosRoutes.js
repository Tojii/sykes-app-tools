import { MatxLoadable } from "matx";

const ProyectosTable = MatxLoadable({
  loader: () => import("./ProyectosTable")
});

const proyectoRoute = [
  {
    path: "/proyectos",
    exact: true,
    component: ProyectosTable
  }
];

export default proyectoRoute;

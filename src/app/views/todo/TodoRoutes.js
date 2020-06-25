import { MatxLoadable } from "matx";

const AppTodo = MatxLoadable({
  loader: () => import("./AppTodo")
});

const todoRoutes = [
  {
    path: "/todo/list",
    component: AppTodo
  }
];

export default todoRoutes;

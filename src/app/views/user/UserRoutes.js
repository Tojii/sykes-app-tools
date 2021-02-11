import { MatxLoadable } from "matx";

const EditUser = MatxLoadable({
  loader: () => import("./edit-user")
});

const userRoutes = [
  {
    exact: true,
    path: "/user",
    component: EditUser
  },
];

export default userRoutes;
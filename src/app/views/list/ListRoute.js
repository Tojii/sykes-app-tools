import { MatxLoadable } from "matx";

const AppList = MatxLoadable({
  loader: () => import("./AppList")
});

const InfiniteList = MatxLoadable({
  loader: () => import("./InfiniteList")
});

const ListRoute = [
  {
    path: "/matx-list",
    exact: true,
    component: AppList
  },
  {
    path: "/infinite-scroll",
    exact: true,
    component: InfiniteList
  }
];

export default ListRoute;

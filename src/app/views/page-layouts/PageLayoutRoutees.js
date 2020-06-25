import { MatxLoadable } from "matx";

const LeftSidebarLayout = MatxLoadable({
  loader: () => import("./LeftSidebarCard")
});

const UserProfile = MatxLoadable({
  loader: () => import("./UserProfile")
});

const pageLayoutRoutes = [
  {
    path: "/page-layouts/Left-sidebar-card",
    component: LeftSidebarLayout
  },
  {
    path: "/page-layouts/user-profile",
    component: UserProfile
  }
];

export default pageLayoutRoutes;

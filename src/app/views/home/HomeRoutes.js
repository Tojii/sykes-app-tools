import { MatxLoadable } from "matx";

const Landing1 = MatxLoadable({
  loader: () => import("./Landing1")
});
const Landing2 = MatxLoadable({
  loader: () => import("./Landing2")
});
const Landing3 = MatxLoadable({
  loader: () => import("./Landing3")
});

const homeLayoutSettings = {
  layout1Settings: {
    mode: "full",
    leftSidebar: { show: false, mode: "closed" },
    topbar: { show: false },
  },
  layout2Settings: {
    mode: "full",
    topbar: { show: false },
    navbar: { show: false },
  },
  perfectScrollbar: false,
  footer: { show: false }
}

const homeRoutes = [
  {
    path: "/landing1",
    component: Landing1,
    settings: homeLayoutSettings
  },
  {
    path: "/landing2",
    component: Landing2,
    settings: homeLayoutSettings
  },
  {
    path: "/landing3",
    component: Landing3,
    settings: homeLayoutSettings
  }
];

export default homeRoutes;

import { MatxLoadable } from "matx";

const Home = MatxLoadable({
    loader: () => import("./Home")
});
const settings = {
    activeLayout: "layout1",
    layout1Settings: {
      topbar: {
        show: true
      },
      leftSidebar: {
        show: true,
        mode: 'full'
      }
    },
    likeDislikeButtons: { show: false }
  };
const sykesHomeRoutes = [
    {
        path: "/Inicio",
        component: Home,
        settings
    },
];

export default sykesHomeRoutes

import { MatxLoadable } from "matx";
import { isMdScreen, getQueryParam } from "utils";

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
        mode: isMdScreen() ? "close" : "full"
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

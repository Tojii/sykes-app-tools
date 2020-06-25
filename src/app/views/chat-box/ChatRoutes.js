import { MatxLoadable } from "matx";

const AppChat = MatxLoadable({
  loader: () => import("./AppChat")
});

const chatRoutes = [
  {
    path: "/chat",
    component: AppChat
  }
];

export default chatRoutes;

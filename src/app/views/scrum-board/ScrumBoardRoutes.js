import { MatxLoadable } from "matx";

const AppScrumBoard = MatxLoadable({
  loader: () => import("./AppScrumBoard")
});

const Board = MatxLoadable({
  loader: () => import("./Board")
});

const scrumBoardRoutes = [
  {
    path: "/scrum-board/:id",
    component: Board
  },
  {
    path: "/scrum-board",
    component: AppScrumBoard
  }
];

export default scrumBoardRoutes;

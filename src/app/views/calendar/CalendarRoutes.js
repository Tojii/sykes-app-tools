import { MatxLoadable } from "matx";

const MatxCalendar = MatxLoadable({
  loader: () => import("./MatxCalendar")
});

const calendarRoutes = [
  {
    path: "/calendar",
    exact: true,
    component: MatxCalendar
  }
];

export default calendarRoutes;

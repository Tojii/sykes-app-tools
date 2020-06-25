import { MatxLoadable } from "matx";

const Inbox = MatxLoadable({
  loader: () => import("./AppInbox")
});

const inboxRoute = [
  {
    path: "/inbox",
    exact: true,
    component: Inbox
  }
];

export default inboxRoute;

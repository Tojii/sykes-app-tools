import { MatxLoadable } from "matx";

const Pricing = MatxLoadable({
  loader: () => import("./Pricing")
});

const otherRoutes = [
  {
    path: "/others/pricing",
    component: Pricing
  }
];

export default otherRoutes;

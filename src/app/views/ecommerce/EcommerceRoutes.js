import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Shop = MatxLoadable({
  loader: () => import("./Shop")
});

const Cart = MatxLoadable({
  loader: () => import("./Cart")
});

const Checkout = MatxLoadable({
  loader: () => import("./Checkout")
});

const ecommerceRoutes = [
  {
    path: "/ecommerce/shop",
    component: Shop,
    auth: authRoles.admin
  },
  {
    path: "/ecommerce/cart",
    component: Cart,
    auth: authRoles.admin
  },
  {
    path: "/ecommerce/checkout",
    component: Checkout,
    auth: authRoles.admin
  },
];

export default ecommerceRoutes;

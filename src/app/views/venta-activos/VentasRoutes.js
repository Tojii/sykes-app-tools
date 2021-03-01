import { MatxLoadable } from "matx";
import jwtDecode from 'jwt-decode';

const Campaign = MatxLoadable({
  loader: () => import("./ventasTables/CampaignTable")
});

const Inventario = MatxLoadable({
  loader: () => import("./ventasTables/InventarioTable")
});

const Compras = MatxLoadable({
  loader: () => import("./ventasTables/ComprasTable")
});

const ComprasItems = MatxLoadable({
  loader: () => import("./ventasTables/ComprasItemsTable")
});

const NotFound = MatxLoadable({
  loader: () => import("../sessions/NotFound")
});

const Form = MatxLoadable({
  loader: () => import("./formsVentas/Form")
});

const Home = MatxLoadable({
  loader: () => import("./HomeVentas")
});

const CompraDetalle = MatxLoadable({
  loader: () => import("./formsVentas/CompraDetalle")
});

const FormAdminCampaign = MatxLoadable({
  loader: () => import("./formsVentas/FormAdminCampaign")
});

const FormAdminInventario = MatxLoadable({
  loader: () => import("./formsVentas/FormAdminInventario")
});

const settings = {
  activeLayout: "layout1",
  likeDislikeButtons: { show: true }
};

const raftRoutes = [
  {
    path: "/VentasHome",
    component: Home,
    settings
  },
  {
    path: "/Ventas/form/:idcampaign",
    component: Form,
    settings
  },
  {
    path: "/Ventas/form",
    component: Form,
    settings
  },
  {
    path: "/Ventas/CompraDetalle/:id",
    component: CompraDetalle,
    settings
  },
  {
    path: "/Ventas/Inventario",
    component: Inventario,
    settings
  },
  {
    path: "/Ventas/Compras",
    component: Compras,
    settings
  },
  // {
  //   path: "/Ventas/ComprasItems",
  //   component: ComprasItems
  // },
  {
    path: "/Ventas/FormAdminCampaign/:id",
    component: FormAdminCampaign,
    settings
  },
  {
    path: "/Ventas/FormAdminCampaign",
    component: FormAdminCampaign,
    settings
  },
  {
    path: "/Ventas/FormAdminInventario/:id",
    component: FormAdminInventario,
    settings
  },
  {
    path: "/Ventas/FormAdminInventario",
    component: FormAdminInventario,
    settings
  },
  {
    path: "/Ventas/Campaign",
    component: Campaign,
    settings
  }
];

export default raftRoutes;

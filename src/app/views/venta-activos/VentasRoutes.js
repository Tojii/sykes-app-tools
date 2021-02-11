import { MatxLoadable } from "matx";

const Campaign = MatxLoadable({
    loader: () => import("./ventasTables/CampaignTable")
  });

const Inventario = MatxLoadable({
  loader: () => import("./ventasTables/InventarioTable")
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

  const raftRoutes = [
    {
      path: "/VentasHome",
      component: Home
    },
    {
      path: "/Ventas/form/:idcampaign",
      component: Form
    },
    {
      path: "/Ventas/form",
      component: Form
    },
    {
      path: "/Ventas/CompraDetalle/:id",
      component: CompraDetalle
    },
    {
      path: "/Ventas/Inventario",
      component: Inventario
    },
    {
      path: "/Ventas/FormAdminCampaign/:id",
      component: FormAdminCampaign
    },
    {
      path: "/Ventas/FormAdminCampaign",
      component: FormAdminCampaign
    },
    {
      path: "/Ventas/FormAdminInventario/:id",
      component: FormAdminInventario
    },
    {
      path: "/Ventas/FormAdminInventario",
      component: FormAdminInventario
    },
    {
      path: "/Ventas/Campaign",
      component: Campaign
    }
  ];
  
  export default raftRoutes;
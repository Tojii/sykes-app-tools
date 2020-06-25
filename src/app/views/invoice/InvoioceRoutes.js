import { MatxLoadable } from "matx";

const InvoiceList = MatxLoadable({
  loader: () => import("./InvoiceList")
});

const InvoiceDetails = MatxLoadable({
  loader: () => import("./InvoiceDetails")
});

const invoiceRoutes = [
  {
    path: "/invoice/list",
    exact: true,
    component: InvoiceList
  },
  // {
  //     path: "/invoice/add",
  //     exact: true,
  //     component: InvoiceDetails
  // },
  {
    path: "/invoice/:id",
    component: InvoiceDetails
  },
  {
    path: "/invoice/edit/:id",
    component: InvoiceList
  }
];

export default invoiceRoutes;

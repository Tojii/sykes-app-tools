export const navigations = [
  {
    name: "Inicio",
    path: "/Inicio",
    icon: "home_icon",
  },
  // {
  //   name: "LSS",
  //   path: "/lss",
  //   icon: "content_paste",
  //   badge: { value: "New", color: "secondary" },
  // },
  { 
    name: "Reembolso Educativo",
    icon: "attach_money_icon",
    path: "/ReembolsoEducativo/ListaReembolsos",
  },
  {
    name: "Growth Opportunities",
    path: "/growth-opportunities",
    icon: "content_paste",
  },
  { 
    name: "Venta de Activos",
    icon: "laptop",
    display: "none",
    children:[
    {
      name: "Ventas Home",
      path: "/Ventas/Home",
      iconText: "AC",
      display: "none"
    },
    {
      name: "Administración Campaña",
      path: "/Ventas/Campaign",
      iconText: "AC",
      display: "none"
    },
    {
      name: "Administración Inventario",
      path: "/Ventas/Inventario",
      iconText: "AI",
      display: "none"
    },
    {
      name: "Consulta de Compras",
      path: "/Ventas/Compras",
      iconText: "CC",
      display: "none"
    },
    {
      name: "Consulta sobre Artículos Comprados",
      path: "/Ventas/ComprasItems",
      iconText: "CC",
      display: "none",
    },
    ]
     
  },
  // {
  //   name: "Raft",
  //   path: "/Raft",
  //   icon: "person_add_alt_1",
  //   display: null
  // },
  { 
    name: "Benefits",
    icon: "add_business",
    display: null,
    children:[
    {
      name: "Benefits Home",
      path: "/Benefits/Home",
      iconText: "BH",
      display: null
    },
    {
      name: "Admin Benefits",
      path: "/Benefits/AdminFormBenefits",
      iconText: "AB",
      display: null
    },
    // {
    //   name: "Promociones",
    //   path: "/Benefits/Discounts",
    //   iconText: "PR",
    //   display: null
    // },
    // {
    //   name: "Categorías",
    //   path: "/Benefits/Categories",
    //   iconText: "CA",
    //   display: null
    // }
    ]
  },
];

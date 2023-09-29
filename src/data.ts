

export const menuAdmin = [
  {
    id: 1,
    title: "Dashboard",
    listItems: [
      {
        id: 1,
        title: "Home",
        url: "/private",
        icon: "/home.svg",
      },
    ],
  },
  {
    id: 2,
    title: "Administrar",
    listItems: [
      {
        id: 1,
        title: "Usuarios",
        url: "users",
        icon: "/user.svg",
      },
      {
        id: 1,
        title: "Materiales",
        url: "materials",
        icon: "/post2.svg",
      },

      {
        id: 2,
        title: "Productos",
        url: "products",
        icon: "/product.svg",
      },
    ],
  },
  {
    id: 3,
    title: "Movimientos",
    listItems: [
      {
        id: 3,
        title: "Ingreso",
        url: "productions",
        icon: "/order.svg",
      },

      {
        id: 2,
        title: "Egreso",
        url: "buys",
        icon: "/note.svg",
      },
    ],
  },
  {
    id: 4,
    title: "Reportes",
    listItems: [
      {
        id: 3,
        title: "Informes",
        url: "/",
        icon: "/form.svg",
      },
      {
        id: 1,
        title: "Estadísticas",
        url: "/",
        icon: "/chart.svg",
      },
    
    ],
  },

];

export const menuUser = [
  {
    id: 1,
    title: "Dashboard",
    listItems: [
      {
        id: 1,
        title: "Home",
        url: "/private",
        icon: "/home.svg",
      },
      {
        id: 2,
        title: "Perfil",
        url: "users/1",
        icon: "/profile.svg",
      },
    ],
  },
  {
    id: 3,
    title: "Ordenes",
    listItems: [
      {
        id: 3,
        title: "Produccion",
        url: "productions",
        icon: "/order.svg",
      },

      {
        id: 2,
        title: "Compra",
        url: "buys",
        icon: "/note.svg",
      },
    ],
  },
  {
    id: 4,
    title: "Reportes",
    listItems: [
      {
        id: 1,
        title: "Informes",
        url: "/",
        icon: "/form.svg",
      },
      {
        id: 2,
        title: "Estadísticas",
        url: "/",
        icon: "/chart.svg",
      },
   
    ],
  },
];




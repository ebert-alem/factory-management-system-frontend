import { ApiOutlined, AssignmentReturnOutlined, AssignmentReturnedOutlined, FeedOutlined, HomeOutlined, InsertChartOutlined, Inventory2Outlined, PeopleAltOutlined, SellOutlined } from "@mui/icons-material";


export const menuMaterial = [
  {
    id: 1,
    title: "Dashboard",
    listItems: [
      {
        id: 1,
        title: "Home",
        url: "/private",
        icon: <HomeOutlined />,
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
        icon: <PeopleAltOutlined />,
      },
      {
        id: 2,
        title: "Materiales",
        url: "materials",
        icon: <Inventory2Outlined />,
      },
      {
        id: 3,
        title: "Tipos de Materiales",
        url: "materialTypes",
        icon: <ApiOutlined />,
      },
      {
        id: 4,
        title: "Productos",
        url: "products",
        icon: <SellOutlined />,
      },
    ],
  },
  {
    id: 3,
    title: "Movimientos",
    listItems: [
      {
        id: 1,
        title: "Ingreso",
        url: "productions",
        icon: <AssignmentReturnedOutlined />,
      },

      {
        id: 2,
        title: "Egreso",
        url: "buys",
        icon: <AssignmentReturnOutlined />,
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
        icon: <FeedOutlined />,
      },
      {
        id: 2,
        title: "Estadísticas",
        url: "/",
        icon: <InsertChartOutlined />,
      },

    ],
  },

];

export const menuMaterialUser = [
  {
    id: 1,
    title: "Dashboard",
    listItems: [
      {
        id: 1,
        title: "Home",
        url: "/private",
        icon: <HomeOutlined />,
      },
    ],
  },
  {
    id: 3,
    title: "Movimientos",
    listItems: [
      {
        id: 1,
        title: "Ingreso",
        url: "productions",
        icon: <AssignmentReturnedOutlined />,
      },

      {
        id: 2,
        title: "Egreso",
        url: "buys",
        icon: <AssignmentReturnOutlined />,
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
        icon: <FeedOutlined />,
      },
      {
        id: 2,
        title: "Estadísticas",
        url: "/",
        icon: <InsertChartOutlined />,
      },

    ],
  },

];

// export const menuAdmin = [
//   {
//     id: 1,
//     title: "Dashboard",
//     listItems: [
//       {
//         id: 1,
//         title: "Home",
//         url: "/private",
//         icon: "/home.svg",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Administrar",
//     listItems: [
//       {
//         id: 1,
//         title: "Usuarios",
//         url: "users",
//         icon: "/user.svg",
//       },
//       {
//         id: 2,
//         title: "Materiales",
//         url: "materials",
//         icon: "/post2.svg",
//       },
//       {
//         id: 3,
//         title: "Tipos de Materiales",
//         url: "materialTypes",
//         icon: "/expand.svg",
//       },
//       {
//         id: 4,
//         title: "Productos",
//         url: "products",
//         icon: "/product.svg",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "Movimientos",
//     listItems: [
//       {
//         id: 1,
//         title: "Ingreso",
//         url: "productions",
//         icon: "/order.svg",
//       },

//       {
//         id: 2,
//         title: "Egreso",
//         url: "buys",
//         icon: "/note.svg",
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: "Reportes",
//     listItems: [
//       {
//         id: 1,
//         title: "Informes",
//         url: "/",
//         icon: "/form.svg",
//       },
//       {
//         id: 2,
//         title: "Estadísticas",
//         url: "/",
//         icon: "/chart.svg",
//       },

//     ],
//   },

// ];

// export const menuUser = [
//   {
//     id: 1,
//     title: "Dashboard",
//     listItems: [
//       {
//         id: 1,
//         title: "Home",
//         url: "/private",
//         icon: "/home.svg",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "Movimientos",
//     listItems: [
//       {
//         id: 1,
//         title: "Ingreso",
//         url: "productions",
//         icon: "/order.svg",
//       },

//       {
//         id: 2,
//         title: "Egreso",
//         url: "buys",
//         icon: "/note.svg",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "Reportes",
//     listItems: [
//       {
//         id: 1,
//         title: "Informes",
//         url: "/",
//         icon: "/form.svg",
//       },
//       {
//         id: 2,
//         title: "Estadísticas",
//         url: "/",
//         icon: "/chart.svg",
//       },
   
//     ],
//   },
// ];




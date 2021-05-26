const GuildMain = () => import("@/app/views/guild/views/GuildMain");
const GuildDetail = () => import("@/app/views/guild/views/GuildDetail");
const guildRoutes = [
  {
    path: "",
    redirect: "/hermandad",
    name: "Hermandad",
    component: {
      render(c) {
        return c("router-view");
      }
    },
    children: [
      {
        path: "",
        name: "Listado",
        component: GuildMain,
        // meta: {
        //   auth: true
        // }
      },
      {
        path: "/hermandad/detalle",
        name: '',
        component: GuildDetail,
        meta: {
          auth: true
        },
        children: [
          {
            path: '/hermandad/detalle/:id',
            name: 'Detalle',
            meta: {
              auth: true
            }
          }
        ]
      },
    ]

  },
];

export default guildRoutes;


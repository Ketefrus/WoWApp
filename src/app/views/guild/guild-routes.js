const GuildMain = () => import("@/app/views/guild/views/GuildMain");
const GuildDetail = () => import("@/app/views/guild/views/GuildDetail");
const GuildList = () => import("@/app/views/guild/views/GuildList");
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
        path: "/hermandad/listado",
        name: "",
        component: GuildMain,
        props: true,
        meta: {
          auth: true
        },
        children: [
          {
            path: "/hermandad/listado/:name",
            name: "Listado",
            props: true,
            meta: {
              auth: true
            }
          }
        ]
      },

      {
        path: "/hermandad",
        name: "Index",
        component: GuildList,
        meta: {
          auth: true
        }
      },
      {
        path: "/hermandad/detalle",
        name: "",
        component: GuildDetail,
        meta: {
          auth: true
        },
        children: [
          {
            path: "/hermandad/detalle/:realm",
            name: "Detalle",
            props: true,
            meta: {
              auth: true
            }
          }
        ]
      }
    ]
  }
];

export default guildRoutes;

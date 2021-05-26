import Vue from "vue";
import Router from "vue-router";
import { guildRoutes } from '@/app/views/guild';
// Containers
const TheContainer = () => import("@/app/containers/TheContainer");

// Views
const Dashboard = () => import("@/app/views/Dashboard");

Vue.use(Router);

const router = new Router({
  mode: "hash", 
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
});

function configRoutes() {
  return [
    {
      path: "/",
      redirect: "/dashboard",
      name: "Inicio",
      component: TheContainer,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard
        },
        {
          path: "hermandad",
          redirect: "/hermandad/listado",
          name: "",
          component: {
            render(c) {
              return c("router-view");
            }
          },
          children: [
            ...guildRoutes
          ]
        }
      ]
    }
  ];
}

export default router;

import Vue from "vue";
import Router from "vue-router";
import { guildRoutes } from '@/app/views/guild';
import { getLoggedUser, refresh } from '@/app/shared/services/auth-service';
// Containers
const TheContainer = () => import("@/app/containers/TheContainer");

// Views
const Dashboard = () => import("@/app/views/Dashboard");
const CharacterList = () => import("@/app/views/main/components/CharacterList");
const Login = () => import("@/app/views/auth/Login");

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
          component: Dashboard,
          meta: {
            auth: true,
          }
        },
        // {
        //   path: "login",
        //   name: "Login",
        //   component: Login
        // },
        {
          path: "personajes",
          name: "Personajes",
          component: CharacterList
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
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ];
}
let checkValid = async () =>
await getLoggedUser()
  .then(response => response)
  .catch(e => e);


router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem("token");
  let user,
    expired = false;

  if (token) {
    let response = await checkValid();

    console.log(response);

    if (response.status == 200) {  // (response.status == 200)

      let now = moment();
      let login_time = moment(localStorage.getItem("login_time")); //Deprecation warning: value provided is not in a recognized RFC2822 or ISO format
      let expires_in = localStorage.getItem("expires_in");

      if (
        now >=
          login_time
            .add(parseInt(expires_in), "seconds")
            .subtract(15, "minutes") &&
        now <= login_time.add(parseInt(expires_in), "seconds")
      ) {
        // token próximo a caducar
        refresh().then(resp => {

          console.log(resp);

          localStorage.setItem("token", resp.data.access_token);
          let nuevoRefresco = moment();
          localStorage.setItem("login_time", nuevoRefresco);

          location.reload();
        });
      } else {
        user = response.data;
      }
    } else {
      localStorage.removeItem("token");
      token = null;
      expired = true;
    }
  }
  
  if (to.meta && to.meta.auth == true) {
    if (token) {
      to.query.user = user;
      next();
    } else {
      next({
        path: "/login",
        query: {
          expired: expired
        }
      });
    }
  } else if (to.meta && to.meta.auth == false) {
    if (token) {
      next({
        path: "/",
        query: { user: user }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;

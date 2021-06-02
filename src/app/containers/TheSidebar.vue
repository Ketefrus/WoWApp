<template>
  <CSidebar
    fixed
    :minimize="!minimize"
    :colorScheme="'dark'"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img
        class="c-sidebar-brand-full logo m-1"
        src="/WarcraftLogs-logo.png"
        height="50px"
        alt="Panel WoWChecker"
      />
      <img
        class="c-sidebar-brand-minimized logo m-1"
        src="/WarcraftLogs-logo.png"
        width="30px"
        alt="Panel WoWChecker"
      />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav"/>


    <CSidebarNav>
      <CSidebarNavItem @click.native="logout" name="Logout" icon="cil-speedometer">
      </CSidebarNavItem>
      </CSidebarNav>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from "./_nav";
//import { logout } from "@/app/shared/services/auth-service";
export default {
  name: "TheSidebar",
  nav,
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
  methods: {
    logout () {
        localStorage.removeItem("token"); // access_token
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_id");
  localStorage.removeItem("login_time");
  localStorage.removeItem("expires_in");
      this.$router.push({ path: '/login' })
    },
    test() {
      console.log('ye');
    }
  }
};
</script>

<template>
  <CSidebar 
    fixed 
    :minimize="!minimize"
    :colorScheme="'dark'"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
 <img class="c-sidebar-brand-full logo m-1" src="/WarcraftLogs-logo.png" height="50px" alt="ÜIGO - Panel de gestión Üigo">
<img class="c-sidebar-brand-minimized logo m-1" src="/WarcraftLogs-logo.png" width="30px" alt="ÜIGO - Panel de gestión Üigo">
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'

export default {
  name: 'TheSidebar',
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  }
}
</script>

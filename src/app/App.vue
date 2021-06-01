<template>
  <router-view></router-view>
</template>

<script>
import { getLoggedUser } from '@/app/shared/services/auth-service';

export default {
  name: 'App',
  data() {
    return {
      user: null
    }
  },
  created() {
    if (localStorage.getItem('token')) {

      getLoggedUser().then(response => {

        if (response.status == 200) {
          this.user = response.data;
        }

        if (response.status != 200) {
          localStorage.removeItem('token');
          this.$router.push('/login');
        }
      }).catch(error => {
        localStorage.removeItem('token');
        this.$router.push('/login');
      });

    }
  }
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import '@/assets/scss/style';
</style>

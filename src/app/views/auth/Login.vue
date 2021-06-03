<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4 col-8">
              <CCardBody>
                <CForm>
                  <h3 :style="{ 'font-size': '30px' }">Acceder</h3>
                  <p class="text-muted">
                    Accede a tu cuenta para gestionar tus personajes
                  </p>
                  <CInput
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="user"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton
                        @click="login()"
                        color="outline-warning"
                        class="px-4"
                        >Entrar</CButton
                      >
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton shape="square" color="link" class="px-0"
                        >¿Contraseña olvidada?</CButton
                      >
                      <CButton color="link" class="d-lg-none"
                        >Register now!</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="warning"
              text-color="dark"
              class="text-center py-5 d-md-down-none col-4"
              body-wrapper
            >
              <CCardBody>
                <h3 :style="{ color: 'black', 'font-size': '30px' }">
                  Regístrate
                </h3>
                <p>
                  Únete a WoWChecker para tener control sobre tus personajes y los del resto, 
                  unirte a hermandades y jugar con gente de todo el mundo.
                </p>
                <CButton color="dark" @click="register" shape="square" variant="outline" size="lg">
                  Registrarse
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { login } from "@/app/shared/services/auth-service";

export default {
  name: "Login",
  data() {
    return {
      user: null,
      password: null,
    };
  },
  methods: {
    async login() {
      try {
        const resp = await login(this.user, this.password);
        console.log(resp.status);
        if (resp.status == 200) {
        localStorage.setItem("token", resp.data.token); // access_token
        localStorage.setItem("user_name", resp.data.name);
        localStorage.setItem("user_id", resp.data.id);
        localStorage.setItem("login_time", moment());
        localStorage.setItem("expires_in", resp.data.expires_in);
        console.log(localStorage.getItem("login_time"));
        this.$router.push({ path: '/' })
        }
      } catch (error) {
        console.log(error);
      }
    },
    async register() {
      this.$router.push({ path: '/register' });
    }
  },
};
</script>

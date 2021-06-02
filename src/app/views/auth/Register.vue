<template>
  <div class="c-app flex-row align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm @submit.prevent="submit">
                <h3 :style="{ 'font-size': '30px' }">Regístrate</h3>
                <p class="text-muted">
                  Crea tu cuenta para acceder a WoWChecker
                </p>
                <CRow class="mb-4" form>
                  <CCol md="12">
                    <CInput
                      id="name"
                      name="name"
                      placeholder="Username"
                      autocomplete="username"
                      v-model.trim="$v.username.$model"
                      :addInputClasses="{
                        error: $v.username.$error,
                      }"
                    >
                      <template #prepend-content
                        ><CIcon name="cil-user" :style="{ color: '#fab700' }"
                      /></template>
                    </CInput>
                    <span
                      class="error"
                      v-if="$v.username.$dirty && !$v.username.required"
                      >El nombre de usuario es requerido.</span
                    >
                    <span
                      class="error"
                      v-if="$v.username.$dirty && !$v.username.minLength"
                      >La longitud mínima es de 4 caracteres.</span
                    >
                  </CCol>
                </CRow>
                <CRow class="mb-4" form>
                  <CCol md="6">
                    <CInput
                      placeholder="Password"
                      type="password"
                      id="password"
                      name="password"
                      autocomplete="new-password"
                      v-model.trim="$v.password.$model"
                      :addInputClasses="{
                        error: $v.password.$error,
                      }"
                    >
                      <template #prepend-content
                        ><CIcon
                          name="cil-lock-locked"
                          :style="{ color: '#fab700' }"
                      /></template>
                    </CInput>
                    <span
                      class="error"
                      v-if="$v.password.$dirty && !$v.password.required"
                      >Rellena la contraseña.</span
                    >
                  </CCol>
                  <CCol md="6">
                    <CInput
                      placeholder="Repeat password"
                      type="password"
                      id="repeatPassword"
                      v-model.trim="$v.repeatPassword.$model"
                      :addInputClasses="{
                        error: $v.repeatPassword.$error,
                      }"
                      autocomplete="new-password"
                    >
                      <template #prepend-content
                        ><CIcon
                          name="cil-lock-locked"
                          :style="{ color: '#fab700' }"
                      /></template>
                    </CInput>
                    <span
                      class="error"
                      v-if="
                        $v.repeatPassword.$dirty &&
                        !$v.repeatPassword.sameAsPassword
                      "
                      >Las contraseñas deben coincidir.</span
                    >
                  </CCol>
                </CRow>
                <CButton color="warning" @click="register" block
                  >Crear cuenta</CButton
                >
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { register } from "@/app/shared/services/auth-service";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      repeatPassword: "",
    };
  },
  methods: {
    async register() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        try {
          const resp = await register(this.username, this.password);
          if (resp.status==200) {
          this.$router.push({ path: '/login' });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
    },
    password: {
      required,
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
};
</script>
<style lang="scss">
.input-group-text {
  background-color: rgb(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}
span.error {
  color: #ac1f39;
}

.form-control.error {
  border: 1px solid #ac1f39 !important;
}
</style>

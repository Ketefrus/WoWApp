<template>
  <div class="container offset">
    <div class="flex wrapable" :style="{ marginBottom: 15 }">
      <div class="flex-main">
        <h1 :style="{ lineHeight: 1.4, margin: 0, padding: 2 }">
          PERFIL DE {{ user.name.toUpperCase() }}
        </h1>
        <div class="panel pt-2">
          <div class="panel-body pad">
            <CForm @submit.prevent="submit">
              <h3 :style="{ 'font-size': '30px', margin: '0px 0px 30px' }">
                Editar perfil
              </h3>
              <CRow class="mb-4" form>
                <CCol md="12">
                  <CInput
                    id="name"
                    name="name"
                    placeholder="Username"
                    autocomplete="username"
                    disabled
                    v-model="user.name"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user" :style="{ color: '#fab700' }"
                    /></template>
                  </CInput>
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
              <CButton color="warning" variant="ghost" block
                >Editar constraseña</CButton
              >
            </CForm>
          </div>
        </div>
        <h1 :style="{ lineHeight: 1.4, margin: 0, padding: 2 }">
          Mis personajes
        </h1>
        <CharacterList />
      </div>
    </div>
  </div>
</template>

<script>
import CharacterList from "@/app/views/main/components/shared/CharactersList";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { changePassword } from "@/app/shared/services/auth-service";

export default {
  name: "Perfil",
  components: {
    CharacterList,
  },
  data() {
    return {
      user: {
        name: localStorage.getItem("user_name"),
        id: localStorage.getItem("user_id"),
      },
      password: "",
      repeatPassword: "",
    };
  },
  methods: {
    async changePassword() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        try {
          const resp = await changePassword(this.password);
          if (resp.status == 200) {
            this.$toasted.show("Contraseña cambiada", {
              theme: "toasted-primary",
              position: "bottom-center",
              type: "success",
              duration: "3000",
            });
          }
        } catch (error) {
          console.log(error);
          this.$toasted.show("Error del servidor", {
            theme: "toasted-primary",
            position: "bottom-center",
            type: "error",
            duration: "3000",
          });
        }
      }
    },

  },
  validations: {
    password: {
      required,
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
};
</script>

<style>
.form-control:disabled {
  background-color: rgb(0, 0, 0, 0.2);
}
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
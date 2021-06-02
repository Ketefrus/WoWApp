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
                  >
                    <template #prepend-content
                      ><CIcon
                        name="cil-lock-locked"
                        :style="{ color: '#fab700' }"
                    /></template>
                  </CInput>
                </CCol>
                <CCol md="6">
                  <CInput
                    placeholder="Repeat password"
                    type="password"
                    id="repeatPassword"
                    autocomplete="new-password"
                  >
                    <template #prepend-content
                      ><CIcon
                        name="cil-lock-locked"
                        :style="{ color: '#fab700' }"
                    /></template>
                  </CInput>
                </CCol>
              </CRow>
              <CButton color="warning" block>Crear cuenta</CButton>
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
    };
  },
};
</script>

<style>
</style>
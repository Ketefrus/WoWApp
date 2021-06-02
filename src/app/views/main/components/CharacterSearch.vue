<template>
  <div class="animated fadeIn">
    <transition name="fade">
      <CCard
        textColor="white"
        class="mx-auto w-75"
        style="background-color: transparent"
      >
        <CCardBody>
          <CRow class="mb-2">
            <CCol md="6">
              <!-- <CSelect
                label="Reino"
                id="realm"
                name="realm"
                :plain="true"
                :value.sync="search.realm"
                :options="realms"
              /> -->
              <div role="group" class="form-group">
                <label for="realm">Reino  </label>
                <multiselect
                  name="realm"
                  v-model="realm"
                  :options="realms"
                  :loading="loading"
                  label="value"
                  track-by="value"
                  placeholder="Escribe para buscar un cliente"
                  deselectLabel="Pulsa Enter para eliminar"
                  selectedLabel="Seleccionado"
                  selectLabel="Pulsa Enter para seleccionar"
                  :showNoResults="true"
                  open-direction="bottom"
                  :searchable="true"
                  :options-limit="300"
                  :limit="3"
                  :max-height="600"
                >
                  <template slot="noResult"
                    >No hay resultados con ese texto. Considera cambiar el
                    texto.</template
                  >
                  <template slot="noOptions">Lista vacía</template>
                </multiselect>
              </div>
            </CCol>
            <CCol md="6">
              <label for="name">Nombre</label>
              <CInput
                type="text"
                id="name"
                name="name"
                placeholder="Introduce un nombre"
                v-model="search.name"
                v-on:keypress.enter="searchCharacter"
              >
                <template #append>
                  <CButton @click="searchCharacter" shape="square" color="warning"
                    >Buscar</CButton
                  >
                </template>
              </CInput>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </transition>
  </div>
</template>
<script>
import { fetchAllRealms } from "@/app/shared/services/realm-service";

export default {
  name: "CharacterSearch",
  data() {
    return {
      loading: false,
      realms: [],
      realm: null,
      search: {
        realm: null,
        name: null,
      },
    };
  },
  async mounted() {
    await this.getRealms();
  },
  methods: {
    async getRealms() {
      this.loading = true;
      const resp = await fetchAllRealms();

      this.realms = resp.data.realms.map((p) => this.formatRealm(p));
      // this.search.realm = this.realms[0].value;
      this.search.realm = { value: "sanguino"};
      this.search.name = "mataojetes";
      this.loading = false;
    },

    formatRealm(realm) {
      return {
        label: `${realm.slug}`,
        value: `${realm.slug}`,
      };
    },

    searchCharacter() {
      this.search.realm = this.realm.value;
      this.$emit("search", this.search);
    },
  },
};
</script>
<template>
  <div class="animated fadeIn">
    <transition name="fade">
      <CCard textColor="white" class="mx-auto w-75" style="background-color:transparent">
        <CCardBody>
          <CRow class="mb-2">
            <CCol md="6">
              <CSelect
                label="Reino"
                id="realm"
                name="realm"
                :plain="true"
                :value.sync="search.realm"
                :options="realms"
              />
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
                <CButton @click="searchCharacter" color="primary">Buscar</CButton>
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
      search: {
        realm: null,
        name: null,
      },
    };
  },
  mounted() {
    this.getRealms();
  },
  methods: {
    async getRealms() {
      const resp = await fetchAllRealms();

      this.realms = resp.data.realms.map((p) => this.formatRealm(p));
      // this.search.realm = this.realms[0].value;
      this.search.realm = 'sanguino';
      this.search.name = 'mataojetes';
    },

    formatRealm(realm) {
      return {
        value: `${realm.slug}`,
      };
    },

    searchCharacter() {
      this.$emit('search', this.search);
    }
  },
};
</script>
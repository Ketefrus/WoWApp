<template>
  <div class="animated FadeIn">
    <CModal :show.sync="showModal" size="lg">
      <template #header>
        <div class="modal-title">
          <h4>Crear Hermandad</h4>
        </div>
      </template>

      <CForm>
        <CRow>
          <CCol sm="6">
            <label for="name">Nombre </label>
            <CInput
              id="name"
              name="name"
              placholder="nombre de hermandad"
              :value.sync="name"
              required
            />
          </CCol>

          <CCol sm="6">
            <CSelect
              id="faction"
              label="Facción"
              name="faction"
              :value.sync="faction"
              placholder="nombre de hermandad"
              :plain="true"
              :options="[
                { value: 'Horde', label: 'Horda' },
                { value: 'Alliance', label: 'Alianza' },
              ]"
              required
            />
          </CCol>
        </CRow>
      </CForm>
      <template #footer>
        <CButton @click="$emit('cancelled', false)" color="outline-warning"
          >Cancelar</CButton
        >
        <CButton @click="$emit('create', guild={faction, name})" color="warning">Crear</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: "CreateGuildModal",
  data() {
    return {
      faction: 'Horde',
      name: null,
    };
  },
  props: {
    show: { type: Boolean, default: false },
  },
  computed: {
    showModal: {
      get: function () {
        return this.show;
      },
      set: function (newValue) {
        this.$emit("update:show", newValue);
      },
    },
  },
};
</script>

<style>
</style>
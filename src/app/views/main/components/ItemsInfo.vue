<template>
<div>
  <CRow v-if="equipment.length > 0" class="mt-4 d-flex">
    <CCol sm="6" class="mt-4">
      <div v-for="(item, index) in equipment" :key="item.item.id">
        <CRow v-if="index < 7 && item.slot.type!='SHIRT'" class="d-none d-lg-flex mt-4 ml-4">
          <img class="equipment mr-2" :src="item.media.value" />
          <h5 :class="`${stringUtils.getItemColor(item.quality.type)}`">
            {{ item.name.es_ES }}
          </h5>
        </CRow>
      </div>
    </CCol>
    <CCol sm="6" class="mt-4">
      <div v-for="(item, index) in equipment" :key="item.item.id">
        <CRow v-c-tooltip="'Ey'" alignHorizontal="end" v-if="index >= 7 && index < 14 && item.slot.type!='SHIRT'" class="d-none d-lg-flex mt-4 mr-4 float-right">
          <h5 :class="`${stringUtils.getItemColor(item.quality.type)}`">
            {{ item.name.es_ES }}
          </h5>
          <img class=" equipment ml-2" :src="item.media.value" />
        </CRow>
      </div>
    </CCol>
  </CRow>

  <CRow v-if="equipment.length > 0" class="mt-4">
    <CCol sm="6">
      <CRow alignHorizontal="end" class="d-none d-lg-flex mr-2 text-left">
      <h5 :class="`${stringUtils.getItemColor(equipment[14].quality.type)}`">
          {{ equipment[14].name.es_ES }}
        </h5>
        <img
          class="equipment ml-2"
          :src="equipment[14].media.value"
        /> 
      </CRow>
    </CCol>

    <CCol sm="6">
      <CRow alignHorizontal="start" class="d-none d-lg-flex ml-2 text-left">

        <img
          class=" equipment mr-2"
          :src="equipment[15].media.value"
        /> 
      <h5 class="text-left" :class="`${stringUtils.getItemColor(equipment[15].quality.type)}`">
          {{ equipment[15].name.es_ES }}
        </h5>
      </CRow>
    </CCol>
  </CRow>
        <!-- <h5 :class="`${stringUtils.getItemColor(equipment[14].quality.type)}`">
          {{ equipment[14].name.es_ES }}
        </h5>
        <img
          class="equipment float-right"
          :src="equipment[14].media.value"
        />
        <img
          class="equipment ml-2"
          :src="equipment[15].media.value"
        />
        <h5 :class="`${stringUtils.getItemColor(equipment[15].quality.type)}`">
          {{ equipment[15].name.es_ES }}
        </h5> -->
</div>
</template>
<script>
import stringUtils from "@/app/shared/utils/stringUtils";

export default {
  name: "ItemsInfo",
  props: {
    items: { type: Array, required: true },
  },
  computed: {
    equipment: function () {
     return [...this.items];
    },
  },
  data() {
    return {
      stringUtils: stringUtils,
      loading: true,
    };
  },
};
</script>
<style scoped>
/* img {
  border: 2px solid;
  border-color: #bebbb7;
} */
</style>
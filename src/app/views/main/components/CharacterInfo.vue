<template>
  <transition name="fade">
    <CRow>
      <CCol md="12">
        <div v-if="loading" class="text-center m-5">
          <div
            class="spinner-grow text-primary m-auto"
            style="width: 3rem; height: 3rem"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div class="container" v-else>
          <CRow>
            <CCol sm="6">
              <div class="player-info">
                <div
                  v-if="images[2]"
                  class="player-background"
                  :style="{ 'background-image': `url(${images[2].value})` }"
                >
                  <ItemsInfo :items="equipment" />
                </div>

                <div v-if="specialization.length > 0" class="player-details">
                  <CharacterTalents v-bind:talents="specialization" />
                </div>
              </div>
            </CCol>
          </CRow>
        </div>
      </CCol>
    </CRow>
  </transition>
</template>
<script>
import stringUtils from "@/app/shared/utils/stringUtils";
import ItemsInfo from "@/app/views/main/components/ItemsInfo";
import CharacterTalents from "@/app/views/main/components/shared/CharacterTalents";

export default {
  name: "CharacterInfo",
  components: {
    ItemsInfo,
    CharacterTalents,
  },
  props: {
    item: { type: Object, default: {}, required: true },
    images: {
      type: Array,
      default() {
        return [];
      },
    },
    equipment: { type: Array, default: [], required: true },
    specialization: { type: Array, required: true },
    loading: { type: Boolean, default: false },
  },
  computed: {
    character: function () {
      return { ...this.item };
    },
  },
  data() {
    return {
      stringUtils: stringUtils,
    };
  },
  methods: {},
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@300&display=swap");
</style>
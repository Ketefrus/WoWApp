<template>
  <transition name="fade">
    <CRow>
      <CCol sm="12">
        <div v-if="loading" class="text-center m-5">
          <div
            class="spinner-grow text-primary m-auto"
            style="width: 3rem; height: 3rem"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div class="container-fluid" v-else>
          <CCard align="center" class="mx-auto w-75" v-if="character.name">
            <img v-if="images[2]" class="card-img" :src="images[2].value" />
            <div class="card-img-overlay">
              <CCardBody>
                <CRow>
                  <CCol class="text-right">
                    <strong>
                      <span
                        :class="`text-${stringUtils.getClassColor(
                          character.character_class.name.es_ES
                        )}`"
                      >
                        {{ character.name.toUpperCase() }}
                      </span>
                      {{ character.character_class.name.es_ES }}
                      {{ character.level }}
                    </strong>
                    
                  </CCol>
                </CRow>
                <ItemsInfo
                  :items='equipment'
                />
              </CCardBody>
            </div>
          </CCard>
        </div>
      </CCol>
    </CRow>
  </transition>
</template>
<script>
import stringUtils from "@/app/shared/utils/stringUtils";
import ItemsInfo from '@/app/views/main/components/ItemsInfo';

export default {
  name: "CharacterInfo",
  components: {
    ItemsInfo
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
strong {
  font-family: "Prompt", sans-serif;
  font-size: 20px;
  color: #bebbb7;
}
</style>
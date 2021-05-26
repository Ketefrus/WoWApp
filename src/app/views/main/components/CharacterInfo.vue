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
              <div v-if="character" class="player-info">
                <div
                  v-if="images[2]"
                  class="player-background"
                  :style="{ 'background-image': `url(${images[2].value})` }"
                >
                  <div class="player-gear">
                    <div class="player-gear-header">
                      <div class="player-name">{{character.name}}<br/>{{character.realm.name.es_ES}}</div>
                      <div><b>Nivel medio de objeto:</b> {{character.average_item_level}}</div>
                    </div>
                    <div
                      v-for="(item, gearSlot) in equipmentSlot"
                      :key="gearSlot"
                      :style="{
                        display: 'inline-block',
                        textAlign: 'center',
                        gridArea: `item-slot-${item.gearSlot}`,
                      }"
                      :class="`item-slot-${item.gearSlot}`"
                    >
                      <ItemsInfo :item="item" />
                    </div>
                  </div>
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
    item: { type: Object, required: true },
    images: {
      type: Array,
      default() {
        return [];
      },
    },
    equipment: { type: Array, required: true },
    specialization: { type: Array, required: true },
    loading: { type: Boolean, default: false },
  },
  computed: {
    character: function () {
      return { ...this.item };
    },
    equipmentSlot: function () {
      this.equipment.map((p) => {
        p.gearSlot = this.checkGearSlot(p);
        [...this.equipment];
      });

      return [...this.equipment];
    },
  },
  data() {
    return {
      stringUtils: stringUtils,
    };
  },
  methods: {
    checkGearSlot(item) {
      // TODO: Make a better logic for the grid system
      const slot = item.slot.type;

      let gearSlot;
      if (slot === "HEAD") gearSlot = 0;
      else if (slot === "NECK") gearSlot = 1;
      else if (slot === "SHOULDER") gearSlot = 2;
      else if (slot === "BACK") gearSlot = 14;
      else if (slot === "CHEST") gearSlot = 4;
      else if (slot === "SHIRT") gearSlot = 3;
      else if (slot === "TABARD") gearSlot = 17;
      else if (slot === "WRIST") gearSlot = 8;
      else if (slot === "HANDS") gearSlot = 9;
      else if (slot === "WAIST") gearSlot = 5;
      else if (slot === "LEGS") gearSlot = 6;
      else if (slot === "FEET") gearSlot = 7;
      else if (slot === "FINGER_1") gearSlot = 10;
      else if (slot === "FINGER_2") gearSlot = 11;
      else if (slot === "TRINKET_1") gearSlot = 12;
      else if (slot === "TRINKET_2") gearSlot = 13;
      else if (slot === "MAIN_HAND") gearSlot = 15;
      else if (slot === "OFF_HAND") gearSlot = 16;

      return gearSlot;
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@300&display=swap");
</style>
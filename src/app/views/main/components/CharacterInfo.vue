<template>
  <transition name="fade">
    <CRow>
      <CCol md="12">
        <div v-if="loading" class="text-center m-5">
          <!-- <div
            class="spinner-grow text-warning m-auto"
            style="width: 6rem; height: 6rem"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div> -->
          <vue-loaders name="pacman" color="#fab700" />
        </div>

        <div class="container" v-else>
          <CRow>
            <CCol sm="6">
              <div v-if="character" class="player-info">
                <div
                  v-if="render"
                  class="player-background"
                  :style="{ 'background-image': `url(${render})` }"
                >
                  <div class="player-gear">
                    <div class="player-gear-header">
                      <div
                        :class="`${character.character_class.name.en_GB} player-name`"
                      >
                        {{ character.name }}<br />{{
                          character.realm.name.es_ES
                        }}
                      </div>
                      <div>
                        <b>Nivel medio de objeto:</b>
                        {{ character.average_item_level }}
                      </div>
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

            <CharacterStats :item="stats" @addCharacter="addCharacter" />
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
import CharacterStats from "@/app/views/main/components/shared/CharacterStats";

import {
  renderCharacter,
  fetchCharacterEquipment,
  addCharacter,
  fetchCharacterSpecialization,
  fetchCharacterStats,
} from "@/app/shared/services/character-service";
import { fetchOneItem } from "@/app/shared/services/item-service";
import { fetchOneSpell } from "@/app/shared/services/spell-service";

export default {
  name: "CharacterInfo",
  components: {
    ItemsInfo,
    CharacterTalents,
    CharacterStats,
  },
  props: {
    item: { type: Object, required: true },
    loadingCharacter: { type: Boolean, default: true },
  },
  watch: {
    async loadingCharacter() {
      if (!this.loadingCharacter) await this.getData();
    },
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
    search: function () {
      const info = {
        name: this.item.name.toLowerCase(),
        realm: this.item.realm.slug.toLowerCase(),
      };
      return info;
    },
  },
  data() {
    return {
      stringUtils: stringUtils,
      loading: false,
      // Move logic
      equipment: [],
      specialization: [],
      stats: {},
      render: null,
    };
  },
  methods: {
    async getData() {
      if (this.search) {
      this.loading = true;

      await this.getSpecialization(this.search);
      await this.getRenderCharacter(this.search);
      await this.getItems(this.search);
      await this.getStats(this.search);

      this.loading = false;
      }
    },
    async getRenderCharacter(search) {
      const resp = await renderCharacter(search.realm, search.name);

      this.render = resp.data.assets[2].value;
    },

    async getItems(search) {
      const resp = await fetchCharacterEquipment(search.realm, search.name);

      this.equipment = resp.data.equipped_items;
      this.equipment.map((p) => {
        p = this.getRenderItem(p);
      });
    },

    async getRenderItem(equipment) {
      const resp = await fetchOneItem(equipment.media.id);
      equipment.media = resp.data.assets[0];
      return equipment;
    },

    async getSpecialization(search) {
      const resp = await fetchCharacterSpecialization(
        search.realm,
        search.name
      );
      console.log(resp);
      const selected = resp.data.specializations.find((p) => {
        return resp.data.active_specialization.id === p.specialization.id;
      });
      const spec = selected.talents;

      spec.map((t) => {
        t = this.getMediaSpell(t);
        [...spec];
      });
      this.specialization = spec;
    },

    async getMediaSpell(spell) {
      const resp = await fetchOneSpell(spell.spell_tooltip.spell.id);
      spell.media = resp.data.assets[0];
      return spell;
    },

    async getStats(search) {
      const resp = await fetchCharacterStats(search.realm, search.name);
      this.stats = resp.data;
    },
    async addCharacter() {
      try {
        
        await addCharacter(this.search, this.character.faction.name.en_GB);
          this.$toasted.show('Personaje añadido', {
            theme: 'toasted-primary',
            position: 'bottom-center',
            type: 'success',
            duration: '3000',
            
          })
      } catch (error) {
          this.$toasted.show('Personaje ya reclamado', {
            theme: 'toasted-primary',
            position: 'bottom-center',
            type: 'error',
            duration: '3000',
            
          })
      }
    },
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
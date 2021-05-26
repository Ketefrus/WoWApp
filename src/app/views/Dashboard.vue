<template>
  <div class="animated FadeIn">
    <CharacterSearch
      @search="getData($event)"
    />
    <CharacterInfo
      :item="character"
      :images="render"
      :equipment="equipment"
      :specialization="specialization"
      :stats="stats"
      :loading="loadingCharacter"
    />
  </div>
</template>

<script>
import { fetchCharacter, renderCharacter, fetchCharacterEquipment, fetchCharacterSpecialization, fetchCharacterStats } from '@/app/shared/services/character-service';
import { fetchOneItem } from '@/app/shared/services/item-service';
import { fetchOneSpell } from '@/app/shared/services/spell-service';

import CharacterSearch from '@/app/views/main/components/CharacterSearch'
import CharacterInfo from '@/app/views/main/components/CharacterInfo'

export default {
  name: 'Dashboard',
  components: {
    CharacterSearch,
    CharacterInfo,

  },
  data () {
    return {
      character: {},
      stats: {},
      specialization: [],
      render: [],
      equipment: [],
      renderEquipment: [],
      loadingCharacter: false,

    }
  },
  methods: {
    async getData(search) {
      this.loadingCharacter = true;

      const resp =await fetchCharacter(search.realm, search.name);
      this.character = resp.data;
      await this.getSpecialization(search);
      await this.getRenderCharacter(search);
      await this.getItems(search);
      await this.getStats(search);
      this.loadingCharacter = false;
    },

    async getRenderCharacter(search) {
      const resp = await renderCharacter(search.realm, search.name);
      console.log(resp);
      this.render = resp.data.assets;
    },

    async getItems(search) {
      const resp = await fetchCharacterEquipment(search.realm, search.name);

      this.equipment = resp.data.equipped_items;
      this.equipment.map(p => {
        p = this.getRenderItem(p);
      });
    },

    async getRenderItem(equipment) {
      const resp = await fetchOneItem(equipment.media.id);
      equipment.media = resp.data.assets[0];
      return equipment;
    },

    async getSpecialization(search) {

      const resp = await fetchCharacterSpecialization(search.realm, search.name);
      const selected = resp.data.specializations.find(p =>{ return resp.data.active_specialization.id === p.specialization.id});
      const spec = selected.talents;
        
        spec.map(t => {
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
    }
  }
}
</script>

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
      :loading="loadingCharacter"
    />
  </div>
</template>

<script>
import { fetchCharacter, renderCharacter, fetchCharacterEquipment, fetchCharacterSpecialization } from '@/app/shared/services/character-service';
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
      specialization: [],
      render: [],
      equipment: [],
      renderEquipment: [],
      loadingCharacter: false,
      loadingEquipment: false,
      loadingSpells: false,
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
 
      console.log(this.specialization);
      this.loadingCharacter = false;
    },

    async getRenderCharacter(search) {
      const resp = await renderCharacter(search.realm, search.name);
      
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
      this.loadingSpells = true;
      const resp = await fetchCharacterSpecialization(search.realm, search.name);
      // let specSelected = resp.data.specializations;
      // console.log(specSelected);
      const selected = resp.data.specializations.find(p =>{ return resp.data.active_specialization.id === p.specialization.id});
      const spec = selected.talents;
        
        spec.map(t => {
          t = this.getMediaSpell(t);
          [...spec];
        });
      this.specialization = spec;
      this.loadingSpells = false;
    },

    async getMediaSpell(spell) {
      const resp = await fetchOneSpell(spell.spell_tooltip.spell.id);
      spell.media = resp.data.assets[0];
      return spell;
    },
  }
}
</script>

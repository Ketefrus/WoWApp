<template>
  <div class="animated FadeIn">
    <CharacterSearch
      @search="getData($event)"
    />
    <CharacterInfo
      :item="character"
      :images="render"
      :equipment="equipment"
      :loading="loadingCharacter"
    />
  </div>
</template>

<script>
import { fetchCharacter, renderCharacter, fetchCharacterEquipment } from '@/app/shared/services/character-service';
import { fetchOneItem } from '@/app/shared/services/item-service';

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
      render: [],
      equipment: [],
      renderEquipment: [],
      loadingCharacter: false,
      loadinEquipment: false,
    }
  },
  methods: {
    async getData(search) {
      this.loadingCharacter = true;

      const resp =await fetchCharacter(search.realm, search.name);
      this.character = resp.data;

      this.getRenderCharacter(search);
      this.getItems(search);

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

      console.log(this.equipment);
    },

    async getRenderItem(equipment) {
      const resp = await fetchOneItem(equipment.media.id);
      equipment.media = resp.data.assets[0];
      return equipment;
    }
  }
}
</script>

<template>
  <div class="animated FadeIn">
    <CharacterSearch
      @search="getData($event)"
    />
    <CharacterInfo
      :loadingCharacter="loadingCharacter"
      :item="character"
    />
  </div>
</template>

<script>
import { fetchCharacter } from '@/app/shared/services/character-service';

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
      loadingCharacter: true,

    }
  },
  methods: {
    async getData(search) {
      this.loadingCharacter = true;

      const resp = await fetchCharacter(search.realm, search.name);
      this.character = resp.data;

      this.loadingCharacter = false;
    },
  }
}
</script>

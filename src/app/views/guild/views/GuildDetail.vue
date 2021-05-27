<template>
  <div class="animated FadeIn">
    <CharacterInfo
      :loadingCharacter="loadingCharacter"
      :item="character"
    />
  </div>
</template>
<script>
import CharacterInfo from '@/app/views/main/components/CharacterInfo'
import { fetchCharacter } from '@/app/shared/services/character-service';

export default {
  name: "GuildDetail",
  components: {
    CharacterInfo,
  },
  data() {
    return {
      character: {},
      loadingCharacter: true,
      search: {
        name: null,
        realm: null,
      },
    };
  },
  async created() {
    this.search = {
      name: this.$route.query.name,
      realm: this.$route.query.realm,
    };
    await this.getData(this.search);
  },
  methods: {
    async getData(search) {
      this.loadingCharacter = true;

      const resp = await fetchCharacter(search.realm, search.name);
      this.character = resp.data;

      this.loadingCharacter = false;
    },
  },
};
</script>
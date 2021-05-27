<template>
  <div v-if="loading" class="text-center m-5">
    <div
      class="spinner-grow text-primary m-auto"
      style="width: 3rem; height: 3rem"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <a class="player tank" @click="goToDetail(character)" v-else>
    <div class="role"></div>
    <div class="card">
      <div
        :class="'avatar'"
        :style="{ backgroundImage: `url(${image.assets[1].value})` }"
      ></div>
      <div class="about">
        <h1 :class="`${character.character_class.name.en_GB}`">
          {{ character.name }}
        </h1>
        <small>Especialización</small>
        <div class="flex-main text-muted text-small">clase</div>
        <div class="flex text-muted text-small">
          <div class="flex-main">ilvl</div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import stringUtils from "@/app/shared/utils/stringUtils";
import { renderCharacter } from "@/app/shared/services/character-service";

export default {
  name: "GuildTile",
  props: {
    character: {
      type: Object,
      default() {
        return null;
      },
      required: true,
    },
  },
  data() {
    return {
      stringUtils: stringUtils,
      image: null,
      loading: true,
    };
  },
  computed: {},
  async mounted() {
    await this.getRenderTile(this.character);
  },
  methods: {
    async getRenderTile(player) {
      console.log(player);
      this.loading = true;
      const resp = await renderCharacter(player.realm.slug, player.name);
      console.log(resp);
      this.image = resp.data;
      this.loading = false;
    },

    goToDetail(player) {
      this.$router.push({path: `/hermandad/detalle/${player.id}`, query: {realm: player.realm.slug, name: player.name}})
    }
  },
};
</script>

<style>
</style>
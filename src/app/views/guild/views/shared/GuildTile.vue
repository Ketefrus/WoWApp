<template>
  <div v-if="loading" class="text-center m-5">
    <div
      class="spinner-grow text-warning m-auto"
      style="width: 3rem; height: 3rem"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <a class="player" :class="canDelete ? 'dps' : 'tank'" @click="goToDetail(character)" v-else>
    <div class="role"></div>
    <div class="card">
      <div
        :class="'avatar'"
        :style="{ backgroundImage: `url(${image.assets[1].value})` }"
      >
        <CButtonClose
          v-if="canDelete"
          v-c-tooltip="{
            content: 'Eliminar personaje de la hermandad',
            placement: 'left',
          }"
          @click.stop="deleteCharacter"
          buttonClasses="text-danger close"
          :style="{ margin: '5px 15px', 'font-size': '1.5rem' }"
        ></CButtonClose>
      </div>
      <div class="about">
        <h1 :class="`${character.character_class.name.en_GB}`">
          {{ character.name }}
        </h1>
        <small
          >{{ character.character_class.name.es_ES }}
          {{ character.active_spec.name.es_ES }}</small
        >
        <div class="flex-main text-muted text-small">
          Nivel {{ character.level }}
        </div>
        <div class="flex text-muted text-small">
          <div class="flex-main">{{ character.average_item_level }} ilvl</div>

          <div class="flex-main"></div>
        </div>
      </div>

      <!-- <CButton block color="danger" :style="{'padding-bottom':'0'}" variant="ghost"> </CButton> -->
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
    admin: { type: Boolean, default: false },
  },
  data() {
    return {
      stringUtils: stringUtils,
      image: null,
      loading: true,
      canDelete: false,
    };
  },
  computed: {},
  async mounted() {
    await this.getRenderTile(this.character);

    this.canDelete =
      localStorage.getItem("user_id") == this.character.owner_id || this.admin
        ? true
        : false;
  },
  methods: {
    deleteCharacter() {
      this.$emit('deleteCharacter', this.character.name.toLowerCase());
      
    },
    async getRenderTile(player) {
      this.loading = true;
      const resp = await renderCharacter(player.realm.slug, player.name);
      this.image = resp.data;
      this.loading = false;
    },

    goToDetail(player) {
      this.$router.push({
        path: `/hermandad/detalle/${player.id}`,
        query: { realm: player.realm.slug, name: player.name },
      });
    },
  },
};
</script>

<style>
</style>
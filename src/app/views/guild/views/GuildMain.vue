<template>
  <div class="container offset">
    <div :style="{position: 'relative', marginBottom: 15 }">
      <div class="flex wrapable" :style="{ marginBottom: 15 }">
        <div class="flex-main">
          <h1 :style="{ lineHeight: 1.4, margin: 0}">
            LISTADO DE HERMANDAD
          </h1>
        </div>
      </div>
        <div v-if="loading" class="text-center m-5">
          <div
            class="spinner-grow text-primary m-auto"
            style="width: 3rem; height: 3rem"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>

          <div class="player-selection">
            
            <GuildTile
              v-for="(player, index) in guild" :key="index"
              :character="player"
            />

          </div>

    </div>
  </div>
</template>
<script>
import { fetchGuild } from '@/app/shared/services/character-service';
import { fetchCharacter, renderCharacter } from '@/app/shared/services/character-service';
import GuildTile from '@/app/views/guild/views/shared/GuildTile';

export default {
  name: 'GuildMain',
  components: {
    GuildTile,
  },
  data() {
    return {
      playerList: [],
      guild: [],
      loading: true,
    }
  },
  async created() {
    await this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      this.playerList = await this.getPlayers();
      await this.getCharacter();
      console.log(this.guild);
      // console.log(this.guild);
      this.loading = false;
    },
    async getPlayers() {
      const resp = await fetchGuild();
      
      return [...resp.data];
    },

    async getCharacter() {
      this.playerList.forEach(async player => {
        const resp = await fetchCharacter(player.realm, player.name);
        this.guild.push({...resp.data});
      });
    },


  },
}
</script>

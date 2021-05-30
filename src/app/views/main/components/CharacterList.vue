<template>
  <div class="container offset">
    <div class="flex wrapable" :style="{ marginBottom: 15 }">
      <div class="flex-main">
          <h1 :style="{ lineHeight: 1.4, margin: 0}">LISTADO DE PERSONAJES</h1>
    <div class="panel">
      <!-- <div class="panel-heading">
        <h1 :style="{ lineHeight: 1.4, margin: 0}">LISTADO DE PERSONAJES</h1>
      </div> -->
      <div class="panel-body">
        <CDataTable
          :items="playerList"
          :fields="campos"
          sorter
          hover
          :addTableClasses="'data-table'"
          :noItemsView="{
            noResults: ' sin resultados disponibles ',
            noItems: ' sin resultados',
          }"
        >
          <template #id="{ item }">
            <td class="align-middle" >
              <span>
                {{ item.id }}
              </span>
            </td>
          </template>
          <template #name="{ item }">
            <td>
              <img class='rounded-circle' :src="item.media[0].value"/>
              <span  class="ml-2" v-if="item.name">
                {{ item.name }}
              </span>
            </td>
          </template>
          <template #realm="{ item }">
            <td class="align-middle">
              <span v-if="item.realm">
                {{ item.realm }}
              </span>
            </td>
          </template>
        </CDataTable>
      </div>
    </div>
      </div>
    </div>

  </div>
</template>

<script>
import { fetchGuild } from "@/app/shared/services/character-service";
import { renderCharacter } from "@/app/shared/services/character-service";

export default {
  name: "CharacterList",
  data() {
    return {
      playerList: [],
      guild: [],
      loading: true,
      image: null,
      campos: [
        { key: "id", label: "id", sorter: true },
        { key: "name", label: "Personaje", sorter: true },
        { key: "realm", label: "Reino" },
      ],
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    async getData() {
      await this.getCharacters();
      this.playerList.forEach(async p => await this.getRender(p));
      console.log(this.playerList);
    },
    async getCharacters() {
      const resp = await fetchGuild();
      this.playerList = [...resp.data];
    },
    async getRender(player) {
      const resp = await renderCharacter(player.realm, player.name);
      player.media = resp.data.assets;
    }
  },
};
</script>

<style>

</style>
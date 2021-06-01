<template>
  <div class="container offset">
    <div class="flex wrapable" :style="{ marginBottom: 15 }">
      <div class="flex-main">
        <h1 :style="{ lineHeight: 1.4, margin: 0 }">LISTADO DE PERSONAJES</h1>
        <div class="panel">
          <!-- <div class="panel-heading">
        <h1 :style="{ lineHeight: 1.4, margin: 0}">LISTADO DE PERSONAJES</h1>
      </div> -->
          <div class="panel-body text-center m-5" v-if="loading">
            <vue-loaders name="pacman" color="#fab700" />
          </div>
          <div v-else class="panel-body">
            <CDataTable
              :items="playerList"
              :fields="campos"
              sorter
              hover
              clickable-rows
              @row-clicked="rowClicked"
              :addTableClasses="'data-table'"
              :noItemsView="{
                noResults: ' sin resultados disponibles ',
                noItems: ' sin resultados',
              }"
            >
              <template #id="{ item }">
                <td class="align-middle">
                  <span>
                    {{ item.id }}
                  </span>
                </td>
              </template>
              <template #name="{ item }">
                <td>
                  <img class="icon rounded-circle" :src="item.media" />
                  <span class="ml-2" v-if="item.name">
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
import { fetchMyCharacters } from "@/app/shared/services/character-service";
import { renderCharacter } from "@/app/shared/services/character-service";

export default {
  name: "CharacterList",
  data() {
    return {
      playerList: null,
      loading: true,
      image: null,
      campos: [
        { key: "id", label: "id", sorter: true },
        { key: "name", label: "Personaje", sorter: true },
        { key: "realm", label: "Reino" },
      ],
    };
  },
  // computed: {
  //   async characters() {
  //   }
  // }
  async created() {
    await this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const resp = await fetchMyCharacters();
      let characters = [...resp.data];

      await this.getMedia(characters);
  
      this.playerList = characters;
      this.loading = false;
    },
    async getMedia(character) {
      return Promise.all(
        character.map(async (c) => {
          const resp = await renderCharacter(c.realm, c.name);
          
          const media = resp.data.assets[0].value;
          c.media = media;
        })
      );
    },
    rowClicked(item, index, column, e) {
      console.log(item);
      console.log(index);
      console.log(column),
      console.log(e);
    }
  },
};
</script>

<style>
</style>
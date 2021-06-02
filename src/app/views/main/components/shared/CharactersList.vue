<template>
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
              :addTableClasses="'data-table mt-4'"
              :noItemsView="{
                noResults: ' sin resultados disponibles ',
                noItems: ' sin resultados',
              }"
            >
              <template #guild_name="{ item }">
                <td class="align-middle">
                  <span v-if="item.guild_name && item.guild_name != ''">
                    <CButton color="link">{{ item.guild_name }}</CButton>
                  </span>
                  <span v-else> Sin hermandad </span>
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
              <template #actions="{ item }">
                <td class="align-middle">
                  <CButton
                    color="danger"
                    @click="deleteCharacter(item)"
                    variant="ghost"
                  >
                    Eliminar personaje
                  </CButton>
                </td>
              </template>
            </CDataTable>
          </div>
        </div>
</template>

<script>
import {
  fetchMyCharacters,
  deleteCharacter,
} from "@/app/shared/services/character-service";
import { renderCharacter } from "@/app/shared/services/character-service";
export default {
  name: "CharacterList",
  data() {
    return {
      playerList: null,
      loading: true,
      image: null,
      campos: [
        { key: "name", label: "Personaje", sorter: true },
        { key: "realm", label: "Reino" },
        { key: "guild_name", label: "Hermandad" },
        { key: "actions", label: "acciones", _style: "width: 25%" },
      ],
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      this.playerList = null;
      const resp = await fetchMyCharacters();
      console.log(resp);
      if (resp.status == 204) {
        this.loading = false;
        return;
      }
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
    async deleteCharacter(char) {
      console.log(char);
      try {
        await deleteCharacter(char._id);
        this.$toasted.show("Personaje eliminado", {
          theme: "toasted-primary",
          position: "bottom-center",
          type: "success",
          duration: "3000",
        });
        await this.getData();
      } catch (error) {
        console.log(error);
        this.$toasted.show("Se ha producido un error", {
          theme: "toasted-primary",
          position: "bottom-center",
          type: "error",
          duration: "3000",
        });
      }
    },
    rowClicked(item, index, column, e) {
      if (column == "guild_name" && item.guild_name !== "")
        this.$router.push({
          path: `/hermandad/listado/${item.guild_name}`,
          query: { name: item.guild_name },
        });
      else if (column != "actions")
        this.$router.push({
          path: `/personajes/detalle/${item._id}`,
          query: { realm: item.realm, name: item.name },
        });
    },
  },
}
</script>

<style>

</style>
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
            <td>
              {{ item.id }}
            </td>
          </template>
          <template #name="{ item }">
            <td>
              <span v-if="item.name">
                {{ item.name }}
              </span>
            </td>
          </template>
          <template #realm="{ item }">
            <td>
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

export default {
  name: "CharacterList",
  data() {
    return {
      playerList: [],
      guild: [],
      loading: true,
      campos: [
        { key: "id", label: "id", sorter: true },
        { key: "name", label: "Nombre", sorter: true },
        { key: "realm", label: "Reino" },
      ],
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    async getData() {
      const resp = await fetchGuild();
      this.playerList = [...resp.data];
    },
  },
};
</script>

<style>
</style>
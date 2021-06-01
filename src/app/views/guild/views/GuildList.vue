<template>
  <div class="container offset">
    <div class="flex wrapable" :style="{ marginBottom: 15 }">
      <div class="flex-main">
        <h1 :style="{ lineHeight: 1.4, margin: 0, padding: 2 }">
          LISTADO DE HERMANDADES
        </h1>
        <div class="panel">
          <!-- <div class="panel-heading">
        <h1 :style="{ lineHeight: 1.4, margin: 0}">LISTADO DE PERSONAJES</h1>
      </div> -->
          <div class="panel-body text-center m-5" v-if="loading">
            <vue-loaders name="pacman" color="#fab700" />
          </div>
          <div v-else class="panel-body">
            <CDataTable
              :items="guildList"
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
              <template #name="{ item }">
                <td class="align-middle text-center">
                  <span>
                  [ {{ item.name }} ]
                  </span>
                </td>
              </template>
              <template #faction="{ item }">
                <td class="text-center">
                  <!-- "`../../../../../public/img/${item.faction}_64.png`" -->
                  <img :src="`/img/${item.faction}_64.png`" />
                  <!-- <span class="ml-2" v-if="item.faction">
                    {{ item.faction }}
                  </span> -->
                </td>
              </template>
              <template #characters="{ item }">
                <td class="align-middle text-center">
                  <h6 v-if="item.characters">
                    {{ item.characters.length }}
                  </h6>
                </td>
              </template>
              <template #open="{ item }">
                <td class="align-middle text-center">
                  <h5 v-if="item.open">
                    <CBadge color="success">Reclutaciones abiertas</CBadge>
                  </h5>
                  <h5 v-else>
                    <CBadge color="danger">Reclutaciones cerradas</CBadge>
                  </h5>
                </td>
              </template>
            </CDataTable>
          </div>
          <div class="panel-footer"></div>
        </div>

        <div class="panel">
          <div class="panel-body pad">
            <div d-flex flex-row class="mr-3 p-4">
              <h3>
                Crea tu propia hermandad y juega con gente de todo el mundo
              </h3>
              <p>
                Puedes crear tu hermandad y reclutar gente para montar grupos de
                banda / PvP / Míticas
              </p>
            </div>

            <div d-flex flex-row class="text-center">
              <CButton
                :disabled="loading"
                @click="showModal=true"
                v-c-tooltip.hover.click="
                  'Ajusta el listado con el Filtro de Pagos'
                "
                class="mr-2"
                type="submit"
                size="lg"
                variant="ghost"
                color="warning"
              >
                <i class="fa fa-file-excel-o mr-1"></i> Crear hermandad
              </CButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CreateGuildModal
      :show="showModal"
      @cancelled="(showModal=$event)"
      @create="create"
    />
  </div>
</template>

<script>
import { fetchAllGuilds } from "@/app/shared/services/guild-service";
// import { renderCharacter } from "@/app/shared/services/character-service";
import CreateGuildModal from './shared/CreateGuildModal';
export default {
  name: "GuildList",
  components: {
    CreateGuildModal
  },
  data() {
    return {
      guildList: null,
      loading: true,
      image: null,
      showModal: false,
      campos: [
        { key: "faction", label: "Facción", sorter: true,  _classes: 'text-center', _style: 'width: 20%' },
        { key: "name", label: "Nombre", sorter: true, _classes: 'text-center'},
        { key: "characters", label: "Miembros", _classes: 'text-center' },
        { key: "open", label: "Reclutando", _classes: 'text-center' },
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
      const resp = await fetchAllGuilds();
      let guilds = [...resp.data];

      // await this.getMedia(characters);

      this.guildList = guilds;
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
    create(guild) {
      console.log(guild);
    },
    rowClicked(item, index, column, e) {
      console.log(item);
      console.log(index);
      console.log(column), console.log(e);
    },
  },
};
</script>

<style>
</style>
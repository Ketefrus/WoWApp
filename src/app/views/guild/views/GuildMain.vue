<template>
  <div class="container offset">
    <div :style="{ position: 'relative', marginBottom: 15 }">
      <div class="flex wrapable" :style="{ marginBottom: 15 }">
        <div class="flex-main">
          <!-- RECLUITMENT -->
          <CCollapse :show="guildOpen">
            <div class="panel mt-4">
              <div class="panel-body pad">
                <div d-flex flex-row class="mr-3 p-2">
                  <h3 :style="{ 'font-size': '2em' }">
                    Esta hermandad se encuentra en reclutamiento
                  </h3>
                  <p class="text-justify mt-4">
                    Puedes elegir un personaje que no tenga hermandad
                    actualmente para unirlo a la hermandad.
                  </p>
                </div>
                <div d-flex flex-row class="text-center">
                  <CButton
                    :disabled="loading"
                    @click="showAdd = !showAdd"
                    v-c-tooltip.hover.click="'Añadir un personaje'"
                    class="mr-2"
                    type="submit"
                    size="lg"
                    variant="ghost"
                    color="warning"
                  >
                    <i class="fa fa-file-excel-o mr-1"></i> Añadir personaje
                  </CButton>
                </div>
              </div>

              <CCollapse :show="showAdd">
                <div class="panel-footer align-center pb-4">
                  <CRow alignHorizontal="center" class="ml-4">
                    <CCol md="6">
                      <div role="group" class="form-group">
                        <label for="character">Personaje </label>
                        <multiselect
                          name="character"
                          v-model="charAdded"
                          :options="myChar"
                          :loading="loading"
                          label="name"
                          track-by="name"
                          placeholder="Escribe para buscar un personaje"
                          deselectLabel="Pulsa Enter para eliminar"
                          selectedLabel="Seleccionado"
                          selectLabel="Pulsa Enter para seleccionar"
                          :showNoResults="true"
                          open-direction="bottom"
                          :searchable="true"
                          :options-limit="300"
                          :limit="3"
                          :max-height="600"
                        >
                          <template slot="noResult"
                            >No hay resultados con ese texto. Considera cambiar
                            el texto.</template
                          >
                          <template slot="noOptions">Lista vacía</template>
                          <template slot="append"
                            ><CButton block color="warning">
                              ye
                            </CButton></template
                          >
                        </multiselect>
                      </div>
                    </CCol>
                    <CCol md="3">
                      <CButton
                        :disabled="!charAdded"
                        @click="recluit"
                        :class="'text-center mt-4'"
                        :style="{ height: '50%', width: 'auto' }"
                        color="warning"
                      >
                        Confirmar
                      </CButton>
                    </CCol>
                  </CRow>
                </div>
              </CCollapse>
            </div>
          </CCollapse>
          <!-- MAIN -->
          <h1 :style="{ lineHeight: 1.4, margin: 2 }">
            LISTADO DE HERMANDAD
            <CBadge
              v-if="ownerGuild"
              @click="updateRecluitment"
              :color="guildOpen ? 'success' : 'danger'"
              shape="pill"
              >{{ badgeText }}</CBadge
            >
          </h1>
        </div>
      </div>

      <div v-if="loading" class="text-center m-5">
        <div
          class="spinner-grow text-warning m-auto"
          style="width: 3rem; height: 3rem"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <div class="player-selection">
        <GuildTile
          v-for="(player, index) in guild"
          :key="index"
          :character="player"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {
  fetchOneGuild,
  fetchGuildCharacters,
  addCharacterGuild,
  updateRecluitment,
} from "@/app/shared/services/guild-service";
import {
  fetchCharacter,
  fetchMyCharacters,
  renderCharacter,
} from "@/app/shared/services/character-service";
import GuildTile from "@/app/views/guild/views/shared/GuildTile";

export default {
  name: "GuildMain",
  components: {
    GuildTile,
  },
  data() {
    return {
      playerList: [],
      guild: [],
      guildOpen: false,
      loading: true,
      guildName: null,
      showAdd: false,
      charAdded: null,
      guildId: null,
      ownerGuild: false,
      badgeText: "",
      myChar: [],
    };
  },
  async created() {
    if (this.$route.query) {
      this.guildName = this.$route.query.name;
      await this.getData();
    }
  },
  methods: {
    async getData() {
      this.loading = true;
      try {
        this.guild = [];
        this.playerList = await this.getPlayers();
        await this.getCharacter();
        this.loading = false;
      } catch (error) {
        this.loading = false
        this.$toasted.show("Error al obtener los datos", {
          theme: "toasted-primary",
          position: "bottom-center",
          type: "error",
          duration: "3000",
        });
      }      
    },
    async getPlayers() {
      const resp = await fetchOneGuild(this.guildName);
      const owner_id = resp.data.owner_id;
      if (owner_id == localStorage.getItem("user_id")) this.ownerGuild = true;
      this.guildId = resp.data._id;
      this.guildOpen = resp.data.open;

      if (this.guildOpen) {
        this.badgeText = "Cerrar reclutaciones";
        const clientChar = await fetchMyCharacters();
        this.myChar = [...clientChar.data];
        this.myChar = this.myChar.filter(
          (c) => c.guild_name == "" && c.faction == resp.data.faction
        ); // && c.faction == resp.data.faction
      } else {
        this.badgeText = "Abrir reclutaciones";
      }
      const characters = await fetchGuildCharacters(this.guildId);
      return [...characters.data];
    },

    async getCharacter() {
      this.playerList.forEach(async (player) => {
        const resp = await fetchCharacter(player.realm, player.name);
        this.guild.push({ ...resp.data });
      });
    },

    async recluit() {
      try {
        await addCharacterGuild(this.guildName, this.charAdded._id);
        this.charAdded = null;
        this.showAdd = false;
        this.getData();
        this.$toasted.show("Personaje añadido", {
          theme: "toasted-primary",
          position: "bottom-center",
          type: "success",
          duration: "3000",
        });
      } catch (error) {
        console.log(error);
        this.$toasted.show("Error uniéndose a la Hermandad", {
          theme: "toasted-primary",
          position: "bottom-center",
          type: "error",
          duration: "3000",
        });
      }
    },

    async updateRecluitment() {
      if (this.ownerGuild) {
        try {
          const open = !this.guildOpen;
          this.guildOpen = await updateRecluitment(this.guildId, open);
          this.getData();
          this.$toasted.show("Reclutaciones actualizadas", {
            theme: "toasted-primary",
            position: "bottom-center",
            type: "success",
            duration: "3000",
          });
        } catch (error) {
          console.log(error);
          this.$toasted.show("Error al actualizar las reclutaciones", {
            theme: "toasted-primary",
            position: "bottom-center",
            type: "error",
            duration: "3000",
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.badge {
  vertical-align: middle;
  font-weight: 200;
  font-size: 20px;
  cursor: pointer;
}
</style>
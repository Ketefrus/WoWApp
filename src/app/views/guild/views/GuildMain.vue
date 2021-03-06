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

          <div class="panel mt-4">
            <div class="panel-body pad">
              <div d-flex flex-row class="mr-3 p-2">
                <h3 :style="{ 'font-size': '2em' }">Información y avisos</h3>
                <p class="text-justify mt-4">Lorem ipsum blablablabla</p>
              </div>
              <discord-messages v-if="messages.length > 0" :compact-mode="true">
                <CScrollbar />
                <discord-message
                  v-for="(message, index) in messages"
                  :key="index"
                  :author="message.nameUser"
                >
                  {{ message.message }}
                </discord-message>
              </discord-messages>
              <CInput
                v-if="member"
                type="text"
                id="message"
                name="message"
                placeholder="Escribe un aviso..."
                v-model="message"
                v-on:keypress.enter="addMessage"
              >
                <template #append>
                  <CButton
                    @click="addMessage"
                    shape="square"
                    color="outline-warning"
                    >Enviar</CButton
                  >
                </template>
              </CInput>
            </div>
          </div>
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
          :admin="ownerGuild"
          @deleteCharacter="deleteCharacter($event)"
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
  deleteCharacterGuild,
  postMessage,
} from "@/app/shared/services/guild-service";
import {
  fetchCharacter,
  fetchMyCharacters,
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
      messages: [],
      guildOpen: false,
      loading: true,
      guildName: null,
      showAdd: false,
      charAdded: null,
      guildId: null,
      ownerGuild: false,
      member: false,
      faction: null,
      message: "",
      badgeText: "",
      myChar: [],
    };
  },
  async mounted() {
    if (this.$route.query) {
      this.guildName = this.$route.query.name;
      await this.getData();
      this.scrollerBottom();
    }
  },
  methods: {
    // Sets the scrollbar chat to the end
    scrollerBottom() {
      let objDiv = document.getElementsByClassName("discord-messages");
      objDiv[0].scrollTop = objDiv[0].scrollHeight;
    },
    async deleteCharacter(character) {
      try {
        await deleteCharacterGuild(character);
        this.getData();
        this.$toasted.show("Personaje eliminado", {
          theme: "toasted-primary",
          position: "bottom-center",
          type: "success",
          duration: "3000",
        });
      } catch (error) {
        console.log(error);
        this.$toasted.show("Error borrando al personaje de la hermandad", {
          theme: "toasted-primary",
          position: "bottom-center",
          type: "error",
          duration: "3000",
        });
      }
    },
    async getData() {
      this.loading = true;
      try {
        this.member = false;
        this.guild = [];
        this.playerList = await this.getPlayers();

        await this.recluitmentChecker();
        await this.getCharacter();

        this.member = this.memberChecker();

        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
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
      this.faction  = resp.data.faction;
      this.messages  = resp.data.messages;
      const characters = await fetchGuildCharacters(this.guildId);
      return [...characters.data];
    },
    async recluitmentChecker() {
      if (this.guildOpen) {
        this.badgeText = "Cerrar reclutaciones";
        const clientChar = await fetchMyCharacters();
        this.myChar = [...clientChar.data];
        this.myChar = this.myChar.filter(
          (c) => c.guild_name == "" && c.faction == this.faction
        ); 
      } else {
        this.badgeText = "Abrir reclutaciones";
      }
    },
    async getCharacter() {
      this.playerList.forEach(async (player) => {
        const resp = await fetchCharacter(player.realm, player.name);
        this.guild.push({ ...resp.data, owner_id: player.owner_id });
      });
    },

    memberChecker() {
      const search = this.playerList.find(
        (p) => p.owner_id == localStorage.getItem("user_id")
      );

      return search == null ? false : true;
    },

    async addMessage() {
      if (this.message != "") {
        console.log(this.guildName);
        await postMessage(this.guildName, this.message);
        await this.getData();
        // console.log(resp.data.messages);
        // this.messages.push(this.message);
        this.scrollerBottom();
        this.message = "";
      }
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
          await updateRecluitment(this.guildId, open);
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
.discord-messages {
  height: 151px;
  -webkit-transform-origin-y: 100%;
  overflow-y: scroll;
}
</style>
<template>
  <div class="animated FadeIn">
    <CharacterSearch @search="getData($event)" />
    <CharacterInfo :loadingCharacter="loadingCharacter" :item="character" />
    <div v-if="showWelcome" class="container offset">
      <div class="panel">
        <div class="panel-body pad">
          <div d-flex flex-row class="mr-3 p-4">
            <h3 :style="{ 'font-size': '2em' }">Bienvenido a WoWChecker</h3>
            <p class="text-justify mt-4">
              Utiliza el buscador para encontrar personajes y analizar su
              equipo.
              <br />Puedes reclamar un personaje que no haya sido reclamado
              antes para acceder a él rápidamente y consultar su equipo y unirlo
              a hermandades.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCharacter } from "@/app/shared/services/character-service";

import CharacterSearch from "@/app/views/main/components/CharacterSearch";
import CharacterInfo from "@/app/views/main/components/CharacterInfo";

export default {
  name: "Dashboard",
  components: {
    CharacterSearch,
    CharacterInfo,
  },
  data() {
    return {
      character: {},
      stats: {},
      specialization: [],
      render: [],
      equipment: [],
      renderEquipment: [],
      loadingCharacter: true,
      showWelcome: true,
    };
  },
  methods: {
    async getData(search) {
      
      try {
        this.loadingCharacter = true;
        const resp = await fetchCharacter(search.realm, search.name);
        if (resp.status != 200) {
          this.$toasted.show("Personaje no encontrado", {
            theme: "toasted-primary",
            position: "bottom-center",
            type: "error",
            duration: "3000",
          });
          this.loadingCharacter = false;
        }
        this.character = resp.data;
        this.loadingCharacter = false;
        this.showWelcome = false;
      } catch (error) {
        console.log(error);
        this.loadingCharacter = false;
        this.$toasted.show("Personaje no encontrado", {
          theme: "toasted-primary",
          position: "bottom-center",
          type: "error",
          duration: "3000",
        });
      }
      this.loadingCharacter = false;
    },
  },
};
</script>

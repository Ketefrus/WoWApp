<template>
  <div class="container offset">
    <div class="flex wrapable" :style="{ marginBottom: 15 }">
      <div class="flex-main">
        <h1 :style="{ lineHeight: 1.4, margin: 0, padding: 2 }">
          LISTADO DE PERSONAJES
        </h1>
        <CharacterList/>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterList from './shared/CharactersList';
export default {
  name: "CharacterListMain",
  components: {
    CharacterList
  }
};
</script>

<style>
</style>
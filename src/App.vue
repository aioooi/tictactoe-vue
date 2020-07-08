<template>
  <div id="app">
    <h1>Let's Play: Tic Tac Toe</h1>
    <h2>(implemented using Vue.js)</h2>
    <Game/>
  </div>
</template>

<script>
import Game from "./components/Game.vue";

export default {
  name: "App",
  components: {
    Game,
  },
};
</script>

<style>
</style>

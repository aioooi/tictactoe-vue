<template>
  <div>
    <h1>Let's Play: Tic Tac Toe</h1>
    <h2>(implemented using Vue.js)</h2>
    <div id="game">
      <!-- prop playerBegins is referred to as 'player-begins' @vue...  -->
      <Game :player-begins=true :delay=1000></Game>
    </div>
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

<style scoped>
h1 {
  margin: 2vh auto 1vh;
}

h2 {
  margin: 1vh auto 1vh;
}

#game {
  margin: 4vh auto 1vh;
}
</style>

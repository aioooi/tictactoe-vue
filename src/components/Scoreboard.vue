<template>
  <div class="grid">
    <ScoreboardCell
      v-bind:label="playerName"
      v-bind:value="stats.player"
      v-bind:edit="edit"
    ></ScoreboardCell>
    <ScoreboardCell label="Draw" v-bind:value="stats.draw"></ScoreboardCell>
    <ScoreboardCell
      label="Computer"
      v-bind:value="stats.computer"
    ></ScoreboardCell>
  </div>
</template>

<script>
import ScoreboardCell from "./ScoreboardCell.vue";
import EventBus from "../EventBus.js";

export default {
  name: "Scoreboard",
  components: {
    ScoreboardCell,
  },
  props: {
    stats: {
      computer: 0,
      draw: 0,
      player: 0,
    },
    name: {
      type: String,
      default: "Player",
    },
  },
  data() {
    return {
      playerName: this.name,
      edit: true,
    };
  },
  methods: {
    playerNameChanged(name) {
      console.log(`name changed: "${name}"`);
      this.playerName = name;
      this.edit = false;
    },
  },
  mounted() {
    EventBus.$on("playerNameChanged", (name) => this.playerNameChanged(name));
  },
};
</script>

<style scoped>
.grid {
  width: 38vw;
  min-width: 338px;
  max-width: 38vh;
  margin: 4vh auto 2vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  grid-gap: 3px;
}
</style>

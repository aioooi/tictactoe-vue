<template><div>
    {{ playerName }}
  </div>
</template>

<script>
export default {
  name: "Scoreboard",
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
    };
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

<template>
  <div class="board">
    <div v-for="x in 9" v-bind:key="x" class="square" style="color: magenta">
      {{ Math.floor((x - 1) / 3) }} {{ (x - 1) % 3 }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Game",
  props: {
    handicap: {
      type: Number,
      default: 80,
    },
    playerBegins: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 300,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root {
  --PLAYED-COLOR: #e9e9e9;
  --HIGHLIGHT-COLOR: #ffa7a7;
  --HOVER-COLOR: #fff5f5;
  --MARKER-COLOR: #black;
}

.board {
  margin: 0 auto;
  padding: 0;
  width: 40vw;
  height: 40vw;
  max-width: 40vh;
  max-height: 40vh;
  min-width: 308px;
  min-height: 308px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4px;
}

.square {
  position: relative;
  width: auto;
  height: auto;
  background-color: white;
  border: 1px solid #c4c4c4;
  border-radius: 4%;
  cursor: pointer;
  color: white;
  box-shadow: 2px 2px 4px #bbb;
}

.square:hover {
  background-color: var(--HOVER-COLOR);
  box-shadow: 1px 1px 2px #aaa;
}

.tag {
  /* border: 1px dashed magenta; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5vw;
  line-height: 5vw;
}

.played {
  background-color: var(--PLAYED-COLOR);
  cursor: auto;
  color: var(--MARKER-COLOR);
  animation: click 300ms ease-out;
  /* delay iteration-count direction fill-mode; */
}

@keyframes click {
  from {
    background-color: var(--HIGHLIGHT-COLOR);
    color: #fff5f5;
  }
  to {
    background-color: var(--PLAYED-COLOR);
    color: var(--MARKER-COLOR);
  }
}

.played:hover {
  background-color: var(--PLAYED-COLOR);
}

.highlight-winning-line {
  animation: winning-line 800ms ease-in-out 1;
}

@keyframes winning-line {
  0% {
    background-color: var(--PLAYED-COLOR);
    color: var(--MARKER-COLOR);
  }
  50% {
    background-color: var(--HIGHLIGHT-COLOR);
    color: #fff5f5;
  }
  100% {
    background-color: var(--PLAYED-COLOR);
    color: var(--MARKER-COLOR);
  }
}
</style>

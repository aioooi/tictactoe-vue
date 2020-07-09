<template>
  <div>
    <div class="board">
      <div
        v-for="x in 9"
        v-bind:key="x"
        class="square"
        v-bind:class="[
          state[Math.floor((x - 1) / 3)][(x - 1) % 3] !== ttt.EMPTY
            ? 'played'
            : '',
          finalState[Math.floor((x - 1) / 3)][(x - 1) % 3] === 1
            ? 'highlight-winning-line'
            : '',
        ]"
        v-on:click="() => move(Math.floor((x - 1) / 3), (x - 1) % 3)"
      >
        <div class="tag">
          <span
            v-if="state[Math.floor((x - 1) / 3)][(x - 1) % 3] === ttt.PLAYER"
            >&#x0fbe;</span
          >
          <span
            v-if="state[Math.floor((x - 1) / 3)][(x - 1) % 3] === ttt.COMPUTER"
            >&#x262f;</span
          >
        </div>
      </div>
    </div>
    <Scoreboard v-bind:stats="this.stats"></Scoreboard>
  </div>
</template>

<script>
import * as ttt from "../../lib/tictactoe/tictactoe.js";
import Scoreboard from "./Scoreboard.vue";

// TODO handle handicap
const levels = [
  { label: "trivial", handicap: 90 },
  { label: "easy", handicap: 65 },
  { label: "medium", handicap: 48 },
  { label: "hard", handicap: 24 },
  { label: "impossible", handicap: 5 },
];

// TODO handle stats

export default {
  name: "Game",
  props: {
    playerBegins: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 300,
    },
  },
  components: {
    Scoreboard,
  },
  data() {
    return {
      ttt: ttt,
      currentLevel: 2, // default: 'medium'
      game: "",
      state: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      finalState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      locked: false,
      playerBeginsAfterDraw: true,
      stats: {
        computer: 0,
        draw: 0,
        player: 0,
      },
    };
  },
  methods: {
    sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },

    async newGame(playerBegins = true) {
      this.game = new ttt.Game(
        levels[this.currentLevel].handicap,
        playerBegins
      );
      // array assigments are not too reactive otherwise ;)
      this.state = [...this.game.state];
      this.finalState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      if (!playerBegins) {
        this.locked = true;
        await this.sleep(50);
        this.game.makeMove();
      }

      this.state = [...this.game.state];
      this.locked = false;
    },

    resetStats() {
      this.stats = {
        computer: 0,
        draw: 0,
        player: 0,
      };
    },

    async processResults() {
      let playerBegins = true;
      if (this.game.winner === ttt.COMPUTER) {
        this.stats.computer += 1;
      } else if (this.game.winner === ttt.PLAYER) {
        this.stats.player += 1;
        playerBegins = false;
      } else {
        this.stats.draw += 1;
        playerBegins = this.playerBeginsAfterDraw;
        this.playerBeginsAfterDraw = !this.playerBeginsAfterDraw;
      }

      this.finalState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      if (this.game.winner !== ttt.EMPTY) {
        let line = this.game._winningLine;

        line.forEach((e) => {
          this.finalState[Math.floor(e / 3)][e % 3] = 1;
        });
      }

      await this.sleep(1200);
      this.newGame(playerBegins);
    },

    // handle user click on sqaure
    async move(i, j) {
      if (!this.locked) {
        this.locked = true;
        try {
          let gameFinished = this.game.playerMove(i, j);
          this.state = [...this.game.state];

          if (gameFinished) {
            this.processResults();
          } else {
            await this.sleep(
              Math.floor((0.6 + 0.4 * Math.random()) * this.delay)
            );
            gameFinished = this.game.makeMove();
            this.state = [...this.game.state];

            if (gameFinished) {
              this.processResults();
            } else {
              this.locked = false;
            }
          }
        } catch (e) {
          console.error(e);
          this.locked = false;
        }
      }
    },
  },

  created() {
    this.newGame(this.playerBegins);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* declared in global.css: */
/* :root {
  --PLAYED-COLOR: #e9e9e9;
  --HIGHLIGHT-COLOR: #ffa7a7;
  --HOVER-COLOR: #fff5f5;
  --MARKER-COLOR: #black;
} */

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

<template>
  <form v-on:submit.prevent="handleInput">
    <div v-if="disabled">
      <input type="text" v-bind:value="content" disabled />
    </div>
    <div v-else style="position:relative">
      <label v-if="!focus">&#x270E;</label>
      <input
        ref="_input"
        v-bind:value="content"
        type="text"
        v-on:blur="handleInput"
        v-on:focus="hidePencil"
      />
    </div>
    <input type="submit" />
  </form>
</template>

<script>
import EventBus from "../EventBus.js";

export default {
  name: "Input",
  props: {
    value: {
      type: String,
      default: "",
    },
    editOnlyOnce: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      disabled: false,
      focus: false,
      content: this.value,
    };
  },
  methods: {
    hasFocus() {
      return this.focus;
    },
    handleInput() {
      this.content = this.$refs._input.value;
      if (this.editOnlyOnce) {
        this.disabled = true;
      }
      // propagate Event over EventBus to Scoreboard:
      EventBus.$emit("playerNameChanged", this.content);
    },
    hidePencil() {
      this.focus = true;
    },
  },
};
</script>

<style scoped>
input[type="text"] {
  text-align: center;
  margin: 0;
  width: 95%;
  border: none;
  background: none;
  color: #777;
  text-transform: uppercase;
  box-sizing: border-box;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  font-weight: inherit;
}

input[type="text"]:focus {
  background: #fff5f5;
  outline: none;
  border-bottom: 2px solid #ffa7a7;
}

input[type="submit"] {
  display: none;
}

label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 0.4em;
}

.hidden {
  display: none;
}
</style>

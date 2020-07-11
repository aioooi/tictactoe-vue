<template>
  <div
    class="grid"
    v-bind:style="{
      gridTemplateColumns: 'repeat(' + this.labels.length + ', 1fr)',
    }"
  >
    <div v-for="l in labels" v-bind:key="l.id" class="radioBtn">
      <label>{{ l.label }}</label>
      <input
        type="radio"
        v-bind:value="l.id"
        v-model="selectedId"
        v-on:change="select"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "InputRadio",
  props: {
    label: {
      type: Array,
    },
  },
  data() {
    return {
      selectedId: Math.floor(this.label.length / 2),
      labels: this.label.map((v, i) => {
        return {
          id: i,
          label: v,
        };
      }),
    };
  },
  methods: {
    select() {
      this.$emit("select", this.selectedId);
    },
  },
  created() {
      this.select();
  }
};
</script>

<style scoped>
.grid {
  width: 38vw;
  min-width: 338px;
  max-width: 38vh;
  margin: 2vh auto;
  display: grid;
  text-align: center;
  /* set dynamically in template above: */
  /* grid-template-columns: 1fr 1fr 1fr; */
  text-transform: uppercase;
  grid-gap: 3px;
  font-size: 11px;
  font-weight: 300;
}

.radioBtn {
  display: inline-block;
  text-align: center;
}

.radioBtn label {
  display: block;
  margin-bottom: 1em;
}

input[type="radio"] {
  -moz-appearance: None;
  -webkit-appearance: none;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 25%;
  width: 14px;
  height: 14px;
  cursor: pointer;
}

input[type="radio"]:checked {
  background: #ffa7a7;
  border: 1px solid #aaa;
}

input[type="radio"]:focus {
  outline: none;
}
</style>

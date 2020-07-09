<template>
  <div>
    <div class="cell">{{ label }}</div>
    <div class="cell">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Label",
    },
    value: {
      Type: Number,
      default: 0,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      disabled: true,
    };
  },
  created() {
    this.disabled = !this.edit;
  },
};
</script>

<style>
.cell {
  padding: 0.4em;
}
</style>

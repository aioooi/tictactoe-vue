<template>
  <transition name="scale-animation" mode="out-in">
    <div :key="value">
      <div class="cell">{{ label }}</div>
      <div class="cell">{{ value }}</div>
    </div>
  </transition>
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

<style scoped>
.cell {
  padding: 0.4em;
}

.scale-animation-enter-active {
  transition: all 380ms ease-in-out 85ms;
}
.scale-animation-leave-active {
  transition: all 70ms cubic-bezier(1, 0.5, 0.8, 1);
}
.scale-animation-enter {
  transform: scale(1.8);
  opacity: 0;
}

.scale-animation-leave-to {
  transform: scale(0.1);
  opacity: 0;
}
</style>

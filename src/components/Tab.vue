<script>
export default {
  emits: ["tab-clicked"],
  props: {
    name: {
      type: String,
      required: true,
    },
    isActive: { type: Boolean, default: false },
  },
  methods: {
    onClick() {
      this.$emit("tab-clicked", { nameSession: this.name });
    },
  },
};
</script>

<template>
  <div class="tab">
    <button
      type="button"
      :class="{ active: isActive }"
      class="btn btn-secondary text-nowrap w-100"
      @click="onClick"
    >
      {{ name }}
    </button>
  </div>
</template>

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
  <a :class="{ active: isActive }" class="tab" @click="onClick"
    ><p>{{ name }}</p></a
  >
</template>

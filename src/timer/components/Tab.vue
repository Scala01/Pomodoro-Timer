<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["tabIsClicked"]);

function onClick() {
  if (!props.isActive) emit("tabIsClicked", { name: props.title });
}
</script>

<template>
  <div class="tab">
    <button
      type="button"
      :class="{ active: isActive }"
      class="btn-secondary text-nowrap w-100"
      @click="onClick"
    >
      {{ title }}
    </button>
  </div>
</template>

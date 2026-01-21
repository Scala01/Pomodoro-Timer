<script setup>
const props = defineProps({
  name: {
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
  emit("tabIsClicked", { nameSession: props.name });
}
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

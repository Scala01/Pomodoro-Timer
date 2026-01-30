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

const emit = defineEmits(["activeTabChanged"]);

function onTabClick() {
  if (!props.isActive) emit("activeTabChanged", { name: props.title });
}
</script>

<template>
  <div class="tab">
    <button
      type="button"
      :class="{ active: isActive }"
      class="btn-secondary text-nowrap w-100"
      @click="onTabClick"
    >
      {{ title }}
    </button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

const props = defineProps({ zIndex: Number });
const emit = defineEmits(["close"]);

onMounted(() => {
  setOverlayOnBody();
});

onUnmounted(() => {
  removeOverlayFromBody();
});

function setOverlayOnBody() {
  const body = document.querySelector("body");
  if (!body) return;
  body.classList.add("overlay");
  body.style.overflow = "hidden";
}

function removeOverlayFromBody() {
  const body = document.querySelector("body");
  if (!body) return;
  body.classList.remove("overlay");
  body.style.overflow = "";
}

// function handleOutsideClick() {
function close() {
  emit("close");
}
</script>

<template>
  <div class="modal-container">
    <button
      type="button"
      class="close btn btn-secondary btn-icon-lg m-3"
      @click="close"
    >
      <i class="bi bi-x"></i>
    </button>
    <slot />
  </div>
</template>

<style scoped></style>

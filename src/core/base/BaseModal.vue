<script setup>
import { computed } from "vue";

const props = defineProps({
  zIndex: Number,
  modalSize: { type: String, default: "" },
});
const emit = defineEmits(["close"]);

const modalContainer = computed(() => {
  return props.modalSize == ""
    ? "modal-container"
    : `modal-container-${props.modalSize}`;
});

const overlayIndex = computed(() => {
  if (!props.zIndex) return;
  return props.zIndex - 1;
});

// function handleOutsideClick() {
const closeModal = () => emit("close");
</script>

<template>
  <div class="modal-overlay" :style="{ zIndex: overlayIndex }"></div>
  <div
    :class="modalContainer"
    :style="{ zIndex: zIndex }"
    class="d-flex flex-column justify-content-between"
  >
    <!-- class="position-relative top-0 end-0 btn-secondary btn-icon-lg" -->
    <div class="d-flex flex-column">
      <div class="d-flex flex-row">
        <div>
          <button
            type="button"
            class="btn-secondary btn-icon-md me-2"
            @click="closeModal"
          >
            <slot name="start-button">
              <i class="bi bi-x"></i>
            </slot>
          </button>
        </div>
        <span class="align-content-center">
          <slot name="title"> </slot>
        </span>
      </div>
      <slot name="description"> </slot>
    </div>

    <slot />

    <slot name="end-button">
      <button type="button" class="btn-primary" @click="close">Conferma</button>
    </slot>
  </div>
</template>

<script setup>
import SettingsModal from "./SettingsModal.vue";
import useModalStore from "@modal/composables/useModalStore.js";

const { openModal } = useModalStore();

function openSettingsModal() {
  openModal(SettingsModal, { modalSize: "lg" });
}
</script>

<template>
  <div class="card clickable m-2 align-items-center" @click="openSettingsModal">
    <div class="icon-lg me-3">
      <i class="bi bi-alarm"></i>
    </div>
    <div class="d-flex flex-column align-items-start">
      <p class="fs-6 mb-n1" style="">Pomodoro Cycle</p>
      <p class="fs-4 mb-0">Standard: 25min</p>
    </div>
  </div>
</template>

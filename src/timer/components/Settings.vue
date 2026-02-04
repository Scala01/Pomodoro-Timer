<!-- Controller -->

<script setup>
import SettingsModal from "./SettingsModal.vue";
import useModalStore from "@modal/composables/useModalStore.js";

const { openModal } = useModalStore();

function openSettingsModal() {
  openModal(SettingsModal, { modalSize: "lg" });
}
</script>

<template>
  <!-- <div class="d-flex justify-content-center m-4 p-2 g-3"> -->
  <button
    type="button"
    class="btn-secondary btn-icon-md"
    @click="openSettingsModal"
  >
    <i class="bi bi-gear-fill"></i>
  </button>
  <!-- </div> -->
</template>

<!-- Controller -->

<script setup>
import SettingsModal from "./SettingsModal.vue";
import useModalStore from "@core/composables/useModalStore.js";

const { openModal } = useModalStore();

function openSettings() {
  openModal(SettingsModal, { modalSize: "lg" });
}
</script>

<template>
  <div class="row justify-content-end">
    <button
      type="button"
      class="btn-secondary fs-3 col-1"
      @click="openSettings"
    >
      <i class="bi bi-gear-fill"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SettingsModal from "./SettingsModal.vue";

const showModal = ref(false);
function closeModal() {
  showModal.value = false;
}
function openModal() {
  showModal.value = true;
}
</script>

<template>
  <div class="row justify-content-end">
    <button
      type="button"
      class="btn btn-secondary fs-3 col-1"
      @click="openModal"
    >
      <i class="bi bi-gear-fill"></i>
    </button>
  </div>
  <SettingsModal v-if="showModal" @close-settings="closeModal" />
</template>

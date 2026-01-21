<!-- Controller -->

<script setup>
import { ref, computed, Teleport } from "vue";
import SettingsModal from "./SettingsModal.vue";
import useModalStore from "@core/composables/useModalStore.js";
import BaseModal from "@core/base/BaseModal.vue";

const { openModal } = useModalStore();

function openSettings() {
  openModal(SettingsModal);
}
</script>

<template>
  <div class="row justify-content-end">
    <button
      type="button"
      class="btn btn-secondary fs-3 col-1"
      @click="openSettings"
    >
      <i class="bi bi-gear-fill"></i>
    </button>
  </div>
</template>

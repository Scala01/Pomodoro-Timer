<script>
import SettingsModal from "./SettingsModal.vue";

export default {
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    SettingsModal,
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
  },
};
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

<script setup>
import BaseModal from "@modal/base/BaseModal.vue";
import TimeField from "./TimeField.vue";
import usePhaseConfig from "../composables/usePhaseConfig.js";
import useModalStore from "@modal/composables/useModalStore.js";
import TimeEditorModal from "./TimeEditorModal.vue";

const { openModal } = useModalStore();
const { phases } = usePhaseConfig();

function openTimeEditor(phase) {
  openModal(TimeEditorModal, { phase: phase, modalSize: "sm" });
}
</script>

<template>
  <BaseModal>
    <span>
      <h1 class="fs-1">Configurazione</h1>
      <p>Modifica la configurazione degli intervalli</p>
    </span>

    <div class="container-fluid">
      <div class="row g-3 my-3">
        <div v-for="phase in phases" :key="phase.name" class="col-12 col-md-4">
          <div
            class="border-card d-flex flex-column rounded align-items-center w-100 p-2"
          >
            <p class="fs-4 border-bottom pb-2 mb-0">{{ phase.getName() }}</p>
            <TimeField :timer-phase="phase" @edit-requested="openTimeEditor" />
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

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
          <!-- Qui verrà visualizzato tutto in base all'oggetto che creerò: quello per i tipi di timer -->
          <div class="editing-container">
            <p class="fs-4 border-bottom pb-2">{{ phase.name }}</p>
            <TimeField :timer-phase="phase" @edit-requested="openTimeEditor" />
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

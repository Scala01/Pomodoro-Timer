<script setup>
import BaseModal from "@core/base/BaseModal.vue";
import TimeField from "@core/base/TimeField.vue";
import useTimerConfig from "../composables/useTimerConfig.js";
import useModalStore from "@core/composables/useModalStore.js";
import TimeEditorModal from "./TimeEditorModal.vue";

const { openModal } = useModalStore();
const { sessions } = useTimerConfig();

function openTimeEditor(timerSession) {
  openModal(TimeEditorModal, { timer: timerSession, modalSize: "sm" });
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
        <div
          v-for="session in sessions"
          :key="session.name"
          class="col-12 col-md-4"
        >
          <!-- Qui verrà visualizzato tutto in base all'oggetto che creerò: quello per i tipi di timer -->
          <div class="editing-container">
            <p class="fs-4 border-bottom pb-2">{{ session.name }}</p>
            <TimeField
              :timer-session="session"
              @edit-requested="openTimeEditor"
            />
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

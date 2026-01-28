<script setup>
import BaseModal from "@core/base/BaseModal.vue";
import TimeField from "@core/base/TimeField.vue";
import useTimerConfig from "../composables/useTimerConfig.js";
import useModalStore from "@core/composables/useModalStore.js";
import TimeInputModal from "./TimeInputModal.vue";

const { openModal } = useModalStore();
const { sessions } = useTimerConfig();

function openTimeChange(timer) {
  openModal(TimeInputModal, { timerToEdit: timer, modalSize: "sm" });
}

const emit = defineEmits(["closeSettings"]);
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
          v-for="timer in sessions"
          :key="timer.name"
          class="col-12 col-md-4"
        >
          <!-- Qui verrà visualizzato tutto in base all'oggetto che creerò: quello per i tipi di timer -->
          <div class="editing-container">
            <p class="fs-4 border-bottom pb-2">{{ timer.name }}</p>
            <TimeField :timer="timer" @edit-time="openTimeChange" />
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

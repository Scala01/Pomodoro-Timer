<script setup>
import { ref } from "vue";
import BaseModal from "@core/base/BaseModal.vue";
import TimeField from "@core/base/TimeField.vue";
import { TIMER_TYPES } from "@timer/models/TimerTypes";
import useModalStore from "@core/composables/useModalStore.js";
import TimeInputModal from "@timer/components/TimeInputModal.vue";

const { openModal } = useModalStore();

function openTimeChange(timer) {
  openModal(TimeInputModal, { timer: timer, modalSize: "sm" });
}

const emit = defineEmits(["closeSettings"]);

const timers = ref([
  TIMER_TYPES.POMODORO,
  TIMER_TYPES.SHORT_BREAK,
  TIMER_TYPES.LONG_BREAK,
]);

// function saveNewWorkTime() {}
</script>

<template>
  <BaseModal>
    <span>
      <h1 class="fs-1">Configurazione</h1>
      <p>Modifica la configurazione degli intervalli</p>
    </span>

    <div class="container-fluid">
      <div class="row g-3 my-3">
        <div v-for="timer in timers" :key="timer.name" class="col-12 col-md-4">
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

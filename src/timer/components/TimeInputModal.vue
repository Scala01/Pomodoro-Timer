<script setup>
import { ref, computed, onMounted } from "vue";
import BaseModal from "@core/base/BaseModal.vue";
import { TIMER_SESSIONS } from "@timer/models/TimerSessions";
import { getMinutes } from "@/timer/composables/useTimeFormatter";
import useModalStore from "@core/composables/useModalStore.js";

const { closeTopModal } = useModalStore();

const props = defineProps({
  timerToEdit: {
    type: TIMER_SESSIONS,
    required: true,
  },
});

const emit = defineEmits(["setTime"]);
const displayedMinutes = ref(getMinutes(props.timerToEdit.time));
const maxMinutes = 60;

//qui da modificare direttamente lo store globale -- dopo il prossimo refactoring
function setTime() {
  // if (!document.querySelector("#min-input").value) return; //error
  // newTime.value = document.querySelector("#min-input").value;
  // console.log(displayedMinutes.value);
  //   emit("setTime", min.value);
  closeTopModal();
}

function reset() {
  displayedMinutes.value = getMinutes(props.timerToEdit.time);
}
function decreaseTimer() {
  if (displayedMinutes.value == 0) return;
  displayedMinutes.value--;
}
function increaseTimer() {
  if (displayedMinutes.value == maxMinutes) displayedMinutes.value = 0;
  displayedMinutes.value++;
}

function handleMinutesInput() {
  if (displayedMinutes.value > maxMinutes) displayedMinutes.value = maxMinutes;
  if (displayedMinutes.value < 0) displayedMinutes.value = 0;
}
</script>

<template>
  <BaseModal>
    <template #start-button> <i class="bi bi-arrow-left"></i> </template>
    <template #title>
      <h2 class="fs-2">Minuti per *Sessione*</h2>
    </template>
    <template #description>
      <label for="minutesInput"
        >Seleziona quanti minuti far durare la sessione e conferma.</label
      >
    </template>

    <div
      class="d-flex flex-row justify-content-center align-items-center text-center"
    >
      <div class="d-flex flex-column justify-content-start me-2 h-100">
        <button type="button" class="btn-secondary btn-icon-xl" @click="reset">
          <i class="bi bi-arrow-counterclockwise"></i>
        </button>
      </div>
      <div>
        <input
          id="minutesInput"
          type="number"
          class="fs-0 text-center"
          min="0"
          max="maxMinutes"
          v-model.number="displayedMinutes"
          @input="handleMinutesInput"
        />
      </div>
      <div class="d-flex flex-column justify-content-between ms-2 h-100">
        <button
          type="button"
          class="btn-primary btn-icon-xl"
          @click="increaseTimer"
        >
          <i class="bi bi-plus"></i>
        </button>
        <button
          type="button"
          class="btn-primary btn-icon-xl"
          @click="decreaseTimer"
        >
          <i class="bi bi-dash"></i>
        </button>
      </div>
    </div>
  </BaseModal>
</template>

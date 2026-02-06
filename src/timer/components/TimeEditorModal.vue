<script setup>
import { ref } from "vue";
import BaseModal from "@modal/base/BaseModal.vue";
import { Phase } from "../models/Phase.js";
import usePhaseConfig from "../composables/usePhaseConfig.js";

const { setPhaseDuration } = usePhaseConfig();

const props = defineProps({
  phase: {
    type: Phase,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const displayedMinutes = ref(props.phase.time);
const maxMinutes = 60;

function onClose(payload) {
  if (payload?.saveChanges) {
    setNewPhaseTime();
  }
  emit("close");
}

function setNewPhaseTime() {
  if (!displayedMinutes.value) {
    displayedMinutes.value = props.phase.time;
    return;
  }
  setPhaseDuration(props.phase, displayedMinutes.value);
}

function reset() {
  displayedMinutes.value = props.phase.time;
}
function decreaseTimer() {
  if (displayedMinutes.value == 0) return;
  displayedMinutes.value--;
}
function increaseTimer() {
  if (displayedMinutes.value >= maxMinutes) return;
  displayedMinutes.value++;
}

function handleMinutesInput() {
  if (displayedMinutes.value > maxMinutes) displayedMinutes.value = maxMinutes;
  if (displayedMinutes.value < 0) displayedMinutes.value = 0;
}
</script>

<template>
  <BaseModal @close="onClose">
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
          class="fs-0 text-center bg-secondary text-black border-0 rounded p-3"
          style="padding-bottom: 2rem !important"
          min="0"
          :max="maxMinutes"
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

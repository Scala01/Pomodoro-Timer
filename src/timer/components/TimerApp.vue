<script setup>
import { ref } from "vue";
import TabBar from "./TabBar.vue";
import Countdown from "./Countdown.vue";
import usePhaseConfig from "../composables/usePhaseConfig.js";
import usePomodoro from "../composables/usePomodoro.js";

const { setCurrentPhase } = usePomodoro();
const { getPhase } = usePhaseConfig();

const isTimerOn = ref(false);
const resetCount = ref(0);

function activePhase(payload) {
  isTimerOn.value = false;
  let selectedPhase = getPhase(payload.phaseName);
  setCurrentPhase(selectedPhase);
}
function changeTimerOn() {
  isTimerOn.value = !isTimerOn.value;
}
function reset() {
  isTimerOn.value = false;
  resetCount.value++;
}
</script>

<template>
  <div class="timer-container container-xxl p-5">
    <TabBar class="mb-4" @active-phase-changed="activePhase" />
    <Countdown class="mb-4" :reset="resetCount" :is-timer-on="isTimerOn" />
    <div class="timer-buttons d-flex justify-content-center p-2 g-3">
      <button type="button" class="btn-secondary" @click="reset">
        <i class="bi bi-arrow-counterclockwise fs-1"></i>
      </button>
      <button
        type="button"
        class="btn-primary w-100 fs-4 mx-2"
        @click="changeTimerOn"
      >
        <i v-if="isTimerOn" class="bi bi-pause-fill fs-1"></i>
        <i v-else class="bi bi-play-fill fs-1"></i>
      </button>
      <button type="button" class="btn-secondary">
        <i class="bi bi-arrow-right-circle fs-1"></i>
      </button>
    </div>
  </div>
</template>

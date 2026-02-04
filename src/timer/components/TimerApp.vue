<script setup>
import { ref } from "vue";
import Countdown from "./Countdown.vue";
import usePhaseConfig from "../composables/usePhaseConfig.js";
import usePomodoro from "../composables/usePomodoro.js";
import CycleConfigCard from "./CycleConfigCard.vue";
import TaskManagerCard from "./TaskManagerCard.vue";
import Settings from "./Settings.vue";

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
  <!-- to mode in another component - OptionsComponent -->
  <div class="d-flex flex-row flex-wrap mb-4">
    <CycleConfigCard />
    <TaskManagerCard />
    <Settings />
  </div>
  <!--  -->

  <div class="timer-container container-xxl px-5 py-4 border-card">
    <!-- Based on the current phase -->
    <div class="d-flex flex-column justify-content-center mb-4">
      <p class="mb-0">#4 - Focus</p>
      <p class="mb-0">It's time to focus!</p>
    </div>
    <!--  -->
    <Countdown
      class="countdown-container"
      :reset="resetCount"
      :is-timer-on="isTimerOn"
    />
    <div class="timer-buttons d-flex justify-content-center m-4 p-2 g-3">
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

    <!-- Based on the next phase -->
    <div class="d-flex flex-column justify-content-center mb-4">
      <p class="mb-0">Next</p>
      <p class="mb-0">#5 - Short Break</p>
    </div>
    <!--  -->
  </div>
</template>

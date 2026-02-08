<script setup>
import { ref } from "vue";
import Countdown from "./Countdown.vue";
import usePomodoro from "../composables/usePomodoro.js";
import CycleConfigCard from "./CycleConfigCard.vue";
import TaskManagerCard from "./TaskManagerCard.vue";

const {
  currentIndex,
  currentPhaseMessage,
  goToNextPhase,
  currentPhaseName,
  nextPhaseName,
} = usePomodoro();

const isTimerOn = ref(false);
const resetCount = ref(0);

function changeTimerOn() {
  isTimerOn.value = !isTimerOn.value;
}
function reset() {
  isTimerOn.value = false;
  resetCount.value++;
}
function onNextTimer() {
  goToNextPhase();
}
</script>

<template>
  <!-- maybe in another component? - OptionsComponent -->
  <div class="d-flex flex-row flex-wrap mb-4 px-4">
    <CycleConfigCard class="flex-grow-1" />
    <TaskManagerCard class="flex-grow-1" />
  </div>
  <!--  -->

  <div class="container-xxl rounded bg-primary border-card mw-800 px-5 py-4">
    <div class="d-flex flex-column justify-content-center mb-4">
      <p class="mb-0">
        <span># {{ currentIndex }}</span> - <span>{{ currentPhaseName }}</span>
      </p>
      <p class="mb-0">{{ currentPhaseMessage }}</p>
    </div>
    <Countdown :reset="resetCount" :is-timer-on="isTimerOn" />
    <div class="d-flex justify-content-center my-4 p-2" style="gap: 1rem">
      <button
        type="button"
        class="btn-secondary btn-icon-xl clickable"
        @click="reset"
      >
        <i class="bi bi-arrow-counterclockwise"></i>
      </button>
      <button
        type="button"
        class="btn-primary btn-icon-xl clickable"
        style="max-height: 100%; aspect-ratio: 2/1"
        @click="changeTimerOn"
      >
        <i v-if="isTimerOn" class="bi bi-pause-fill"></i>
        <i v-else class="bi bi-play-fill"></i>
      </button>
      <button
        type="button"
        class="btn-secondary btn-icon-xl clickable"
        @click="onNextTimer"
      >
        <i class="bi bi-arrow-right-circle"></i>
      </button>
    </div>

    <p class="mb-0">
      Next: <span>{{ nextPhaseName }}</span>
    </p>
  </div>
</template>

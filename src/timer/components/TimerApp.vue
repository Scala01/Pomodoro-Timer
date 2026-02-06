<script setup>
import { computed, ref } from "vue";
import Countdown from "./Countdown.vue";
import usePhaseConfig from "../composables/usePhaseConfig.js";
import usePomodoro from "../composables/usePomodoro.js";
import CycleConfigCard from "./CycleConfigCard.vue";
import TaskManagerCard from "./TaskManagerCard.vue";

const { getCurrentPhaseMessage, setCurrentPhase } = usePomodoro();
const { getPhase } = usePhaseConfig();

const isTimerOn = ref(false);
const resetCount = ref(0);

const currentMessage = computed(() => getCurrentPhaseMessage());

// function activePhase(payload) {
//   isTimerOn.value = false;
//   let selectedPhase = getPhase(payload.phaseName);
//   setCurrentPhase(selectedPhase);
// }
function changeTimerOn() {
  isTimerOn.value = !isTimerOn.value;
}
function reset() {
  isTimerOn.value = false;
  resetCount.value++;
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
    <!-- Based on the current phase -->
    <div class="d-flex flex-column justify-content-center mb-4">
      <!-- <p class="mb-0">#4 - Focus</p>
      <p class="mb-0">It's time to focus!</p> -->
      <p class="mb-0">#4 - Focus</p>
      <p class="mb-0">{{ currentMessage }}</p>
    </div>
    <!--  -->
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
      <button type="button" class="btn-secondary btn-icon-xl clickable">
        <i class="bi bi-arrow-right-circle"></i>
      </button>
    </div>

    <!-- Based on the next phase -->
    <div class="d-flex flex-column justify-content-center">
      <p class="mb-0">Next</p>
      <p class="mb-0">#5 - Short Break</p>
    </div>
    <!--  -->
  </div>
</template>

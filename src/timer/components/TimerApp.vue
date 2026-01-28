<script setup>
import { computed, ref } from "vue";
import TabBar from "./TabBar.vue";
import Countdown from "./Countdown.vue";
import useTimerConfig from "../composables/useTimerConfig.js";
import useTimer from "../composables/useTimer.js";

const { current, setTimerSession } = useTimer();
const { getTimerSessionByName } = useTimerConfig();

const currentTimer = ref(current);
const isTimerOn = ref(false);
const resetCount = ref(0);

const secondsLeft = computed(() => currentTimer.value.time * 60);

function setTimer(payload) {
  let selectedTimer = getTimerSessionByName(payload.timerName);
  setTimerSession(selectedTimer);
  stopTimer();
}

function startTimer() {
  isTimerOn.value = true;
}

function stopTimer() {
  isTimerOn.value = false;
}

function handleTimerOn() {
  isTimerOn.value ? stopTimer() : startTimer();
}

function reset() {
  stopTimer();
  resetCount.value++;
}
</script>

<template>
  <div class="timer-container container-xxl p-5">
    <TabBar class="mb-4" @set-new-timer="setTimer" />
    <Countdown
      class="mb-4"
      :reset="resetCount"
      :seconds-left="secondsLeft"
      :is-timer-on="isTimerOn"
    />
    <div class="timer-buttons d-flex justify-content-center p-2 g-3">
      <button type="button" class="btn-secondary" @click="reset">
        <i class="bi bi-arrow-counterclockwise fs-1"></i>
      </button>
      <button
        type="button"
        class="btn-primary w-100 fs-4 mx-2"
        @click="handleTimerOn"
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

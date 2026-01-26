<script setup>
import { ref } from "vue";
import TabBar from "./TabBar.vue";
import Countdown from "./Countdown.vue";
import {
  getTimerTypeByName,
  TIMER_SESSIONS,
} from "@timer/models/TimerSessions";

const timerType = ref(getDefaultTimer());
const isTimerOn = ref(false);
const resetCount = ref(0);

function setTimer(payload) {
  timerType.value = getTimerTypeByName(payload.timer);
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

function getTabs() {
  return [
    TIMER_SESSIONS.POMODORO.name,
    TIMER_SESSIONS.SHORT_BREAK.name,
    TIMER_SESSIONS.LONG_BREAK.name,
  ];
}

function getDefaultTimer() {
  return TIMER_SESSIONS.POMODORO;
}
</script>

<template>
  <div class="timer-container container-xxl p-5">
    <TabBar class="mb-4" :timer-names="getTabs()" @set-new-timer="setTimer" />
    <Countdown
      class="mb-4"
      :reset="resetCount"
      :seconds-left="timerType.time"
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

<script>
import TabBar from "./TabBar.vue";
import Countdown from "./Countdown.vue";
import { getTimerTypeByName, TIMER_TYPES } from "../enums/TimerTypes";

export default {
  data() {
    return {
      timerType: this.getDefaultTimer(),
      isTimerOn: false,
    };
  },
  components: {
    TabBar,
    Countdown,
  },
  computed: {
    getButtonName() {
      return this.isTimerOn ? "Stop" : "Start";
    },
  },
  methods: {
    setTimer(payload) {
      this.timerType = getTimerTypeByName(payload.timer);
      this.stopTimer();
    },

    startTimer() {
      this.isTimerOn = true;
    },
    stopTimer() {
      this.isTimerOn = false;
    },
    handleClick() {
      this.isTimerOn ? this.stopTimer() : this.startTimer();
    },

    getTabs() {
      return [
        TIMER_TYPES.POMODORO.name,
        TIMER_TYPES.SHORT_BREAK.name,
        TIMER_TYPES.LONG_BREAK.name,
      ];
    },
    getDefaultTimer() {
      return TIMER_TYPES.POMODORO;
    },
  },
};
</script>

<template>
  <div class="timer-container container-xxl p-5">
    <TabBar class="mb-4" :timer-names="getTabs()" @set-new-timer="setTimer" />
    <Countdown
      class="mb-4"
      :seconds-left="this.timerType.time"
      :is-timer-on="this.isTimerOn"
    />
    <div class="timer-buttons d-flex justify-content-center p-2 g-3">
      <!--
Source - https://stackoverflow.com/a
Posted by Gagan Gami
Retrieved 2026-01-19, License - CC BY-SA 3.0
-->

      <button type="button" class="btn btn-secondary">
        <i class="bi bi-arrow-counterclockwise fs-1"></i>
      </button>
      <button
        type="button"
        class="btn btn-primary w-100 fs-4 mx-2"
        @click="handleClick"
      >
        {{ getButtonName }}
      </button>
      <button type="button" class="btn btn-secondary">
        <i class="bi bi-arrow-right-circle fs-1"></i>
      </button>
    </div>
    <!-- other timer info... -->
  </div>
</template>

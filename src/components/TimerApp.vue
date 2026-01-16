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
  <div class="timer-container">
    <TabBar :timer-names="getTabs()" @set-new-timer="setTimer" />
    <Countdown
      :seconds-left="this.timerType.time"
      :is-timer-on="this.isTimerOn"
    />
    <button class="timer-button" @click="handleClick">
      {{ getButtonName }}
    </button>
    <!-- other timer info... -->
  </div>
</template>

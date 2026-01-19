<script>
export default {
  props: {
    secondsLeft: {
      type: Number,
      required: true,
    },
    isTimerOn: { type: Boolean, required: true },
  },
  data() {
    return {
      timer: this.secondsLeft,
      timerFunction: null,
    };
  },
  computed: {
    getFormattedTime() {
      const minuti = Math.floor(this.timer / 60);
      const secondi = this.timer % 60;
      return `${minuti}:${secondi.toString().padStart(2, "0")}`;
    },
  },
  watch: {
    isTimerOn(newValue) {
      if (newValue) {
        this.startTimer();
      } else {
        this.pauseTimer();
      }
    },
    secondsLeft(oldValue, newvalue) {
      this.timer = this.secondsLeft;
    },
  },
  methods: {
    startTimer() {
      if (this.timerFunction) return;
      this.timerFunction = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          this.pauseTimer();
          // emit evento "fine countdown" se vuoi
          // this.$emit("finished");
        }
      }, 1000);
    },
    pauseTimer() {
      clearInterval(this.timerFunction);
      this.timerFunction = null;
    },
  },
};
</script>

<template>
  <h1 class="fs-0 timer-count">{{ getFormattedTime }}</h1>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  secondsLeft: {
    type: Number,
    required: true,
  },
  isTimerOn: { type: Boolean, required: true },
  reset: { type: Number, required: true },
});

const timer = ref(props.secondsLeft);
const timerFunction = ref(null);

const getFormattedTime = computed(() => {
  const min = Math.floor(timer.value / 60);
  const sec = timer.value % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
});

watch(
  () => props.isTimerOn,
  (newValue) => {
    newValue ? startTimer() : pauseTimer();
  },
);

watch(
  () => props.secondsLeft,
  () => {
    timer.value = props.secondsLeft;
  },
);

watch(
  () => props.reset,
  (newValue, oldValue) => {
    if (oldValue < newValue) {
      timer.value = props.secondsLeft;
    }
  },
);

function startTimer() {
  if (timerFunction.value) return;
  timerFunction.value = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      pauseTimer();
      // emit evento "fine countdown" se vuoi
      // this.$emit("finished");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerFunction.value);
  timerFunction.value = null;
}
</script>

<template>
  <h1 class="fs-0 timer-count">{{ getFormattedTime }}</h1>
</template>

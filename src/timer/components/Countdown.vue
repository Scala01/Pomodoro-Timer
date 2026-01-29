<script setup>
import { ref, computed, watch } from "vue";
import useTimer from "../composables/useTimer";
import { getFormattedTime } from "../composables/useTimeFormatter.js";

const { currentSession } = useTimer();

const props = defineProps({
  isTimerOn: { type: Boolean, required: true },
  reset: { type: Number, required: true },
});

//TODO: Componente wrapper tra useTimer e Countdown, per formattare minuti - secondi?
const timer = ref(currentSession.value.time * 60);
const timerFunction = ref(null);

const formattedTime = computed(() => getFormattedTime(timer.value));

watch(
  () => props.isTimerOn,
  (newValue) => (newValue ? startTimer() : pauseTimer()),
);

watch(
  () => currentSession.value,
  () => (timer.value = currentSession.value.time * 60),
);

watch(
  () => props.reset,
  (newValue, oldValue) => {
    if (oldValue < newValue) timer.value = currentSession.value.time;
  },
);

function startTimer() {
  if (timerFunction.value) return;
  timerFunction.value = setInterval(() => {
    timer.value > 0 ? timer.value-- : pauseTimer();
    // this.$emit("finished");
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerFunction.value);
  timerFunction.value = null;
}
</script>

<template>
  <h1 class="fs-0 timer-count">{{ formattedTime }}</h1>
</template>

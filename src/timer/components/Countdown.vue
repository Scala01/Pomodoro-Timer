<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import usePomodoro from "../composables/usePomodoro";
import { getFormattedTime } from "../composables/useTimeFormatter.js";

//TODO: Refactoring
const { currentPhaseDuration } = usePomodoro();

const props = defineProps({
  isTimerOn: { type: Boolean, required: true },
  reset: { type: Number, required: true },
});

//TODO: Componente wrapper tra usePomodoro e Countdown, per formattare minuti - secondi?
const timer = ref(currentPhaseDuration.value * 60);
const countdown = ref(null);

const formattedTime = computed(() => getFormattedTime(timer.value));

watch(currentPhaseDuration, resetTime);

watch(
  () => props.isTimerOn,
  (newValue) => (newValue ? startTimer() : pausePomodoro()),
);
watch(
  () => props.reset,
  (newValue, oldValue) => {
    if (oldValue < newValue) resetTime();
  },
);

function startTimer() {
  if (countdown.value) return;
  countdown.value = setInterval(() => {
    timer.value > 0 ? timer.value-- : pausePomodoro();
    // this.$emit("finished");
  }, 1000);
}
function resetTime() {
  timer.value = currentPhaseDuration.value * 60;
}
function pausePomodoro() {
  clearInterval(countdown.value);
  countdown.value = null;
}

onUnmounted(() => {
  clearInterval(countdown.value);
});
</script>

<template>
  <div class="bg-dark p-5 rounded text-white">
    <h1 class="fs-md-0 digital-numbers">{{ formattedTime }}</h1>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import usePomodoro from "../composables/usePomodoro";
import { getFormattedTime } from "../composables/useTimeFormatter.js";

const { currentPhase } = usePomodoro();

const props = defineProps({
  isTimerOn: { type: Boolean, required: true },
  reset: { type: Number, required: true },
});

//TODO: Componente wrapper tra usePomodoro e Countdown, per formattare minuti - secondi?
const timer = ref(currentPhase.value.time * 60);
const countdown = ref(null);

const formattedTime = computed(() => getFormattedTime(timer.value));

watch(currentPhase.value, () => reset());
watch(
  () => props.isTimerOn,
  (newValue) => (newValue ? startTimer() : pausePomodoro()),
);
watch(
  () => props.reset,
  (newValue, oldValue) => {
    if (oldValue < newValue) reset();
  },
);

const reset = () => (timer.value = currentPhase.value.time * 60);

function startTimer() {
  if (countdown.value) return;
  countdown.value = setInterval(() => {
    timer.value > 0 ? timer.value-- : pausePomodoro();
    // this.$emit("finished");
  }, 1000);
}

function pausePomodoro() {
  clearInterval(countdown.value);
  countdown.value = null;
}
</script>

<template>
  <div class="bg-dark p-5 rounded text-white">
    <h1 class="fs-md-0 digital-numbers">{{ formattedTime }}</h1>
  </div>
</template>

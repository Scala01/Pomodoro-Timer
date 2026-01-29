<script setup>
import { ref, computed } from "vue";
import { getFormattedTimeByMinutes } from "@/timer/composables/useTimeFormatter";
import { TimerSession } from "@timer/models/TimerSession";

const props = defineProps({
  timerSession: {
    type: TimerSession,
    required: true,
  },
});

const emit = defineEmits(["editRequested"]);

const formattedTime = computed(() =>
  getFormattedTimeByMinutes(props.timerSession.time),
);

function edit() {
  emit("editRequested", props.timerSession);
}
</script>

<template>
  <div class="d-flex flex-column m-3">
    <div class="fs-5 p-1 text-start"><label for="time">Duration</label></div>

    <div id="time" class="d-flex flex-row justify-content-between">
      <div
        class="d-flex flex-row align-items-center justify-content-between px-3 py-2 w-100"
      >
        <span class="fs-3"> {{ formattedTime }}</span>
        <button type="button" class="btn-secondary btn-icon" @click="edit">
          <i class="bi bi-pencil-fill"></i>
        </button>
      </div>
    </div>
  </div>
</template>

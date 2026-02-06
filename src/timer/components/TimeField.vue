<script setup>
import { computed } from "vue";
import { getFormattedTimeByMinutes } from "@/timer/composables/useTimeFormatter";
import { Phase } from "@timer/models/Phase";

const props = defineProps({
  timerPhase: {
    type: Phase,
    required: true,
  },
});

const emit = defineEmits(["editRequested"]);

const formattedTime = computed(() =>
  getFormattedTimeByMinutes(props.timerPhase.time),
);

function edit() {
  emit("editRequested", props.timerPhase);
}
</script>

<template>
  <div class="m-3 rounded clickable bg-light" @click="edit">
    <div class="px-3 py-2">
      <span class="fs-3"> {{ formattedTime }}</span>
    </div>
  </div>
</template>

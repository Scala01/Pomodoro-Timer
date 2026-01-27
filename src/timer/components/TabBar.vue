<script setup>
import { ref } from "vue";
import Settings from "./Settings.vue";
import Tab from "./Tab.vue";
import useTimer from "../composables/useTimer.js";
import { TimerSessions } from "../models/TimerSessions.js";

const { current } = useTimer();

const emit = defineEmits(["setNewTimer"]);

const currentTimer = ref(current);
const timerNames = getTabs();

function changeSession(payload) {
  emit("setNewTimer", { timerName: payload.name });
}

function getTabs() {
  if (TimerSessions.length != 3) return;
  return TimerSessions.map((ts) => ts.name);
}
</script>

<template>
  <div class="container text-center">
    <Settings />
    <div class="row g-3">
      <Tab
        class="col-md-4 col-12"
        v-for="timerName in timerNames"
        :key="timerName"
        :is-active="currentTimer.name === timerName"
        :title="timerName"
        @tab-is-clicked="changeSession"
      />
    </div>
  </div>
</template>

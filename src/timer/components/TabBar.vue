<script setup>
import { computed, ref } from "vue";
import Settings from "./Settings.vue";
import Tab from "./Tab.vue";
import useTimer from "../composables/useTimer.js";
import useTimerConfig from "../composables/useTimerConfig.js";

const { currentSession } = useTimer();
const { sessions } = useTimerConfig();

//With Typescript: type runtime validation
const emit = defineEmits({
  activeSessionChanged: (payload) =>
    payload && payload.sessionName && typeof payload.sessionName === "string",
});

const timerNames = computed(() =>
  Object.values(sessions.value).map((s) => s.name),
);

function onTabClicked(payload) {
  emit("activeSessionChanged", { sessionName: payload.name });
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
        :is-active="currentSession.name === timerName"
        :title="timerName"
        @active-tab-changed="onTabClicked"
      />
    </div>
  </div>
</template>

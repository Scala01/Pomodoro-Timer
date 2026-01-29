<script setup>
import { computed, ref } from "vue";
import Settings from "./Settings.vue";
import Tab from "./Tab.vue";
import usePomodoro from "../composables/usePomodoro.js";
import usePhaseConfig from "../composables/usePhaseConfig.js";

const { currentPhase } = usePomodoro();
const { phases } = usePhaseConfig();

//With Typescript: type runtime validation
const emit = defineEmits({
  activePhaseChanged: (payload) =>
    payload && payload.phaseName && typeof payload.phaseName === "string",
});

const phasesNames = computed(() =>
  Object.values(phases.value).map((s) => s.name),
);

function onTabClicked(payload) {
  emit("activePhaseChanged", { phaseName: payload.name });
}
</script>

<template>
  <div class="container text-center">
    <Settings />
    <div class="row g-3">
      <Tab
        class="col-md-4 col-12"
        v-for="phasesName in phasesNames"
        :key="phasesName"
        :is-active="currentPhase.name === phasesName"
        :title="phasesName"
        @active-tab-changed="onTabClicked"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Settings from "./Settings.vue";
import Tab from "./Tab.vue";

const props = defineProps({
  timerNames: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["setNewTimer"]);

const currentTimerType = ref(props.timerNames[0]);

function changeSession(payload) {
  currentTimerType.value = payload.nameSession;
  emit("setNewTimer", { timer: currentTimerType.value });
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
        :is-active="currentTimerType === timerName"
        :name="timerName"
        @tab-is-clicked="changeSession"
      />
    </div>
  </div>
</template>

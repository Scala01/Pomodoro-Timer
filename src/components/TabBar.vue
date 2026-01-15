<script>
import Tab from "./Tab.vue";

export default {
  emits: ["setNewTimer"],
  props: {
    timerNames: {
      type: Array,
      required: true,
      // validator: (array) => array.length > 2,
    },
  },
  data() {
    return {
      currentTimerType: this.timerNames[0],
    };
  },
  components: {
    Tab,
  },
  methods: {
    changeSession(payload) {
      this.currentTimerType = payload.nameSession;
      this.$emit("setNewTimer", { timer: this.currentTimerType });
    },
  },
};
</script>

<template>
  <div class="tab-bar">
    <Tab
      v-for="timerName in this.timerNames"
      :is-active="currentTimerType == timerName"
      :name="timerName"
      @tab-clicked="changeSession"
    />
  </div>
</template>

<!-- 
<script>
import Tab from "./Tab.vue";
import { getTimerTypeByName, TIMER_TYPES } from "../scripts/TimerTypes.js";

export default {
  emits: ["setNewTimer"],
  data() {
    return {
      currentTimerType: TIMER_TYPES.POMODORO,
      timerTypes: [
        TIMER_TYPES.POMODORO,
        TIMER_TYPES.SHORT_BREAK,
        TIMER_TYPES.LONG_BREAK,
      ],
    };
  },
  components: {
    Tab,
  },
  methods: {
    changeSession(payload) {
      this.currentTimerType = getTimerTypeByName(payload.nameSession); //getTimerTypeByName handles esception yet
      this.$emit("setNewTimer", { timer: this.currentTimerType });
    },
  },
};
</script>

<template>
  <div class="tab-bar">
    <Tab
      v-for="timerType in this.timerTypes"
      :is-active="currentTimerType == timerType"
      :name="timerType.name"
      @tab-clicked="changeSession"
    />
  </div>
</template>
 -->

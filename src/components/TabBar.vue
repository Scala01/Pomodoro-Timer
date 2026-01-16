<script>
import Tab from "./Tab.vue";

export default {
  emits: ["setNewTimer"],
  props: {
    timerNames: {
      type: Array,
      required: true,
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

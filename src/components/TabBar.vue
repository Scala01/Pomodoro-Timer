<script>
import Settings from "./Settings.vue";
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
    Settings,
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
  <div class="container text-center">
    <Settings />
    <div class="row g-3">
      <Tab
        class="col-md-4 col-12"
        v-for="timerName in this.timerNames"
        :is-active="currentTimerType == timerName"
        :name="timerName"
        @tab-clicked="changeSession"
      />
    </div>
  </div>
</template>

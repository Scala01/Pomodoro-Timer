<script>
import TimeInput from "./base/TimeInput.vue";
import { getTimerTypeByName, TIMER_TYPES } from "../enums/TimerTypes";

function setOverlayOnBody() {
  const body = document.querySelector("body");
  if (!body) return;
  body.classList.add("overlay");
  body.style.overflow = "hidden";
}

function removeOverlayFromBody() {
  const body = document.querySelector("body");
  if (!body) return;
  body.classList.remove("overlay");
  body.style.overflow = "";
}

export default {
  emits: ["closeSettings"],
  data() {
    return {
      open: false,
      timers: [
        TIMER_TYPES.POMODORO,
        TIMER_TYPES.SHORT_BREAK,
        TIMER_TYPES.LONG_BREAK,
      ],
    };
  },
  components: {
    TimeInput,
  },
  mounted() {
    setOverlayOnBody();
  },
  unmounted() {
    removeOverlayFromBody();
  },
  methods: {
    close() {
      removeOverlayFromBody();
      this.$emit("closeSettings");
    },
    saveNewWorkTime() {},
  },
};
</script>

<template>
  <div class="modal d-flex flex-column justify-content-between">
    <div class="g-3">
      <span>
        <h1 class="fs-1">Configurazione</h1>
        <p>Modifica la configurazione degli intervalli</p>
      </span>

      <!-- inserire un v-for per ottimizzare -->
      <div class="container-fluid">
        <div class="row g-3 my-3">
          <div v-for="timer in this.timers" class="col-12 col-md-4">
            <div class="editing-container">
              <p class="fs-4 border-bottom pb-2">{{ timer.name }}</p>
              <TimeInput :time="timer.time" @time-confirmed="saveNewWorkTime" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <button type="button" class="btn btn-primary" @click="close">Salva</button>
  </div>
</template>

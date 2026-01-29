import { Phase } from "../models/Phase.js";
import { PHASE_TYPE } from "../models/PhaseType.js";
import { reactive, toRefs } from "vue";

const workTimer = new Phase("work", PHASE_TYPE.FOCUS, 25);
const shortBreakTimer = new Phase("shortBreak", PHASE_TYPE.BREAK, 5);
const longBreakTimer = new Phase("longBreak", PHASE_TYPE.BREAK, 15);

// Maps...
const state = reactive({
  phases: {
    work: workTimer,
    shortBreak: shortBreakTimer,
    longBreak: longBreakTimer,
  },
});

export default function usePhases() {
  const { phases } = toRefs(state);

  function getDefaultPhase() {
    return state.phases[workTimer.name];
  }

  return {
    phases,
    getDefaultPhase,
  };
}

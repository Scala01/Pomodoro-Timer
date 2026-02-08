import { Phase } from "../models/Phase.js";
import { PHASE_TYPE } from "../models/PhaseType.js";
import { reactive, toRefs } from "vue";

function initPhases() {
  let workTimer, shortBreakTimer, longBreakTimer;
  let defaultPhases = {
    workTimer: new Phase("work", PHASE_TYPE.FOCUS, 25),
    shortBreakTimer: new Phase("shortBreak", PHASE_TYPE.BREAK, 5),
    longBreakTimer: new Phase("longBreak", PHASE_TYPE.BREAK, 15),
  };

  const storedPhasesJson = localStorage.getItem("timer-phases");
  if (!storedPhasesJson) return defaultPhases;

  try {
    const storedPhases = JSON.parse(storedPhasesJson);
    if (
      !storedPhases ||
      !storedPhases?.work ||
      !storedPhases?.shortBreak ||
      !storedPhases?.longBreak
    )
      return defaultPhases;
    workTimer = Phase.fromJson(storedPhases["work"]);
    shortBreakTimer = Phase.fromJson(storedPhases["shortBreak"]);
    longBreakTimer = Phase.fromJson(storedPhases["longBreak"]);
  } catch (error) {
    return defaultPhases;
  }

  return { workTimer, shortBreakTimer, longBreakTimer };
}

const { workTimer, shortBreakTimer, longBreakTimer } = initPhases();

// Maps...or:
// const phases = reactive({
//   work: workTimer,
//   shortBreak: shortBreakTimer,
//   longBreak: longBreakTimer,
// });

//TODO: fare un controllo per verificare che ci siano effettivamente i phases e siano non null
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

  function getPhase(key) {
    return state.phases[key];
  }

  function storePhases() {
    localStorage.setItem("timer-phases", JSON.stringify(state.phases));
  }

  return {
    phases,
    getDefaultPhase,
    storePhases,
    getPhase,
  };
}

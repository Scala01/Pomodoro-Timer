import { Phase } from "../models/Phase.js";
import { readonly } from "vue";
import usePhases from "./usePhases.js";

const { phases } = usePhases();

//TODO: store with localStorage changed timers
export default function usePhaseConfig() {
  function setPhaseDuration(phase, newTime) {
    if (!phases.value[phase.name])
      throw new Error(`Invalid name session: ${phase.name}`);

    if (phase instanceof Phase) {
      if (!phases.value[phase.name])
        throw new Error(`Session not found: ${phase.name}`);
      phases.value[phase.name].time = newTime;
      return;
    }
    throw new TypeError(`Invalid argument: ${phase}`);
  }

  // check on Phase class...
  function getPhase(name) {
    return phases.value[name];
  }

  return {
    phases: readonly(phases),
    setPhaseDuration,
    getPhase,
  };
}

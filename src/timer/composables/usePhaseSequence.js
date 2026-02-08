/**
 * Funzionamento del sequence:
 * Quando work è 0 -> decremento i break e reset di work
 * Quando un break è 0 -> decremento work e reset del break
 *
 * Se un PhaseStep è 0 -> è la Phase corrente
 * Se almeno un PhaseStep è 1, scelta in base alla priorità:
 *    -> se è Work allora è il successivo
 *    -> se è LongBreak allora è il successivo
 *    -> altrimenti ShortBreak è il successivo
 */
import { reactive } from "vue";
import { PhaseStep } from "../models/PhaseStep.js";
import usePhases from "./usePhases.js";

const { getPhase } = usePhases();

const work = new PhaseStep("work", 1, 1);
const shortBreak = new PhaseStep("shortBreak", 1, 1);
const longBreak = new PhaseStep("longBreak", 4, 4);

const state = reactive({
  sequence: {
    work,
    shortBreak,
    longBreak,
  },
});

function start() {
  work.countDown();
  // try catch ...
  const workPhase = getPhase("work");
  const shortBreakPhase = getPhase("shortBreak");
  state.current = workPhase;
  state.next = shortBreakPhase;
}
start();

export default function usePhaseSequence() {
  function getCurrent() {
    const curr = Object.values(state.sequence).find((p) => p.turnsLeft == 0);
    if (!curr) throw new Error("Current pomodoro phase not found");

    const currentPhase = getPhase(curr.key);
    return currentPhase;
  }

  function getNext() {
    const nx = Object.values(state.sequence).filter((p) => p.turnsLeft == 1);
    if (!nx) throw new Error("Next pomodoro phase not found");

    if (nx.length > 1) {
      let phase = nx.find((p) => p.key == "work");
      if (phase) {
        const nextPhase = getPhase(phase.key);
        return nextPhase;
      }

      phase = nx.find((p) => p.key == "longBreak");
      if (!phase) throw new Error("Unexpected phase on queue");
      const nextPhase = getPhase(phase.key);
      return nextPhase;
    }
    if (nx.length == 0)
      throw new Error("Expected phases but found empty array");

    const nextPhase = getPhase(nx[0].key);
    return nextPhase;
  }

  function updateSequence() {
    const curr = Object.values(state.sequence).find((p) => p.turnsLeft == 0);
    if (curr.key == state.sequence.work.key) {
      state.sequence.work.reset();

      if (state.sequence.longBreak.turnsLeft == 1) {
        state.sequence.longBreak.countDown();
      } else {
        state.sequence.longBreak.countDown();
        state.sequence.shortBreak.countDown();
      }
    } else if (curr.key == state.sequence.longBreak.key) {
      state.sequence.longBreak.reset();

      state.sequence.work.countDown();
    } else if (curr.key == state.sequence.shortBreak.key) {
      state.sequence.shortBreak.reset();

      state.sequence.work.countDown();
    } else {
      throw new Error("Expected a phase on queue but found nothing");
    }
  }

  return {
    updateSequence,
    getCurrent,
    getNext,
  };
}

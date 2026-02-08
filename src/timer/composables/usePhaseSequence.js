// potrei in futuro trasformare questa composable in usePomodoro
// e l'altro in History

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

import { reactive, readonly, toRefs } from "vue";
import { PhaseStep } from "../models/PhaseStep.js";
import usePhases from "./usePhases.js";

const { getPhase } = usePhases();

const work = new PhaseStep("work", 1, 1);
const shortBreak = new PhaseStep("shortBreak", 1, 1);
const longBreak = new PhaseStep("longBreak", 4, 4);

/**
 * OTTIMIZZAZIONE CON REACTIVE??
 */
const pomodoro = reactive({
  sequence: {
    work,
    shortBreak,
    longBreak,
  },
  current: null,
  next: null,
});

function start() {
  work.countDown();
  // try catch ...
  const workPhase = getPhase("work");
  const shortBreakPhase = getPhase("shortBreak");
  pomodoro.current = workPhase;
  pomodoro.next = shortBreakPhase;
}
start();

export default function usePhaseSequence() {
  const { sequence, current, next } = toRefs(pomodoro);

  // function getCurrent() {
  //   return pomodoro.current;
  // }
  // function getNext() {
  //   return pomodoro.next;
  // }

  function updateState() {
    updateCurrent();
    updateNext();
  }

  function updateCurrent() {
    const curr = Object.values(pomodoro.sequence).find((p) => p.turnsLeft == 0);
    if (!curr) throw new Error("Current pomodoro phase not found");

    const currentPhase = getPhase(curr.key);
    pomodoro.current = currentPhase;
  }

  function updateNext() {
    const nx = Object.values(pomodoro.sequence).filter((p) => p.turnsLeft == 1);
    if (!nx) throw new Error("Next pomodoro phase not found");

    if (nx.length > 1) {
      let phase = nx.find((p) => p.key == "work");
      if (phase) {
        const nextPhase = getPhase(phase.key);
        pomodoro.next = nextPhase;
        return;
      }

      phase = nx.find((p) => p.key == "longBreak");
      if (!phase) throw new Error("Unexpected phase on queue");
      const nextPhase = getPhase(phase.key);
      pomodoro.next = nextPhase;
      return;
    }
    if (nx.length == 0)
      throw new Error("Expected phases but found empty array");

    //nx.length == 1
    const nextPhase = getPhase(nx[0].key);
    pomodoro.next = nextPhase;
  }

  function moveToNext() {
    const curr = Object.values(pomodoro.sequence).find((p) => p.turnsLeft == 0);
    if (curr.key == pomodoro.sequence.work.key) {
      pomodoro.sequence.work.reset();

      if (pomodoro.sequence.longBreak.turnsLeft == 1) {
        pomodoro.sequence.longBreak.countDown();
      } else {
        pomodoro.sequence.longBreak.countDown();
        pomodoro.sequence.shortBreak.countDown();
      }
    } else if (curr.key == pomodoro.sequence.longBreak.key) {
      pomodoro.sequence.longBreak.reset();

      pomodoro.sequence.work.countDown();
    } else if (curr.key == pomodoro.sequence.shortBreak.key) {
      pomodoro.sequence.shortBreak.reset();

      pomodoro.sequence.work.countDown();
    } else {
      throw new Error("Expected a phase on queue but found nothing");
    }

    updateState();
  }

  return {
    moveToNext,
    activePhase: readonly(current),
    next: readonly(next),
  };
}

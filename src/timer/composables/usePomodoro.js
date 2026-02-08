import { reactive, toRefs, readonly, computed } from "vue";
import usePhaseSequence from "./usePhaseSequence.js";

const { getCurrent, getNext, updateSequence } = usePhaseSequence();

const pomodoro = reactive({
  history: [],
  current: null,
  next: null,
});

const initState = () => {
  pomodoro.current = getCurrent();
  pomodoro.next = getNext();
};
initState();

export default function usePomodoro() {
  const { history, current, next } = toRefs(pomodoro);

  function goToNextPhase() {
    pomodoro.history.push(pomodoro.current);

    updateSequence();

    pomodoro.current = getCurrent();
    pomodoro.next = getNext();
  }

  const currentPhaseName = computed(() => pomodoro.current.getName());
  const nextPhaseName = computed(() => pomodoro.next.getName());

  const currentIndex = computed(() => pomodoro.history.length + 1);
  const currentPhaseMessage = computed(() => pomodoro.current.getMessage());

  const currentPhaseDuration = computed(() => pomodoro.current.time);

  return {
    goToNextPhase,
    currentPhaseDuration,
    currentIndex,
    currentPhaseMessage,
    currentPhaseName,
    nextPhaseName,
  };
}

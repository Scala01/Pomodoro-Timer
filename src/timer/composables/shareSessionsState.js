import { TimerSession } from "../models/TimerSession.js";
import { SESSION_TYPES } from "../models/SessionTypes.js";
import { reactive, toRefs } from "vue";

const workTimer = new TimerSession("work", SESSION_TYPES.FOCUS, 25);
const shortBreakTimer = new TimerSession("shortBreak", SESSION_TYPES.BREAK, 5);
const longBreakTimer = new TimerSession("longBreak", SESSION_TYPES.BREAK, 15);

const state = reactive({
  sessions: {
    work: workTimer,
    shortBreak: shortBreakTimer,
    longBreak: longBreakTimer,
  },
});

export default function useSharedState() {
  const { sessions } = toRefs(state);

  function getDefaultSession() {
    return state.sessions["work"];
  }

  return {
    sessions,
    getDefaultSession,
  };
}

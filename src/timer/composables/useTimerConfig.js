import { TimerSession } from "../models/TimerSession.js";
import { SESSION_TYPES } from "../models/SessionTypes.js";
import { reactive, readonly, toRefs } from "vue";

const workTimer = new TimerSession("work", SESSION_TYPES.FOCUS, 25);
const shortBreakTimer = new TimerSession("shortBreak", SESSION_TYPES.BREAK, 5);
const longBreakTimer = new TimerSession("longBreak", SESSION_TYPES.BREAK, 15);

const state = reactive({
  sessions: {},
});

//TODO: store with localStorage changed timers
export default function useTimerConfig() {
  const { sessions } = toRefs(state);

  state.sessions = {
    work: workTimer,
    shortBreak: shortBreakTimer,
    longBreak: longBreakTimer,
  };

  function changeWorkTime(newTime) {
    state.sessions["work"].time = newTime;
  }
  function changeShortBreakTime(newTime) {
    state.sessions["shortBreak"].time = newTime;
  }
  function changeLongBreakTime(newTime) {
    state.sessions["longBreak"].time = newTime;
  }

  //TODO: refactoring
  function changeTimerTime(timer, newTime) {
    state.sessions[timer.name].time = newTime;
  }

  // Swap with computed...
  function getTimerSessions() {
    const sessionsArray = Object.entries(state.sessions).map(
      ([key, value]) => value,
    );
    return sessionsArray;
  }

  function getTimerSessionByName(name) {
    return state.sessions[name];
  }

  return {
    sessions: readonly(sessions),
    changeWorkTime,
    changeShortBreakTime,
    changeLongBreakTime,
    changeTimerTime,
    getTimerSessions,
    getTimerSessionByName,
  };
}

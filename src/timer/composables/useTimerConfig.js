import { TimerSession } from "../models/TimerSession.js";
import { readonly } from "vue";
import useSharedState from "./shareSessionsState.js";

const { sessions } = useSharedState();

//TODO: store with localStorage changed timers
export default function useTimerConfig() {
  function changeSessionTime(timer, newTime) {
    if (!sessions.value[timer.name])
      throw new Error(`Invalid name session: ${timer.name}`);

    if (timer instanceof TimerSession) {
      if (!sessions.value[timer.name])
        throw new Error(`Session not found: ${timer.name}`);
      sessions.value[timer.name].time = newTime;
      return;
    }
    throw new TypeError(`Invalid argument: ${timer}`);
  }

  function getTimerSessionByName(name) {
    return sessions.value[name];
  }

  return {
    sessions: readonly(sessions),
    changeSessionTime,
    getTimerSessionByName,
  };
}

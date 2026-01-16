import { SESSION_TYPES } from "./SessionTypes";

export const TIMER_TYPES = Object.freeze({
  POMODORO: Object.freeze({
    name: "Pomodoro",
    type: SESSION_TYPES.FOCUS,
    time: 1500,
  }),
  SHORT_BREAK: Object.freeze({
    name: "Short Break",
    type: SESSION_TYPES.BREAK,
    time: 300,
  }),
  LONG_BREAK: Object.freeze({
    name: "Long Break",
    type: SESSION_TYPES.BREAK,
    time: 900,
  }),
});

export function getTimeByTimer(timerType) {
  return timerType.time;
}

export function getTimerTypeByName(name) {
  let timer = Object.values(TIMER_TYPES).find((timer) => timer.name === name);
  if (!timer) throw new Error(`Invalid session name: ${name}`);
  return timer;
}

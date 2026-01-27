import { SESSION_TYPES } from "./SessionTypes";

export class TimerSession {
  constructor(name, type, time) {
    this._name = name;
    this._type = type;
    this._time = time;
  }
  get name() {
    return this._name;
  }
  get type() {
    return this._type;
  }
  get time() {
    return this._time;
  }
  equals(other) {
    return (
      other instanceof TimerSession &&
      other._name == this._name &&
      SESSION_TYPES.equals(other._type, this._type) &&
      other._time == this._time
    );
  }
}

//this will be another js class
export const TimerSessions = [
  new TimerSession("Pomodoro", SESSION_TYPES.FOCUS, 25),
  new TimerSession("Short Break", SESSION_TYPES.BREAK, 5),
  new TimerSession("Long Break", SESSION_TYPES.BREAK, 15),
];

export function getTimerSessionByName(name) {
  switch (name) {
    case "Pomodoro":
      return TimerSessions[0];
    case "Short Break":
      return TimerSessions[1];
    case "Long Break":
      return TimerSessions[2];
    default:
      throw new Error(`Invalid name: ${name}`);
  }
}

// TO DELETE:
export const TIMER_SESSIONS = Object.freeze({
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
  let timer = Object.values(TIMER_SESSIONS).find(
    (timer) => timer.name === name,
  );
  if (!timer) throw new Error(`Invalid session name: ${name}`);
  return timer;
}

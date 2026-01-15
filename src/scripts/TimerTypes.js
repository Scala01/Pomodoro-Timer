import { SESSION_TYPES } from "./SessionTypes";

export const TIMER_TYPES = {
  POMODORO: { name: "Pomodoro", type: SESSION_TYPES.FOCUS, time: 1500 },
  SHORT_BREAK: { name: "Short Break", type: SESSION_TYPES.BREAK, time: 300 },
  LONG_BREAK: { name: "Long Break", type: SESSION_TYPES.BREAK, time: 900 },
};

export function getTimeByTimer(timerType) {
  if (!timerType instanceof TIMER_TYPES)
    throw new Error(`Invalid session type: ${timerType}`);
  return timerType.time;
}

export function getTimerTypeByName(name) {
  switch (name) {
    case "Pomodoro":
      return TIMER_TYPES.POMODORO;
    case "Short Break":
      return TIMER_TYPES.SHORT_BREAK;
    case "Long Break":
      return TIMER_TYPES.LONG_BREAK;
    default:
      throw new Error(`Invalid session name: ${name}`);
  }
}

// export function areEquals(firstTimerType, secondTimerType) {
//   if (
//     !firstTimerType instanceof TIMER_TYPES || //Instanceof non va usato sugli enum!!!
//     !secondTimerType instanceof TIMER_TYPES
//   )
//     return false;
//   return (
//     firstTimerType.name == secondTimerType.name &&
//     firstTimerType.type == secondTimerType.type &&
//     firstTimerType.time == secondTimerType.time
//   );
// }

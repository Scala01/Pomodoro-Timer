export const PHASE_TYPE = {
  FOCUS: { name: "on-focus" },
  BREAK: { name: "take-a-break" },
};

export function isFocus(type) {
  return type === PHASE_TYPE.FOCUS;
}

export function isBreak(type) {
  return type === PHASE_TYPE.BREAK;
}

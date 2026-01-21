export const SESSION_TYPES = {
  FOCUS: { name: "on-focus" },
  BREAK: { name: "take-a-break" },
};

export function isFocus(type) {
  return type === SESSION_TYPES.FOCUS;
}

export function isBreak(type) {
  return type === SESSION_TYPES.BREAK;
}

export function getMessage(type) {
  switch (type) {
    case SESSION_TYPES.FOCUS:
      return "Time to focus!";
    case SESSION_TYPES.BREAK:
      return "Time for a break!";
    default:
      throw new Error(`Invalid session name: ${type}`);
  }
}

export function getSessionTypeByName(name) {
  switch (name) {
    case "on-focus":
      return SESSION_TYPES.FOCUS;
    case "take-a-break":
      return SESSION_TYPES.BREAK;
    default:
      throw new Error(`Invalid session name: ${name}`);
  }
}

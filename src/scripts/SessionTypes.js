export const SESSION_TYPES = {
  FOCUS: { name: "on-focus", message: "Time to focus!" },
  BREAK: { name: "take-a-break", message: "Time for a break!" },
};

export function isFocus(type) {
  return type === SESSION_TYPES.FOCUS;
}

export function isBreak(type) {
  return type === SESSION_TYPES.BREAK;
}

export function getMessage(type) {
  return type.message;
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

// phase type is { name: ... }
export const PHASE_TYPE = Object.freeze({
  FOCUS: { name: "on-focus" },
  BREAK: { name: "take-a-break" },
});

export function isValidPhaseType(type) {
  if (typeof type === "string")
    throw new Error(
      `Invalid argument, espected PhaseType but received ${type}`,
    );
  return (
    type.name === PHASE_TYPE.FOCUS.name || type.name === PHASE_TYPE.BREAK.name
  );
}

export function getPhaseType(type) {
  if (typeof type === "string") return fromName(type);
  if (isValidPhaseType(type)) return type;

  throw new Error("Invalid PhaseType");
}

function fromName(name) {
  switch (name) {
    case PHASE_TYPE.FOCUS.name:
      return PHASE_TYPE.FOCUS;
    case PHASE_TYPE.BREAK.name:
      return PHASE_TYPE.BREAK;
    default:
      throw new Error(`invalid argument: ${name}`);
  }
}

export function getMessage(type) {
  switch (type.name) {
    case PHASE_TYPE.FOCUS.name:
      return "It's time to focus!";
    case PHASE_TYPE.BREAK.name:
      return "Take a coffee";
    default:
      throw new Error(`invalid argument: ${type}`);
  }
}

export function fromJson(json) {
  if (!isValidPhaseType(json)) {
    throw new Error(`invalid json: ${json["name"]}`);
  }
  return json["name"];
}

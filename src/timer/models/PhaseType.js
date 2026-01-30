export const PHASE_TYPE = {
  FOCUS: { name: "on-focus" },
  BREAK: { name: "take-a-break" },
};

export function isPhaseType(type) {
  return type === PHASE_TYPE.FOCUS || type === PHASE_TYPE.BREAK;
}

function fromString(name) {
  switch (name) {
    case PHASE_TYPE.FOCUS.name:
      return PHASE_TYPE.FOCUS;
    case PHASE_TYPE.BREAK.name:
      return PHASE_TYPE.BREAK;
    default:
      throw new Error(`invalid json: ${json["name"]}`);
  }
}

export function fromJson(json) {
  switch (json["name"]) {
    case PHASE_TYPE.FOCUS.name:
      return PHASE_TYPE.FOCUS;
    case PHASE_TYPE.BREAK.name:
      return PHASE_TYPE.BREAK;
    default:
      throw new Error(`invalid json: ${json["name"]}`);
  }
}

export function getPhaseType(type) {
  if (isPhaseType(type)) return type;
  if (typeof type === "string") return fromString(type);

  throw new Error("Invalid PhaseType");
}

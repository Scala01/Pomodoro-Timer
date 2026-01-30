import { getPhaseType, fromJson as typeFromJson } from "./PhaseType";

export class Phase {
  constructor(name, type, time) {
    this._name = name;
    this._type = getPhaseType(type);
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

  set time(newValue) {
    this._time = newValue;
  }

  static fromJson(json) {
    return new Phase(json["_name"], typeFromJson(json["_type"]), json["_time"]);
  }
}

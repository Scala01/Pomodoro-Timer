import { SESSION_TYPES } from "./SessionTypes";

export class TimerSession {
  constructor(name, type, time) {
    //rinominare _name => _key per maggiore
    // compatibilità con lo stato di useTimerConfig.js
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

  set time(newValue) {
    this._time = newValue;
  }
}

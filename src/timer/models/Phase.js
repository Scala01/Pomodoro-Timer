export class Phase {
  constructor(name, type, time) {
    //Validation...
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

  set time(newValue) {
    this._time = newValue;
  }
}

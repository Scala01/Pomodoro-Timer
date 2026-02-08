// Set phases sequence order
export class PhaseStep {
  constructor(key, turnsLeft, resetValue) {
    this._key = key;
    this._turnsLeft = turnsLeft;
    this._resetValue = resetValue;
  }
  get key() {
    return this._key;
  }
  get turnsLeft() {
    return this._turnsLeft;
  }
  get resetValue() {
    return this._resetValue;
  }
  countDown() {
    if (this._turnsLeft == 0) {
      this.reset();
      return;
    }
    this._turnsLeft--;
  }
  reset() {
    this._turnsLeft = this._resetValue;
  }
}

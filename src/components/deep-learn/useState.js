class UseState {
  constructor() {
    this._cache = [];
    this.index = 0;
    this.useState = this.useState.bind(this);
  }
  useState(init) {
    this._cache[this.index] = this._cache[this.index] || init;
    console.log("this", this);
    const currentIndex = this.index;
    const _this = this;
    function setState(newState) {
      _this._cache[currentIndex] = newState;
      console.log("useState", _this._cache, currentIndex, _this.index);
      _this.index = 0;
    }
    return [this._cache[this.index++], setState];
  }
}
const { useState } = new UseState();

export default useState;

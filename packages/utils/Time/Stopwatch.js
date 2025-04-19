import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export default class Stopwatch {
  _startTime = 0;
  _stopTime = 0;
  constructor() {}

  start() {
    this.stop();
    this._startTime = Date.now();
  }

  stop() {
    this._stopTime = Date.now();
  }

  valueOf() {
    return this._stopTime - this._startTime;
  }
}

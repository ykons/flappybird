class Clock {
  constructor() {
    this.deltaTime = 0;
    this.tickTime = 0;
    this.elapsedTime = 0;
    this.frame = 0;
  }
  tick(timestamp) {
    const delta = timestamp - this.tickTime;
    this.deltaTime = delta / 1000;
    this.tickTime = timestamp;
    this.elapsedTime += delta;
    this.frame++;
  }
}

const clock = new Clock();

export { clock };

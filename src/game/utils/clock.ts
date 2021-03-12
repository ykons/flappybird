const ONE_SECUND = 1000;

class Clock {
  public deltaTime: number;
  public tickTime: number;
  public tickFrame: number;
  public elapsedTime: number;
  public timeSinceLastFPS: number;
  public frame: number;
  public fps: number;
  constructor() {
    this.deltaTime = 0;
    this.tickTime = 0;
    this.tickFrame = 0;
    this.elapsedTime = 0;
    this.timeSinceLastFPS = 0;
    this.frame = 0;
    this.fps = 0;
  }

  tick(timestamp) {
    let delta = timestamp - this.tickTime;
    this.deltaTime = delta / 1000;
    this.tickTime = timestamp;
    this.elapsedTime += delta;
    this.timeSinceLastFPS += delta;
    this.frame++;
    if (this.timeSinceLastFPS > ONE_SECUND) {
      this.fps = (this.frame - this.tickFrame) / this.deltaTime;
      this.timeSinceLastFPS = 0;
    }
    this.tickFrame = this.frame;
  }
}

const clock = new Clock();

export { clock };

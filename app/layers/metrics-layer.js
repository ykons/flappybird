import { FPS } from "./ui/fps.js";
import { LiveScore } from "./ui/live-score.js";

export class MetricsLayer {
  constructor() {
    this.liveScore = new LiveScore();
    this.fps = new FPS();
  }

  render() {
    this.liveScore.render();
    this.fps.render();
  }
}

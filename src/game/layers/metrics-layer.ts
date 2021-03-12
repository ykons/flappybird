import { Layer } from "./layer";
import { FPS } from "./ui/fps";
import { LiveScore } from "./ui/live-score";

export class MetricsLayer implements Layer {
  private liveScore: LiveScore;
  private fps: FPS;
  constructor() {
    this.liveScore = new LiveScore();
    this.fps = new FPS();
  }

  render() {
    this.liveScore.render();
    this.fps.render();
  }
}

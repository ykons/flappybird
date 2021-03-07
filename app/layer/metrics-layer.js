import { gameState } from "../core/state/game-state.js";
import { LiveScore } from "../ui/live-score.js";

export class MetricsLayer {
  constructor() {
    this.liveScore = new LiveScore();
  }

  render() {
    this.liveScore.render();
  }
}

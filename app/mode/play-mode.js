import { gameState } from "../core/state/game-state.js";
import { LiveScore } from "../ui/live-score.js";
import { BackgroundLayer } from "../layer/background-layer.js";
import { FloorLayer } from "../layer/floor-layer.js";
import { ObstacleLayer } from "../layer/obstacle-layer.js";
import { PlayerLayer } from "../layer/player-layer.js";

export class PlayMode {
  constructor() {
    gameState.restart();
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new ObstacleLayer(),
      new PlayerLayer(),
    ];
    this.liveScore = new LiveScore();
  }

  update(deltaTime) {
    gameState.update(deltaTime);
    this.liveScore.update(deltaTime);
  }

  render() {
    this.layers.forEach((layer) => layer.render());
    if (gameState.isPlaying()) this.liveScore.render();
  }
}

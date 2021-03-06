import { gameState } from "../core/state/game-state.js";
import { LiveScore } from "../ui/live-score.js";
import { BackgroundLayer } from "../layer/background-layer.js";
import { FloorLayer } from "../layer/floor-layer.js";

export class PlayMode {
  constructor() {
    gameState.restart();
    this.layers = [new BackgroundLayer(), new FloorLayer()];
    this.objects = [];
    this.liveScore = new LiveScore();
  }

  update(deltaTime) {
    gameState.update();
    this.objects = gameState.getSprites();
    this.objects.forEach((sprite) => sprite.update(deltaTime));
    this.liveScore.update(deltaTime);
  }

  render() {
    this.layers.forEach((layer) => layer.render());
    this.objects.forEach((sprite) => sprite.render());
    if (gameState.isPlaying()) this.liveScore.render();
  }
}

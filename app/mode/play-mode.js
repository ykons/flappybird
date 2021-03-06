import { gameState } from "../core/state/game-state.js";
import { LiveScore } from "../ui/live-score.js";

export class PlayMode {
  constructor() {
    gameState.restart();
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
    this.objects.forEach((sprite) => sprite.render());
    if (gameState.isPlaying()) this.liveScore.render();
  }
}

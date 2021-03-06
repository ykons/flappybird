import { gameState } from "../core/state/game-state.js";

export class PlayMode {
  constructor() {
    gameState.restart();
    this.objects = [];
  }

  update(deltaTime) {
    gameState.update();
    this.objects = gameState.getSprites();
    this.objects.forEach((sprite) => sprite.update(deltaTime));
  }

  render() {
    this.objects.forEach((sprite) => sprite.render());
  }
}

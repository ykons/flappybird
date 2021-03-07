import { GameOver } from "../ui/game-over.js";
import { gameState } from "../core/state/game-state.js";

export class GameOverMode {
  constructor() {
    this.objects = [new GameOver()];
  }

  processInput(event) {
    gameState.restart();
  }

  update(deltaTime) {}

  render() {
    this.objects.forEach((sprite) => sprite.render());
  }
}

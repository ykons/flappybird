import { GetReady } from "../ui/get-ready.js";
import { gameState } from "../core/state/game-state.js";

export class ReadyMode {
  constructor() {
    this.objects = [new GetReady()];
  }

  processInput(event) {
    gameState.play();
  }

  update(deltaTime) {}

  render() {
    this.objects.forEach((sprite) => sprite.render());
  }
}

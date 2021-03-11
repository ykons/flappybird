import { gameState } from "../core/state/game-state";

export class FloorLayer {
  constructor() {}

  render() {
    gameState.floor.render();
  }
}

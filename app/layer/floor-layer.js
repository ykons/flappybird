import { gameState } from "../core/state/game-state.js";

export class FloorLayer {
  constructor() {}

  render() {
    gameState.floor.render();
  }
}

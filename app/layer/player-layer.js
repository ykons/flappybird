import { gameState } from "../core/state/game-state.js";

export class PlayerLayer {
  constructor() {}

  render() {
    gameState.player.render();
  }
}

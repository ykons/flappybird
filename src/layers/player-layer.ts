import { gameState } from "../core/state/game-state";

export class PlayerLayer {
  constructor() {}

  render() {
    gameState.player.render();
  }
}

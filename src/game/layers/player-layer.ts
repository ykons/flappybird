import { Layer } from "./layer";
import { gameState } from "../core/state/game-state";

export class PlayerLayer implements Layer {
  constructor() {}

  render() {
    gameState.player.render();
  }
}

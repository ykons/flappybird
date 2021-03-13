import { Layer } from "./interfaces/layer";
import { gameState } from "../core/state/game-state";

export class PlayerLayer implements Layer {
  constructor() {}

  render() {
    gameState.players.forEach((player) => player.render());
  }
}

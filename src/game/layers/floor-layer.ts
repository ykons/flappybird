import { Layer } from "./layer";
import { gameState } from "../core/state/game-state";

export class FloorLayer implements Layer {
  constructor() {}

  render() {
    gameState.floor.render();
  }
}

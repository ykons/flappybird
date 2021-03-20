import { Layer } from "./interfaces/layer";
import { gameState } from "../core/state/game-state";

export class ObstacleLayer implements Layer {
  constructor() {}

  render() {
    gameState.obstacles.forEach((obstacle) => obstacle.render());
  }
}

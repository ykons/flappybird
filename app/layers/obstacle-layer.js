import { gameState } from "../core/state/game-state.js";

export class ObstacleLayer {
  constructor() {}

  render() {
    gameState.obstacles.forEach((obstacle) => obstacle.render());
  }
}

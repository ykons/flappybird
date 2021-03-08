import { config, canvas } from "../../utils/const.js";
import { getRndInteger } from "../../utils/utils.js";
import { clock } from "../../utils/clock.js";
import { Floor } from "../entities/floor.js";
import { FloorPipe } from "../entities/floor-pipe.js";
import { SkyPipe } from "../entities/sky-pipe.js";
import { Player } from "../entities/player.js";

class GameState {
  constructor() {
    this.obstacles = [];
    this.player = new Player();
    this.floor = {};
  }

  restart() {
    this.player.restart();
    this.floor = new Floor();
    this.obstacles.length = 0;
  }

  update(deltaTime) {
    if (!this.player.died) {
      this.removeOldObstacle();
      this.createNewObstacle();
      this.floor.update(deltaTime);
      this.player.update(deltaTime);
      this.obstacles.forEach((obstacle) => obstacle.update(deltaTime));
    }
  }

  removeOldObstacle() {
    this.obstacles = this.obstacles.filter((sprite) => {
      return !sprite.isHidden();
    });
  }

  createPairOfPipes() {
    const floorPipeHeight = getRndInteger(
      config.PIPE_FLOOR_HEIGHT_MIN,
      config.PIPE_FLOOR_HEIGHT_MAX
    );
    return [new SkyPipe(floorPipeHeight), new FloorPipe(floorPipeHeight)];
  }

  createNewObstacle() {
    if (clock.frame % config.TIME_NEW_OBSTACLE == 0) {
      this.obstacles.push(...this.createPairOfPipes());
    }
  }
}

const gameState = new GameState();

export { gameState };

import { config, canvas } from "../../utils/const.js";
import { getRndInteger } from "../../utils/utils.js";
import { clock } from "../../utils/clock.js";
import { Floor } from "../entities/floor.js";
import { FloorPipe } from "../entities/floor-pipe.js";
import { SkyPipe } from "../entities/sky-pipe.js";
import { Player } from "../entities/player.js";

class GameState {
  static get READY() {
    return "ready";
  }
  static get PLAYING() {
    return "playing";
  }
  static get GAMEOVER() {
    return "gameover";
  }
  constructor() {
    this.state = GameState.READY;
    this.obstacles = [];
    this.player = {};
    this.floor = {};
  }
  restart() {
    this.player = new Player();
    this.floor = new Floor();
    this.state = GameState.READY;
    this.obstacles = [];
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
  play() {
    this.state = GameState.PLAYING;
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

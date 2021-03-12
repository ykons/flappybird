import { config } from "../../utils/const";
import { getRndInteger } from "../../utils/utils";
import { clock } from "../../utils/clock";
import { Floor } from "../entities/floor";
import { FloorPipe } from "../entities/floor-pipe";
import { SkyPipe } from "../entities/sky-pipe";
import { Bird } from "../entities/bird";

class GameState {
  obstacles: Array<FloorPipe | SkyPipe>;
  player: Bird;
  floor: Floor;
  constructor() {
    this.player = new Bird();
    this.floor = new Floor();
    this.obstacles = [];
  }

  restart() {
    this.player.restart();
    this.floor = new Floor();
    this.obstacles.length = 0;
  }

  update(deltaTime: number) {
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

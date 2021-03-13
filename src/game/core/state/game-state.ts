import { config, WORLD_WIDTH } from "../../utils/const";
import { getRndInteger } from "../../utils/utils";
import { clock } from "../../utils/clock";
import { Floor } from "../entities/floor";
import { FloorPipe } from "../entities/floor-pipe";
import { SkyPipe } from "../entities/sky-pipe";
import { Bird } from "../entities/bird";
import { SmartBird } from "../entities/smart-bird";
import { SensorsListener } from "../interfaces/sensors-listener";

class GameState {
  obstacles: Array<FloorPipe | SkyPipe>;
  player: SmartBird;
  floor: Floor;
  observers: Array<SensorsListener>;
  constructor() {
    this.player = new SmartBird();
    this.floor = new Floor();
    this.obstacles = [];
    this.observers = [];
    this.addObserver(this.player);
  }

  restart() {
    this.player.restart();
    this.floor = new Floor();
    this.obstacles.length = 0;
    this.observers = [];
    this.addObserver(this.player);
  }

  addObserver(observer: SensorsListener) {
    this.observers.push(observer);
  }

  update(deltaTime: number) {
    if (!this.player.died) {
      this.removeOldObstacle();
      this.createNewObstacle();
      this.floor.update(deltaTime);
      this.player.update(deltaTime);
      this.obstacles.forEach((obstacle) => obstacle.update(deltaTime));
      const nextObstacleAhead = this.getNextObstacleAhead();
      this.observers.forEach((observer) =>
        observer.notifyNextPipeGap(nextObstacleAhead[0], nextObstacleAhead[1])
      );
    }
  }

  getNextObstacleAhead(): Array<number> {
    let position = [WORLD_WIDTH, 0];
    this.obstacles.forEach((obstacle) => {
      if (
        obstacle.x + obstacle.width > this.player.x + this.player.width &&
        obstacle.x < position[0]
      ) {
        position = [obstacle.x, obstacle.y];
      }
    });
    return position;
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